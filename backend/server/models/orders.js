'use strict';
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
      Orders.belongsTo(models.Users);
    }
  };
  Orders.init(
		{
			order_id: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
		},
		{
			sequelize,
			modelName: "Orders",
		}
  );
  return Orders;
};