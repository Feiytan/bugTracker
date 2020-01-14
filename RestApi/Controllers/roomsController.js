const roomsDAO = require('../DAL/roomsDAO')
const globalDAO = require('../DAL/globalDAO')
const teamMemberDAO = require('../DAL/teamMemberDAO')

exports.getRooms = function(req, res, next) {
    roomsDAO.getRooms(req.locals.id)
        .then(rows => {
            return res.status(200).json(rows)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}

exports.delete = function(req, res, next) {
    globalDAO.get(req.locals.tableName, [
            [req.locals.idName, req.params.id]
        ])
        .then(row => {
            const room = req.locals.getDto(row[0])
            teamMemberDAO.isAdminInTeam(room.team_id, req.locals.id)
                .then(isAdminInTeam => {
                    console.log(isAdminInTeam)
                    if (isAdminInTeam) {
                        roomsDAO.setToUnactive(room.room_id)
                            .then(response => {
                                return res.status(200).json(response)
                            })
                            .catch(error => {
                                return res.status(500).json(error)
                            })
                    } else {
                        return res.status(401).json({ message: 'You have to be admin on your team to delete this project' })
                    }
                })
        })
        .catch(error => {
            res.status(error.status).json(error.errorContent)
        })
}