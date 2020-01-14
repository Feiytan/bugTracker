const pool = require('../Config/mysql')

exports.getRooms = function(user_id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Rooms.Name AS 'room_name', Rooms.Room_id AS 'room_id', Teams.Team_id AS 'team_id', Teams.Name AS 'team_name' FROM Rooms INNER JOIN Teams ON Teams.Team_id = Rooms.Team_id INNER JOIN TeamMembers ON TeamMembers.Team_id = Teams.Team_id WHERE TeamMembers.User_id = ?"
        pool.query(sql, [user_id], (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(result)
            }
        })
    })
}