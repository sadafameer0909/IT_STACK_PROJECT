'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudCourse extends Model {
  
    static associate(models) {
    StudCourse.belongsTo(models.Registration,
      {foreignKey:'student'})
    StudCourse.belongsTo(models.Course,
      {foreignKey:'course'})
    }
  }
  StudCourse.init({
    total_fees: {
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{msg:"Total Fees can not be null!"},
        notEmpty:{msg:"Total Fees can not be empty!"}
      }
    },
    rem_fees: {
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{msg:"Remaining Fees can not be null!"},
        notEmpty:{msg:"Remaining Fees can not be empty!"}
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"Status can not be null!"},
        notEmpty:{msg:"Status can not be empty!"}
      }
    }
  }, {
    sequelize,
    modelName: 'StudCourse',
    tableName:"stud_courses"
  });
  return StudCourse;
};