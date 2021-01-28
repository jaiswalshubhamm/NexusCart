import { Router } from 'express';
import { getOrders, getMineOrder, createOrder, getOrder, updatePayStatus, deleteOrder, updateDeliveryStatus } from '../controllers/orderController';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils';

const orderRouter = Router();

orderRouter.get('/', isAuth, isSellerOrAdmin, getOrders);
orderRouter.get('/mine', isAuth, getMineOrder);
orderRouter.post('/', isAuth, createOrder);
orderRouter.get('/:id', isAuth, getOrder);
orderRouter.put('/:id/pay', isAuth, updatePayStatus);
orderRouter.delete('/:id', isAuth, isAdmin, deleteOrder);
orderRouter.put('/:id/deliver', isAuth, isAdmin, updateDeliveryStatus);

export default orderRouter;