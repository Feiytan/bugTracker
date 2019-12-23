const express = require('express')
const globalController = require('../Controllers/globalController')
const getLocals = require('../Middleware/locals')

const router = express.Router()

router.get('/', getLocals.getCommentLocals, globalController.getAll)

router.get('/:id', getLocals.getCommentLocals, globalController.getById)

router.delete('/:id', getLocals.getCommentLocals, globalController.delete)

router.post('/', getLocals.getCommentLocals, globalController.create)

router.patch('/:id', getLocals.getCommentLocals, globalController.patch)


module.exports = router