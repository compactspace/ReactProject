const express = require('express');
const teachercontroller = require('../reactteachercontroller/teachercontroller')
const router = express.Router();
const axios=require('axios')



router.post('/login', async (req, res) => {

   await teachercontroller.teacherlogin(req, res);

})


router.get('/logout', async (req, res) => {

  

console.log("???;")



   req.session.destroy(() => {
      res.clearCookie("sessionID");
      res.clearCookie("tid");
      res.send({ "logoutstatuscode": 1 })

   });

})


//선생님 인증을 위한 문자인증
router.post("/messageautho", async (req, res) => {




   let teacher_tell = await teachercontroller.getTeacherPhonNum(req, res);


   if (teacher_tell == 0) {
      res.send({ "statuscode": "0" });
      return;
   }



   if (teacher_tell == "미선택" || teacher_tell == '') {
      res.send({ "statuscode": "-1" });
      return;
   }


   let today = new Date();
   let 요청자가받을번호 = teacher_tell;

   console.log("요청자가받을번호:  " + 요청자가받을번호)

   let authonumber = (Math.floor(Math.random() * 9999) + 10000).toString();


   // messageService.sendOne({
   //    to: 요청자가받을번호,
   //    from: "01093130686",
   //    text: authonumber,
   //    subject: "인증번호보내드립니다."// LMS, MMS 전용 옵션, SMS에서 해당 파라미터 추가될 경우 자동으로 LMS 변경처리 됨
   // }).then(res => console.log(res));

   let seconds = today.getSeconds();  // 초

   req.session.authonumber = authonumber
   // console.log(req.session)

   console.log("--파괴전--")
   console.log(req.session)
   console.log("--파괴전--")

   res.send(authonumber);
})

//받은 인증번호로 인증하기
router.post("/authocheck", async (req, res) => {

   let { authonumber } = req.body;

   let 서버에서발급했던인증번호 = req.session.authonumber;


   let 리액트로주는JSON = new Object();

   // console.log("authonumber:  ",authonumber)

   // console.log("서버에서발급했던인증번호r:  ",서버에서발급했던인증번호)


   if (서버에서발급했던인증번호 == authonumber) {
      리액트로주는JSON.authostatuscode = 1;
      // req.session.destroy(
      //    () => {
      //       res.json(리액트로주는JSON);
      //       return;
      //    }

      // );
      res.json(리액트로주는JSON);
   } else {
      리액트로주는JSON.authostatuscode = -1
      res.json(리액트로주는JSON);
      return;
   }
})

//등록된 사업자 인지 확인

//진위여부 확인은 개업일자 까지필요하니 일단은 걍 투르로 통과시킨다.
router.post('/authoCorporation', async (req, res) => {

   let { 사업자등록번호 } = req.body;  
   let 공공데이터서비스키 = "GhRJv8ycxRRBetiPJrJJn0wvxKyRWvfo%2B2%2FLp7Ei65PuIROQI7IcZ48p%2F71i%2FpNLUzaRgv9nVNsqXRNNIW4I6w%3D%3D";

   let data = {

       "businesses": [
           {
               "b_no": `${사업자등록번호}`,
               "start_dt": "",
               "p_nm": "정명원",
               "p_nm2": "",
               "b_nm": "",
               "corp_no": "",
               "b_sector": "",
               "b_type": ""
           }
       ]


   }
   let 리액트로주는JSON=new Object();
   let headers = { "content-type": "application/json" }
   let url = `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=GhRJv8ycxRRBetiPJrJJn0wvxKyRWvfo%2B2%2FLp7Ei65PuIROQI7IcZ48p%2F71i%2FpNLUzaRgv9nVNsqXRNNIW4I6w%3D%3D`
   let x=  await axios.post(url, data, { headers })
       .then(
           (res) => { 
               console.log(res.data.data)
               리액트로주는JSON.statuscode=1

               return  리액트로주는JSON;


           }
       )
       .catch((err) => {
           리액트로주는JSON.statuscode=1
           
           console.log(err)
           return  리액트로주는JSON;
       })
       await teachercontroller.teacherhasrole(req, res)
       console.log("??")
       res.json(리액트로주는JSON);
       
}





)

//클래스 정보만 삽입
router.post("/insertclassinfo",async(req,res)=>{
   await teachercontroller.insertclassinfo(req,res);
})


//클래스 정보만 삽입후 선생님으로 전환
router.post("/toteacherconfirm",async(req,res)=>{
   await teachercontroller.toteacherconfirm(req,res);
})

//선택한 날짜의 수업 관리 정보만 가져온다.
router.post('/showmanagerinfo',async (req,res)=>{

   await teachercontroller.showmanagerinfo(req,res);
})




router.post('/goopnenclass',async (req,res)=>{

   await teachercontroller.goopnenclass(req,res);
})




router.post('/getTheReservelist',async (req,res)=>{

   await teachercontroller.getTheReservelists(req,res);
})

//선택한 날짜의 인원수 마감등을 한다 가져온다.
router.post('/getTheFullReservelist',async (req,res)=>{

   await teachercontroller.getTheFullReservelist(req,res);
})




module.exports = router;