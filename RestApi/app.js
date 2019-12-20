const express = require('express')
const app = express();

const usersRouter = require('./Routes/Users')

app.use('/users', usersRouter)

app.use((req, res, next) => {
    res.status(500).json({ message: 'No matching endpoints' })
})

module.exports = app