const express = require('express');
const router = express.Router();
const ER = require('../models/EmploymentRate')
const auth = require("../middlewares/auth")
const button = require('../middlewares/existCheck')
const sql = require("../config/sql")
let R = require('../config/formatResponse')
// 添加测试数据
router.get("/addTestData", (req, res) => {
    let er = new ER({
        // major_name
        major_name: "区块链",
        major_code: "123",
        employment_count: 199,
        employment_rate: '96%',
        year: '2018',
        post_time: new Date(),
        poster: 'zhu',
        remarks: 'testadd'
    });
    er.save().then((re) => {
        res.json(R.sucRes03(re))
    }).catch(err => {
        res.json(R.errRes(err))
    });
});
// 添加
router.post("/add", auth, button.erCheckExist, (req, res) => {
    let er = new ER({
        ...req.body
    })
    er.save().then((re) => {
        res.json(R.sucRes03("就业率添加成功"))
    }).catch(err => {
        res.json(R.errRes(err))
    });
});
// 查询测试
router.get('/querytest', auth, (req, res) => {
    ER.find({
            major_name: '矿物加工工程',
            year: '2016'
        })
        .then((data) => {
            res.send(R.sucRes01(data))
        })
        .catch((err) => {
            res.send(R.errRes(err))
        })
})
/**
 * 查询所有数据
 * 条件查询:
 * pageSize  每页个数，作为查询条件
 * total     总数，作为响应
 * currentPage 当前页，作为查询条件
 */
router.get('/query', auth, async (req, res, next) => {
    let pageSize = parseInt(req.query.pageSize)
    let currentPage = parseInt(req.query.currentPage)
    let selectYear = req.query.selectYear
    let queryCondition = {};
    if (selectYear !== 'all') {
        queryCondition.year = selectYear
    }
    if (req.query.key) {
        queryCondition.major_name = eval('/' + req.query.key + '/')
        currentPage = 1 //有搜索字段则从第一条开始显示
    }
    let total = await sql.queryCount(ER, queryCondition, {})
    // datas 是查询出来的数据，是数组格式
    // let datas = await ER.find(queryCondition).skip(skipNum).limit(pageSize)
    let datas = await sql.pageQuery(ER, queryCondition, {}, pageSize, currentPage)
    res.send(R.sucRes01({
        total: total,
        result: datas
    }))
})
// 修改
router.post('/update', (req, res) => {
    let doc = req.body
    ER.updateOne({
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
    ER.deleteOne({
        _id: id
    }).then(re => {
        res.json(R.sucRes03('删除成功'))
    }).catch(err => {
        res.send(R.errRes(err))
    })
})
module.exports = router;