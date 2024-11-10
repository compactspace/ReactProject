const teachermodel=require('../reactTeachermodel/TeacherModel')



module.exports.loginService = async (req, res) => {


  return await  teachermodel.teacherLoginModel(req,res);  

}


module.exports.teacherhasrole =async (req,res)=>{

  await  teachermodel.teacherhasroleModel(req,res);  

}

module.exports.getTeacherPhonNumService =async(req,res)=>{

  return await teachermodel.getTeacherPhonNumModel(req,res);
}

module.exports.insertclassinfoService= async(req,res)=>{

  return await teachermodel.insertclassinfoModel(req,res);

}


module.exports.toteacherconfirmService= async(req,res)=>{

  return await teachermodel.toteacherconfirmModel(req,res);

}


module.exports.showmanagerinfoService= async(req,res)=>{

  return await teachermodel.showmanagerinfoModel(req,res);

}



module.exports.goopnenclassService= async(req,res)=>{

  return await teachermodel.goopnenclassModel(req,res);

}



module.exports.getTheReservelistsService= async(req,res)=>{

  return await teachermodel.getTheReservelistsModel(req,res);

}



module.exports.getTheFullReservelistService= async(req,res)=>{

  return await teachermodel.getTheFullReservelistModel(req,res);

}