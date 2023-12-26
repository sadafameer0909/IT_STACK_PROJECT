'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counsellor extends Model {

    static associate(models) {

    }
  }
  Counsellor.init({
    co_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Counsellor Name Cannot be Null !" },
        notEmpty: { msg: "Counsellor Name Cannot be Empty !" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Counsellor Email Cannot be Null !" },
        isEmail: { msg: "Wrong Email Format !" },
        notEmpty: { msg: "Counsellor Email Cannot be Empty !" }
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Counsellor Phone Number Cannot be Null !" },
        notEmpty: { msg: "Counsellor Phone Number Cannot be Empty !" },
        len: { args: [[10, 10]], msg: 'Phone Number can only be 10 digits' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password Cannot be Null !" },
        notEmpty: { msg: "Password Cannot be Empty !" }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "Status Cannot be Null !" },
        notEmpty: { msg: "Status Cannot be Empty !" }
      }
    }
  }, {
    sequelize,
    modelName: 'Counsellor',
    tableName: 'counsellors'
  });
  return Counsellor;
};