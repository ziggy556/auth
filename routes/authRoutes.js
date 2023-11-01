const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

router.get('/signup',authControllers.signup_get);

router.get('/login',authControllers.login_get);

router.get('/logout',authControllers.logout_get);

router.post('/signup',authControllers.signup_post);

router.post('/login',authControllers.login_post);

module.exports = router;