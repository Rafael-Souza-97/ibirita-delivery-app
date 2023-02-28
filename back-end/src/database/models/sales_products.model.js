'use strict';

module.exports = (sequelize, DataTypes) => {
  const salesProductsModel = sequelize.define('Sales_Product', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
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
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: salesProductsModel,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  }

  return salesProductsModel;
}
