const express = require('express');
const ER = require('../models/EmploymentRate')
const CD = require('../models/ConditionsOfMajors')
const EP = require('../models/EngineeringProject')
const MCR = require('../models/MajorConvertRate')
const PR = require('../models/PostgraduateRate')
let R = require('../config/formatResponse')
const RP = require('../models/ResearchPaper')
const TA = require('../models/TeachingAward')
const TP = require('../models/TeachingProjectProvince')
/**
 * 一个专业一年只能填一天记录
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// 就业率查重
function erCheckExist(req, res, next) {
    let er = new ER({
        ...req.body
    })
    // 检查存在
    ER.find({
        major_name: er.major_name,
        year: er.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业就业率已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}
//专业基本条件查重
function cdCheckExist(req, res, next) {
    let cd = new CD({
        ...req.body
    })
    // 检查存在
    CD.find({
        major_name: cd.major_name,
        year: cd.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业基本条件已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}
//工程项目查重
function epCheckExist(req, res, next) {
    let ep = new EP({
        ...req.body
    })
    // 检查存在
    EP.find({
        major_name: ep.major_name,
        year: ep.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业主持教学工程项目数已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}
// 考研率
function prCheckExist(req, res, next) {
    let pr = new PR({
        ...req.body
    })
    // 检查存在
    PR.find({
        major_name: pr.major_name,
        year: pr.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业考研率已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}
// 专业调剂率
function mcrCheckExist(req, res, next) {
    let mcr = new MCR({
        ...req.body
    })
    // 检查存在
    MCR.find({
        major_name: mcr.major_name,
        year: mcr.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业专业调剂率已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}
// 教改论文查重
function rpCheckExist(req, res, next) {
    let rp = new RP({
        ...req.body
    })
    // 检查存在
    RP.find({
        major_name: rp.major_name,
        year: rp.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业教改论文已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}
// 省级教学成果奖
function taCheckExist(req, res, next) {
    let ta = new TA({
        ...req.body
    })
    // 检查存在
    TA.find({
        major_name: ta.major_name,
        year: ta.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业省级教学成果奖已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}
// 主持省级教研项目数量
function tpCheckExist(req, res, next) {
    let tp = new TP({
        ...req.body
    })
    // 检查存在
    TP.find({
        major_name: tp.major_name,
        year: tp.year
    }).then((data) => {
        if (data.length == 0) {
            console.log("没有找到记录")
            next()
        } else {
            console.log("找到记录", data.length, "条")
            res.send(R.errRes02("当年该专业主持省级教研项目数量已经填过"))
        }
    }).catch(err => {
        res.send(R.errRes(err))
        console.log(err)
    })
}

exports.erCheckExist = erCheckExist;
exports.cdCheckExist = cdCheckExist;
exports.epCheckExist = epCheckExist;
exports.mcrCheckExist = mcrCheckExist;
exports.prCheckExist = prCheckExist;
exports.taCheckExist = taCheckExist;
exports.rpCheckExist = rpCheckExist;
exports.tpCheckExist = tpCheckExist;