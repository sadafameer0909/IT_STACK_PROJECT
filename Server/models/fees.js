'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fees extends Model {
  
    static associate(models) {
      Fees.belongsTo(models.Registration,
        {foreignKey:"student"})
        Fees.belongsTo(models.Course,
          {foreignKey:"course_id"})
  
    }
  }
  Fees.init({
    rec_no: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:"Receipt Number can not be null!"},
        notEmpty:{msg:"Receipt Number can not be Empty!"}
      }
    },
    fees_amount: {
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{msg:"Fees Amount can not be null!"},
        notEmpty:{msg:"Fees Amount can not be Empty!"}
      }
    },
    rem_amount:{
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{msg:"Rem Amount can not be null!"},
        notEmpty:{msg:"Rem Amount can not be Empty!"}
      }
    },
    
    status: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      validate:{
        notNull:{msg:"Status can not be null!"},
        notEmpty:{msg:"Status can not be Empty!"}
      }
    }
  }, {
    sequelize,
    modelName: 'Fees',
    tableName:'fees'
  });
  return Fees;
};