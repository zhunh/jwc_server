var express = require('express');
var router = express.Router();
const auth = require("../middlewares/auth")
const condition = require('../models/ConditionsOfMajors')

/**
 * 查询所有数据
 * 条件查询:
 * pageSize  每页个数，作为查询条件
 * total     总数，作为响应
 * currentPage 当前页，作为查询条件
 */
router.get('/query', auth, async (req, res, next) => {
    console.log(req.query);
    let pageSize = parseInt(req.query.pageSize)
    let currentPage = parseInt(req.query.currentPage)
    let skipNum = pageSize * (currentPage - 1)
    let total = await condition.find().count()
    // data 是查询出来的数据，是数组格式
    //let data = await condition.find().skip(skipNum).limit(pageSize)
    let data = await condition.aggregate([
        //年份限制 2019
        {
            $match: {
                year: "2019"
            }
        },
        //专业限制 
        // {$match: {major_name:"土木工程"}},
        //设置输出结构
        {
            $project: {
                _id: 0,
                post_time: 0,
                poster: 0,
                remarks: 0,
                __v: 0
            }
        },
        // 和就业率连表
        {
            $lookup: {
                'from': 'employment_rate',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'er'
            }
        },
        //数组（已知只有一个元素）拆解为一个对象
        {
            $unwind: '$er'
        },
        // 限制就业率统计的年份
        {
            $match: {
                'er.year': '2017'
            }
        },
        // 设置子文档输出结构
        {
            $project: {
                'er._id': 0,
                'er.employment_count': 0,
                'er.major_code': 0,
                'er.major_name': 0,
                'er.post_time': 0,
                'er.poster': 0,
                'er.remarks': 0,
                'er.__v': 0
            }
        },
        // 和考研率连表
        {
            $lookup: {
                'from': 'postgraduate_rate',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'pr'
            }
        },
        {
            $unwind: '$pr'
        },
        {
            $match: {
                'pr.year': '2017'
            }
        },
        {
            $project: {
                'pr._id': 0,
                'pr.postgraduate_count': 0,
                'pr.major_code': 0,
                'pr.major_name': 0,
                'pr.post_time': 0,
                'pr.poster': 0,
                'pr.remarks': 0,
                'pr.__v': 0
            }
        },
        // 和调剂率连表
        {
            $lookup: {
                'from': 'major_convert_rate',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'mcr'
            }
        },
        {
            $unwind: '$mcr'
        },
        {
            $match: {
                'mcr.year': '2017'
            }
        },
        {
            $project: {
                'mcr._id': 0,
                'mcr.major_convert_count': 0,
                'mcr.major_code': 0,
                'mcr.major_name': 0,
                'mcr.post_time': 0,
                'mcr.poster': 0,
                'mcr.remarks': 0,
                'mcr.__v': 0
            }
        },
        {
            $skip: skipNum
        },
        {
            $limit: pageSize
        }
    ]);
    //对数据处理
    // data.forEach((doc)=>{
    //     doc.faculty = doc.teacher_num
    // })

    // 返回数据
    res.send({
        code: 0,
        msg: 'ok',
        data: {
            total: total,
            result: data
        }
    })
})

module.exports = router;