const Product = require('../models/Product')


exports.index = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                products: products,
                pageTitle: 'Shop',
                path: "/",
            });
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                products: products,
                pageTitle: 'Products',
                path: "/products",
            });
        })
        .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            if (!product) {
                return res.status(404).send('Prooduct not found!');
            }
            res.render('shop/product-details', {
                product: product,
                pageTitle: 'Product',
                path: "/product",
            });
        }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            res.render('shop/cart', {
                products: user.cart.items,
                pageTitle: 'Cart',
                path: '/cart'
            });
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        }).then(result => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
}


exports.getOrders = (req, res, next) => {

    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                orders: orders,
                pageTitle: 'Orders',
                path: "/orders",
            });
        })
}


exports.postCartDeleteProducts = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(req.body)
    req.user.removeFromCart(prodId)
        .then(result => {
            console.log('Product removed from cart');
            res.redirect('/cart');
        }).catch(err => console.log(err));
}

exports.postCreateOrders = (req, res, next) => {
    let fetchedCart;
    req.user.addOrder()
        .then(result => {
            console.log('Created a new order!')
            res.redirect('/cart');
        }).catch(err => console.log(err));
}