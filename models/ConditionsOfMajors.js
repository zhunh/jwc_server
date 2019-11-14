const db = require('../config/db')
/**
| 专业名称 | major_name |  |
| 专业代码 | major_code |
| 专业专任教师人数 | teacher_num | 每年有变动 |
| 学校在校生人数 | student_at_school | 每年有变动 |
| 获得博士学位教师数 | teacher_of_dr | 每年有变动 |
| 正高 | full_professor | 每年有变动 |
| 副高 | associate_professor | 每年有变动 |
| 仪器设备总值 | value_of_equipment | 可能有变动 |
| 年份 | year |
| 填报时间 | post_time |  
| 填报人 | poster | 
| 备注 | remarks | 
 */
let condition = new db.Schema({
    major_name: {
        type: String,
        trim: true,
        required: true
    },
    major_code: {
        type: String,
        trim: true,
        required: true
    },
    teacher_num: {
        type: Number,
    },
    student_at_school: {
        type: Number,
        required: true
    },
    teacher_of_dr: {
        type: Number
    },
    full_professor: {
        type: Number
    },
    associate_professor: {
        type: Number
    },
    value_of_equipment: {
        type: Number
    },
    year: {
        type: String,
        required: true
    },
    post_time: {
        type: String
    },
    poster: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        trim: true,
        required: false
    }
})

module.exports = db.model('conditionsofmajor', condition, 'conditions_of_major')