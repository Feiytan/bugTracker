const pool = require('../Config/mysql')

exports.getAllTeams = function(req, res, next) {
    let sql = "SELECT * FROM Teams"
    pool.query(sql, (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            res.status(200).json({ users: response, count: response.length })
        }
    })
}

exports.getTeamById = function(req, res, next) {
    let sql = "SELECT * FROM Teams WHERE Team_id = ?"
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

exports.deleteTeam = function(req, res, next) {
    let sql = "DELETE FROM Teams WHERE Team_id = ?"
    pool.query(sql, [req.params.id], (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            res.status(200).json(response)
        }
    })
}

exports.deleteTeam = function(req, res, next) {
    let sql = "DELETE FROM Teams WHERE Team_id = ?"
    pool.query(sql, [req.params.id], (error, response) => {
        if (error) {
            res.status(500).json({ message: error.sqlMessage })
        } else {
            res.status(200).json(response)
        }
    })
}

exports.createTeam = function(req, res, next) {
    let sql = "INSERT INTO Teams (Name) VALUES (?)"
    pool.query(sql, [req.body.name], (error, response) => {
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

exports.patchTeam = function(req, res, next) {
    let sql = "UPDATE Teams SET"
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
    sql += " WHERE Team_id = ?"
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