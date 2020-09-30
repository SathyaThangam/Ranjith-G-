"use strict";

module.exports = {
	// Routes.hasMany(models.Orders);
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.addColumn(
			"Buses", // name of Target model
			"agency_id", // key we are adding
			{
				type: Sequelize.UUID,
				references: {
					model: "Agencies", // name of Source model
					key: "agency_id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return await queryInterface.removeColumn(
			"Buses", // name of Source model
			"agency_id" // key we want to remove
		);
	},
};
