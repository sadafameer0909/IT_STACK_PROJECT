'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('admins',[{
    email:'admin@itstack.in',
    mobile:"9876543210",
    password:"admin@9876",
    createdAt: new Date(),
    updatedAt: new Date()

   }]);
  },

  async down (queryInterface, Sequelize) {
 
  }
};
