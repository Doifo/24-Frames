let express = require('express')
let fs = require('fs')
let Movie = require('./movie')
let User = require('./user')
let formidable = require('formidable')
let crypto = require('crypto')
let jsonwebtoken = require('jsonwebtoken')

let router = express.Router()

let secretOrPrivateKey = "123456asdfgh"

function cryptoPwd(password) {
  password += password.slice(password.length - 3);
  // console.log(password)
  let md5 = crypto.createHash('md5');
  let result = md5.update(password).digest('hex');
  // console.log('加盐密码的md5值：%s', result);
  return result
}

function getId() {

  let p = new Promise(function (resolved, rejected) {
    fs.readFile('../toSave/id.txt', function (err, data) {
      if (err) {
        rejected("getId error")
      } else {
        resolved(data.toString())
      }
    })
  })

  return p

}

function addId(data) {

  let p = new Promise(function (resolved, rejected) {
    fs.writeFile('../toSave/id.txt', parseInt(data) + 1, function (err) {
      if (err) {
        rejected("addId error")
      } else {
        resolved('add success')
      }
    })
  })

  return p
}

function mkDir(name) {
  let p = new Promise(function (resolved, rejected) {
    fs.mkdir('../toSave/articlePic/' + name, function (err) {
      if (err) {
        rejected("mkDir error")
      } else {
        resolved('../toSave/articlePic/' + name)
      }
    })
  })
  return p
}

function userFind(params) {
  return new Promise((resolved, rejected) => {
    User.find(params, function (err, ret) {
      if (err) {
        rejected('userFind error')
      } else {
        resolved(ret)
      }
    })
  })
}

function userSave(user) {
  return new Promise((resolved, rejected) => {
    user.save(function (err) {
      if (err) {
        rejected('userSave error')
      } else {
        resolved(user)
      }
    })
  })
}

function checkUser({
  email,
  token
}) {
  console.log('email:', email)
  return new Promise(function (resolved, rejected) {
    userFind({
      email: email,
      token: token
    }).then(user => {
      if (user.length > 0) {
        jsonwebtoken.verify(token, secretOrPrivateKey, function (err, decode) {
          if (err) {
            rejected("checkUser error")

          } else {
            resolved('checkUser Pass')
          }
        })
      } else {
        rejected('checkUser error')
      }
    }).catch(err => {
      rejected("checkUser error")
    })
  })

}

router.post('/login', function (req, res) {
  console.log(req.body)
  userFind({
    email: req.body.email,
    password: cryptoPwd(req.body.password)
  }).then(user => {
    if (user.length == 0) {
      res.send({
        message: 'User Not Existed'
      })
    } else {
      let content = {
        email: req.body.email
      }
      let token = jsonwebtoken.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 24
      })
      user[0].token = token

      let usersave = new User(user[0])
      return userSave(usersave)

    }
  }).then(user => {
    res.send({
      message: 'Login Succeed',
      username: user.username,
      token: user.token,
      email: user.email
    })
  }).catch(err => {
    console.log(err)
    res.send({
      message: 'Server Error'
    })
  })

})

router.post('/register', function (req, res) {

  console.log(req.body)
  userFind({
    email: req.body.email
  }).then(user => {
    if (user.length == 0) {
      req.body.password = cryptoPwd(req.body.password)
      let user = new User(req.body)

      return userSave(user)

    } else {
      res.send({
        message: 'User Existed'
      })
    }
  }).then(user => {
    res.send({
      message: 'Register Succeed'
    });
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      message: 'Server Error'
    })
  })

})

router.get('/size', function (req, res) {
  Movie.countDocuments(function (err, count) {
    if (err) {
      console.log('getSize error')
      res.status(500).send({
        message: 'Server Error'
      })
    } else {
      res.send({
        message: "Get Size Succeed",
        size: count.toString()
      })
    }
  })
})

router.get('/movies', function (req, res) {
  let skip = (req.query.page - 1) * 6
  //console.log(skip)
  Movie.find(function (err, ret) {
    if (err) {
      console.log('getMovies error')
      res.status(500).send({
        message: 'Server Error'
      })
    } else {
      res.send({
        data: ret
      })
    }
  }).skip(skip).limit(6)
})

router.get('/findById', function (req, res) {
  //console.log(req.query.id)
  Movie.findById(req.query.id.toString(), function (err, ret) {
    if (err) {
      console.log('findById error')
      res.status(500).send({
        message: 'Server Error'
      })
    } else {
      res.send({
        message: "Get Data Succeed",
        data: ret
      })
    }
  })
})

router.get('/findByTitle', function (req, res) {

  let reg = new RegExp(req.query.title, 'i')
  Movie.find({
    title: reg
  }, function (err, ret) {
    if (err) {
      console.log('findByTitle error')
      res.status(500).send({
        message: 'Server Error'
      })
    } else {
      res.send({
        message: "Get Data Succeed",
        data: ret
      })
    }
  })
})

router.get('/findByEmail', function (req, res) {

  console.log(req.query)
  checkUser(req.query)
    .then(message => {
      return new Promise(function (resolved, rejected) {
        Movie.find({
          email: req.query.email
        }, function (err, ret) {
          if (err) {
            rejected('Find Error')
          } else {
            resolved(ret)
          }
        })
      })
    }).then(ret => {
      res.send({
        message: "Get Data Succeed",
        data: ret
      })
    }).catch(err => {
      console.log(err)
      res.send({
        message: err
      })
    })

})

router.post('/upload', function (req, res) {

  console.log('upload',req.query)
  checkUser(req.query)
    .then(message => {
      console.log(message)
      return getId()
    }).then(count => {
      var form = new formidable.IncomingForm()
      form.uploadDir = '../toSave/pic'
      form.keepExtensions = true
      form.parse(req, function (err, fields, files) {
        if (err) {
          console.log('error')
          return
        }

        fields.url = '/toSave/pic/' + files.pic.path.slice(14)
        fields.id = count;

        let movie = new Movie(fields)
        movie.save(function (err) {
          if (err) {
            console.log(err)
            res.status(500).send({
              message: 'Server Error'
            })
          } else {
            res.send({
              message: 'Upload Succeed'
            })
          }
        })
      })
    }).catch(err => {
      console.log(err)
      res.send({
        message: err
      })
    })

})

router.post('/upload-article-pic', function (req, res) {

  checkUser(req.query)
    .then(message => {
      console.log(message)
      return getId()
    }).then(data => {
      return addId(data)
    }).then(date => {
      console.log(date)
      return getId()
    }).then(data => {
      return mkDir(data)
    }).then(path => {
      console.log('success')
      let returnData = {}
      var form = new formidable.IncomingForm()
      form.uploadDir = path
      form.keepExtensions = true

      form.parse(req, function (err, fields, files) {
        for (let key in files) {
          let path = files[key].path.slice(2)
          path = path.replace(/\\/g, "/")
          returnData[key] = path
        }

        res.send({
          message: 'Upload Pics Succeed',
          data: returnData
        })
      })
    }).catch(err => {
      console.log(err)
      console.log('error')

      res.send({
        message: err
      })
    })



})

router.get('*', function (req, res) {
  fs.readFile('../dist/index.html', function (err, data) {
    if (err) {
      return res.status(500).send('Server Error')
    }

    res.end(data)

  })
})



module.exports = router
