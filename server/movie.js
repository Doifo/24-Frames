let mongoose = require('./contact')

let Schema = mongoose.Schema

//架构
let movieSchema = new Schema({
  id: Number,
  title: String,
  username:String,
  email:String,
  date: String,
  url: String,
  description: String,
  evaluation: String
})

module.exports = mongoose.model('Movie', movieSchema);
