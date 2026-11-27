const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;

    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }

    const updatedCart = { items: updatedCartItems };

    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    })

    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items: []}
    return this.save();
}
module.exports = mongoose.model('User', userSchema);
// const mongoDb = require('mongodb');
// const { getDb } = require('../util/path');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const ObjectId = mongoDb.ObjectId;

// class User {
//     constructor(name, email, password, cart = { items: [] }, id = null) {
//         this.name = name;
//         this.email = email;
//         this.password = password ? password : null;
//         this.cart = cart;
//         this._id = id ? new ObjectId(id) : null;
//     }

//     async save() {
//         const db = getDb();
//         let dbOp;
//         this.password = await bcrypt.hash(this.password, saltRounds);

//         if (this._id) {
//             dbOp = db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: this });
//         }
//         else {
//             dbOp = db.collection('users').insertOne(this);
//         }
//         return dbOp.then(result => {
//             console.log("Created a User");
//         }).catch(err => console.log(err));
//     }

//

//     getCart() {
//         const db = getDb();
//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         })
//         return db.collection('products')
//             .find({ _id: { $in: productIds } })
//             .toArray()
//             .then(products => {
//                 return products.map(product => {
//                     return {
//                         ...product,
//                         quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === product._id.toString();
//                         }).quantity
//                     }
//                 })
//             })
//     }


//     deleteItemFromCart(prodId) {
//         const db = getDb();

//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== prodId.toString();
//         })

//         return db.collection('users').updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: updatedCartItems } } }
//         );
//     }

//     addOrder() {
//         const db = getDb();

//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new ObjectId(this._id),
//                         name: this.name,
//                     }
//                 }
//                 return db.collection('orders').insertOne(order)
//             })
//             .then(result => {
//                 this.cart = { items: [] };

//                 return db.collection('users')
//                     .updateOne(
//                         { _id: new ObjectId(this._id) },
//                         { $set: { cart: { items: [] } } }
//                     );
//             })
//     }

//     getOrders(){
//         const db = getDb();
//         return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users')
//             .findOne({ _id: new ObjectId(userId) })
//             .then(user => {
//                 return user;
//             })
//             .catch(err => console.log(err));
//     }

// }

// module.exports = User;