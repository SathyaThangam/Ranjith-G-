"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				"Routes",
				"destination_time",
				Sequelize.TIME
			),
			queryInterface.changeColumn("Routes","destination",{type:Sequelize.STRING})
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn("Routes", "destination_time"),
			queryInterface.changeColumn("Routes", "destination", {
				type: Sequelize.TIME,
			}),
		]);
	},
};
