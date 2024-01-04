const express = require('express')
const router = express.Router()
const {Enquiry,Registration,Fees,StudBatch,Faculty,Course,stude_course,Counsellor} = require('../models');
const ApiResponse = require("../utils/ApiResponse");




router.use((request,response,next)=>{
    if(request.user.userstatus==true){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Account Disabled !"))
    }
})
router.get('/list/enq',async(request,response)=>{
    const data = await Enquiry.findAll({
        where: { status: true },
        attributes: {
            exclude: ["status", "createdAt", "updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true, "Enquiry List!", data, null))
})
router.post('/enquiry',async(request,response)=>{
    const reqData = request.body;
    try
    {  
        const {enq_no,stud_name,mobile,qualification,clg_name,course,fees,placement,enq_type,feedback} = reqData;  
        const enq_date= new Date(); 
        const counsellor = request.user.userid; 
        const eq_Data = {enq_no,enq_date,stud_name,mobile,qualification,clg_name,course,counsellor,fees,placement,enq_type,feedback,status:true}
        const enq = await Enquiry.create(eq_Data);   
        response.status(201).json(new ApiResponse(true,"Enquiry Saved !",enq,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Enquiry Not Saved !",null,err.message))
    }
})
//reg_no,enq_no,date,stud_name,password,gender,mobile,p_name,p_mobile,address,stud_course,qualification,counsellor,status
// router.post('/stud_reg',async(request,response)=>{
//     const reqData = request.body;
//     try
//     {  
        
//         const {reg_no, enq_no, stud_name, mobile, gender, p_name, p_mobile, address, qualification,course} = reqData;
//         const date= new Date(); 
//         const password=12345;
//         const fees = reqData.fees;
//         const reg_Data = {reg_no, enq_no,date, stud_name, mobile,password, gender, p_name, p_mobile, address, qualification, course,fees,status:true} 
//         const register = await Registration.create(reg_Data);   
//         response.status(201).json(new ApiResponse(true,"Student Registration Saved !",register,null))

//         const {student,total_fees} = reqData;
//          student=request.user.userid;
//          total_fees=fees;
         
//          const stcourseData = { student,course,total_fees,status:true}
//          const stcourse = await StudBatch.create(stcourseData);
//     }catch(err)
//     {
//         response.status(500).json(new ApiResponse(false,"Student Registration Not Saved !",null,err.message))
//     }

// })
// router.post('/stud_reg', async (request, response) => {
//     const reqData = request.body;
//     try {
//         const {
//             reg_no,
//             enq_no,
//             stud_name,
//             mobile,
//             gender,
//             p_name,
//             p_mobile,
//             address,
//             qualification,
          
//             course, 
//         } = reqData;

//         const date = new Date();
//         const password = 12345;
//         const fees = reqData.fees; 
//        const  counsellor=request.user.userid;
//         // Create registration record
//         const reg_Data = {
//             reg_no,
//             enq_no,
//             date,
//             stud_name,
//             mobile,
//             password,
//             gender,
//             p_name,
//             p_mobile,
//             address,
//             qualification,
//             counsellor,
//             course,
//             fees,  
//             status: true
//         };
//         const register = await Registration.create(reg_Data);

//         // Create student course record
        
//     const stcourseData = { student: reg_no,course:register.course, total_fees: fees, rem_fees: fees, status: true };
   
//         const stcourse = await StudCourse.create(stcourseData);

//         response.status(201).json(new ApiResponse(true, "Student Registration Saved !", register, null));
//     } catch (err) {
//         response.status(500).json(new ApiResponse(false, "Student Registration Not Saved !", null, err.message));
//     }
// });


router.post('/stud_reg', async (request, response) => {
    const reqData = request.body;
    try {
      const {
        reg_no,
        enq_no,
        stud_name,
        mobile,
        gender,
        p_name,
        p_mobile,
        address,
        qualification,
        course,
      } = reqData;
  
      const date = new Date();
      const password = 12345;
      const fees = reqData.fees;
  
      // Create registration record
      const register = await Registration.create({
        reg_no,
        enq_no,
        date,
        stud_name,
        mobile,
        password,
        gender,
        p_name,
        p_mobile,
        address,
        qualification,
        course,
        fees,
        status: true
      });
  
      console.log(register)

      // Create student course record
      const stcourseData = {
       
        student: register.id, // Use the ID of the created registration
       course_id:course,
        total_fees: fees,
        rem_fees: fees,
        status: true
      };
     
      const stcourse = await stude_course.create(stcourseData);
  
      response.status(201).json(new ApiResponse(true, "Student Registration Saved!", register, null));
    } catch (err) {
        console.log("ERROR VIEW",err)
      response.status(500).json(new ApiResponse(false, "Student Registration Not Saved!", null, err.message));
    }
  });
  
router.get('/list/reg',async(request,response)=>{
    try
    { 
    const data = await Registration.findAll({
        where: { status: true },
        attributes: {
            exclude: ["status", "createdAt", "updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true, "Registered Student List!", data, null))
    }
    catch(err)
    {
    response.status(500).json(new ApiResponse(false,"Student Registration List Not Found !",null,err.message))  
    }
})
    
//course,start_date,batch_timing,faculty,status
router.post('/batch_create',async(request,response)=>{
    const reqData = request.body;
    try
    {  
        const {course,start_date,batch_timing,faculty} = reqData;   
        const batch_Data = {course,start_date,batch_timing,faculty} 
        const batch = await Batch.create(batch_Data);   
        response.status(201).json(new ApiResponse(true,"Batch Saved !",batch,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Batch Not Saved !",null,err.message))
    }

})

router.get('/list/batch',async(request,response)=>{
    try
    { 
    const data = await Batch.findAll({
        where: { status: true },
        attributes: {
            exclude: ["status", "createdAt", "updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true, "Batches List!", data, null))
    }
    catch(err)
    {
    response.status(500).json(new ApiResponse(false,"Batches List Not Found !",null,err.message))  
    }
})

//student,batch,Status
router.post('/batch_stud',async (request,response)=>{
    const reqData = request.body;
    try
    {  
        const {student,batch} = reqData;   
        const batch_stud_Data = {student,batch} 
        const batch_stud = await StudBatch.create(batch_stud_Data);   
        response.status(201).json(new ApiResponse(true,"Student Saved In Batch !",batch_stud,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Student Not Saved !",null,err.message))
    }
  
})

//student, course, rec_no,fees_amount,status
router.post('/fees_add',async (request,response)=>{
    const reqData = request.body;
    try
    {  
        const {student,course, rec_no,fees_amount} = reqData;   
        const fees_Data = {student,course, rec_no,fees_amount,status:true} 
        const fees = await Fees.create(fees_Data);   
        response.status(201).json(new ApiResponse(true,"Fees is saved !",fees,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"fees Not Saved !",null,err.message))
    }
  
})
router.get('/list/batch_stud',async(request,response)=>{
    try
    { 
    const data = await StudBatch.findAll({
        where: { status: true },
        attributes: {
            exclude: ["status", "createdAt", "updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true, "Students in Batch List!", data, null))
    }
    catch(err)
    {
    response.status(500).json(new ApiResponse(false,"Students in Batch List Not Found !",null,err.message))  
    }
})
router.get('/list/fees',async(request,response)=>{
    try
    { 
    const data = await Fees.findAll({
        where: { status: true },
        attributes: {
            exclude: ["status", "createdAt", "updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true, "Fees Record List!", data, null))
    }
    catch(err)
    {
    response.status(500).json(new ApiResponse(false,"Fees Record List Not Found !",null,err.message))  
    }
})
router.get('/list/faculty',async(request,response)=>{
    try
    { 
    const data = await Faculty.findAll({
        where: { status: true },
        attributes: {
            exclude: ["status", "createdAt", "updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true, "Faculty List!", data, null))
    }
    catch(err)
    {
    response.status(500).json(new ApiResponse(false,"Faculty Not Found !",null,err.message))  
    }
})
router.put('/couns_change_password/:id', async (request, response) => {
             
    const us=request.user.userid;
          console.log(us)
  const us1=await Counsellor.findOne({
    where: {id:us}
  })
  console.log(us1)

const ps1=us1.password;
console.log(ps1)
const old1=request.body.oldPassword;
const new1=request.body.newPassword;
 if(ps1==old1){
 const newP= await Counsellor.update({password:new1},{
    where : {id:us}
});
console.log(newP)
if(newP[0]>0){
    response.status(201).json(new ApiResponse(true,"Password Updated !",null,null))
}else{
response.status(500).json(new ApiResponse(false,"Counsellor Not Found !",null,err.message))
    
}
 
 }else{
    
    response.status(500).json(new ApiResponse(false,"Old and New Password Does not Match !",null,"Password Doesnt Match"))
   
 }

})
module.exports = router