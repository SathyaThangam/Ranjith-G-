"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			"Orders", // name of Target model
			"user_id", // name of the key we're adding
			{
				type: Sequelize.STRING,
				references: {
					model: "Users", // name of Target model
					key: "id", // key in Target model that we're referencing
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			}
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.removeColumn(
			"Orders", // name of Source model
			"user_id" // key we want to remove
		);
	},
};
