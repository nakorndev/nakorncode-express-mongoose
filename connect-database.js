const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/my-buz', {
  useNewUrlParser: true,    // mongodb connect
  useUnifiedTopology: true, // mongodb
  useCreateIndex: true,     // mongoose create index
  useFindAndModify: false   // mongoose .findOneAndUpdate()
})
