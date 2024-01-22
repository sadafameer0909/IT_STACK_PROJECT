'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stud_batches', {
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
      batch:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: "batches", key: "id" }
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false
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
    await queryInterface.dropTable('stud_batches');
  }
};