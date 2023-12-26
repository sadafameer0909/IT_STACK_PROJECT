'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    
    static associate(models) {
     
    }
  }
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email Cannot be Null !" },
        notEmpty: { msg: "Email Cannot be Empty !" },
        isEmail: { msg: "Wrong Email Format !" }
      }
    },

    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Phone Number Cannot be Null !" },
        len: {args: [[10, 10]],msg: 'Phone Number can only be 10 digits'},
        notEmpty: { msg: "Phone Number Cannot be Empty !" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password Cannot be Null !" },
        notEmpty: { msg: "Password Cannot be Empty !" }
      }
    }

  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins'
  });
  return Admin;
};