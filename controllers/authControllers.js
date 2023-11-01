const User = require('../models/User');
const { errorHandler } = require('./errorController');
const jwt = require('jsonwebtoken');

module.exports.signup_get = (req, res) => {
    res.render('signup');
}
const maxAge = 2 * 24 * 60 * 60;
const tokenGenerator = (id) => {
    return jwt.sign({ id }, 'secret_key', {
        expiresIn: maxAge
    });
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({ email, password });
        const token = tokenGenerator(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: newUser._id });

    } catch (err) {
        const error = await errorHandler(err);
        console.log('Error occurred while trying to create User in the DB');
        res.status(400).json({ error });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.logout_get = (req, res) => {
   res.cookie('jwt', '', {maxAge: 1});
   res.redirect('/');
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        if (user) {
            const token = tokenGenerator(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id });
        }
    } catch (err) {
        const error = await errorHandler(err);
        res.status(400).json({error});
    }
}