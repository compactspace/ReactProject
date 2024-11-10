const teacherService = require('../teacherService/teacherService');




module.exports.teacherlogin = async (req, res) => {



   let 리액트로주는JSON = await teacherService.loginService(req, res);

   console.log("로그인성공 코드 ", 리액트로주는JSON.loginstatuscode)
   if (리액트로주는JSON.loginstatuscode == 1) {

      if(리액트로주는JSON.confirm=="yes"){
         req.session.onedayclass_num=리액트로주는JSON.onedayclass_num;
      }

      리액트로주는JSON.loginstatuscode = 1;
      // req.session.privilege = "teacher";
      
      req.session.tid = req.body.tid;     
      req.session.sessionID = req.sessionID;
      await req.session.save((err) => {

      })

      res.json(리액트로주는JSON);

   }

}







module.exports.teacherhasrole= async (req,res)=>{
   
   await teacherService.teacherhasrole(req,res);
}

module.exports.getTeacherPhonNum = async (req, res) =>{

  return await teacherService.getTeacherPhonNumService(req,res);
}

module.exports.insertclassinfo = async (req,res)=>{

   let 리액트로주는JSON=await teacherService.insertclassinfoService(req,res);
   
   res.json(리액트로주는JSON);

}

module.exports.toteacherconfirm = async(req,res)=>{
   let 리액트로주는JSON=await teacherService.toteacherconfirmService(req,res);
   
   req.session.onedayclass_num=리액트로주는JSON.onedayclass_num
   req.session.save(()=>{})

   res.json(리액트로주는JSON);

}
module.exports.showmanagerinfo= async(req,res)=>{
   let 리액트로주는JSON=await teacherService.showmanagerinfoService(req,res);
   
   res.json(리액트로주는JSON);

}



module.exports.goopnenclass= async(req,res)=>{
   let 리액트로주는JSON=await teacherService.goopnenclassService(req,res);
   
   res.json(리액트로주는JSON);

}




module.exports.getTheReservelists= async(req,res)=>{
   let 리액트로주는JSON=await teacherService.getTheReservelistsService(req,res);
   
   res.json(리액트로주는JSON);

}

module.exports.getTheFullReservelist= async(req,res)=>{
   let 리액트로주는JSON=await teacherService.getTheFullReservelistService(req,res);
   
   res.json(리액트로주는JSON);

}