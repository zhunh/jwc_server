const db = require('../config/db')

let PR = new db.Schema({
    major_name: {
        type: String,
        required: true
    },
    major_code: {
        type: String,
        required: true
    },
    postgraduate_count: {
        type: String,
        required: false
    },
    postgraduate_rate: {
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

module.exports = db.model('postgraduaterate', PR, 'postgraduate_rate')