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
    research_paper: {
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

module.exports = db.model("research_paper_list", schema, "research_paper_list")