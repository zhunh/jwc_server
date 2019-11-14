const express = require('express');
const router = express.Router();
const PR = require('../models/PostgraduateRate')
const auth = require("../middlewares/auth")
// 添加
router.get("/add", (req, res) => {
    let er = new PR({
        // major_name
        major_name: "区块链",
        major_code: "123",
        postgraduate_count: 19,
        postgraduate_rate: '21%',
        year: '2018',
        post_time: new Date(),
        poster: 'zhu',
        remarks: 'testadd'
    });
    er.save().then((re) => {
        res.json({
            code: 0,
            msg: "ok",
            result: re
        })
    }).catch(err => {
        res.json({
            code: 0,
            msg: err.message
        })
    })
});
// 查询
// router.get('/query', (req, res) => {
//     PR.find().then((data) => {
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
    let total = await PR.find(queryCondition).count()
    console.log(total);

    // data 是查询出来的数据，是数组格式
    let datas = await PR.find(queryCondition).skip(skipNum).limit(pageSize)
    res.send({
        code: 0,
        msg: 'ok',
        data: {
            total: total,
            result: datas
        }
    })
})
module.exports = router;