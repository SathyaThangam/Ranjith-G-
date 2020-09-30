"use strict";


module.exports = {
	// Routes.hasMany(models.Orders);
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.addColumn(
			"Orders", // name of Target model
			"route_id", // key we are adding
			{
				type: Sequelize.UUID,
				references: {
					model: "Routes", // name of Source model
					key: "route_id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return await queryInterface.removeColumn(
			"Orders", // name of Source model
			"route_id" // key we want to remove
		);
	},
};
