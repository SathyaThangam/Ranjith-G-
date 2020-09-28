'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buses.hasOne(models.Routes);
    }
  };
  Buses.init(
		{
			bus_id: {
				type: DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			num_of_seats: DataTypes.INTEGER,
			bus_name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Buses",
		}
  );
  return Buses;
};