"use strict";
const { Model,Sequelize } = require("sequelize");
// const Buses = require("./buses");
module.exports = (sequelize, DataTypes) => {
	class Agency extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Agency.hasMany(models.Buses,{foreignKey:"agency_id"});
		}
	}
	Agency.init(
		{
			agency_id: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			agency_name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Agency",
		}
	);
	return Agency;
};
