let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Do:rgdslykoo6447@web-vujlm.mongodb.net/24Frames?retryWrites=true', {
  useNewUrlParser: true
}).then(response => {
  console.log('connected to mongodb atlas')
}).catch(err => {
  console.log(err)
})

module.exports = mongoose