const globalDAO = require('../DAL/globalDAO')
const helpers = require('../Helpers/helpers')

exports.getAll = function(req, res, next) {
    globalDAO.getAll(req.locals.tableName)
        .then(rows => {
            dtos = rows.map(row => {
                return req.locals.getDto(row)
            })
            res.status(200).json(dtos)
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}

exports.getById = function(req, res, next) {
    globalDAO.get(req.locals.tableName, [
            [req.locals.idName, req.params.id]
        ])
        .then(row => {
            res.status(200).json({
                user: req.locals.getDto(row[0])
            })
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}

exports.delete = function(req, res, next) {
    globalDAO.delete(req.locals.tableName, req.params.id, req.locals.idName)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}

exports.create = function(req, res, next) {
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    if (keys.length < 1) {
        return res.status(412).json({ message: "You should send parameters" })
    }
    const checkkeys = helpers.checkValidKeys(keys, req.locals.validKeys)
    if (checkkeys.result === false) {
        return res.status(412).json({ message: "invalid column name", WrongNames: checkkeys.wrongValues })
    }
    globalDAO.create(req.locals.tableName, keys, values)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}

exports.patch = function(req, res, next) {
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    if (keys.length < 1) {
        return res.status(412).json({ message: "You should send parameters" })
    }
    const checkkeys = helpers.checkValidKeys(keys, req.locals.validKeys)
    if (checkkeys.result === false) {
        return res.status(412).json({ message: "invalid column name", WrongNames: checkkeys.wrongValues })
    }
    globalDAO.patch(req.locals.tableName, keys, values, { idName: req.locals.idName, idValue: req.params.id })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}