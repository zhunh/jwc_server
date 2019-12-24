/**
 * 学生论文发明专利
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
    paper_patent: {
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
        required: false
    }
})

module.exports = db.model("student_paper_patent", schema, "student_paper_patent")