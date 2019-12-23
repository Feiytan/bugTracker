const express = require('express')
const globalController = require('../Controllers/globalController')
const userController = require('../Controllers/userController')
const getLocals = require('../Middleware/locals')
const cryptPassword = require('../Middleware/bcrypt')

const router = express.Router()

router.get('/', getLocals.getUserLocals, globalController.getAll)

router.get('/:id', getLocals.getUserLocals, globalController.getById)

router.delete('/:id', getLocals.getUserLocals, globalController.delete)

router.post('/', cryptPassword, getLocals.getUserLocals, userController.signup)

router.post('/login', getLocals.getUserLocals, userController.login)

router.patch('/:id', getLocals.getUserLocals, globalController.patch)

module.exports = router