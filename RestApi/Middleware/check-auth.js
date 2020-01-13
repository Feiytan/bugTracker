const jwt = require('jsonwebtoken')
const teamMemberDAO = require('../DAL/teamMemberDAO')

exports.checkAuth = function(req, res, next) {
    if (req.headers.authorization === undefined) {
        return res.status(401).json({ message: "You should send a bearer token" })
    }
    const auth = req.headers.authorization.split(" ")
    if (auth[0] !== "Bearer") {
        return res.status(401).json({ message: "You should send a bearer token" })
    }
    jwt.verify(auth[1], process.env.JWTSECRET, null, (error, decoded) => {
        if (error) {
            return res.status(401).json(error)
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

exports.isAdminInTeam = function(req, res, next) {
    teamMemberDAO.isAdminInTeam(req.body.team_id, req.locals.id)
        .then((isadim) => {
            if (isadim) {
                next()
            } else {
                return res.status(401).json({ message: "You need to be admin for that team" })
            }
        })
        .catch(error => {
            return res.status(error.status).json(error.errorContent)
        })
}