const express = require('express')
const globalController = require('../Controllers/globalController')
const getLocals = require('../Middleware/locals')
const checkAuth = require('../Middleware/check-auth')
const teamMemberController = require('../Controllers/teamMemberController')

const router = express.Router()

router.post('/', checkAuth.checkAuth, checkAuth.isAdminInTeam, teamMemberController.add)
router.delete('/:team_id/:user_id', checkAuth.checkAuth, teamMemberController.delete)

module.exports = router