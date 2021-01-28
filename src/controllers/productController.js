import asyncHandler from "express-async-handler"
import { db } from '../models';
import data from '../data';

const Op = db.Sequelize.Op;

export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;

    const nameLike = req.query.name || '';
    const name = { [Op.like]: `%${nameLike}%` };

    const category = req.query.category || '';
    // const seller = req.query.seller || '';
    const order = req.query.order || '';

    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const price = { [Op.gte]: min, [Op.lte]: max };

    const ratingRange =
        req.query.rating && Number(req.query.rating) !== 0
            ? Number(req.query.rating)
            : 0;
    const rating = { [Op.gte]: ratingRange };

    const nameFilter = name ? { name } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = (min !== 0) && (max !== 0) ? { price } : {};
    // const sellerFilter = seller ? { seller } : {};
    const ratingFilter = (rating !== 0) ? { rating } : {};
    const sortOrder =
        order === 'lowest'
            ? [['price', 'DESC']]
            : order === 'highest'
                ? [['price', 'ASC']]
                : order === 'toprated'
                    ? [['rating', 'DESC']]
                    : [];
    console.log(sortOrder);
    const products = await db.Product.findAndCountAll({
        where: {
            ...categoryFilter,
            ...nameFilter,
            ...priceFilter,
            ...ratingFilter,
        },
        // order: sortOrder,
        offset: pageSize * (page - 1),
        limit: pageSize,
    })
    const pages = Math.ceil(products.count / pageSize);
    res.send(products.rows, page, pages);
});

export const getCategories = asyncHandler(async (req, res) => {
    await db.Product.findAll({ attributes: ['category'], raw: true, group: ['category'] })
        .then((categories) => {
            res.send(categories);
        })
});

export const seedProducts = asyncHandler(async (req, res) => {
    const products = data.products.map((product) => ({
        ...product,
    }));
    const createdProducts = await db.Product.bulkCreate(products);
    res.send({ createdProducts });
});

export const getProduct = asyncHandler(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, {
        include: [{
            model: db.Review,
            as: 'reviews',
        }],
    });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

export const createProduct = asyncHandler(async (req, res) => {
    const createdProduct = await db.Product.create({
        name: 'Sample name' + Date.now(),
        image: '/image/p1.jpg',
        price: 0,
        category: 'Sample Category',
        brand: 'Sample Brand',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'Sample Description',
    });
    res.send({ message: 'Product Created', product: createdProduct });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await db.Product.findByPk(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id);
    if (product) {
        const deleteProduct = await product.destroy();
        res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

export const createReview = asyncHandler(async (req, res) => {
    const product = await db.Product.findByPk(req.params.id, {
        include: [{
            model: db.Review,
            as: 'reviews',
        }],
    });
    if (product) {
        if (product.reviews.find((x) => x.name === req.user.name)) {
            return res.status(400).send({ message: 'You already submitted a review' });
        }
        const createdReview = await db.Review.create({
            productId: product.id,
            name: req.user.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        });
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
        await product.save();
        res.status(201).send({
            message: 'Review Created',
            review: createdReview,
        });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});