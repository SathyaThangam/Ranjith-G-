"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Routes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
      // define association here
      Routes.hasMany(models.Orders);
		}
	}
	Routes.init(
		{
			route_id: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			source: DataTypes.STRING,
			source_time: DataTypes.TIME,
			destination: DataTypes.STRING,
			destination: DataTypes.TIME,
			price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Routes",
		}
	);
	return Routes;
};
