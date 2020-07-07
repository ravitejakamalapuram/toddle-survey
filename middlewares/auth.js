var jwt = require('jsonwebtoken');
var secretKey = require('../config/app.config.js')._secret;

function getJwtToken(data, expiresIn = '6h') {
    delete data.exp;
    return jwt.sign(data, secretKey, { expiresIn: expiresIn });
}

function isAuthenticated(req, res, next) {
    var token = req.headers['token'] || req.cookies.token;
    // Validating the token recieved from UI 
    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            res.status(500).send({ "error": "Session Expired", "msg": err.message });
        } else {
            // IF the token is about to expire send new token
            var current_time = ((new Date()).getTime()) / 1000;
            if (decoded.exp - (current_time) < 14400) {
                delete decoded.iat;
                delete decoded.exp;
                let new_token = getJwtToken(decoded, '6h');
                res.cookie("token", new_token, { sameSite: true, overwrite: true });
            }
            return next();
        }
    });
}

module.exports = {
    isAuthenticated: isAuthenticated,
    getJwtToken: getJwtToken
};