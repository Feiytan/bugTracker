exports.getUserLocals = function(req, res, next) {
    req.locals = {
        tableName: 'Users',
        idName: 'User_id',
        validKeys: ['email', 'password', 'pseudo'],
        getDto: function(user) {
            return {
                id: user.User_id,
                pseudo: user.Pseudo,
                email: user.Email
            }
        }
    }
    next()
}

exports.getTeamLocals = function(req, res, next) {
    req.locals = {
        tableName: 'Teams',
        idName: 'Team_id',
        validKeys: ['name'],
        getDto: function(user) {
            return user
        }
    }
    next()
}

exports.getRoomLocals = function(req, res, next) {
    req.locals = {
        tableName: 'Rooms',
        idName: 'Room_id',
        validKeys: ['team_id', 'name'],
        getDto: function(room) {
            return room
        }
    }
    next()
}

exports.getRoomLocals = function(req, res, next) {
    req.locals = {
        tableName: 'Rooms',
        idName: 'Room_id',
        validKeys: ['team_id', 'name'],
        getDto: function(room) {
            return room
        }
    }
    next()
}

exports.getTicketLocals = function(req, res, next) {
    req.locals = {
        tableName: 'Tickets',
        idName: 'Ticket_id',
        validKeys: ['title', 'content', 'status', 'user_id', 'room_id'],
        getDto: function(ticket) {
            return ticket
        }
    }
    next()
}

exports.getTicketLocals = function(req, res, next) {
    req.locals = {
        tableName: 'Tickets',
        idName: 'Ticket_id',
        validKeys: ['title', 'content', 'status', 'user_id', 'room_id'],
        getDto: function(ticket) {
            return ticket
        }
    }
    next()
}

exports.getCommentLocals = function(req, res, next) {
    req.locals = {
        tableName: 'Comments',
        idName: 'Comment_id',
        validKeys: ['user_id', 'ticket_id', 'content'],
        getDto: function(ticket) {
            return ticket
        }
    }
    next()
}