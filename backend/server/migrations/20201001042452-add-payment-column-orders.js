"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		try {
			await Promise.all([
				queryInterface.addColumn("Orders", "payment_id", {
					type: Sequelize.STRING,
					unique: true,
				}),
				queryInterface.addColumn("Orders", "payment_status", {
					type: Sequelize.BOOLEAN,
				}),
				queryInterface.addColumn("Orders", "passenger_details", {
					type: Sequelize.JSON,
				}),
			]);
		} catch (error) {
			console.log("Error",error);
		}
	},

	down: async (queryInterface, Sequelize) => {
		try {
			await Promise.all([
				queryInterface.removeColumn("Orders", "payment_id"),
				queryInterface.removeColumn("Orders", "payment_status"),
				queryInterface.removeColumn("Orders", "passenger_details"),
			]);
		} catch (error) {
			console.log("Error",error);
		}
	},
};
