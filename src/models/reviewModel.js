'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    comment: DataTypes.STRING,
    rating: DataTypes.FLOAT,
  }, {});
  Review.associate = function (models) {
    // associations can be defined here
    models.Review.belongsTo(models.Product, { as: 'product', foreignKey: 'productId', onDelete: 'CASCADE' });
  };
  return Review;
};