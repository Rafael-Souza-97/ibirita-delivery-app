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
    salesModel.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    salesModel.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  };

  return salesModel;
}
