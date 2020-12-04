const {
	compareHash,
	generateAccessToken,
	generateHash,
	validateEmail,
} = require("../utils/auth-utils.js");

const UserDetails = require("../models/UserDetails.js");

const getUser = async (email) => {
	try {
		return await UserDetails.findOne({ email });
	} catch (error) {
		console.log("error");
	}
};
exports.signUpController = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	console.log(generateAccessToken);
	try {
		const doesUserExist = await getUser(email);

		if (doesUserExist) {
			res.sendStatus(403);
		} else {
			const hash = await generateHash(password);
			const user = new UserDetails({
				email: email.toLowerCase(),
				password: hash,
			});
			const saveUser = await UserDetails.create(user);
			if (saveUser) {
				const token = generateAccessToken({ email });
				res.status(200).send({ message: "success", token });
			}
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
};

exports.loginController = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await getUser(email.toLowerCase());

		if (user) {
			const isPasswordCorrect = await compareHash(
				password,
				user.password
			);
			if (isPasswordCorrect) {
				const token = generateAccessToken({ email });
				res.status(200).send({ message: "Success", token });
			} else res.sendStatus(403);
		} else {
			res.status(200).send({ message: "Unavailable" });
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};
