const bcrypt = require('bcrypt')

module.exports = function(req, res, next) {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({ message: 'Can\'t signup' })
        } else {
            req.body.password = hash
            next()
        }
    })
}