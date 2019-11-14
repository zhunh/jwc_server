// 生成 majorBasicInfo 表的模型对象

//1.引入mongoose
const db = require("../config/db")
//2.定义这张表的 schema 对象
/**
| 填报年份 | post_year |
| 校内专业代码 | major_code_school |
| 校内专业名称 | major_name_school |
| 专业名称 | major_name |
| 专业代码 | major_code |
| 代码版本 | code_version |
| 所属单位名称 | academy |
| 所属单位号 | academy_code |
| 专业设置年份 | major_start_year |
| 学制 | schooling_year |
| 允许修业年限 | schooling_year_max |
| 授予学位门类 | degree_awarding_category |
| 招生状态 | recruit_state |
| 是否新专业 | new_yn |
| 是否师范类专业 | teachers_yn |
| 填报人 | post_user |
| 填报时间 | post_time |
 */
const schema = new db.Schema({
    post_year: {
        type: String,
        default: '2019',
        required: true,
    },
    major_code_school: {
        type: Number,
        required: true
    },
    major_name_school: {
        type: String,
        required: true
    },
    major_name: {
        type: String,
        required: true
    },
    major_code: {
        type: String,
        required: true
    },
    code_version: {
        type: Number,
        required: true
    },
    academy: {
        type: String,
        required: true
    },
    academy_code: {
        type: Number,
        required: true
    },
    major_start_year: {
        type: Number,
        required: true
    },
    schooling_year: {
        type: Number,
        required: true
    },
    schooling_year_max: {
        type: Number,
        required: true
    },
    degree_awarding_category: {
        type: String,
        required: true
    },
    recruit_state: {
        type: String,
        required: true
    },
    new_yn: {
        type: String,
        required: true
    },
    teachers_yn: {
        type: String,
        required: true
    },
    post_user: {
        type: String,
        required: true
    },
    post_time: {
        type: String,
        required: true
    }
})
//3.基于schema生成model对象
// const model = db.model("majorBasicInfo",schema)
// module.exports = model
module.exports = db.model("MajorBasicInfo", schema, "MajorBasicInfos")
//数据库中的表名是根据 db.model 第一个参数的复数形式来确定的,或者第三个参数