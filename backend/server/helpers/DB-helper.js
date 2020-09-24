const { Users } = require("../models");

exports.getUserByEmail = async (email) => {
	try {
		console.log("email", email);
		return await Users.findOne({
			where: { email: email },
			attributes: ["id", "email", "password"],
		});
	} catch (err) {
		console.log(err);
	}
};

exports.createNewUser = async (userData) => {
	try {
		return await Users.create({userData});
	} catch (err) {
		console.log(err);
	}
};
