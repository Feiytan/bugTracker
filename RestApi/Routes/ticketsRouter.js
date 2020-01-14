const express = require('express')
const globalController = require('../Controllers/globalController')
const ticketsController = require('../Controllers/ticketsController')
const getLocals = require('../Middleware/locals')
const checkAuth = require('../Middleware/check-auth')

const router = express.Router()

router.get('/', getLocals.getTicketLocals, globalController.getAll)

router.get('/:id', getLocals.getTicketLocals, checkAuth.checkAuth, ticketsController.getTicketsForRoom)

router.delete('/:id', getLocals.getTicketLocals, globalController.delete)

router.post('/', getLocals.getTicketLocals, globalController.create)

router.patch('/:id', getLocals.getTicketLocals, globalController.patch)


module.exports = router