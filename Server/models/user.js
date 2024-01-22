    'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    email:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Email can not be Null !"},
        notEmpty : {msg : "Email can not be Empty !"},
        isEmail : {msg : "Wrong Email Format !"}
      }
    },
    password:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Password can not be Null !"},
        notEmpty : {msg : "Password can not be Empty !"}
      }
    },
      type:{
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          notNull : {msg : "Type can not be Null !"},
          notEmpty : {msg : "Type can not be Empty !"}
        } 
    },
    status:{
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {msg : "Status can not be Null !"},
        notEmpty : {msg : "Status can not be Empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName:'users'
  });
  return user;
};