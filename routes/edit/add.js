var express = require('express');
var router = express.Router();
var mj = require('../../models/majorBasicInfo')
router.get('/', function(req, res, next) {
    res.render('index', { title: '基本状态数据库' });
});