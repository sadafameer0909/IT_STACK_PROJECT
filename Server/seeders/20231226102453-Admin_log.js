'use strict';
const { user } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) { 
    // Insert into users table
     await queryInterface.bulkInsert('users', [{
      email: 'admin@itstack.in',
      password: 'admin@9876',
      type:'admin',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
    const user1 = await user.findOne({ where: { email:'admin@itstack.in'  } });
         // Insert into admins table
         await queryInterface.bulkInsert('admins', [{
          email: 'admin@itstack.in',
          mobile: '9876543210',
          Uuser:user1.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);

   

    // Add more tables as needed

    return Promise.resolve();
  },

  async down(queryInterface, Sequelize) {
    // Add down migration logic if needed
    return Promise.resolve();
  }
};
