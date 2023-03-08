'use strict';

module.exports = (sequelize, DataTypes) => {
  const salesProductsModel = sequelize.define('SalesProducts', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });

  salesProductsModel.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: salesProductsModel,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: salesProductsModel,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  }

  return salesProductsModel;
}
