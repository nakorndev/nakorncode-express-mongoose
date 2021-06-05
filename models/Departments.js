const mongoose = require('mongoose')

// departments -> { _id, name, short }
const schema = new mongoose.Schema({
  name: String,
  short: String
})

module.exports = mongoose.model('Departments', schema)
