'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {

    static associate(models) {
      Faculty.belongsTo(models.user,{
        foreignKey : 'Uuser'
      })
    }
  }
  Faculty.init({
    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Faculty Name Cannot be Null !" },
        notEmpty: { msg: "Faculty Name Cannot be Empty !" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Faculty Email Cannot be Null !" },
        isEmail: { msg: "Wrong Email Format !" },
        notEmpty: { msg: "Faculty Email Cannot be Empty !" }
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Faculty Mobile No. Cannot be Null !" },
        notEmpty: { msg: "Faculty Mobile No. Cannot be Empty !" },
        len: {args: [[10, 10]],msg: 'Mobile No. can only be 10 digits'},
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull: false,
      validate: {
        notNull: { msg: "Status Cannot be Null !" },
        notEmpty: { msg: "Status Cannot be Empty !" }
      }
    }
  }, {
    sequelize,
    modelName: 'Faculty',
    tableName: 'faculties'
  });
  return Faculty;
};