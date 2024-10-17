const Product = require('../models/product');
const mongoose = require('mongoose')

const ProductModule = {

    GetProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            console.log(`Product - GetProducts : `, error)
            res.status(500).json({ 
                status: `Failed`,
                message: 'GetProducts failed' 
            });
        }
    },

    GetProductById: async (req, res) => {

        const { id } = req.params

        try {
    
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.log(`GetProductById : Invalid product ID `)
                res.status(422).send({ 
                    status: `Unprocessable_Entity`,
                    message: 'Invalid product ID' 
                });
                return 
            }

            const product = await Product.findById(id);

            if (!product) {
                console.log(`GetProductById : product - ${id} is not found`)
                res.status(404).json({ 
                    status: `NOT_FOUND`,
                    message: `Product - ${id} not found`
                });
                return
            }

            res.status(200).json(product);

        } catch (error) {
            console.log(`Product - GetProductById : `, error)
            res.status(500).json({ 
                status: "Failed",
                message: 'GetProductById failed' 
            });
        }
    },

    // 创建新产品
    CreateProduct: async (req, res) => {
        const { name, description, price, imageUrl, stock } = req.body;
        try {

            const product = new Product({
                name,
                description,
                price,
                imageUrl,
                stock,
            });

            await product.save();

            console.log(`product - ${name} create succeed`)

            res.status(201).json(product);
        } catch (error) {
            console.log(`Product - CreateProduct : `, error)
            res.status(500).json({ 
                status: `Failed`,
                message: 'CreateProduct failed' 
            });
        }
    },

    UpdateProduct: async (req, res) => {

        const { name, description, price, imageUrl, stock } = req.body;
        const { id } = req.params

        try {

            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.log(`GetProductById : Invalid product ID `)
                res.status(422).send({ 
                    status: `Unprocessable_Entity`,
                    message: 'Invalid product ID' 
                });
                return 
            }

            const product = await Product.findById(id);
            if (!product) {
                console.log(`UpdateProduct : product - ${id} is unexist`)
                res.status(404).json({ 
                    status: `NOT_FOUND`,
                    message: 'Product not found' 
                });
                return 
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.imageUrl = imageUrl || product.imageUrl;
            product.stock = stock || product.stock;

            await product.save();

            console.log(`Product - ${id} update succeed`)

            res.status(200).json(product);
        } catch (error) {
            console.log(`Product - UpdateProduct - ${id}: `, error)
            res.status(500).json({ 
                status: `Failed`,
                message: 'UpdateProduct failed' 
            });
        }
    },

    DeleteProduct: async (req, res) => {

        const { id } = req.params

        try {

            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.log(`GetProductById : Invalid product ID `)
                res.status(422).send({ 
                    status: `Unprocessable_Entity`,
                    message: 'Invalid product ID' 
                });
                return 
            }

            const product = await Product.findById(id);
            
            if (!product) {
                console.log(`DeleteProduct : product - ${id} is unexist`)
                res.status(404).json({ 
                    status: `NOT_FOUND`,
                    message: 'Product not found' 
                });
                return 
            }

            await product.deleteOne();

            console.log(`Product - ${id} delete succeed`)
            res.status(200).json({ message: 'Product removed' });
        } catch (error) {
            console.log(`Product - DeleteProduct - ${id}: `, error)
            res.status(500).json({ 
                status: `Failed`,
                message: 'DeleteProduct failed' 
            });
        }
    },

}

module.exports = ProductModule;