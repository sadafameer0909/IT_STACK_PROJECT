const express = require('express')
const router = express.Router()
const {Enquiry,Registration,Fees,StudBatch,Faculty,Course,stude_course,Counsellor,user,sequelize,Batch} = require('../models');
const ApiResponse = require("../utils/ApiResponse");
const { Op } = require('sequelize');





router.use((request,response,next)=>{
    if(request.user.usertype=='counsellor'){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Account Disabled !"))
    }
})
// router.get('/list/enq',async(request,response)=>{
//     const data = await Enquiry.findAll({
//         where: { status: true },
//         attributes: {
//             exclude: ["status", "createdAt", "updatedAt"]
//         }
//     });
//     response.status(200).json(new ApiResponse(true, "Enquiry List!", data, null))
// })
router.post('/stud_enquiry',async(request,response)=>{
    const reqData = request.body;
    try
    {  
        const {enq_no,stud_name,mobile,qualification,clg_name,course,fees,placement,enq_type,feedback} = reqData;  
        const enq_date= new Date(); 
        const couns = await Counsellor.findOne({where:{Uuser:request.user.userid}});
        const counsellor=couns.id;
        const eq_Data = {enq_no,enq_date,stud_name,mobile,qualification,clg_name,course,counsellor,fees,placement,enq_type,feedback,status:true}
        const enq = await Enquiry.create(eq_Data);   
        response.status(201).json(new ApiResponse(true,"Enquiry Saved !",enq,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Enquiry Not Saved !",null,err.message))
    }
})

router.post('/stud_reg', async (request, response) => {
    const reqData = request.body;
    const couns = await Counsellor.findOne({where:{Uuser:request.user.userid}});
    const counsellor=couns.id;
    const tran=await sequelize.transaction()
    
    try {
        const{email}=reqData;
        const user1 = await user.create({
            email,
            password:12345,
            type: "student",
            status: true
        },{transaction:tran}
          );

      const {
        reg_no,enq_no,stud_name,mobile,gender,p_name,p_mobile,address,qualification,course,
      } = reqData;
  
      const date = new Date();
      const fees = reqData.fees;
      const counsellor=couns.id;
      // Create registration record
      const register = await Registration.create({ reg_no,enq_no, date,stud_name,email,password:12345,Uuser:user1.id, mobile,gender,
         counsellor,p_name, p_mobile,address,qualification,course,fees},{transaction:tran});
  
      console.log(register)

      // Create student course record
      const stcourseData = {
       
        student: register.id, // Use the ID of the created registration
       course_id:course,
        total_fees: fees,
        rem_fees: fees,
        status: true
      };
     
      const stcourse = await stude_course.create(stcourseData,{transaction:tran});
      tran.commit()
      response.status(201).json(new ApiResponse(true, "Student Registration Saved!", register, null));
    } catch (err) {
        tran.rollback();
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
router.post('/add_batch',async(request,response)=>{
    const reqData = request.body;
    try
    {  
        const {course,start_date,batch_timing,faculty} = reqData;   
        const batch_Data = {course,start_date,batch_timing,faculty,status:true} 
        const batch = await Batch.create(batch_Data);   
        response.status(201).json(new ApiResponse(true,"Batch Saved !",batch,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Batch Not Saved !",null,err.message))
    }

})
//student,batch,status
router.post('/add_stud_batch', async (request, response) => {

    const reqData = request.body;
try{
    const{student,batch}=reqData;
    const sbat_Data ={student,batch,status:true}
    const sbat = await StudBatch.create(sbat_Data);
 
    response.status(201).json(new ApiResponse(true,"Student Batch Saved !",sbat,null))
}catch(err){
    response.status(500).json(new ApiResponse(false,"Student Batch Not Saved !",null,err.message))
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

//student, course_id, rec_no,fees_amount,status
router.post('/fees_add',async (request,response)=>{
    const reqData = request.body;
    try
    {  
      
        const {student,course_id,rec_no,st_crs_id,fees_amount} = reqData;   
        console.log(reqData);
       
        const tfees=await stude_course.findOne({
            where:{id:request.body.st_crs_id}
        })
        console.log("Fess :",tfees.total_fees)
           const tot_fees=tfees.rem_fees;//total fees in fees table is rem fees from stud_course table
          const rem = tot_fees-request.body.fees_amount;
          console.log(rem);
           const fees_Data = {student,course_id,st_crs_id,rec_no,fees_amount,rem_amount:rem,status:true}

        const fees = await Fees.create(fees_Data);   

        await stude_course.update(
                    { rem_fees: rem },
                    {
                        where:{student}
                    });

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
router.put('/couns_change_password', async (request, response) => {
    try{         
    const us=request.user.userid;
          console.log(us)
  const us1=await user.findOne({
    where: {id:us}
  })
  console.log(us1)

const ps1=us1.password;
console.log(ps1)
const old1=request.body.oldPassword;
const new1=request.body.newPassword;
 if(ps1==old1){
 const newP= await user.update({password:new1},{
    where : {id:us}
});
console.log(newP)
if(newP[0]>0){
    response.status(201).json(new ApiResponse(true,"Password Updated !",null,null))
}else{
response.status(500).json(new ApiResponse(false,"Counsellor Not Found !",null,null))
    
}
 
 }else{
    
    response.status(500).json(new ApiResponse(false,"Old and New Password Does not Match !",null,"Password Doesnt Match")) 
 }

}catch(err){
  response.status(500).json(new ApiResponse(false,"Old and New Password Does not Match !",null,err.message)) 
}
})
router.get('/search_stud', async (req, res) => {

const { reg_no, stud_name, email } = req.body;

try {
  const conditions = {};

  if (reg_no) {
    conditions.reg_no = { [Op.like]: `%${reg_no}%` };
  }

  if (stud_name) {
    conditions.stud_name = { [Op.like]: `%${stud_name}%` };
  }

  if (email) {
    conditions.email = { [Op.like]: `%${email}%` };
  }

  const reg2 = await Registration.findAll({
    where: {
      [Op.or]: [conditions],
    },
  });

  if (reg2.length === 0) {
    // If no students are found, return a 404 Not Found status with an error message
    res.status(404).json({ error: 'No students found' });
  } else {
    // If students are found, return the array of students
    res.json(reg2);
  }
} catch (err) {
  console.error(err);
  response.status(500).json(new ApiResponse(false,"Error in Student data !",null,err.message))
}
});

router.get('/search_enq', async (req, res) => {

    const { enq_no, stud_name, mobile } = req.body;
    
    try {
      const conditions = {};
    
      if (enq_no) {
        conditions.reg_no = { [Op.like]: `%${enq_no}%` };
      }
    
      if (stud_name) {
        conditions.stud_name = { [Op.like]: `%${stud_name}%` };
      }
    
      if (mobile) {
        conditions.mobile = { [Op.like]: `%${mobile}%` };
      }
    
      const enq1 = await Enquiry.findAll({
        where: {
          [Op.or]: [conditions],
        },
      });
    
      if (enq1.length === 0) {
        // If no students are found, return a 404 Not Found status with an error message
        res.status(404).json({ error: 'No Enq Records found' });
      } else {
        // If students are found, return the array of students
        res.json(enq1);
      }
    } catch (err) {
      console.error(err);
      response.status(500).json(new ApiResponse(false,"No enq data found !",null,err.message))
    }
    });
    router.get('/search_fees', async (req, res) => {

        const { student, rec_no } = req.body;
        
        try {
          const conditions = {};
        
          if (student) {
            conditions.student = { [Op.like]: `%${student}%` };
          }
        
          if (rec_no) {
            conditions.rec_no = { [Op.like]: `%${rec_no}%` };
          }
        
          const fees2 = await Fees.findAll({
            where: {
              [Op.or]: [conditions],
            },
          });
        
          if (fees2.length === 0) {
            // If no students are found, return a 404 Not Found status with an error message
            res.status(404).json({ error: 'Fees Data not found' });
          } else {
            // If students are found, return the array of students
            res.json(fees2);
          }
        } catch (err) {
          console.error(err);
          response.status(500).json(new ApiResponse(false,"fees Data not found!",null,err.message))
        }
        });

//add multiple students in course

// router.post("/mul_stud_course", async(request,response)=>{
 
//  try{
//   const {student,course_id,total_fees,rem_fees}=request.body;
//  const std =  {student,course_id,total_fees,rem_fees,status:true}
//   const data=await stude_course.create(std);
//   response.status(200).json(new ApiResponse(true, " Data Saved!", data, null))
 
  
//  }catch(err){
//   console.log(err)
//   response.status(500).json({ error: 'Internal Server Error' });
//  }
// })
//=====================================================================================================

//data to be entered in table student FK from Registration table ,course_id FK from course table,total_fees,rem_fees
//    student,course_id,total_fees,rem_fees
router.post("/mul_stud_course", async (request, response) => {
  try {
    const studentDataArray = request.body;

    // Ensure that the request body is an array
    if (!Array.isArray(studentDataArray)) {
      return response.status(400).json({ error: 'Invalid request format. Expecting an array of students.' });
    }

    const createdData = [];

    // Iterate through each student in the array and await stude_course.create
    for (const studentData of studentDataArray) {
      const { student, course_id, total_fees, rem_fees } = studentData;
      const std = { student, course_id, total_fees, rem_fees, status: true };
      const data = await stude_course.create(std);
      createdData.push(data);
    }

    response.status(200).json(new ApiResponse(true, "Data Saved!", createdData, null));

  } catch (err) {
    console.log(err);
    response.status(500).json(new ApiResponse(false,"Data Not Saved !",null,err.message))
  }
});

router.get('/list/batch',async(request,response)=>{
  try
  { 
  const data = await Batch.findAll({
      where: { status: true },
      attributes: {
          exclude: ["status", "createdAt", "updatedAt"]
      }
  });
  response.status(200).json(new ApiResponse(true, "Batch List!", data, null))
  }
  catch(err)
  {
  response.status(500).json(new ApiResponse(false,"Batch List Not Found !",null,err.message))  
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
  response.status(200).json(new ApiResponse(true, "Fees List!", data, null))
  }
  catch(err)
  {
  response.status(500).json(new ApiResponse(false,"Fees List Not Found !",null,err.message))  
  }
})
router.get('/list/stude_course',async(request,response)=>{
  try
  { 
  const data = await stude_course.findAll({
      where: { status: true },
      attributes: {
          exclude: ["status", "createdAt", "updatedAt"]
      }
  });
  response.status(200).json(new ApiResponse(true, "Student Course List!", data, null))
  }
  catch(err)
  {
  response.status(500).json(new ApiResponse(false,"Student Course List Not Found !",null,err.message))  
  }
})
router.get('/list/studbatch',async(request,response)=>{
  try
  { 
  const data = await StudBatch.findAll({
      where: { status: true },
      attributes: {
          exclude: ["status", "createdAt", "updatedAt"]
      }
  });
  response.status(200).json(new ApiResponse(true, "Student Batch List!", data, null))
  }
  catch(err)
  {
  response.status(500).json(new ApiResponse(false,"Student Batch List Not Found !",null,err.message))  
  }
})
router.get('/list/enquiry',async(request,response)=>{
  try
  { 
  const data = await Enquiry.findAll({
      where: { status: true },
      attributes: {
          exclude: ["status", "createdAt", "updatedAt"]
      }
  });
  response.status(200).json(new ApiResponse(true, "Enquiry List!", data, null))
  }
  catch(err)
  {
  response.status(500).json(new ApiResponse(false,"Enquiry List Not Found !",null,err.message))  
  }
})


module.exports = router;


