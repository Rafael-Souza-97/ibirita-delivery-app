'use strict';

module.exports = (sequelize, DataTypes) => {
  const salesModel = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendente',
    },
    }, {
      sequelize,
      timestamps: false,
      underscored: true,
    });

  salesModel.associate = function(models) {
    salesModel.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    salesModel.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };

  return salesModel;
}
