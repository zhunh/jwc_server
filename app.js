var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入json解析中间件
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/User/users');
var majorRouter = require('./routes/MajorBasicInfo/majorBasicInfo');
var conditionRouter = require('./routes/ConditionOfMajor');
var employmentRouter = require('./routes/EmploymentRate');
var majorConvertRouter = require('./routes/MajorConvertRate');
var postgraduateRouter = require('./routes/PostgraduateRate');
var turnoutRouter = require('./routes/TurnoutRate');
var summaryRouter = require('./routes/Summary')
var teachingProjectProvinceRouter = require('./routes/TeachingProjectProvince')
var researchPaperRouter = require('./routes/ResearchPaper')
var teachingAwardRouter = require('./routes/TeachingAward')
var studentCourseContestRouter = require('./routes/StudentCourseContest')
var studentPaperPatentRouter = require('./routes/StudentPaperPatent')
var engineeringProject = require('./routes/EngineeringProject')
var excelImport = require('./routes/ExcelImport')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使支持跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , AccessToken');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200); //让options请求快速返回，options请求是预检请求
  } else {
    next();
  }
});
// 路由配置
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/md', majorRouter);
app.use('/condition', conditionRouter);
app.use('/mcr', majorConvertRouter)
app.use('/pr', postgraduateRouter)
app.use('/er', employmentRouter)
app.use('/summary', summaryRouter)
app.use('/tpp', teachingProjectProvinceRouter)
app.use('/rp', researchPaperRouter)
app.use('/ta', teachingAwardRouter)
app.use('/ep', engineeringProject)
app.use('/tr', turnoutRouter)
app.use('/scc', studentCourseContestRouter)
app.use('/spp', studentPaperPatentRouter)
app.use('/import', excelImport)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;