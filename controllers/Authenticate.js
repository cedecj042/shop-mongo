const bcrypt = require('bcrypt');

const User = require('../models/User');
const { register, login } = require('../services/authService');

exports.signUp = (req, res, next) => {
    res.render('authenticate/signup', {
        pageTitle: 'Register',
        path: '/signup',
        isAuthenticated: req.isLoggedIn
    })
}

exports.postSignUp = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        await register(name, email, password).then(() => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        });

    } catch (err) {
        if (err.keyPattern?.email) {
            return res.status(409).send("Email is already registered");
        }
        return next(err);
    }
}

exports.getLogin = (req, res, next) => {
    res.render('authenticate/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isLoggedIn
    })
}

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userId = await login(email, password);

        if (!userId) {
            return res.status(401).send('Email or password is incorrect.');
        }

        User.findOne({'_id':userId})
            .select('-password')
            .then(user => {
                if (!user) {
                    return next(new Error('No user exists in the database'));
                }
                req.user = user;
                req.isLoggedIn = true;
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
            });

    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}