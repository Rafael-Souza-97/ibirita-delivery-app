'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        type: Sequelize.INTEGER,
        field: 'sale_id',
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        field: 'product_id',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};
