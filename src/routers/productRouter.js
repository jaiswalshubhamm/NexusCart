import { Router } from 'express';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = Router();

import { getProducts, getCategories, seedProducts, getProduct, createProduct, updateProduct, deleteProduct, createReview } from '../controllers/productController';

productRouter.get('/', getProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/seed', seedProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', isAuth, isAdmin, createProduct);
productRouter.put('/:id', isAuth, isAdmin, updateProduct);
productRouter.delete('/:id', isAuth, isAdmin, deleteProduct);
productRouter.post('/:id/reviews', isAuth, createReview);

export default productRouter;