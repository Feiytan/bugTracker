const pool = require('../Config/mysql')

exports.createUser = function(values) {
    return new Promise((resolve, reject) => {
        sql = "INSERT INTO Users (Email, Password, Pseudo) VALUES (?, ?, ?)"
        pool.query(sql, values, (error, res) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(res)
            }
        })
    })
}

exports.getUsersThatMatch = function(pseudo) {
    return new Promise((resolve, reject) => {
        sql = "SELECT * FROM Users WHERE Pseudo LIKE ?"
        pool.query(sql, [pseudo], (error, rows) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(rows)
            }
        })
    })
}