'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    image: DataTypes.STRING,
    price: DataTypes.FLOAT,
  }, {});
  OrderItem.associate = function (models) {
    // associations can be defined here
    models.OrderItem.belongsTo(models.Order, { as: 'order', foreignKey: 'orderId', onDelete: 'CASCADE' });
    models.OrderItem.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' });
  };
  return OrderItem;
};