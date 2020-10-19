const { Users, Orders, Routes } = require("../models");
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
};

exports.getRouteIDByLocation = async (source, destination) => {
	const whereConstraints =
		destination == null ? { source } : { source, destination };
	try {
		const data = await Routes.findOne({
			where: whereConstraints,
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

exports.getSeatsByRouteID = async (route_id) => {
	console.log(route_id);
	try {
		const passengerData = await Orders.findAll({
			where: {
				route_id,
			},
			attributes: ["passenger_details"],
		});
		if (passengerData) {
			const bookedSeats = [];
			passengerData.forEach((order) => {
				order.passenger_details.forEach((passenger) =>
					bookedSeats.push(passenger.seat)
				);
			});
			return bookedSeats;
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};

exports.updatePaymentStatusByPaymentID = async (payment_id, payment_status) => {
	try {
		return await Orders.update(
			{
				payment_status: payment_status,
			},
			{
				where: {
					payment_id: payment_id,
				},
			}
		);
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
};

exports.getOrderByUser = async (user_id) => {
	try {
		const data = await Orders.findAll({
			where: { user_id: user_id },
			attributes: { exclude: ["createdAt", "updatedAt", "user_id"] },
			raw: true,
		});
		console.log(data);
		return data;
	} catch (err) {
		console.log(err);
		throw new Error("Database connection Error");
	}
};
