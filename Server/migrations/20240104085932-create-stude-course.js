'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stude_courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student: {
        type: Sequelize.INTEGER,
        references: { model: 'registration', key: 'id' },
        allowNull:false
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: { model: 'courses', key: 'id' },
        allowNull:false
      },
      total_fees: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      rem_fees: {
        type: Sequelize.FLOAT,
       allowNull:false
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('stude_courses');
  }
};