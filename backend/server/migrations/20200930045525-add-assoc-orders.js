"use strict";

module.exports = {
	// Orders.belongsTo(models.Users);
	up: async (queryInterface, Sequelize) => {
		return await queryInterface.addColumn(
			"Orders", // name of Source model
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
		return await queryInterface.removeColumn(
			"Orders", // name of Source model
			"user_id" // key we want to remove
		);
	},
};
