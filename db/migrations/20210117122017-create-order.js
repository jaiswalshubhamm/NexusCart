'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      itemsPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      shippingPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      taxPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentId: Sequelize.STRING,
      paymentStatus: Sequelize.STRING,
      paymentUpdateTime: Sequelize.STRING,
      paymentEmail: Sequelize.STRING,
      shippingName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingCity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingPostalCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingLat: Sequelize.FLOAT,
      shippingLong: Sequelize.FLOAT,
      isPaid: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      paidAt: Sequelize.DATE,
      isDelivered: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      deliveredAt: Sequelize.DATE,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};