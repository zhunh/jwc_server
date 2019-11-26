exports.sucRes01 = function sucRes01(data) {
    return {
        code: 90000,
        msg: 'OK-DATA',
        result: data
    }
}

exports.sucRes02 = function sucRes02() {
    return {
        code: 90000,
        msg: 'OK-NODATA'
    }
}
// 带自定义提示响应成功
exports.sucRes03 = function sucRes02(res) {
    return {
        code: 90000,
        msg: res
    }
}
// 响应出错
exports.errRes = function errRes(err) {
    return {
        code: 90001,
        msg: err.message
    }
}
// 自定义响应出错
exports.errRes02 = function errRes(msg) {
    return {
        code: 90001,
        msg: msg
    }
}
exports.err403 = function errRes() {
    return {
        code: 403,
        msg: '无权访问'
    }
}

exports.err401 = function errRes() {
    return {
        code: 401,
        msg: '身份检验失败'
    }
}