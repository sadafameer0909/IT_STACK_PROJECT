'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {

    static associate(models) {
      Batch.belongsTo(models.Course,
        { foreignKey: "course" })
      Batch.belongsTo(models.Faculty,
        { foreignKey: "faculty" })
      // Batch.belongsTo(models.StudBatch,
      //   { foreignKey: "student" })
    }
  }
  Batch.init({
    start_date: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Start Date can not be Null !"},
        notEmpty:{msg:"Start Date can not be Empty !"}
      }
    },
    batch_timing: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Batch Timming can not be Null !"},
        notEmpty:{msg:"Batch Timming can not be Empty !"}
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"Status can not be Null !"},
        notEmpty:{msg:"Status can not be Empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Batch',
    tableName: "batches"
  });
  return Batch;
};