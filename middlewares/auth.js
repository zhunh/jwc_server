const jwt = require('jsonwebtoken')
let funcs = require('../config/formatResponse')

module.exports = (req, res, next) => {
    // 1.获取到re中请求头的AccessToken
    let token = req.get("AccessToken")
    // 2.判断token是否存在
    if (!token) {
        // 不存在就不允许访问
        res.send(funcs.err403())
    } else {
        //校验合法性
        jwt.verify(token, 'jwc_token', (err, data) => {
            if (err) {
                // 校验案失败res.status(401)
                res.send(funcs.err401())
            } else {
                // 校验通过，放行
                // 后续的代码可能需要使用到 token 中的数据（payload），为了省去后续中再次调用verify。这时候将payload信息，写到req对象上
                req.userInfo = data;
                next()
            }
        })
    }
}