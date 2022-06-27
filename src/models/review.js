'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'UserId'
      }
      );

      Review.belongsTo(models.Viaje, {
        as: 'viaje',
        foreignKey: 'ViajeId'
      }
      );
    }
  }
  Review.init({
    like: DataTypes.BOOLEAN,
    dislike: DataTypes.BOOLEAN,
    criticado: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ViajeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};