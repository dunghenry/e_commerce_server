const asyncHandler = require('express-async-handler');
const Product = require('../models/product.model');
class ProductController {
    // static createMovie = asyncHandler(async (req, res) => {
    //     try {
    //         return res.status(200).json({ message: 'Movie created successfully' });
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // });
    static async createProduct(req, res) {
        try {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            return res.status(200).json(savedProduct._doc);
        } catch (error) {
            throw new Error(error);
        }
    }
    static async getAllProduct(req, res) {
        try {
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 5;
            const skip = limit * (page - 1);
            const sort = req.query.sort || '-createdAt';
            const queryObject = { ...req.query };
            const excludedFields = ['page', 'sort', 'limit', 'search'];
            const search = req.query.search || '';
            console.log(search);
            //delete field page sort limit search inside queryObject
            excludedFields.forEach((item) => delete queryObject[item]);
            let queryString = JSON.stringify(queryObject);
            queryString = queryString.replace(
                /\b(gte|gt|lt|lte|regex)\b/g,
                (match) => '$' + match,
            );
            const products = await Product.find({
                ...JSON.parse(queryString),
                name: {
                    $regex: search,
                    $options: 'i',
                },
            })
                .limit(limit)
                .skip(skip)
                .sort(sort);
            return res.status(200).json(products);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ProductController;
