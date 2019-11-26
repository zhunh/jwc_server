/**
 * 教师主持省级项目以上文档
 */
const db = require('../config/db')

let schema = new db.Schema({
    major_name: {
        type: String,
        required: true
    },
    major_code: {
        type: String,
        required: true
    },
    teaching_project_province_num: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    post_time: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    }
})

module.exports = db.model("teaching_project_province", schema, "teaching_project_province")