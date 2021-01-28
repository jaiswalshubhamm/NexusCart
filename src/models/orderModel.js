'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    itemsPrice: DataTypes.FLOAT,
    shippingPrice: DataTypes.FLOAT,
    taxPrice: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT,
    paymentMethod: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    paymentUpdateTime: DataTypes.STRING,
    paymentEmail: DataTypes.STRING,
    shippingName: DataTypes.STRING,
    shippingAddress: DataTypes.STRING,
    shippingCity: DataTypes.STRING,
    shippingPostalCode: DataTypes.STRING,
    shippingCountry: DataTypes.STRING,
    shippingLat: DataTypes.FLOAT,
    shippingLong: DataTypes.FLOAT,
    isPaid: DataTypes.BOOLEAN,
    paidAt: DataTypes.DATE,
    isDelivered: DataTypes.BOOLEAN,
    deliveredAt: DataTypes.DATE,
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
    models.Order.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    models.Order.hasMany(models.OrderItem, { as: 'orderItems', foreignKey: 'orderId' });
  };
  return Order;
};