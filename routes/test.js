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