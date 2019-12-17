var express = require('express');
let jwt = require('jsonwebtoken')
var router = express.Router();
let auth = require('../../middlewares/auth')

let User = require('../../models/User')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUser', (req, res, next) => {
  let userName = req.body.username
  let password = req.body.password
  console.log(req.body);

  let acc = new User({
    username: userName,
    password: password
  })
  acc.save()
    .then(() => {
      //添加成功
      res.send({
        code: 0,
        msg: 'ok'
      })
    })
    .catch(err => {
      res.send({
        code: -1,
        msg: err.message
      })
    })
})
router.post('/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log(req.body);

  let data = await User.findOne({
    username
  })
  if (data) {
    console.log('fing user');

    // 校验密码
    if (data.password == password) {
      console.log('auth sucs');

      // 1.生成一个token令牌
      const token = jwt.sign({
          userId: data._id
        },
        "jwc_token", {
          expiresIn: "1h"
        }
      );
      res.send({
        code: 0,
        msg: "login suc",
        data: {
          userInfo: {
            userId: data._id,
            username: data.username,
          },
          token: token
        }
      })
    } else {
      res.send({
        code: -1,
        msg: '用户名或密码错误'
      })
    }
  }
})
module.exports = router;