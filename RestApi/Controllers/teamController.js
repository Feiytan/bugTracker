const teamDAO = require('../DAL/teamDAO')
const globalDAO = require('../DAL/globalDAO')
const teamMemberDAO = require('../DAL/teamMemberDAO')
const helpers = require('../Helpers/helpers')

exports.getTeamsForUser = function(req, res, next) {
    teamDAO.getTeamsForUser(req.locals.id)
        .then(teams => {
            if (teams.length < 1) {
                res.status(404).json({ message: 'No teams' })
            } else {
                let requests = 0
                for (let team of teams) {
                    teamDAO.getOtherMembers(req.locals.id, team.team_id)
                        .then(members => {
                            team.members = members
                            requests++
                            if (requests === teams.length) {
                                return res.status(200).json(teams)
                            }
                        })
                        .catch(error => {
                            return res.status(error.status).json(error.errorContent)
                        })
                }
            }
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}

exports.addNewTeam = function(req, res, next) {
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    if (keys.length < 1) {
        return res.status(412).json({ message: "You should send parameters" })
    }
    const checkkeys = helpers.checkValidKeys(keys, req.locals.validKeys)
    if (checkkeys.result === false) {
        return res.status(412).json({ message: "invalid column name", WrongNames: checkkeys.wrongValues })
    }
    globalDAO.create(req.locals.tableName, keys, values)
        .then(result => {
            teamMemberDAO.addMemberToTeam(result.insertId, req.locals.id, 'admin')
                .then(response => {
                    return res.status(200).json({ team_id: result.insertId })
                })
                .catch(error => {
                    return res.status(error.status).json(error.errorContent)
                })
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}

exports.delete = function(req, res, next) {
    teamMemberDAO.isAdminInTeam(req.params.id, req.locals.id)
        .then(isAdmin => {
            if (isAdmin) {
                teamDAO.setToUnactive(req.params.id)
                    .then(response => {
                        return res.status(200).json(response)
                    })
                    .catch(error => {
                        return res.status(error.status).json(error.errorContent)
                    })
            } else {
                return res.status(401).json({ message: "You have to be admin in this team to delete it" })
            }
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}