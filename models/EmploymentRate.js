const db = require('../config/db')

let ER = new db.Schema({
    major_name: {
        type: String,
        required: true
    },
    major_code: {
        type: String,
        required: true
    },
    employment_count: {
        type: String,
        required: false //暂定false
    },
    employment_rate: {
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

// ER.pre('save',()=>{
//     ER.
// })

module.exports = db.model('employmentrate', ER, 'employment_rate')