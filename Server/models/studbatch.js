'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudBatch extends Model {
   
    static associate(models) {
      StudBatch.belongsTo(models.Registration,
        {foreignKey:"student"})
      StudBatch.belongsTo(models.Batch,
        {foreignKey:"batch"})
    }
  }
  StudBatch.init({
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
    modelName: 'StudBatch',
    tableName:"stud_batches"
  });
  return StudBatch;
};