const db = require('../config/db')
/**
 * 转出率
 */
let TR = new db.Schema({
    major_name: {
        type: String,
        required: true
    },
    major_code: {
        type: String,
        required: true
    },
    turnout_count: {
        type: String,
        required: false
    },
    turnout_rate: {
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

module.exports = db.model('turnout_rate', TR, 'turnout_rate')