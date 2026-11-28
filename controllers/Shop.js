const Product = require('../models/Product');
const Order = require('../models/Order');

exports.index = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                products: products,
                pageTitle: 'Shop',
                path: "/",
                isAuthenticated: req.isLoggedIn
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
                isAuthenticated: req.isLoggedIn
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
                isAuthenticated: req.isLoggedIn
            });
        }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    console.log(req.user)
    req.user
        .populate('cart.items.productId')
        .then(user => {
            res.render('shop/cart', {
                products: user.cart.items,
                pageTitle: 'Cart',
                path: '/cart',
                isAuthenticated: req.isLoggedIn
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
    Order.find({"user.userId": req.user._id})
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                orders: orders,
                pageTitle: 'Orders',
                path: "/orders",
                isAuthenticated: req.isLoggedIn
            });
        })
}


exports.postCartDeleteProducts = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
        .then(result => {
            console.log('Product removed from cart');
            res.redirect('/cart');
        }).catch(err => console.log(err));
}

exports.postCreateOrders = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user =>{ 
            const products = user.cart.items.map(i =>{
                return{quantity: i.quantity, product: {...i.productId._doc}}
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(() => {
            return req.user.clearCart();
        }).then(result=>{
            console.log('Created a new order!')
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}