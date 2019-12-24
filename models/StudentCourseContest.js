const db = require('../config/db')
/**
 * 学生学科竞赛（省级三等奖以上）
 */
let schema = new db.Schema({
    major_name: {
        type: String,
        required: true
    },
    major_code: {
        type: String,
        required: true
    },
    course_contest: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    publish_time: {
        type: String,
        required: true
    }
})

module.exports = db.model("student_course_contest", schema, "student_course_contest")