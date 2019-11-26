const ER = require('./models/EmploymentRate')
const sql = require("./config/sql")

// async function test() {
//     let c = await sql.queryCount(ER, {}, {})
//     console.log(typeof (c))
//     console.log(c)
// }

// async function test() {
//     let data = await sql.pageQuery(ER, {}, {}, 3, 5)
//     console.log(typeof (data))
//     console.log(data)
// }

async function test() {
    let pipearr = [{
        $match: {
            major_name: "区块链"
        }
    }]
    // let data = await sql.pipeQuery(ER, pipearr)
    // console.log(data)
    let data = await ER.aggregate(pipearr)
    console.log(data)
}

test()