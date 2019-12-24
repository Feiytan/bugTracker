const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const auth = req.headers.authorization.split(" ")
    if (auth[0] !== "Bearer") {
        return res.status(401).json({ message: "You should send a bearer token" })
    }
    const decoded = jwt.verify(auth[1], process.env.JWTSECRET, null, (error, decoded) => {
        if (error) {
            return res.status(500).json(error)
        } else {
            req.locals = Object.assign({ id: decoded.id }, req.locals)
            next()
        }
    })
}