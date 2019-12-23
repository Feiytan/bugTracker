const jwt = require('jsonwebtoken')


exports.getJwt = function(payload) {
    return jwt.sign(payload, process.env.JWTSECRET, {
        expiresIn: '1h'
    })
}

exports.verifyJwt = function(jwt) {
    return true
}