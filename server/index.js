let express = require('express')
let cors = require('cors')
let router = require('./router')
let bodyParser = require('body-parser')
let fs = require('fs')



let app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static',express.static('../dist/static'))

app.use(new cors())
app.use(router)

app.listen(3000,function(){
    console.log('24Frames Running...')
})