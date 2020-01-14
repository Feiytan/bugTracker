const pool = require('../Config/mysql')

exports.getTicketsForRoom = function(room_id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Tickets INNER JOIN Rooms ON Tickets.Room_id = Rooms.Room_id WHERE Rooms.Room_id = ?"
        pool.query(sql, [room_id], (error, result) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(result)
            }
        })
    })
}