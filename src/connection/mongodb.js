const mongoose = require('mongoose')
const configs = require('dotenv')

configs.config()

const mongoConnection = () => {
  return mongoose.connect(
    process.env.MONGO_CONNECTION_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) throw err
      console.log('Mongo db connected....................')
    }
  )
}

module.exports = mongoConnection
