'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    countInStock: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    numReviews: DataTypes.INTEGER,
  }, {});
  Product.associate = function (models) {
    // associations can be defined here
    models.Product.hasMany(models.OrderItem, { as: 'orderItems', foreignKey: 'productId' });
    models.Product.hasMany(models.Review, { as: 'reviews', foreignKey: 'productId' });
  };
  return Product;
};