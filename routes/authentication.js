const express = require('express');

const router = express.Router();

const AuthenticateController = require('../controllers/Authenticate');

router.get('/signup',AuthenticateController.signUp);
router.post('/signup',AuthenticateController.postSignUp);
router.get('/login', AuthenticateController.getLogin);
router.post('/login',AuthenticateController.postLogin);

module.exports = router;