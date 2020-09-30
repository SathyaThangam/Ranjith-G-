"use strict";

const { v4: uuidv4 } = require("uuid");
const agencyName = [
	"Volvo travels",
	"Deluxe travels",
	"XYZ travels",
	"FAST travels",
	"ABC travels",
];
const agencyData = agencyName.map((item) => {
	return { agency_id: uuidv4(), agency_name: item };
});
const insertOne = async (queryInterface, item) => {
	try {
		await Promise.all(
			await queryInterface.bulkInsert("Agencies", [
				{
					...item,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			])
		);
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	up: async (queryInterface, Sequelize) => {
		try {
			return Promise.all(
				agencyData.map(
					async (item) => await insertOne(queryInterface, item)
				)
			);
		} catch (error) {
			console.log(error);
		}
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Agencies", null);
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
