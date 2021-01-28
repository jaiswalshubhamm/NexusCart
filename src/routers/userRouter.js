import { Router } from 'express';
import { isAuth, isAdmin } from '../utils.js';

const userRouter = Router();

import { topSellers, seedUsers, signIn, register, getUser, updateProfile, getUsers, deleteUser, updateUser, } from '../controllers/userController';

userRouter.get('/top-sellers', topSellers);
userRouter.get('/seed', seedUsers);
userRouter.post('/signin', signIn);
userRouter.post('/register', register);
userRouter.get('/:id', getUser);
userRouter.put('/profile', isAuth, updateProfile);
userRouter.get('/', isAuth, isAdmin, getUsers);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', isAuth, isAdmin, updateUser);

export default userRouter;