var express = require('express');
var router = express.Router();
const auth = require("../middlewares/auth")
const condition = require('../models/ConditionsOfMajors')
const scoreHelper = require('../helper/scoreHelper')
let funcs = require('../config/formatResponse')
/**
 * 查询所有数据
 * 条件查询:
 * pageSize  每页个数，作为查询条件
 * total     总数，作为响应
 * currentPage 当前页，作为查询条件
 */
// 关键指标
router.get('/query', auth, async (req, res, next) => {
    // console.log(req.query);
    let pageSize = parseInt(req.query.pageSize)
    let currentPage = parseInt(req.query.currentPage)
    let skipNum = pageSize * (currentPage - 1)
    let selectYear = req.query.selectYear
    if (selectYear == 'all') {
        selectYear = /./
    }

    // data 是查询出来的数据，是数组格式
    //let data = await condition.find().skip(skipNum).limit(pageSize)
    var pipeArr = [
        //年份限制 2019
        {
            $match: {
                year: "2018"
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
        // {
        //     $unwind: '$er'
        // },
        // 限制就业率统计的年份
        // {
        //     $match: {
        //         'er.year': '2018'
        //     }
        // },
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
        // 和转出率连表
        {
            $lookup: {
                'from': 'turnout_rate',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'tr'
            }
        },
        // 和学生学科竞赛连表
        {
            $lookup: {
                'from': 'student_course_contest',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'scc'
            }
        },
        // 和学生论文发明专利连表
        {
            $lookup: {
                'from': 'student_paper_patent',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'spp'
            }
        },
        // {
        //     $unwind: '$pr'
        // },
        // {
        //     $match: {
        //         'pr.year': '2018'
        //     }
        // },
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
        // {
        //     $unwind: '$mcr'
        // },
        // {
        //     $match: {
        //         'mcr.year': '2018'
        //     }
        // },
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
        // 和教改论文连表
        {
            $lookup: {
                'from': 'research_paper',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'rp'
            }
        },
        // {
        //     $unwind: '$rp'
        // },
        // {
        //     $match: {
        //         'rp.year': '2018'
        //     }
        // },
        {
            $project: {
                'rp._id': 0,
                'rp.major_code': 0,
                'rp.major_name': 0,
                'rp.post_time': 0,
                'rp.poster': 0,
                'rp.remarks': 0,
                'rp.__v': 0
            }
        },
        // 和主持省级以上教研项目连表
        {
            $lookup: {
                'from': 'teaching_project_province',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'tpp'
            }
        },
        // {
        //     $unwind: '$tpp'
        // },
        // {
        //     $match: {
        //         'tpp.year': '2018'
        //     }
        // },
        {
            $project: {
                'tpp._id': 0,
                'tpp.major_code': 0,
                'tpp.major_name': 0,
                'tpp.post_time': 0,
                'tpp.poster': 0,
                'tpp.remarks': 0,
                'tpp.__v': 0
            }
        },
        // 和主持省级以上教学工程项目连表
        {
            $lookup: {
                'from': 'engineering_project',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'ep'
            }
        },
        {
            $unwind: '$ep'
        },
        {
            $match: {
                'ep.year': '2018'
            }
        },
        {
            $project: {
                'ep._id': 0,
                'ep.major_code': 0,
                'ep.major_name': 0,
                'ep.post_time': 0,
                'ep.poster': 0,
                'ep.remarks': 0,
                'ep.__v': 0
            }
        },
        // 和省级以上教学成果奖连表
        {
            $lookup: {
                'from': 'teaching_award',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'ta'
            }
        },
        {
            $unwind: '$ta'
        },
        {
            $match: {
                'ta.year': '2018'
            }
        },
        // { $skip : 5 },
        // { $limit : 5 }
    ];
    // 先查总记录数
    let total = await condition.aggregate(pipeArr);
    console.log(total.length);
    // 加入条数限制
    pipeArr.push({
        $skip: skipNum
    }, {
        $limit: pageSize
    })
    let data = await condition.aggregate(pipeArr);
    console.log(data.length)
    //对数据处理
    // data.forEach((doc)=>{
    //     doc.faculty = doc.teacher_num
    // })
    // 返回数据
    res.send(funcs.sucRes01({
        total: total.length,
        result: data
    }))
})
// 计分
router.get('/score', auth, async (req, res, next) => {
    let pageSize = parseInt(req.query.pageSize)
    let currentPage = parseInt(req.query.currentPage)
    let skipNum = pageSize * (currentPage - 1)
    let selectYear = req.query.selectYear
    if (selectYear == 'all') {
        selectYear = /./
    }

    // data 是查询出来的数据，是数组格式
    var pipeArr = [
        //年份限制 2018
        {
            $match: {
                year: "2018"
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
        // 和转出率连表
        {
            $lookup: {
                'from': 'turnout_rate',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'tr'
            }
        },
        // 和学生学科竞赛连表
        {
            $lookup: {
                'from': 'student_course_contest',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'scc'
            }
        },
        // 和学生论文发明专利连表
        {
            $lookup: {
                'from': 'student_paper_patent',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'spp'
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
        // 和教改论文连表
        {
            $lookup: {
                'from': 'research_paper',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'rp'
            }
        },
        // {
        //     $unwind: '$rp'
        // },
        // {
        //     $match: {
        //         'rp.year': '2018'
        //     }
        // },
        {
            $project: {
                'rp._id': 0,
                'rp.major_code': 0,
                'rp.major_name': 0,
                'rp.post_time': 0,
                'rp.poster': 0,
                'rp.remarks': 0,
                'rp.__v': 0
            }
        },
        // 和主持省级以上教研项目连表
        {
            $lookup: {
                'from': 'teaching_project_province',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'tpp'
            }
        },
        // {
        //     $unwind: '$tpp'
        // },
        // {
        //     $match: {
        //         'tpp.year': '2018'
        //     }
        // },
        {
            $project: {
                'tpp._id': 0,
                'tpp.major_code': 0,
                'tpp.major_name': 0,
                'tpp.post_time': 0,
                'tpp.poster': 0,
                'tpp.remarks': 0,
                'tpp.__v': 0
            }
        },
        // 和主持省级以上教学工程项目连表
        {
            $lookup: {
                'from': 'engineering_project',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'ep'
            }
        },
        {
            $unwind: '$ep'
        },
        {
            $match: {
                'ep.year': '2018'
            }
        },
        {
            $project: {
                'ep._id': 0,
                'ep.major_code': 0,
                'ep.major_name': 0,
                'ep.post_time': 0,
                'ep.poster': 0,
                'ep.remarks': 0,
                'ep.__v': 0
            }
        },
        // 和省级以上教学成果奖连表
        {
            $lookup: {
                'from': 'teaching_award',
                'localField': 'major_name',
                'foreignField': 'major_name',
                'as': 'ta'
            }
        },
        {
            $unwind: '$ta'
        },
        {
            $match: {
                'ta.year': '2018'
            }
        },
        // { $skip : 5 },
        // { $limit : 5 }
    ];
    // 先查总记录数
    let total = await condition.aggregate(pipeArr);
    console.log(total.length);
    // 加入条数限制
    pipeArr.push({
        $skip: skipNum
    }, {
        $limit: pageSize
    })
    let data = await condition.aggregate(pipeArr);
    console.log(data.length)
    //对数据处理
    let processData = scoreHelper(data)
    // 返回数据
    res.send(funcs.sucRes01({
        total: total.length,
        result: processData
    }))
})
module.exports = router;