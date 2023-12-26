'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stud_courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student:{
        type:Sequelize.INTEGER,
        references : {model:"registration",key:"id"}
      },
      course:{
        type:Sequelize.INTEGER,
        references : {model:"courses",key:"id"}
      },
      total_fees: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      rem_fees: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable('stud_courses');
  }
};