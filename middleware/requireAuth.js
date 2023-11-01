const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret_key', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            }
            console.log(decodedToken);
            next();
        });
    }
    else {
        res.redirect('/login');
    }
}

module.exports.checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret_key', async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                console.log(err);
            }
            else {
                console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
            }
        });
    }
    else{
        res.locals.user = null;
    }
    next();
}