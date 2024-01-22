'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      crs_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      crs_duration: {
        type: Sequelize.STRING,
        allowNull: false
      },
      crs_fees: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      crs_image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      syllabus: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
    await queryInterface.dropTable('courses');
  }
};