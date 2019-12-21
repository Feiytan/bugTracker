const pool = require('../Config/mysql')

exports.getAllUsers = function(req, res, next) {
    let sql = "SELECT * FROM Users"
    pool.query(sql, (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            res.status(200).json({ users: response, count: response.length })
        }
    })
}

exports.getUserById = function(req, res, next) {
    let sql = "SELECT * FROM Users WHERE User_id = ?"
    pool.query(sql, [req.params.id], (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            if (response.length < 1) {
                res.status(404).json({ message: 'User not found' })
            } else {
                res.status(200).json(response[0])
            }
        }
    })
}

exports.deleteUser = function(req, res, next) {
    let sql = "DELETE FROM Users WHERE User_id = ?"
    pool.query(sql, [req.params.id], (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            res.status(200).json(response)
        }
    })
}

exports.deleteUser = function(req, res, next) {
    let sql = "DELETE FROM Users WHERE User_id = ?"
    pool.query(sql, [req.params.id], (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            res.status(200).json(response)
        }
    })
}

exports.createUser = function(req, res, next) {
    let sql = "INSERT INTO Users (Email, Pseudo, Password) VALUES (?, ?, ?)"
    pool.query(sql, [req.body.email, req.body.pseudo, req.body.password], (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            response.viewNewRow = {
                type: 'GET',
                link: 'http://localhost:' + process.env.PORT + '/users/' + response.insertId
            }
            res.status(200).json(response)
        }
    })
}

exports.patchUser = function(req, res, next) {
    let sql = "UPDATE Users SET"
    console.log(req.body.length)
    if (req.body.length < 1 || req.body.length === undefined) {
        console.log("no body")
        return res.status(500).json({ message: "No params in the body" })
    }
    for (let i = 0; i < req.body.length; i++) {
        sql += " " + req.body[i].paramName + " = '" + req.body[i].value + "'"
        if (i !== req.body.length - 1) {
            sql += ","
        }
    }
    sql += " WHERE User_id = ?"
    pool.query(sql, [req.params.id], (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            response.viewNewRow = {
                type: 'GET',
                link: 'http://localhost:' + process.env.PORT + '/users/' + req.params.id
            }
            res.status(200).json(response)
        }
    })
}