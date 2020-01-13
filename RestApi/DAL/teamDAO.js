const pool = require('../Config/mysql')

exports.getTeamsForUser = function(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Teams.Name AS 'team_name',TeamMembers.Profile AS 'profile', Teams.Team_id AS 'team_id' FROM TeamMembers INNER JOIN Users ON TeamMembers.User_id = Users.User_id INNER JOIN Teams ON Teams.Team_id = TeamMembers.Team_id WHERE Users.User_id = ?"
        pool.query(sql, [id], (error, response) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(response)
            }
        })
    })
}

exports.getOtherMembers = function(user_id, team_id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Users.Pseudo AS 'pseudo', TeamMembers.Profile AS 'profile', Users.User_id AS 'user_id' FROM Users INNER JOIN TeamMembers ON Users.User_id = TeamMembers.User_id WHERE TeamMembers.Team_id = ? AND Users.User_id != ?"
        pool.query(sql, [team_id, user_id], (error, response) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(response)
            }
        })
    })
}