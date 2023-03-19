'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'users', [{
        id: 1,
        name: 'Adam Sandler',
        email: 'sandler_adam@ibirita.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04', //-- senha: md5('--adm2@21!!--')
        role: 'administrator',
      },
      {
        id: 2,
        name: 'Katia Francisca',
        email: 'katia@ibirita.com',
        password: '3c28d2b0881bf46457a853e0b07531c6', //-- senha: md5('fulana@123')
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@gmail.com',
        password: '1c37466c159755ce1fa181bd247cb925', //-- senha: md5('$#zebirita#$')
        role: 'customer',
      }], { timestamps: false });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
