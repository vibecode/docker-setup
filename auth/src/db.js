const mongoose = require('mongoose')
const { db } = require('./config')

module.exports.connectDb = () => {
  mongoose.connect(db, { useNewUrlParser: true })

  return mongoose.connection
}
