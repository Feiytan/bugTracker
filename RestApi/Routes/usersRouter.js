const express = require('express')
const globalController = require('../Controllers/globalController')
const getLocals = require('../Middleware/locals')

const router = express.Router()

router.get('/', getLocals.getUserLocals, globalController.getAll)

router.get('/:id', getLocals.getUserLocals, globalController.getById)

router.delete('/:id', getLocals.getUserLocals, globalController.delete)

router.post('/', getLocals.getUserLocals, globalController.create)

router.patch('/:id', getLocals.getUserLocals, globalController.patch)

module.exports = router