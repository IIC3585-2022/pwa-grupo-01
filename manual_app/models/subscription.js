'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  subscription.init({
    endpoint: DataTypes.STRING,
    expirationTime: DataTypes.STRING,
    keys_auth: DataTypes.STRING,
    keys_p256dh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subscription',
  });
  return subscription;
};