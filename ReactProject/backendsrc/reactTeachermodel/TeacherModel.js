
const e = require('express');
const mariadbpool = require('../model/maria/mariadbpool')




module.exports.teacherLoginModel = async (req, res) => {

    let { tid, password } = req.body;
    console.log("tid  password  ", tid, password)

    let con;
    let sql = "select * from teacher where tid=? and password=?"
    let executequery;
    let 찾은로우
    let 응답JSON = new Object();
    try {
        con = await mariadbpool.pool2.getConnection();
        executequery = await con.query(sql, [tid, password])
        찾은로우 = executequery[0];
        let 인증된사업자냐 = executequery[0][0].confirm

        if (인증된사업자냐 == "yes") {
            console.log("인증된사업자냐:  ", 인증된사업자냐)
            응답JSON.confirm = 인증된사업자냐;
            let 원데이클래스번호 = executequery[0][0].onedayclass_num;
            console.log("원데이클래스번호는?:  ", 원데이클래스번호)

        }



        if (찾은로우.length == 0) {
            응답JSON.loginstatuscode = -1;
            return;
        }
        let onedayclass_num = executequery[0][0].onedayclass_num;
        응답JSON.onedayclass_num = onedayclass_num;
        응답JSON.loginstatuscode = 1;



    } catch (err) {

        console.log(err)
    } finally {

        con.release();
        return 응답JSON;
    }


}


module.exports.teacherhasroleModel = async (req, res) => {

    let tid = req.session.tid;
    if (tid == undefined) {
        tid = "teacher1"
    }
    let con;
    let sql = "update teacher set rules='인증된사업자' where tid=?"
    let executequery;
    let 찾은로우
    let 응답JSON = new Object();
    try {
        con = await mariadbpool.pool2.getConnection();
        executequery = await con.query(sql, [tid])
        찾은로우 = executequery[0];

        console.log(찾은로우)



    } catch (err) {

        console.log(err)
    } finally {

        con.release();
        return 1;
    }

}

module.exports.getTeacherPhonNumModel = async (req, res) => {


    let con;
    let sql = "select * from teacher where tid=?"
    let executequery;
    let tid = req.session.tid;
    let teacher_tell;
    console.log(req.session);
    console.log("tid->>, ", tid);

    if (tid == null || tid == undefined) {
        return 0;
    }
    try {
        con = await mariadbpool.pool2.getConnection();
        executequery = await con.query(sql, [tid]);
        teacher_tell = executequery[0][0].teacher_tell
        console.log("선생id", tid, "그리고 폰번호, ", teacher_tell);


    } catch (ree) {

        console.log(err)

    } finally {

        con.release();
        return teacher_tell;
    }
}

module.exports.insertclassinfoModel = async (req, res) => {


    let { onedayclass_name, onedayclass_price, onedayclass_info, reserve_img } = req.body


    console.log("onedayclass_name,onedayclass_price,onedayclass_info,reserve_img", onedayclass_name, onedayclass_price, onedayclass_info)



    let con;
    let sql = 'insert into onedayclass (onedayclass_name,onedayclass_price,onedayclass_info,reserve_img) values (?,?,?,?)';

    let 클래스번호sql = "select * from onedayclass where onedayclass_name=? ";

    let 이미지테이블반복문 = "insert into onedayclassimg  (reserve_img,onedayclass_num) values (?,?)"
    let executequery;
    let 대표이미지 = reserve_img[0];
    let 클래스번호

    let 리액트로주는JSON = new Object();
    try {
        con = await marialpool.pool2.getConnection();
        executequery = await con.query(sql, [onedayclass_name, onedayclass_price, onedayclass_info, 대표이미지]);

        executequery = await con.query(클래스번호sql, [onedayclass_name]);
        클래스번호 = executequery[0][0].onedayclass_num;

        for (let i = 0; i < reserve_img.length; i++) {

            executequery = await con.query(이미지테이블반복문, [reserve_img[i], 클래스번호]);


        }


    } catch (err) {
        console.log(err)
        리액트로주는JSON.updatestatuscode = -1;

    } finally {
        con.release();
        리액트로주는JSON.updatestatuscode = 1
        return 리액트로주는JSON;
    }




}


module.exports.toteacherconfirmModel = async (req, res) => {

    console.log(req.session)


    let { tid } = req.body
    let con;
    let sql = 'update teacher set confirm = "yes"  where tid=? and rules="인증된사업자"';
    let 원데이클래스번호알밖기쿼리문 = " select * from teacher where where tid=? ";
    let executequery;
    let 반영여부;


    let 리액트로주는JSON = new Object();
    try {
        con = await mariadbpool.pool2.getConnection();
        executequery = await con.query(sql, [tid]);
        반영여부 = executequery[0].affectedRows;

        console.log(반영여부)

        if (반영여부 == 0) {


            리액트로주는JSON.updatestatuscode = -1
        } else {

            executequery = await con.query(원데이클래스번호알밖기쿼리문, [tid]);
            let 원데이클래스번호 = executequery[0][0].onedayclass_num;
            리액트로주는JSON.onedayclass_num = 원데이클래스번호;
            리액트로주는JSON.updatestatuscode = 1
        }


    } catch (err) {
        console.log(err)

    } finally {
        con.release();

        return 리액트로주는JSON;
    }




}


module.exports.showmanagerinfoModel = async (req, res) => {

    //console.log(req.session)

    let tid = req.session.tid;
    let { openningday } = req.body;

    let 공백자름 = openningday.split(' ');

    let 년 = 공백자름[0].replace("년", "-").trim();

    let 월 = 공백자름[1].replace("월", "-");

    if (월.length == 2) {
        월 = "0" + 공백자름[1].replace("월", "-");
    }
    let 일 = 공백자름[2].replace("일", "");

    if (일.length == 1) {
        일 = "0" + 공백자름[2].replace("일", "");

    }

    let DB를위한형식 = 년 + 월 + 일


    // console.log("공벡으로 자르기",진짜DB향식 )


    // console.log("tid openningday", tid, openningday);

    // let DB를위한형식 = openningday.replace("년 ", "-").trim();
    // DB를위한형식 = DB를위한형식.replace("월 ", "-").trim();
    // DB를위한형식 = DB를위한형식.replace("일", "").trim();

    // console.log("변경후:  ", DB를위한형식.trim())




    let con;


    let 선택한날짜수업정보쿼리문
        = "SELECT * FROM openningclass WHERE openningday LIKE" + " '%" + `${DB를위한형식}` + "%" + "'" + ' AND  tid=?'



    let executequery;
    let 해당날짜의수업개설여부


    let 리액트로주는JSON = new Object();
    try {
        con = await mariadbpool.pool2.getConnection();
        executequery = await con.query(선택한날짜수업정보쿼리문, [tid]);
        해당날짜의수업개설여부 = executequery[0];

        console.log(해당날짜의수업개설여부)

        if (해당날짜의수업개설여부.length == 0) {
            리액트로주는JSON.openningstatuscode = -1
        } else {
            리액트로주는JSON.openningstatuscode = 1
        }


    } catch (err) {
        console.log(err)

    } finally {
        con.release();

        return 리액트로주는JSON;
    }




}


module.exports.goopnenclassModel = async (req, res) => {

    console.log(req.body)
    let tid = req.session.tid;
    let { openningday, classclose } = req.body;
    let isopenning = 'yes';





    let 공백자름 = openningday.split(' ');

    let 년 = 공백자름[0].replace("년", "-").trim();

    let 월 = 공백자름[1].replace("월", "-");

    if (월.length == 2) {
        월 = "0" + 공백자름[1].replace("월", "-");
    }
    let 일 = 공백자름[2].replace("일", "");

    if (일.length == 1) {
        일 = "0" + 공백자름[2].replace("일", "");

    }

    let DB를위한형식 = 년 + 월 + 일





    console.log("tid,isopenning,openningday:   ", tid, isopenning, openningday)


    let con;

    let 최초개강인지판단sql = "select * from  openningclass where tid=? and  openningday=?"
    let sql = 'insert into openningclass (tid,openningday,isopenning) values (?,?,?)';

    let executequery;
    let 개강성공여부;

    let 리액트로주는JSON = new Object();
    try {
        con = await mariadbpool.pool2.getConnection();

        if (classclose == "close") {
            sql = "update openningclass set isopenning='no' where tid=? and  openningday=?"

            executequery = await con.query(sql, [tid, DB를위한형식])
            개강성공여부 = executequery[0].affectedRows
        } else {

            executequery = await con.query(최초개강인지판단sql, [tid, DB를위한형식]);
            let 최초개강이니 = executequery[0].length;

            console.log("최초개강이니:   ", 최초개강이니)


            if (최초개강이니 == 0) {

                executequery = await con.query(sql, [tid, DB를위한형식, DB를위한형식]);

                개강성공여부 = executequery[0].affectedRows
            }
            else {
                sql = "update openningclass set isopenning='yes' where tid=? and  openningday=?"
                executequery = await con.query(sql, [tid, DB를위한형식])
                개강성공여부 = executequery[0].affectedRows
            }


        }



        console.log(개강성공여부);

    } catch (err) {
        console.log(err)
        리액트로주는JSON.updatestatuscode = -1;

    } finally {
        con.release();
        리액트로주는JSON.updatestatuscode = 1
        return 리액트로주는JSON;
    }




}


module.exports.getTheReservelistsModel = async (req, res) => {

    let tid = req.session.tid;
    let { openningday } = req.body;

    let con;

    let onedayclass_num = req.session.onedayclass_num;

    let 선택날짜로뽑은예약리스트쿼리문 = "SELECT * FROM reserveinfo WHERE  openday LIKE" + " '%" + `${openningday}` + "%" + "'" + ' AND  onedayclass_num=?';

    console.log("openningday: ", openningday, " tid: ", tid, "  onedayclass_num:  ", onedayclass_num)


    let executequery;
    let 예약자리스트객체배열;
    try {
        con = await mariadbpool.pool2.getConnection();
        executequery = await con.query(선택날짜로뽑은예약리스트쿼리문, [onedayclass_num]);
        console.log(executequery[0])
        
        예약자리스트객체배열 = executequery[0];






    } catch (err) {

        console.log(err)
        con.release();

    } finally {

        con.release();

        return 예약자리스트객체배열;

    }
}



module.exports.getTheFullReservelistModel = async (req, res) => {

    let tid = req.session.tid;
    let { openningday } = req.body;

    let con;

    let onedayclass_num = req.session.onedayclass_num;

   // let 선택날짜로뽑은예약리스트쿼리문 = "SELECT * FROM reserveinfo WHERE  openday LIKE" + " '%" + `${openningday}` + "%" + "'" + ' AND  onedayclass_num=?';


    let 선택날짜로뽑은예약리스트쿼리문 = " SELECT * FROM openningclass AS op INNER JOIN reserverest AS re  ON op.openningclass_num=re.openningclass_num  INNER JOIN onedayclass AS O ON O.onedayclass_num=op.onedayclass_num"+ " WHERE  openday LIKE" + " '%" + `${openningday}` + "%" + "'" 
    console.log("openningday: ", openningday, " tid: ", tid, "  onedayclass_num:  ", onedayclass_num)


    let executequery;
    let 예약자리스트객체배열;
    try {
        con = await mariadbpool.pool2.getConnection();
        executequery = await con.query(선택날짜로뽑은예약리스트쿼리문);
        console.log(executequery[0])
        
        예약자리스트객체배열 = executequery[0];






    } catch (err) {

        console.log(err)
        con.release();

    } finally {

        con.release();

        return 예약자리스트객체배열;

    }
}