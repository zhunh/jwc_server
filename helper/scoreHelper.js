function statistics(tableData) {
    let tmp = tableData
    let scoreArr = tmp.map(function (value) {
        // 三点运算符避免地址引用
        let newVal = {
            ...value
        }
        let scoreItem = {}
        scoreItem.major_name = newVal.major_name
        scoreItem.major_code = newVal.major_code
        // 1.教师计分
        let tn = parseInt(newVal.teacher_num)
        if (isNaN(tn)) {
            scoreItem.teacherScore = newVal.teacher_num
        } else {
            // 专任教师分值（大于等于16人为100，少于16人按,人数/16*100）
            scoreItem.teacherScore = tn >= 16 ? 100 : (tn / 16 * 100)
        }
        // 2.师生比（专任教师数/在校生人数）==> 大于等于1/15为100.小于1/15，用实际比值与1/15比*100
        let ssb = (newVal.teacher_num) / (newVal.student_at_school)
        if (isNaN(ssb)) {
            scoreItem.ssbScore = "#"
        } else {
            // 大于等于1/15为100.小于1/15，用实际比值与1/15比*100
            scoreItem.ssbScore = (ssb >= (1 / 15) ? 100 : (ssb / (1 / 15)) * 100).toFixed(2)
        }
        // 3.博士教师占比(博士教师数/专任教师数)
        let bsb = (newVal.teacher_of_dr) / (newVal.teacher_num)
        if (isNaN(bsb)) {
            scoreItem.bsbScore = "#"
        } else {
            scoreItem.bsbScore = (bsb * 100).toFixed(2)
        }
        // 4.副高以上职称教师占比
        let fg = (newVal.full_professor + newVal.associate_professor) / (newVal.teacher_num)
        if (isNaN(fg)) {
            scoreItem.fgScore = "#"
        } else {
            scoreItem.fgScore = (fg * 100).toFixed(2)
        }
        // 5.仪器设备分值
        // 6.近三年平均就业率
        let tmper = 0
        for (let i = 0; i < newVal.er.length; i++) {
            tmper += parseFloat(newVal.er[i].employment_rate)
        }
        if (isNaN(tmper)) {
            scoreItem.erScore = '#'
        } else {
            scoreItem.erScore = (tmper / 3).toFixed(2) //保留两位小数
        }
        // 7.调剂率分值（100-近三年平均调剂率*100）
        let tmpmcr = 0
        for (let i = 0; i < newVal.mcr.length; i++) {
            tmpmcr += parseFloat(newVal.mcr[i].major_convert_rate)
        }
        if (isNaN(tmpmcr)) {
            scoreItem.mcrScore = '#'
        } else {
            scoreItem.mcrScore = ((tmpmcr / 3) >= 1 ? (100 - tmpmcr / 3) : (100 - tmpmcr / 3 * 100)).toFixed(2)
        }

        // 8.转出率分值（100-转出率*100）
        scoreItem.trScore = 100 - (newVal.tr.find(item => {
            //找出2018年该专业的调剂率
            return item.year === '2018'
        }).turnout_rate) * 100
        // 9.近三年平均考研率
        let tmppr = 0
        for (let i = 0; i < newVal.pr.length; i++) {
            tmppr += parseFloat(newVal.pr[i].postgraduate_rate)
        }
        if (isNaN(tmppr)) {
            scoreItem.prScore = "#"
        } else {
            let pr = (tmppr / 3).toFixed(2)
            scoreItem.prScore = pr > 1 ? pr : pr * 100 //判断一下带%没
        }
        // 10.该专业近四年学科竞赛成果数量
        let tmpscc = 0
        for (let i = 0; i < newVal.scc.length; i++) {
            tmpscc += parseInt(newVal.scc[i].student_course_contest)
        }
        scoreItem.sccScore = tmpscc >= 10 ? 100 : tmpscc * 10
        // 11.该专业近四年学生发表论文或专利数量
        let tmpspp = 0
        for (let i = 0; i < newVal.spp.length; i++) {
            tmpspp += parseInt(newVal.spp[i].student_paper_patent)
        }
        scoreItem.sppScore = tmpspp >= 10 ? 100 : tmpspp * 10
        // 12.教师教改论文数量（近三年）
        let tmprp = 0
        for (let i = 0; i < newVal.rp.length; i++) {
            tmprp += parseInt(newVal.rp[i].research_paper)
        }
        scoreItem.rpScore = tmprp >= 10 ? 100 : tmprp * 10
        // 13.教研项目数量（近三年）
        let tmptpp = 0
        for (let i = 0; i < newVal.tpp.length; i++) {
            tmptpp += parseInt(newVal.tpp[i].teaching_project_province_num)
        }
        scoreItem.tppScore = tmptpp >= 10 ? 100 : tmptpp * 10
        // 14.主持本科教学工程
        let epNum = parseInt(newVal.ep.engineering_project_num)
        if (isNaN(epNum)) {
            scoreItem.epScore = '#'
        } else {
            scoreItem.epScore = (epNum >= 10) ? 100 : (epNum * 10)
        }
        // 15.教学成果奖（近十年）===>1项50分，大于或等于2为100
        let tmpta = parseInt(newVal.ta.teaching_achievement_award)
        if (isNaN(tmpta)) {
            scoreItem.taScore = '#'
        } else {
            scoreItem.taScore = tmpta >= 2 ? 100 : tmpta * 50
        }

        return scoreItem
    })

    return scoreArr
}

module.exports = statistics;