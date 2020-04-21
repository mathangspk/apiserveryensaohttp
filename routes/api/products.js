const express = require('express');
const router = express.Router();
const { productValidation } = require('../../validation')
const verify = require('../verifyToken');
// Order Model
const Product = require('../../models/Product');

//@route GeT api/products
//@desc Get all products
//@access Public
router.get('/', verify, (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then(products => res.json(products));
});
//@route POST api/products
//@desc Create an products
//@access Public
router.post('/', verify, (req, res) => {
    //let validate the data before we a user
    console.log(req.body)
    const { error } = productValidation(req.body);
    console.log(error);
    if (error) return res.status(400).json(error.details[0].message);

    const newProduct = new Product({
        productId: req.body.productId,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        images: req.body.images,
    });
    newProduct.save()
        .then(product => res.json(product))
        .catch(err => 
            //console.log(err.message)
            res.status(400).json(err.errors.productId.message) //gửi lỗi khi trùng productID
            )
        ;
})

//@route DELETE api/orders:id
//@desc delete an orders
//@access Public
router.delete('/:id', verify, (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

//update product
router.patch('/:productId', verify, async (req, res) => {
    try {
        const updateProduct = await Product.updateOne(
            { _id: req.params.productId },
            {
                $set: {
                    productId: req.body.productId,
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    images: req.body.images,
                }
            })
        res.json(updateProduct);
    } catch (err) {
        res.json({ message: err });
    }
})
//get one product by id
router.get('/:id', verify, (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.json(product)
        })
})

module.exports = router;