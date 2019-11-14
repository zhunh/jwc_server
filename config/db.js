//暴露一个连接了mongoose的mongoose对象

const mongoose = require('mongoose');
//定义数据库连接地址
const url = 'mongodb://127.0.0.1:27017/jwc'
//连接
// mongoose.connect(url,{ useNewUrlParser: true },function(err){
//     if(err){
//         console.log("数据库连接失败");
//     }else{
//         console.log("数据库连接成功");
//     }
// });
mongoose
.connect(url,{ useNewUrlParser: true })
.then(() => {
    console.log("数据库连接成功")
})
.catch(err => {
    console.log("数据库连接失败",err.message)
})

//暴露已经连接了数据库的 mongoose 对象
module.exports = mongoose