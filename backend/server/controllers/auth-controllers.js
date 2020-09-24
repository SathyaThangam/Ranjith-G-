const {
	uid,
	sendResponseWithAuthCookies,
	validateEmail,
	compareHash,
	generateHash,
	validatePassword,
} = require("../helpers/helpers");
const { getUserByEmail, createNewUser } = require("../helpers/DB-helper");

exports.userLogin = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (validateEmail(email) && validatePassword(password)) {
		//Check if account exists
		getUserByEmail(email).then((User) => {
			//if account exists
			if (User !== null) {
				const userData = User.dataValues;
				const tokenData = {
					id: userData.id,
					email: userData.email,
				};
				compareHash(password, userData.password)
					.then((result) => {
						sendResponseWithAuthCookies(res, tokenData, result);
					})
					.catch((err) => console.log(err));
			}
			//account doesn't exist
			else {
				res.json({ message: "Unavailable" });
			}
		});
	} else {
		res.json({ message: "Invalid" });
	}
};

exports.userSignup = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (validateEmail(email) && validatePassword(password)) {
		//Check if the email is unique for eliminating duplication
		getUserByEmail(email).then((token) => {
			//if email doesn't exist in the server
			if (token === null) {
				//Generate a unique id
				const id = uid({ prefix: "IND" });
				//hash the password and store it in the DB
				const userData = { id: id, email };

				generateHash(password).then((hash) => {
					createNewUser({
						id: id,
						email: email,
						password: hash,
					})
						.then(() => {
							sendResponseWithAuthCookies(
								res,
								userData,
								"success"
							);
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
};

exports.userLogOut = (req, res) => {
	res.cookie("token", "", { httpOnly: true, maxAge: 0 });
	res.sendStatus(200);
};
