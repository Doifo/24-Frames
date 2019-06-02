let express = require('express')
let fs = require('fs')
let Movie = require('./movie')
let User = require('./user')
let formidable = require('formidable')
// let movies = require('./movies')


let router = express.Router()

// function movieSave(){
//     let i = 0
//     for(let movie of movies){
//         const mov = new Movie(movie)
//         mov.save()
//         console.log(i++)    
//     }
// }

// movieSave()

function getId(resolved, rejected) {
  fs.readFile('../static/id.txt', function (err, data) {
    if (err) {
      rejected(err)
    } else {
      resolved(data.toString())
    }
  })
}

function addId(resolved, rejected) {
  let p = new Promise(getId)
  p.then(data => {
    fs.writeFile('../static/id.txt', parseInt(data) + 1, function (err) {
      if (err) {
        rejected(err)
      } else {
        resolved('success')
      }
    })

  })
}


router.post('/login', function (req, res) {
  User.find({
    email: req.body.email,
    password: req.body.password
  }, function (err, ret) {
    if (err) {
      console.log(err)
    } else {
      if (ret.length == 0) {
        res.send('User Not Existed')
      } else {
        res.send('Login Succeed')
      }
    }
  })
})

router.post('/register', function (req, res) {
  User.find({
    email: req.body.email
  }, function (err, ret) {
    if (err) {
      console.log(err)
    } else {
      if (ret.length == 0) {
        let user = new User(req.body)

        user.save(function (err) {
          if (err) {
            console.log('err')
          } else {
            res.send('Succeed')
          }
        })
      } else {
        res.send('User Existed')
      }
    }
  })

})

router.get('/size', function (req, res) {
  Movie.countDocuments(function (err, count) {
    if (err) {
      console.log('error')
    } else {
      res.send(count.toString())
    }
  })
})

router.get('/movies', function (req, res) {
  let skip = (req.query.page - 1) * 6
  //console.log(skip)
  Movie.find(function (err, ret) {
    if (err) {
      console.log('error')
    } else {
      res.send(ret)
    }
  }).skip(skip).limit(6)
})

// router.get('/find', function (req, res) {
//   //console.log(req.query.id)
//   Movie.findById(req.query.id.toString(), function (err, ret) {
//     if (err) {
//       console.log('error')
//     } else {
//       res.send(ret)
//     }
//   })
// })

router.get('/findByTitle', function (req, res) {

  let reg = new RegExp(req.query.title, 'i')
  Movie.find({
    title: reg
  }, function (err, ret) {
    if (err) {
      console.log('error')
    } else {
      res.send(ret)
    }
  })
})

router.post('/upload', function (req, res) {

  var form = new formidable.IncomingForm()
  form.uploadDir = '../static/pic'
  form.keepExtensions = true


  Movie.countDocuments(function (err, count) {
    if (err) {
      console.log('error')
    } else {

      form.parse(req, function (err, fields, files) {
        if (err) {
          console.log('error')
          return
        }

        fields.url = '/static/pic/' + files.pic.path.slice(14)
        fields.id = count + 1;
        console.log(fields)

        let movie = new Movie(fields)
        movie.save(function (err) {
          if (err) {
            console.log(err)
          } else {
            res.send('success')
          }
        })
      })

    }
  })
})

router.post('/upload-article-pic', function (req, res) {
  let p1 = new Promise(addId)
  let p2 = new Promise(getId)

  p1.then(() => {
    return p2
  }).then(data => {
    fs.mkdir('../static/articlePic/'+ data.toString() ,function(err){
      if(err){
        console.log(err)
      }else{
        res.send('success')
      } 
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
