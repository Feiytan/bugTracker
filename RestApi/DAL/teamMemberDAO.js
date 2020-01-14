const pool = require('../Config/mysql')

exports.isAdminInTeam = function(team_id, user_id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT Profile FROM TeamMembers WHERE User_id = ? AND Team_id = ?"
        pool.query(sql, [user_id, team_id], (error, response) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                if (response.length > 0) {
                    if (response[0].Profile === 'admin') {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                } else {
                    resolve(false)
                }
            }

        })
    })
}

exports.addMemberToTeam = function(team_id, user_id, profile) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO TeamMembers (Team_id, user_id, profile) VALUES (?, ?, ?)"
        pool.query(sql, [team_id, user_id, profile], (error, response) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(response)
            }
        })
    })
}

exports.delete = function(team_id, user_id) {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM TeamMembers WHERE Team_id = ? AND User_id = ?"
        pool.query(sql, [team_id, user_id], (error, response) => {
            if (error) {
                reject({ status: 500, errorContent: { message: error.sqlMessage } })
            } else {
                resolve(response)
            }
        })
    })
}