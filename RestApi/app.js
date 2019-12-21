const express = require('express')
const app = express();
const bodyParser = require('body-parser')

const usersRouter = require('./Routes/users')
const teamsRouter = require('./Routes/teams')

app.use(bodyParser.json())

app.use('/users', usersRouter)

app.use('/teams', teamsRouter)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message })
})

module.exports = app