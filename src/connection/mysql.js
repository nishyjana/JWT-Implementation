const mysql = require('mysql')
const configs = require('dotenv')

configs.config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
})

const mysqlConnection = () => {
  return connection.connect(err => {
    if (err) throw err
    console.log('Successfully Connected to MySql....')
    
  })
}


module.exports = mysqlConnection
