const express = require('express')
const app = express()
const mysqlConnection = require('./connection/mysql')
const mongoConnection = require('./connection/mongodb');

mongoConnection();


const authRoute = require('./routes/auth')

app.use(express.json())

app.use('/api/user', authRoute)

app.listen(3000, () =>
  console.log('Server is Running.....................................')
)
