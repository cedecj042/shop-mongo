const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');

const ErrorController = require('./controllers/Error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authenticateRoutes = require('./routes/authentication');


const {mongoConnect} = require('./util/database');
const User = require('./models/User');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('6af13a0d0cc2e7641276ebb4')
    .then(user =>{
        req.user = new User(user.name, user.email,null,user.cart,user._id);
        next();
    })
    .catch(err =>{ 
        console.log(err)
    });
})

app.use('/admin', adminRoutes);
app.use('/',authenticateRoutes);
app.use(shopRoutes);

app.use(ErrorController.Get404);


mongoConnect(()=>{
    app.listen(3000);
});