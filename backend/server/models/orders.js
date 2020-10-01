"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Orders extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Orders.belongsTo(models.Users,{foreignKey:"user_id"});
			Orders.belongsTo(models.Routes,{foreignKey:"route_id"});
		}
	}
	Orders.init(
		{
			order_id: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			user_id: DataTypes.UUID,
			route_id: DataTypes.UUID,
			payment_id: DataTypes.STRING,
			payment_status: DataTypes.BOOLEAN,
			passenger_details: DataTypes.JSON,
		},
		{
			sequelize,
			modelName: "Orders",
		}
	);
	return Orders;
};
