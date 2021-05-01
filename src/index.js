const express = require('express')
const app = express()
const mysqlConnection = require('./connection/mysql')
const mongoConnection = require('./connection/mongodb')
const post = require('./routes/postRoute')
const authRoute = require('./routes/authRoute')

mongoConnection()

app.use(express.json())

app.use('/api/user', authRoute)
app.use('/api',post)

app.listen(3000, () =>
  console.log('Server is Running.....................................')
)
