const express = require('express');
const router = express.Router();
const condition = require('../models/ConditionsOfMajors')
const auth = require("../middlewares/auth")

// 添加
router.get("/add", (req, res) => {
    let cd = new condition({
        // major_name
        major_name: "区块链",
        major_code: "123",
        teacher_num: 9,
        student_at_school: 230,
        teacher_of_dr: 3,
        full_professor: 1,
        associate_professor: 2,
        value_of_equipment: 230.12,
        year: '2018',
        post_time: new Date(),
        poster: 'zhu',
        remarks: 'test'
    });
    cd.save().then(() => {
        res.json({
            code: 0,
            msg: "ok"
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
//     condition.find().then((data) => {
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
    let total = await condition.find(queryCondition).count()
    console.log(total);

    // data 是查询出来的数据，是数组格式
    let datas = await condition.find(queryCondition).skip(skipNum).limit(pageSize)
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