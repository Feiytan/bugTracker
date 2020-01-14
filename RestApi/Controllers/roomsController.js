const roomsDAO = require('../DAL/roomsDAO')

exports.getRooms = function(req, res, next) {
    roomsDAO.getRooms(req.locals.id)
        .then(rows => {
            return res.status(200).json(rows)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}

exports.getNumber = function(req, res, next) {
    roomsDAO.getNumberOfTodoInRoom(room_id)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
}