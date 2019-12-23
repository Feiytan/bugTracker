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

exports.getUserLocals = function(req, res, next) {
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