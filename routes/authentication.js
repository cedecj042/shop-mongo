const express = require('express');

const router = express.Router();

const AuthenticateController = require('../controllers/Authenticate');

router.get('/signup',AuthenticateController.signUp);
router.post('/signup',AuthenticateController.postSignUp);

module.exports = router;