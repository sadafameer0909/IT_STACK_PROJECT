'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: "registration", key: "id" }
      },
      course_id:{
        type: Sequelize.INTEGER,
        references: { model: "courses", key: "id" },
       allowNull:false
      },
      rec_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fees_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        
      },
      rem_amount:{
        type:Sequelize.FLOAT,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fees');
  }
};