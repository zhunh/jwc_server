var express = require('express');
var router = express.Router();
const auth = require("../../middlewares/auth")
var MJ = require('../../models/MajorBasicInfo')
let R = require('../../config/formatResponse')
// 添加
router.get('/addTestData', function (req, res, next) {
    let majorinfo = new MJ({
        post_year: 2019,
        major_code_school: 123,
        major_name_school: '区块链',
        major_name: '区块链',
        major_code: "234",
        code_version: 2018,
        academy: '信息工程',
        academy_code: 22,
        major_start_year: 2017,
        schooling_year: 4,
        schooling_year_max: 6,
        degree_awarding_category: '学士',
        recruit_state: '统招',
        new_yn: '是',
        teachers_yn: '否',
        post_user: 'zhu',
        post_time: '2019-10-31'
    });
    majorinfo.save()
        .then(() => {
            //添加成功
            res.send(R.sucRes02())
        })
        .catch(err => {
            res.send(R.errRes(err))
        })
});
/**
 * 查询所有数据
 * 条件查询:
 * pageSize  每页个数，作为查询条件
 * total     总数，作为响应
 * currentPage 当前页，作为查询条件
 */
router.get('/query', auth, async (req, res, next) => {
    let obj = {
        'major_name': eval('/' + req.query.key + '/'),
    }
    let pageSize = parseInt(req.query.pageSize)
    let currentPage = parseInt(req.query.currentPage)
    let skipNum = pageSize * (currentPage - 1)
    if (!req.query.key) {
        queryCondition = {}
    } else {
        queryCondition = obj
        skipNum = 0 //有搜索字段则从第一条开始显示
    }
    let total = await MJ.find(queryCondition).count()
    // data 是查询出来的数据，是数组格式
    let data = await MJ.find(queryCondition).skip(skipNum).limit(pageSize)
    res.send(R.sucRes01({
        total: total,
        result: data
    }))
})
// 修改专业名称
router.post('/update', function (req, res, next) {
    let id = req.body.id;
    let mjname = req.body.mjname;
    MJ.updateOne({
            _id: id
        }, {
            majorname: mjname
        })
        .then(data => {
            console.log(data);
            res.send(R.sucRes01(data))
        })
        .catch(err => {
            res.send(R.errRes(err))
        });
})
// 删除
router.post('/delete', async (req, res) => {
    // 1.获取要删除条目的id
    let idArray = req.body.ids;
    // console.log(req.body.ids);
    // 2.删除
    if (idArray === undefined || idArray.length == 0) {
        res.send(R.sucRes03('没有要删除的id'));
        return
    }
    for (i = 0; i < idArray.length - 1; i++) {
        if (idArray[i] !== null) {
            result = await MJ.deleteOne({
                _id: idArray[i]
            })
        }
    }
    // idArray.forEach(element => {
    //     if (element != null) {
    //         async () => {
    //             await MJ.deleteOne({
    //                 _id: element
    //             }).catch((err) => {
    //                 console.log(err.message)
    //             })
    //         }
    //     }
    // });
    res.send(R.sucRes03("删除成功"));
    // MJ.deleteOne({
    //         _id: id
    //     })
    //     .then(data => {
    //         console.log(data)
    //         res.send({
    //             code: 0,
    //             msg: data
    //         })
    //     })
    //     .catch(err => {
    //         res.send({
    //             code: -1,
    //             msg: err.message
    //         })
    //     })
});
/**
 * 根据条件删除多条记录
 */
// router.post('/', (req, res) => {
//     MJ.deleteMany()
// });
/**
 * 查询专业数组，作为前端select
 */
router.get('/majorSet', function (req, res, next) {
    MJ.find({}, {
        major_name_school: 1,
        major_code_school: 1
    }).then((re) => {
        res.json(R.sucRes01(re))
    }).catch((err) => {
        res.json(R.errRes(err))
    })
});
/**
 * test
 */
router.post('/po', function (req, res, next) {
    console.log(req.body);
    console.log(req.body.id);
    res.send(R.sucRes02())
});
// 按学院分类，各学院专业数，major_by_academy
router.get('/mba', async (req, res, next) => {
    let pipeArr = [{
            $match: {
                post_year: 2018
            }
        },
        {
            $group: {
                _id: "$academy",
                'academy_count': {
                    $sum: 1
                }
            }
        }
    ]
    let data = await MJ.aggregate(pipeArr)
    res.send(R.sucRes01(data))
})
module.exports = router;