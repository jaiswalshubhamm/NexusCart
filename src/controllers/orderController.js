import asyncHandler from "express-async-handler";
import { db } from '../models';

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await db.Order.findAll({
        include: [{
            model: db.User,
            as: 'user',
        }],
    });
    res.send(orders);
});

export const getMineOrder = asyncHandler(async (req, res) => {
    const orders = await db.Order.findAll({ where: { userId: req.user.id } });
    res.send(orders);
});

export const createOrder = asyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const createdOrder = await db.Order.create({
            userId: req.user.id,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            paymentMethod: req.body.paymentMethod,
            shippingName: req.body.shippingAddress.fullName,
            shippingAddress: req.body.shippingAddress.address,
            shippingCity: req.body.shippingAddress.city,
            shippingPostalCode: req.body.shippingAddress.postalCode,
            shippingCountry: req.body.shippingAddress.country,
            shippingLat: req.body.shippingAddress.lat,
            shippingLong: req.body.shippingAddress.long,
            orderItems: req.body.orderItems,
        }, {
            include: [{
                model: db.OrderItem,
                as: 'orderItems',
            }],
        });
        res
            .status(201)
            .send({ message: 'New Order Created', order: createdOrder });
    }
});

export const getOrder = asyncHandler(async (req, res) => {
    const order = await db.Order.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.OrderItem,
            as: 'orderItems',
        }]
    });
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
});

export const updatePayStatus = asyncHandler(async (req, res) => {
    const order = await db.Order.findByPk(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentId = req.body.id;
        order.paymentStatus = req.body.status;
        order.paymentUpdateTime = req.body.update_time;
        order.paymentEmail = req.body.paymentEmail;

        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
});

export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await db.Order.findByPk(req.params.id);
    if (order) {
        const deleteOrder = await order.destroy();
        res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
});

export const updateDeliveryStatus = asyncHandler(async (req, res) => {
    const order = await db.Order.findByPk(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
});