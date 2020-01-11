const express = require('express')
const app = express();
const bodyParser = require('body-parser')

const usersRouter = require('./Routes/usersRouter')
const teamsRouter = require('./Routes/teamsRouter')
const roomsRouter = require('./Routes/roomsRouter')
const ticketsRouter = require('./Routes/ticketsRouter')
const commentsRouter = require('./Routes/commentsRouter')

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type')
    next()
})

app.use('/users', usersRouter)
app.use('/teams', teamsRouter)
app.use('/rooms', roomsRouter)
app.use('/tickets', ticketsRouter)
app.use('/comments', commentsRouter)



app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message })
})

module.exports = app