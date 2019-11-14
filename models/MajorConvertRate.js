const db = require('../config/db')

let MCR = new db.Schema({
    major_name: {
        type: String,
        required: true
    },
    major_code: {
        type: String,
        required: true
    },
    major_convert_count: {
        type: Number,
        required: true
    },
    major_convert_rate: {
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

module.exports = db.model('majorconvertrate', MCR, 'major_convert_rate')