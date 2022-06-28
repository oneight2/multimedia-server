'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    password: { type: DataTypes.TEXT, allowNull: false },
    profile: DataTypes.JSON,
    active: DataTypes.BOOLEAN,
    role_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'role', key: 'id' } },
    departement_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'departement', key: 'id' } },
    createdBy: DataTypes.JSON,
    updatedBy: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};