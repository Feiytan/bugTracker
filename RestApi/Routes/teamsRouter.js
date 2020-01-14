const express = require('express')
const globalController = require('../Controllers/globalController')
const teamController = require('../Controllers/teamController')
const checkAuth = require('../Middleware/check-auth')
const getLocals = require('../Middleware/locals')

const router = express.Router()

router.get('/', getLocals.getTeamLocals, checkAuth.checkAuth, teamController.getTeamsForUser)

router.get('/:id', getLocals.getTeamLocals, globalController.getById)

router.delete('/:id', getLocals.getTeamLocals, checkAuth.checkAuth, teamController.delete)

router.post('/', getLocals.getTeamLocals, checkAuth.checkAuth, teamController.addNewTeam)

router.patch('/:id', getLocals.getTeamLocals, globalController.patch)


module.exports = router