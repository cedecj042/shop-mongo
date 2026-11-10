const Product = require('../../models/Product');

exports.createProducts = (req, res, next) => {
    console.log(req.user)
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: "/admin/products/create",
        editing: false
    });
};

exports.storeProducts = (req, res) => {
    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title,price,desc,imageUrl);
    product.save()
        .then(result => {
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/product', {
                products: products,
                pageTitle: 'Admin Products',
                path: "/admin/products"
            });
        })
        .catch(err => console.log(err));
}

exports.getEditProducts = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            if (!product) {
                res.status(404).redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Admin Edit Products',
                path: "/admin/products/edit",
                editing: editMode,
                product: product,
            })
        }).catch(err => console.log(err))
}

exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const product = new Product(updatedTitle,updatedPrice,updatedDescription,updatedImageUrl,prodId)
    product.save()
    .then(result => {
        console.log('Product Updated');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('Destroy Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        })
}