const express = require('express');
const router = express.Router();
const SCC = require('../models/StudentCourseContest')
const button = require('../middlewares/existCheck')
const auth = require("../middlewares/auth")
let R = require('../config/formatResponse')
// 添加
router.get("/addTestData", (req, res) => {
    let rp = new SCC({
        // major_name
        major_name: "区块链",
        major_code: "123",
        student_course_contest: '9',
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
router.post("/add", (req, res) => {
    let scc = new SCC({
        ...req.body
    })
    scc.save().then((re) => {
        res.json(R.sucRes03("学生学科竞赛添加成功"))
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
    let total = await SCC.find(queryCondition).count()
    console.log(total);

    // data 是查询出来的数据，是数组格式
    let datas = await SCC.find(queryCondition).skip(skipNum).limit(pageSize)
    res.send(R.sucRes01({
        total: total,
        result: datas
    }))
})
// 修改
router.post('/update', auth, (req, res) => {
    let doc = req.body
    SCC.updateOne({
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
    SCC.deleteOne({
        _id: id
    }).then(re => {
        res.json(R.sucRes03('删除成功'))
    }).catch(err => {
        res.send(R.errRes(err))
    })
})
module.exports = router