const express = require('express');
const router = express();
const productSchema = require('../models/productModel');
const isLoggedin = require('../middlewares/isLoggedin')

router.get("/", function (req, res) {
    let error = req.flash("error");
    let message = req.flash("message")
    res.render("index", { message, error,  loggedin: false });
  });

router.get('/shop' , isLoggedin , async (req, res) => {
  let products = await productSchema.find();
  res.render('shop', { products });
})

router.get('/cart/:userid' , isLoggedin , (req, res) => {
  res.render('cart');
});

module.exports = router;