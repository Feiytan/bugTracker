const pool = require('../Config/mysql')
const helpers = require('../Helpers/helpers')


exports.getAll = function(tableName) {
    return new Promise(function(resolve, reject) {
        sql = "SELECT * FROM " + tableName;
        pool.query(sql, (error, rows) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(rows)
            }
        })
    })
}

exports.get = function(tableName, params) {
    return new Promise((resolve, reject) => {
        if (params.length < 1) {
            reject({ status: 500, errorContent: { message: "You sould have at least 1 param" } })
        }
        let values = []
        let sql = "SELECT * FROM " + tableName + " WHERE "
        for (i = 0; i < params.length; i++) {
            sql += params[i][0] + " = ?"
            if (i < params.length - 1) {
                sql += " AND "
            }
            values.push(params[i][1])
        }
        pool.query(sql, values, (error, rows) => {
            if (error) {
                reject({ status: 500, errorContent: { error } })
            } else {
                if (rows.length < 1) {
                    reject({ status: 404, errorContent: { message: "No row correspond to the parameters you send", parameters: params } })
                }
                resolve(rows)
            }
        })
    })
}

exports.delete = function(tableName, id, idName) {
    return new Promise(function(resolve, reject) {
        sql = "DELETE FROM " + tableName + " WHERE " + idName + " = ?"
        pool.query(sql, [id], (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(result)
            }
        })

    })
}

exports.create = function(tableName, keys, values) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO " + tableName + " ("
        for (let i = 0; i < keys.length; i++) {
            sql += keys[i]
            if (i === keys.length - 1) {
                sql += ") "
            } else {
                sql += ", "
            }
        }
        sql += "VALUES ("
        for (let i = 0; i < keys.length; i++) {
            sql += "?"
            if (i === keys.length - 1) {
                sql += ") "
            } else {
                sql += ", "
            }
        }
        pool.query(sql, values, (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: error })
            } else {
                resolve(result)
            }
        })
    })
}

exports.patch = function(tableName, keys, values, id) {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE " + tableName + " SET "
        for (let i = 0; i < keys.length; i++) {
            sql += keys[i] + " = ?"
            if (i < keys.length - 1) {
                sql += ", "
            }
        }
        values.push(id.idValue)
        sql += " WHERE " + id.idName + " =  ?"
        pool.query(sql, values, (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: error })
            } else {
                resolve(result)
            }
        })
    })
}