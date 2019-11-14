const db = require("../config/db")

const UserSchema = db.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = db.model("User", UserSchema)  // 默认会操作 users 这个表
// module.exports = db.model("User", UserSchema,"user")  设定操作第三个参数 user 的表