const teamDAO = require('../DAL/teamDAO')

exports.getTeamsForUser = function(req, res, next) {
    teamDAO.getTeamsForUser(req.locals.id)
        .then(teams => {
            if (teams.length < 1) {
                res.status(404).json({ message: 'No teams' })
            } else {
                let requests = 0
                for (let team of teams) {
                    teamDAO.getOtherMembers(req.locals.id, team.teamId)
                        .then(members => {
                            console.log('get')
                            team.members = members
                            requests++
                            if (requests === teams.length) {
                                return res.status(200).json(teams)
                            }
                        })
                        .catch(error => {
                            return res.status(500).json(error.errorContent)
                        })
                }
            }
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}