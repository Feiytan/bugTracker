const teamMemberDAO = require('../DAL/teamMemberDAO')

exports.add = function(req, res, next) {
    console.log('ok')
    teamMemberDAO.addMemberToTeam(req.body.team_id, req.body.user_id, req.body.profile)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}

exports.delete = function(req, res, next) {
    teamMemberDAO.isAdminInTeam(req.params.team_id, req.locals.id)
        .then(isAdmin => {
            if (isAdmin) {
                teamMemberDAO.delete(req.params.team_id, req.params.user_id)
                    .then(response => {
                        return res.status(200).json(response)
                    })
                    .catch(error => {
                        return res.status(500).json(error)
                    })
            } else {
                return res.status(401).json({ message: "You have to be admin in this team to delete a member" })
            }
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}