var express = require('express');
var router = express.Router();
let pl = require('../models/ResearchPaperList')
let R = require('../config/formatResponse')

router.post('/researchpaper', function (req, res, next) {
    let data = req.body.data
    console.log(req.body)
    pl.insertMany(data).then(re => {
        res.json(R.sucRes03('导入成功'))
    }).catch(err => {
        res.json(R.errRes(err))
    })
});

module.exports = router;