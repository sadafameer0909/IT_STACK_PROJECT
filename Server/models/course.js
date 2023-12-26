'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {

    static associate(models) {

    }
  }
  Course.init({
    crs_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Course Name Cannot be Null !" },
        notEmpty: { msg: "Course Name Cannot be Empty !" }
      }
    },
    crs_duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Course Duration Cannot be Null !" },
        notEmpty: { msg: "Course Duration Cannot be Empty !" }
      }
    },
    crs_fees: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Course Fees Cannot be Null !" },
        notEmpty: { msg: "Course Fees Cannot be Empty !" }
      }
    },
    crs_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    syllabus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Course Syllabus Cannot be Null !" },
        notEmpty: { msg: "Course Syllabus Cannot be Empty !" }
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
    modelName: 'Course',
    tableName: 'courses'
  });
  return Course;
};