//暴露一个连接了mongoose的mongoose对象

const mongoose = require('mongoose');
//定义数据库连接地址
const url = 'mongodb://127.0.0.1:27017/jwc'
// const url = 'mongodb://172.16.214.151:27017/jwc'
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'jwc',
    pass: 'jwc317319'
}
mongoose
    .connect(url, connectOptions)
    .then(() => {
        console.log("数据库连接成功")
        // console.log(mongoose.db.connections)
        // console.log(mongoose.)
    })
    .catch(err => {
        console.log("数据库连接失败", err.message)
    })
// mongoose.connection.on('open', async function () {
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         if (err) {
//             console.log(err);
//         } else {
//             names.forEach(function (e, i, a) {
//                 console.log("--->>", e.name);
//                 // console.log("--->>", e.count());
//                 console.log("--->>", i);
//                 console.log("--->>", a);
//             });
//         }
//     });
// });
// mongoose.connection.db.listCollections({
//     nameOnly: true
// }).then(re => {
//     console.log(re)
// })
//暴露已经连接了数据库的 mongoose 对象
module.exports = mongoose