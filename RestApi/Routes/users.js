const express = require('express')
const router = express.Router()
const User = require('../Models/user')
const userController = require('../Controllers/UserController')

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getUserById)

router.delete('/:id', userController.deleteUser)

router.post('/', userController.createUser)

router.patch('/:id', userController.patchUser)

module.exports = router