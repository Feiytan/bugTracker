const express = require('express')
const router = express.Router()
const User = require('../Models/User')

router.get('/', (req, res, next) => {
    res.status(200).json(new User('1', 'laurick@gmail.com', 'laurick', 'Laurick'))
})

router.get('/:id', (req, res, next) => {
    res.status(200).json(new User(req.params.id, 'laurick@gmail.com', 'laurick', 'Laurick'))
})

module.exports = router