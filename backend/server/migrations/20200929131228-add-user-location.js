"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn("Users", "lat_location", Sequelize.DOUBLE),
			queryInterface.addColumn("Users", "lng_location", Sequelize.DOUBLE),
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn("tableName", "columnName1"),
			queryInterface.removeColumn("tableName", "columnName2"),
		]);
	},
};
