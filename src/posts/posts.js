const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  postName: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  description: {
    type: String,
    required: true,
    min: 3,
    max: 2554
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Posts', PostSchema)
