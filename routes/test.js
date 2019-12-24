const express = require('express');
const ER = require('../models/EmploymentRate')
const db = require('../config/db')
// let er = new ER({
//     "major_name": "区块链",
//     "major_code": "123",
//     "employment_count": 199,
//     "employment_rate": "96%",
//     "year": "2018",
//     "post_time": "Sun Nov 10 2019 11:06:12 GMT+0800 (CST)",
//     "poster": "zhu",
//     "remarks": "testadd"
// })

// ER.find({
//     major_name: er.major_name,
//     year: er.year
// }).then((data) => {
//     if (data.length == 0) {
//         console.log("没有找到记录")
//     } else {
//         console.log("找到记录", data.length, "条")
//     }
// }).catch(err => {
//     console.log(err)
// })

console.log(db.STATES)
// console.log(JSON.stringify(db))
// console.log(db.connection.db.listCollections())
// db.connection.db.listCollections()
// db.db.collections().then(res => {
//     var collections = res.map(async function (collection) {
//         let a = await collection.countDocuments()
//         console.log(a)
//         return collection.collectionName;
//     })
//     console.log(collections)
// });

let doc = {
    "_id": "5df7107e4fc3903ef0d760f1",
    "major_name": "环境工程",
    "major_code": 82502,
    "employment_count": 99,
    "employment_rate": 84.21,
    "year": "2016",
    "post_time": "2019/11/10",
    "poster": "zhu123",
    "remarks": "表格导入"
}
ER.updateOne({
    _id: doc._id
}, doc).then(re => {
    console.log(re)
}).catch(err => {
    console.log(err)
})