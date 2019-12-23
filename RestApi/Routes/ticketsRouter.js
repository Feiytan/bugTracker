const express = require('express')
const globalController = require('../Controllers/globalController')
const getLocals = require('../Middleware/locals')

const router = express.Router()

router.get('/', getLocals.getTicketLocals, globalController.getAll)

router.get('/:id', getLocals.getTicketLocals, globalController.getById)

router.delete('/:id', getLocals.getTicketLocals, globalController.delete)

router.post('/', getLocals.getTicketLocals, globalController.create)

router.patch('/:id', getLocals.getTicketLocals, globalController.patch)


module.exports = router