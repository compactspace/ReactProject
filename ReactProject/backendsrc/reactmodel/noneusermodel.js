
const marialpool = require('../model/maria/mariadbpool');


module.exports.openclassinfoModel = async (req, res) => {

    let onedayclass_num = req.body.onedayclass_num;

    // console.log(onedayclass_num);

    let sql = "select * from onedayclass where onedayclass_num=?"
    let executequery;

    try {

        const con = await marialpool.pool2.getConnection();
        executequery = await con.query(sql, onedayclass_num);
        let resultobj = executequery[0]
        console.log("트라이문 씹힘??")
        console.log(resultobj);

        return resultobj;

    } catch (err) {
        console.log(err);

    }
};




module.exports.justregisterOnedayclassinfoModel = async (req, res) => {

    let onedayclass_num = req.body.onedayclass_num;

    // console.log(onedayclass_num);

    let sql = "select * from onedayclass where onedayclass_num=?"
    let 이미지리스트쿼리 = "select reserve_img FROM  onedayclassimg WHERE onedayclass_num=?"
    let executequery;


    try {
        let obj = new Object();
        const con = await marialpool.pool2.getConnection();
        executequery = await con.query(sql, onedayclass_num);
        let resultobj = executequery[0]
        obj.classinfo = resultobj;
        executequery = await con.query(이미지리스트쿼리, onedayclass_num);
        let imglist = executequery[0]
        obj.imglist = imglist

        // console.log("트라이문 씹힘??")
        // console.log(executequery[0]);

        return obj;

    } catch (err) {
        console.log(err);

    }
};





module.exports.IsMagamModel = async (req, res) => {

    // let onedayclass_num=req.query.onedayclass_num;
    // let openday=req.query.openday;

    let { onedayclass_num, openningday } = req.query;
    console.log("클래스번호: " + onedayclass_num + " openningday: " + openningday);



    // let 공백자름 = openningday.split(' ');   

    // let 년 = 공백자름[0].replace("년", "-").trim();

    // let 월 = 공백자름[1].replace("월", "-");

    // if (월.length == 2) {
    //     월 = "0" + 공백자름[1].replace("월", "-");
    // }
    // let 일=공백자름[2].replace("일", "");

    // if (일.length == 1) {
    //     일 = "0" + 공백자름[2].replace("일", "");

    // }

    // let DB를위한형식=년+월+일







    let sql = "select * from openningclass where onedayclass_num=? and openningday like '%" + `${openningday}` + "%'"
    let executequery;


    let obj = new Object();
    try {

        const con = await marialpool.pool2.getConnection();
        executequery = await con.query(sql, [onedayclass_num]);

        let 선생이개설자체를않함판단 = executequery[0].length;

        if (선생이개설자체를않함판단 == 0) {

            obj.statuscode = -1;
            obj.rest = 0;
        }

        else {

            let 개강했냐 = executequery[0][0].isopenning;

            console.log(개강했냐);

            if (개강했냐 == "yes") {
                let 남은자리수 = await getTheFuckRest(onedayclass_num, openningday)
                obj.satstuscode = 1;
                obj.rest = 남은자리수;

            } else {
                obj.statuscode = -1;
                obj.rest = 0;

            }

            return obj;
        }




    } catch (err) {
        console.log(err);



    }
};



async function getTheFuckRest(onedayclass_num, openningday) {

    let openday = openningday

    console.log("클래스번호: " + onedayclass_num + " openday: " + openday);

    let sql = "select rest from reserverest where onedayclass_num=? and openday like '%" + `${openday}` + "%'"
    let executequery;

    try {

        const con = await marialpool.pool2.getConnection();
        executequery = await con.query(sql, onedayclass_num);
        let 남은자리수 = executequery[0][0].rest
        console.log("트라이문 씹힘??")
        console.log(남은자리수);

        return 남은자리수;

    } catch (err) {
        console.log(err);
        return -1;

    }

}




module.exports.FindOutRestModel = async (req, res) => {

    // let onedayclass_num=req.query.onedayclass_num;
    // let openday=req.query.openday;

    let { onedayclass_num, openday } = req.query;
    console.log("클래스번호: " + onedayclass_num + " openday: " + openday);

    let sql = "select rest from reserverest where onedayclass_num=? and openday like '%" + `${openday}` + "%'"
    let executequery;

    try {

        const con = await marialpool.pool2.getConnection();
        executequery = await con.query(sql, onedayclass_num);
        let resultobj = executequery[0][0]
        console.log("트라이문 씹힘??")
        console.log(resultobj);

        return resultobj;

    } catch (err) {
        console.log(err);
        return -1;

    }
};