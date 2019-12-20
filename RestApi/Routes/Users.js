const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'list of all users' })
})

router.get('/:id', (req, res, next) => {
    res.status(200).json({ message: 'this user with the id ' + req.params.id })
})

module.exports = router