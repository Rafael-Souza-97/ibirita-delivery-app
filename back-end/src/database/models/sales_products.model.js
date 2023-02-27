'use strict';

module.exports = (sequelize, DataTypes) => {
  const salesProductsModel = sequelize.define('Sales_Product', {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id',
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      }
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

  salesProductsModel.associate = function(models) {
    salesProductsModel.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'sales',
    });
    salesProductsModel.hasMany(models.Product, {
      foreignKey: 'productId',
      as: 'products',
    })
  };
  return salesProductsModel;
}
