const express = require('express');
const router = express.Router();
const MCR = require('../models/MajorConvertRate')
const button = require('../middlewares/existCheck')
const auth = require("../middlewares/auth")
let R = require('../config/formatResponse')
// 添加
router.get("/addTestData", (req, res) => {
    let er = new MCR({
        // major_name
        major_name: "区块链",
        major_code: "123",
        major_convert_count: 6,
        major_convert_rate: '1.2%',
        year: '2018',
        post_time: new Date(),
        poster: 'zhu',
        remarks: 'testadd'
    });
    er.save().then((re) => {
        res.json(R.sucRes01(re))
    }).catch(err => {
        res.json(R.errRes(err))
    })
});
//添加
router.post("/add", button.mcrCheckExist, (req, res) => {
    let mcr = new MCR({
        ...req.body
    })
    mcr.save().then((re) => {
        res.json(R.sucRes03("调剂率添加成功"))
    }).catch(err => {
        res.json(R.errRes(err))
    });
});
// 查询
// router.get('/query', (req, res) => {
//     MCR.find().then((data) => {
//         res.send({
//             code: 0,
//             msg: 'ok',
//             datas: data
//         })
//     }).catch((err) => {
//         res.send({
//             code: 0,
//             msg: err.message
//         })
//     })
// })
// 分页查询
router.get('/query', auth, async (req, res, next) => {
    // console.log(req.query);
    let obj = {
        'major_name': eval('/' + req.query.key + '/'),
    }
    let pageSize = parseInt(req.query.pageSize)
    let currentPage = parseInt(req.query.currentPage)
    let skipNum = pageSize * (currentPage - 1)
    let selectYear = req.query.selectYear
    let queryCondition = {};
    if (selectYear !== 'all') {
        console.log(selectYear)
        queryCondition.year = selectYear
    }
    if (!req.query.key) {
        // queryCondition = {}
    } else {
        queryCondition.major_name = eval('/' + req.query.key + '/')
        skipNum = 0 //有搜索字段则从第一条开始显示
    }
    console.log(queryCondition)
    let total = await MCR.find(queryCondition).count()
    console.log(total);

    // data 是查询出来的数据，是数组格式
    let datas = await MCR.find(queryCondition).skip(skipNum).limit(pageSize)
    res.send(R.sucRes01({
        total: total,
        result: datas
    }))
})
// 修改
router.post('/update', (req, res) => {
    let doc = req.body
    MCR.updateOne({
        _id: doc._id
    }, doc).then(re => {
        res.send(R.sucRes03('修改成功'))
    }).catch(err => {
        res.send(R.errRes(err))
    })
})
// 删除
router.get('/delete', (req, res) => {
    let id = req.query.id
    MCR.deleteOne({
        _id: id
    }).then(re => {
        res.json(R.sucRes03('删除成功'))
    }).catch(err => {
        res.send(R.errRes(err))
    })
})
module.exports = router;