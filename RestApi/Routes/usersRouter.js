const express = require('express')
const globalController = require('../Controllers/globalController')
const userController = require('../Controllers/userController')
const getLocals = require('../Middleware/locals')
const cryptPassword = require('../Middleware/bcrypt')
const jwt = require('../Middleware/check-auth')

const router = express.Router()

router.get('/', jwt.checkAuth, getLocals.getUserLocals, userController.getUsers)

router.get('/:id', getLocals.getUserLocals, globalController.getById)

router.delete('/:id', getLocals.getUserLocals, globalController.delete)

router.post('/', cryptPassword, getLocals.getUserLocals, userController.signup)

router.post('/login', getLocals.getUserLocals, userController.login)

router.patch('/:id', getLocals.getUserLocals, globalController.patch)

module.exports = router