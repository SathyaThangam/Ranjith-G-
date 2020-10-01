const { Users,Orders,Routes } = require("../models");
// const {v4:uuidv4} = require("uuid");
exports.getUserByEmail = async (email) => {
	try {
		console.log("email", email);
		return await Users.findOne({
			where: { email: email },
			attributes: ["id", "email", "password"],
		});
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
};

exports.createNewUser = async (userData) => {
	console.log(userData);
	try {
		return await Users.create(userData);
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
};

// 
exports.createNewOrder = async (newOrder) => {
	console.log(newOrder);
	try {
		return await Orders.create(newOrder);
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
}

exports.getRouteIDByLocation = async (source, destination) => {
	try {
		const data = await Routes.findOne({
			where: { source: source, destination: destination },
			attributes: ["route_id"],
		});
		if (data !== null && data.dataValues) {
			return data.dataValues.route_id;
		} else return null;
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
};

exports.updatePaymentStatusByPaymentID = async (payment_id,payment_status) => {
	try {
		return await Orders.update({
			payment_status:payment_status
		},{
			where:{
				payment_id:payment_id
			}
		});
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
}

exports.getOrderByUser = async (user_id) => {
	try {
		const data = await Orders.findOne({
			where: { user_id:user_id },
		});
		if (data !== null && data.dataValues) {
			return data.dataValues;
		} else return null;
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
}