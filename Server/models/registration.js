'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {

    static associate(models) {
        Registration.belongsTo(models.Enquiry,
          { foreignKey: 'enq_no' })
      Registration.belongsTo(models.Course,
        { foreignKey: 'crs_id' })
    Registration.belongsTo(models.Counsellor,
      { foreignKey: 'co_id' })
  }
  }
  Registration.init({
    reg_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Registration no. Cannot be Null !" },
        notEmpty: { msg: "Registration no. Cannot be Empty !" }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Registration Date Cannot be Null !" },
        notEmpty: { msg: "Registration Date Cannot be Empty !" }
      }
    },
    stud_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Student Name Cannot be Null !" },
        notEmpty: { msg: "Student Name Cannot be Empty !" }
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
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Gender Cannot be Null !" },
        notEmpty: { msg: "Gender Cannot be Empty !" }
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Mobile Number Cannot be Null !" },
        notEmpty: { msg: "Mobile Number Cannot be Empty !" }
      }
    },
    p_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Parent Name Cannot be Null !" },
        notEmpty: { msg: "Parent Name Cannot be Empty !" }
      }
    },
    p_mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Parent Number Cannot be Null !" },
        notEmpty: { msg: "Parent Number Cannot be Empty !" }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Address Cannot be Null !" },
        notEmpty: { msg: "Address Cannot be Empty !" }
      }
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Qualification Cannot be Null !" },
        notEmpty: { msg: "Qualification Cannot be Empty !" }
      }
    },
    status:{
      type: DataTypes.BOOLEAN,
    allowNull:false,
    validate: {
      notNull: { msg: "Status Cannot be Null !" },
      notEmpty: { msg: "Status Cannot be Empty !" }
    }
    },

  },
    {
      sequelize,
      modelName: 'Registration',
      tableName: 'registration'
    });
  return Registration;
};