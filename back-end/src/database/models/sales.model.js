'use strict';

module.exports = (sequelize, DataTypes) => {
  const salesModel = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
    }, {
      sequelize,
      timestamps: false,
      underscored: true,
    });

  salesModel.associate = function(models) {
    salesModel.hasMany(models.Sales_Products, {
      foreignKey: 'userId',
      as: 'user',
    },
    {
      foreignKey: 'sellerId',
      as: 'user',
    });
  };
  return salesModel;
}
