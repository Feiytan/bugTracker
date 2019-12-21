const express = require('express')
const userController = require('../Controllers/userController')

const router = express.Router()

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getUserById)

router.delete('/:id', userController.deleteUser)

router.post('/', userController.createUser)

router.patch('/:id', userController.patchUser)

module.exports = router