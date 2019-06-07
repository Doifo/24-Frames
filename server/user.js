let mongoose = require('./contact')

let Schema = mongoose.Schema

//架构
let userSchema = new Schema({
    username:String,
    email:String,
    password:String,
    token:String
})

module.exports = mongoose.model('User', userSchema);
