/**
 * 教师主持省级以上本科教学工程项目文档
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
    teaching_achievement_award: {
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

module.exports = db.model("teaching_award", schema, "teaching_award")