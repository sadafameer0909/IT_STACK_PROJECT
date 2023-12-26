'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enquiry extends Model {

    static associate(models) {
      Enquiry.belongsTo(models.Course,
        { foreignKey: "course" }
      )
      Enquiry.belongsTo(models.Counsellor,
        { foreignKey: "counsellor" }
      )
    }
  }
  Enquiry.init({
    reg_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Enq no. Cannot be Null !" },
        notEmpty: { msg: "Enq no. Cannot be Empty !" }
      }
    },
    
    enq_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Enquiry Date Cannot be Null !" },
        notEmpty: { msg: "Enquiry Date Cannot be Empty !" }
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
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Mobile Number cannot be Null !" },
        notEmpty: { msg: "Mobile Number Cannot be Empty !" },
        len: {args: [[10, 10]],msg: 'Mobile Number can only be 10 digits'}
      }
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Qualification cannot be Null !" },
        notEmpty: { msg: "Qualification Cannot be Empty !" },
      }
    },
    clg_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "College Name cannot be Null !" },
        notEmpty: { msg: "College Name Cannot be Empty !" },
      }
    },
    fees: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Fees cannot be Null !" },
        notEmpty: { msg: "Fees Cannot be Empty !" },
      }
    },
    placement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: "Placement Detail cannot be Null !" },
        notEmpty: { msg: "Placement Detail Cannot be Empty !" },
      }
    },
    enq_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Enquiry type cannot be Null !" },
        notEmpty: { msg: "Enquiry type Cannot be Empty !" },
      }
    },
    feedback: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate: {
        notNull: { msg: "Status cannot be Null !" },
        notEmpty: { msg: "Status Cannot be Empty !" },
      }
    }
  }, {
    sequelize,
    modelName: 'Enquiry',
    tableName: 'enquiries'
  });
  return Enquiry;
};