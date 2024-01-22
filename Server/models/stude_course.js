'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stude_course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
    stude_course.belongsTo(models.Registration,
      {foreignKey:"student"})
    stude_course.belongsTo(models.Course,
      {foreignKey:"course_id"})
  }
  }
  stude_course.init({
    student: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"Student can not be null!"},
        notEmpty:{msg:"Student can not be empty!"}
      }
    
    },
    course_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{msg:"Course id not be null!"},
        notEmpty:{msg:"Course id can not be empty!"}
      }
    },
    total_fees:{
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{msg:"Total Fees not be null!"},
        notEmpty:{msg:"Total Fees can not be empty!"}
      }
    },
    rem_fees:{
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{msg:"Remaining Fees not be null!"},
        notEmpty:{msg:"Remaining Fees can not be empty!"}
      }},
    status:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"Status not be null!"},
        notEmpty:{msg:"Status can not be empty!"}
      }
  }
  }, {
    sequelize,
    modelName: 'stude_course',
    tableName: 'stude_courses'
  });
  return stude_course;
};