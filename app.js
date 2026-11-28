const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const ErrorController = require('./controllers/Error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authenticateRoutes = require('./routes/authentication');

const User = require('./models/User');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findOne()
//         .select('-password')
//         .then(user => {
//             if (!user) {
//                 return next(new Error('No user exists in the database'));
//             }
//             req.user = user;
//             next();
//         })
//         .catch(err => {
//             console.log(err)
//         });
// })

app.use('/admin', adminRoutes);
app.use('/', authenticateRoutes);
app.use(shopRoutes);

app.use(ErrorController.Get404);


mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.h1pbgxn.mongodb.net/shop?retryWrites=true`)
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => console.log(err));