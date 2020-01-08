const jwt = require('jsonwebtoken')

exports.checkAuth = function(req, res, next) {
    if (req.header.Authorization === undefined) {
        return res.status(401).json({ message: "You should send a bearer token" })
    }
    const auth = req.headers.Authorization.split(" ")
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

exports.checkAdminAuth = function(req, res, next) {
    if (req.headers.authorization === undefined) {
        return res.status(401).json({ message: "You should send a bearer token" })
    }
    const auth = req.headers.authorization.split(" ")
    if (auth[0] !== "Bearer") {
        return res.status(401).json({ message: "You should send a bearer token" })
    }
    const decoded = jwt.verify(auth[1], process.env.JWTSECRET, null, (error, decoded) => {
        if (error) {
            return res.status(500).json(error)
        } else {
            console.log(decoded)
            if (decoded.profile === "admin") {
                req.locals = Object.assign({ id: decoded.id }, req.locals)
                next()
            } else {
                res.status(401).json({ message: "You need an admin connection" })
            }

        }
    })
}