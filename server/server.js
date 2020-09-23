const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const { uid, authenticateUser, generateAccessToken } = require("./helper");
const { Users } = require("../models");
const razorpayroutes = require("./routes/razorpayroutes");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use("/razorpay", authenticateUser, razorpayroutes);

// To serve react file in the same port
// const path = require("path");
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//Server side Validation
validateEmail = (value) => {
	const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(value);
};

validatePassword = (value) => {
	let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	return re.test(value);
};

//Endpoint to check if connection has established
app.get("/ping", function (req, res) {
	return res.send("pong");
});

//Signup Endopint
app.post("/usersignup", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const saltRounds = 10;
	const maxAge = 60 * 60 * 1000; // minutes * seconds * milliseconds

	if (validateEmail(email) && validatePassword(password)) {
		//Check if the email is unique for eliminating duplication
		Users.findOne({ where: { email: email } }).then((token) => {
			//if email doesn't exist in the server
			if (token === null) {
				//Generate a unique id
				const id = uid({ prefix: "IND" });
				//hash the password and store it in the DB
				const userData = { id: id, email };
				const { accessToken, sessionID } = generateAccessToken(
					userData
				);
				bcrypt.hash(password, saltRounds, function (err, hash) {
					if (err) throw err;
					Users.create({
						id: id,
						email: email,
						password: hash,
					})
						.then((data) => {
							res.cookie("token", accessToken, {
								httpOnly: true,
								maxAge: maxAge,
								sameSite: "strict",
							});
							res.cookie("sessionID", sessionID, {
								maxAge: maxAge,
								sameSite: "strict",
								// secure: true,
							});
							res.json({ message: "success" });
						})
						.catch((err) => console.log(err));
				});
			} else {
				console.log(token);
				res.json({ message: "duplication" });
			}
		});
	} else {
		res.json({ message: "Invalid" });
	}
});

//Login Endpoint
app.post("/userlogin", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const maxAge = 60 * 60 * 1000;
	if (validateEmail(email) && validatePassword(password)) {
		//Check if account exists
		Users.findOne({
			where: { email: email },
			attributes: ["id", "email", "password"],
		})
			.then((response) => {
				//if account exists
				if (response !== null) {
					const userData = response.dataValues;
					const tokenData = {
						id: userData.id,
						email: userData.email,
					};
					const { accessToken, sessionID } = generateAccessToken(
						tokenData
					);
					bcrypt
						.compare(password, userData.password)
						.then((result) => {
							res.cookie("token", accessToken, {
								httpOnly: true,
								maxAge: maxAge,
								sameSite: "strict",
							});
							res.cookie("sessionID", sessionID, {
								maxAge: maxAge,
								sameSite: "strict",
							});
							res.json({ message: result });
						});
				}
				//account doesn't exist
				else {
					res.json({ message: "Unavailable" });
				}
			})
			.catch((err) => console.log(err));
	} else {
		res.json({ message: "Invalid" });
	}
});

//Endpoint to get buses available for a source
app.post("/gettravels", authenticateUser, (req, res) => {
	const ticketData = require("../ticketData.json");
	const response = [];
	ticketData.forEach((item, i) => {
		if (item.source.toLowerCase() === req.body.source.toLowerCase()) {
			response.push(item);
		}
	});
	if (response.length === 0) {
		res.status(404).send("Unavailable");
	} else {
		res.json(response);
	}
});

//get the bus details using id
app.post("/getbusdetails", authenticateUser, (req, res) => {
	const ticketData = require("../ticketData.json");
	const busData = ticketData.filter((item) => item.id === req.body.busid)[0];
	if (busData !== undefined) res.json({ travelData: busData });
	else res.sendStatus(403);
});

//Logout Endpoint
app.get("/logout", authenticateUser, (req, res) => {
	res.cookie("token", "", { httpOnly: true, maxAge: 0 });
	res.sendStatus(200);
});

app.listen(process.env.PORT || 8080, () => console.log("Server is running"));
