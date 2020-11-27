import {
	compareHash,
	generateAccessToken,
	generateHash,
} from "../utils/auth-utils.js";

import UserDetails from "../models/UserDetails.js";

const getUser = async (email) => {
	try {
		return await UserDetails.findOne({ email });
	} catch (error) {
		console.log("error");
	}
};

const signUpController = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const doesUserExist = await getUser(email);

		if (doesUserExist) {
			res.sendStatus(403);
		} else {
			const hash = await generateHash(password);
			const user = new UserDetails({ email, password: hash });
			const saveUser = await UserDetails.create(user);
			if (saveUser) {
				const token = generateAccessToken({ email });
				res.status(200).send({ token });
			}
		}
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
};

const loginController = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await getUser(email);

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

const logOutController = (req, res) => {};

export { signUpController, loginController, logOutController };
