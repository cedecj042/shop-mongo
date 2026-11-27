const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        product: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    user: {
        name: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);


// addOrder() {
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