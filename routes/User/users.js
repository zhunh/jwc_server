var express = require('express');
let jwt = require('jsonwebtoken')
var router = express.Router();
let auth = require('../../middlewares/auth')
let R = require('../../config/formatResponse')
let User = require('../../models/User')
/* 查询用户列表. */
router.get('/query', async function (req, res, next) {
  let userList = await User.find({}, {
    username: 1,
    role: 1,
    school_id: 1,
    remark: 1
  })
  res.json(R.sucRes01({
    data: userList
  }))
});
// 按ID查询
router.get('/queryById', async function (req, res, next) {
  console.log(req.query.id)
  let user = await User.findById(req.query.id)
  res.json(R.sucRes01({
    data: user
  }))
});
// 添加用户
router.post('/add', auth, (req, res, next) => {
  let tmp = req.body
  let acc = new User(tmp)
  acc.save()
    .then(() => {
      //添加成功
      res.send(R.sucRes03("添加成功"))
    })
    .catch(err => {
      res.send(R.errRes(err))
    })
})
// 修改
router.post('/update', auth, (req, res) => {
  let doc = req.body
  User.updateOne({
    _id: doc._id
  }, doc).then(re => {
    res.send(R.sucRes03('修改成功'))
  }).catch(err => {
    res.send(R.errRes(err))
  })
})
// 删除
router.get('/delete', auth, (req, res) => {
  let id = req.query.id
  User.deleteOne({
    _id: id
  }).then(re => {
    res.json(R.sucRes03('删除成功'))
  }).catch(err => {
    res.send(R.errRes(err))
  })
})
// 登录
router.post('/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log(req.body);

  let data = await User.findOne({
    username
  })
  if (data) {
    console.log('the user exist.');
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
      let tmp = {
        userInfo: {
          userId: data._id,
          username: data.username,
          role: data.role
        },
        token: token
      }
      res.send(R.sucRes01(tmp))
    } else {
      res.send(R.errRes02("密码错误"))
    }
  } else {
    res.send(R.errRes02("用户不存在"))
  }
})

module.exports = router;