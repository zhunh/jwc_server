const express = require('express');
const router = express.Router();
const RP = require('../models/ResearchPaper')
const button = require('../middlewares/existCheck')
const auth = require("../middlewares/auth")
let R = require('../config/formatResponse')
// 添加
router.get("/addTestData", (req, res) => {
    let rp = new RP({
        // major_name
        major_name: "区块链",
        major_code: "123",
        research_paper: '9',
        year: '2018',
        post_time: '2019-11-15',
        poster: 'zhu',
        remarks: 'testadd'
    });
    rp.save().then((re) => {
        res.json(R.sucRes01(re))
    }).catch(err => {
        res.json(R.errRes(err))
    })
});
// 添加
router.post("/add", button.rpCheckExist, (req, res) => {
    let rp = new RP({
        ...req.body
    })
    rp.save().then((re) => {
        res.json(R.sucRes03("教改论文添加成功"))
    }).catch(err => {
        res.json(R.errRes(err))
    });
});
/**
 * 查询所有数据
 * 条件查询:
 * pageSize  每页个数，作为查询条件
 * total     总数，作为响应
 * currentPage 当前页，作为查询条件
 */
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
        queryCondition.year = selectYear
    }
    if (!req.query.key) {
        // queryCondition = {}
    } else {
        queryCondition.major_name = eval('/' + req.query.key + '/')
        skipNum = 0 //有搜索字段则从第一条开始显示
    }
    console.log(queryCondition)
    let total = await RP.find(queryCondition).count()
    console.log(total);

    // data 是查询出来的数据，是数组格式
    let datas = await RP.find(queryCondition).skip(skipNum).limit(pageSize)
    res.send(R.sucRes01({
        total: total,
        result: datas
    }))
})
// 修改
router.post('/update', (req, res) => {
    let doc = req.body
    RP.updateOne({
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
    RP.deleteOne({
        _id: id
    }).then(re => {
        res.json(R.sucRes03('删除成功'))
    }).catch(err => {
        res.send(R.errRes(err))
    })
})
module.exports = router