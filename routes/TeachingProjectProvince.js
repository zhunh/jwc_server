const express = require('express');
const router = express.Router();
const TPP = require('../models/TeachingProjectProvince')
const button = require('../middlewares/existCheck')
const auth = require("../middlewares/auth")
let R = require('../config/formatResponse')
// 添加
router.get("/addTestData", (req, res) => {
    let tpp = new TPP({
        // major_name
        major_name: "区块链",
        major_code: "123",
        teaching_project_province_num: '9',
        year: '2018',
        post_time: '2019-11-15',
        poster: 'zhu',
        remarks: 'testadd'
    });
    tpp.save().then((re) => {
        res.json(R.sucRes01(re))
    }).catch(err => {
        res.json(R.errRes(err))
    })
});
// 添加
router.post("/add", auth, button.tpCheckExist, (req, res) => {
    let er = new TPP({
        ...req.body
    })
    console.log(er)
    er.save().then((re) => {
        res.json(R.sucRes03("省级教研项目添加成功"))
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
    let total = await TPP.find(queryCondition).count()
    console.log(total);

    // data 是查询出来的数据，是数组格式
    let datas = await TPP.find(queryCondition).skip(skipNum).limit(pageSize)
    res.send(R.sucRes01({
        total: total,
        result: datas
    }))
})
// 修改
router.post('/update', auth, (req, res) => {
    let doc = req.body
    TPP.updateOne({
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
    TPP.deleteOne({
        _id: id
    }).then(re => {
        res.json(R.sucRes03('删除成功'))
    }).catch(err => {
        res.send(R.errRes(err))
    })
})
module.exports = router