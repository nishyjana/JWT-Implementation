const express = require('express')
const app = express()
const mysqlConnection = require('./connection/mysql')
const mongoConnection = require('./connection/mongodb')
const post = require('./routes/post')
const authRoute = require('./routes/auth')

mongoConnection()

app.use(express.json())

app.use('/api/user', authRoute)
app.use('/api/post',post)

app.listen(3000, () =>
  console.log('Server is Running.....................................')
)
