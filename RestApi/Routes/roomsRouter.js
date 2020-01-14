const express = require('express')
const globalController = require('../Controllers/globalController')
const getLocals = require('../Middleware/locals')
const checkAuth = require('../Middleware/check-auth')
const roomsController = require('../Controllers/roomsController')

const router = express.Router()

router.get('/', getLocals.getRoomLocals, checkAuth.checkAuth, roomsController.getRooms)

router.get('/:id', getLocals.getRoomLocals, globalController.getById)

router.delete('/:id', getLocals.getRoomLocals, globalController.delete)

router.post('/', getLocals.getRoomLocals, globalController.create)

router.patch('/:id', getLocals.getRoomLocals, globalController.patch)


module.exports = router