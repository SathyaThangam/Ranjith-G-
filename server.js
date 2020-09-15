const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();

const helper = require("./helper");

const { Users } = require("./models");
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

app.get("/ping", function (req, res) {
    // return res.send("pong");
    return res.send(helper.uid({prefix:"IND"}));
});

// To serve react file in the same port
// app.get("/*", function (req, res) {
// 	res.sendFile(path.join(__dirname, "build", "index.html"));
// });

isAccountUnique = (email) => {
		Users.findOne({ where: { email: email } })
			.then((token) => token !== null)
			.then((isUnique) => console.log(isUnique));
	// return isIdUnique(email);
};

app.post("/usersignup", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
    const saltRounds = 10;
    

	// if (isAccountUnique(email)) {
	// 	const id = helper.uid({ prefix: "IND" });
	// 	bcrypt.hash(password, saltRounds, function (err, hash) {
	// 		if (err) throw err;
	// 		Users.create({
	// 			idusers: id,
	// 			email: email,
	// 			password: hash,
	// 		})
	// 			.then((data) => {
	// 				console.log(data);
	// 			})
	// 			.catch((err) => console.log(err));
	// 	});
    // }
    isAccountUnique(email);
    // console.log(result);
    res.sendStatus(200);
});

app.post("/userlogin", (req, res) => {
	const email = req.body.email;
	const pwd = req.body.password;

	Users.findOne({
		where: { email: email },
		attributes: ["email", "password"],
	}).then((response) => {
		const userData = response.dataValues;

		bcrypt.compare(pwd, userData.password).then((result) => {
			res.json({ success: result });
		});
	});
});

app.listen(process.env.PORT || 8080);
