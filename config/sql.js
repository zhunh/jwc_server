// 添加记录
exports.addMany = function (model, data) {
    return new Promise((resolve, reject) => {
        model.insertMany(data, (err) => {
            if (err) throw err;
            resolve()
        })
    })
}
// 删除操作
exports.delete = function (model, deleteData, deleteType) {
    deleteType = deleteType || 'deleteOne'
    return new Promise((resolve, reject) => {
        model[deleteType](deleteData, (err) => {
            if (err) throw err;
            resolve()
        })
    })
}
// 更新操作
exports.update = function (model, whereObj, updateObj, updateType) {
    updateType = updateType || 'updateOne'
    return new Promise((resolve, reject) => {
        model[updateType](whereObj, updateObj, (err) => {
            if (err) throw err;
            resolve()
        })
    })
}
/**
 * 查询
 * whereObj:查询条件
 * showObj:显示结构，指定哪些字段的显示
 */
exports.query = function (model, whereObj, showObj) {
    return new Promise((resolve, reject) => {
        model.find(whereObj, showObj).exec((err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
}
/**
 * 查询数量
 * 返回查询文档数量
 */
exports.queryCount = function (model, whereObj, showObj) {
    return new Promise((resolve, reject) => {
        model.find(whereObj, showObj).count().exec((err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
}
// 管道查询
exports.pipeQuery = function (model, pipeArr) {
    return new Promise(async (resolve, reject) => {
        let data = model.aggregate(pipeArr)
        resolve(data)
    })
}
// 分页查询
exports.pageQuery = function (model, whereObj, showObj, pageSize, pageNum) {
    // return await model.find(whereObj, showObj).limit(limit).skip(limit * pageSize)
    return new Promise((resolve, reject) => {
        model.find(whereObj, showObj).limit(pageSize).skip(pageSize * (pageNum - 1)).exec((err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}