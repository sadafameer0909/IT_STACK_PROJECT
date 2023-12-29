const express = require('express')
const router = express.Router()
const {Enquiry,Registration,Fees,StudBatch,Faculty} = require('../models');
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
        const {} = reqData;    
        const co_Data = {co_name,email,mobile,password} 
        const couns = await Enquiry.create(co_Data);   
        response.status(201).json(new ApiResponse(true,"Counsellor Saved !",couns,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Counsellor Not Saved !",null,err.message))
    }
})
//reg_no,enq_no,date,stud_name,password,gender,mobile,p_name,p_mobile,address,stud_course,qualification,counsellor,status
router.post('/stud_reg',async(request,response)=>{
    const reqData = request.body;
    try
    {  
        const {reg_no,enq_no,stud_name,mobile,gender,p_name,p_mobile,address,qualification,stud_course} = reqData;
        const date= new Date(); 
        const password = 12345;
        const counsellor = request.user.userid;  
        const reg_Data = {reg_no,enq_no,date,stud_name,mobile,password,gender,p_name,p_mobile,address,stud_course,qualification,counsellor} 
        const register = await Registration.create(reg_Data);   
        response.status(201).json(new ApiResponse(true,"Student Registration Saved !",register,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Student Registration Not Saved !",null,err.message))
    }
})

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

module.exports = router