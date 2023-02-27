'use strict';

module.exports = (sequelize, DataTypes) => {
  const productsModel = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    url_image: DataTypes.STRING,
    }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });

  return productsModel;
}
