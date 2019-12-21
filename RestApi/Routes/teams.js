const express = require('express')
const userController = require('../Controllers/teamController')

const router = express.Router()

router.get('/', userController.getAllTeams)

router.get('/:id', userController.getTeamById)

router.delete('/:id', userController.deleteTeam)

router.post('/', userController.createTeam)

router.patch('/:id', userController.patchTeam)

module.exports = router