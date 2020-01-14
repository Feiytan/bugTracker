const ticketsDAO = require('../DAL/ticketsDAO')
const roomsDao = require('../DAL/roomsDAO')

exports.getTicketsForRoom = function(req, res, next) {
    roomsDao.checkIfUserInRoom(req.locals.id, req.params.id)
        .then(response => {
            if (response[0].isInRoom === 1) {
                ticketsDAO.getTicketsForRoom(req.params.id)
                    .then(rows => {
                        return res.status(200).json(rows)
                    })
                    .catch(error => {
                        return res.status(500).json(error)
                    })
            } else {
                return res.status(401).json({ message: 'You are not on this team' })
            }
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}