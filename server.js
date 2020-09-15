const express = require("express");
const bcrypt = require("bcrypt");

const helper = require("./helper");
const { Users } = require("./models");

const app = express();
app.use(express.json());

// To serve react file in the same port
// const path = require("path");
// app.use(express.static(path.join(__dirname, "build")));
// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

//TODO Add server side validation

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

	//Check if the email is unique for eliminating duplication
	Users.findOne({ where: { email: email } }).then((token) => {
		//if email doesn't exist in the server
		if (token === null) {
			//Generate a unique id
			const id = helper.uid({ prefix: "IND" });
			//hash the password and store it in the DB
			bcrypt.hash(password, saltRounds, function (err, hash) {
				if (err) throw err;
				Users.create({
					id: id,
					email: email,
					password: hash,
				})
					.then((data) => {
						res.json({ message: "success" });
					})
					.catch((err) => console.log(err));
			});
		} else {
			console.log(token);
			res.json({ message: "duplication" });
		}
	});
});

//Login Endpoint
app.post("/userlogin", (req, res) => {
	const email = req.body.email;
	const pwd = req.body.password;

	//Check if account exists
	Users.findOne({
		where: { email: email },
		attributes: ["email", "password"],
	})
		.then((response) => {
			//if account exists
			if (response !== null) {
				const userData = response.dataValues;

				bcrypt.compare(pwd, userData.password).then((result) => {
					res.json({ message: result });
				});
			}
			//account doesn't exist
			else {
				res.json({ message: "Unavailable" });
			}
		})
		.catch((err) => console.log(err));
});

app.listen(process.env.PORT || 8080, () => console.log("Server is running"));
