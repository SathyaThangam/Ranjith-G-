const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

const helper = require("./helper");
const { Users } = require("./models");

const app = express();
app.use(express.json());
// app.use(cors({
// 	origin:"http://localhost:3000",
// 	credentials:true
// }))
app.use(cors());
app.use(cookieparser());
// To serve react file in the same port
// const path = require("path");
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

validateEmail = (value) => {
	const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(value);
};

validatePassword = (value) => {
	let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
	return re.test(value);
};

generateAccessToken = (data) => {
	const sessionID = uuidv4();
	data.sessionID = sessionID;
	console.log(data);
	return {
		accessToken: jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "30m",
		}),
		sessionID: sessionID,
	};
};

authenticateUser = (req, res, next) => {
	//TODO add verfiaction of sessionID
	// console.log(req.cookies.token)
	jwt.verify(
		req.cookies.token,
		process.env.ACCESS_TOKEN_SECRET,
		(err, data) => {
			if (err) return res.sendStatus(403);
			else next();
		}
	);
};

//Endpoint to check if connection has established
app.get("/ping", function (req, res) {
	return res.send("pong");
	// return res.send(helper.uid({ prefix: "IND" }));
});

//Signup Endopint
app.post("/usersignup", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const saltRounds = 10;
	const maxAge = 30 * 60 * 1000;

	if (validateEmail(email) && validatePassword(password)) {
		//Check if the email is unique for eliminating duplication
		Users.findOne({ where: { email: email } }).then((token) => {
			//if email doesn't exist in the server
			if (token === null) {
				//Generate a unique id
				const id = helper.uid({ prefix: "IND" });
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
							});
							res.cookie("sessionID", sessionID, {
								maxAge: maxAge,
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
	const maxAge = 30 * 60 * 1000;
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
							});
							res.cookie("sessionID", sessionID, {
								maxAge: maxAge,
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

app.post("/gettravels", authenticateUser, (req, res) => {
	const ticketData = require("./ticketData.json");
	const response = [];
	ticketData.forEach((item, i) => {
		if (item.source.toLowerCase() === req.body.source.toLowerCase()) {
			response.push(item);
		}
	});
	if (response.length === 0) {
		// res.json({ data: "No data found" });
		res.status(404).send("Unavailable");
	} else {
		res.json(response);
	}
});

app.get("/logout", (req, res) => {
	res.cookie("token", "", { httpOnly: true, maxAge: 0 });
	res.sendStatus(200);
});
app.listen(process.env.PORT || 8080, () => console.log("Server is running"));
