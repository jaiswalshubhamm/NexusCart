import asyncHandler from "express-async-handler";
import { db } from '../models';
import bcrypt from 'bcryptjs';
import data from '../data';
import { generateToken } from '../utils.js';

export const topSellers = asyncHandler(async (req, res) => {
    const topSellers = await db.User.findAll({
        where: { isSeller: true },
        include: 'seller',
        order: [
            ['seller.rating', 'desc']
        ]
    });
    res.send({ topSellers });
});

export const seedUsers = asyncHandler(async (req, res) => {
    const createdUsers = await db.User.bulkCreate(data.users);
    res.send({ createdUsers });
});

export const signIn = asyncHandler(async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
});

export const register = asyncHandler(async (req, res) => {
    const createdUser = await db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    res.send({
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
    return;
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User Not Fount' });
    }
});

export const updateProfile = asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.user.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
});

export const getUsers = asyncHandler(async (req, res) => {
    const users = await db.User.findAll();
    res.send(users);
});

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        if (user.email === 'admin@gmail.com') {
            res.status(400).send({ message: 'Can not delete Admin User' });
            return;
        }
        const deletedUser = await user.destroy();
        res.send({ message: 'User Deleted', user: deletedUser });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
});

export const updateUser = asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.send({ message: 'User Updated', user: updatedUser });
    } else {
        res.status(404).send({ message: 'User Not Found' });
    }
});