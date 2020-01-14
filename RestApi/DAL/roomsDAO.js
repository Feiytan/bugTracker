const pool = require('../Config/mysql')

exports.getRooms = function(user_id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Rooms.Name AS 'room_name', Rooms.Room_id AS 'room_id', Teams.Team_id AS 'team_id', Teams.Name AS 'team_name' FROM Rooms INNER JOIN Teams ON Teams.Team_id = Rooms.Team_id INNER JOIN TeamMembers ON TeamMembers.Team_id = Teams.Team_id WHERE TeamMembers.User_id = ? AND Rooms.state = 'active'"
        pool.query(sql, [user_id], (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(result)
            }
        })
    })
}

exports.checkIfUserInRoom = function(user_id, room_id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) AS 'isInRoom' FROM Rooms INNER JOIN Teams ON Teams.Team_id = Rooms.Team_id INNER JOIN TeamMembers ON TeamMembers.Team_id = Teams.Team_id WHERE TeamMembers.User_id = ? AND Rooms.Room_id = ?"
        pool.query(sql, [user_id, room_id], (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(result)
            }
        })
    })
}

exports.getNumberOfTodoInRoom = function(room_id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Tickets INNER JOIN Rooms ON Rooms.Room_id = Tickets.Room_id WHERE Rooms.Room_id = ? AND Tickets.Status = 'todo'"
        pool.query(sql, [room_id], (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(result)
            }
        })
    })
}

exports.setToUnactive = function(room_id) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE Rooms SET state = 'unactive' WHERE Room_id = ?"
        pool.query(sql, [room_id], (error, response) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(response)
            }
        })
    })
}