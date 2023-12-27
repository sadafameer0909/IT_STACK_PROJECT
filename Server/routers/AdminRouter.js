const router = require('express').Router()
const ApiResponse = require("../utils/ApiResponse");
const {Admin,Counsellor,Faculty,Course} = require('../models');

router.use((request,response,next)=>{
    if(request.user.useremail=='admin@itstack.in'){
        console.log("in admin log")
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Only Admin Allowed !"))
    }
})
//co_name,email,mobile,password,status
router.post("/counsellor_reg",async (request,response)=>
{  console.log("in couns log")
    const reqData = request.body;
    try
    {  
        const {co_name,email,mobile,password} = reqData;  
        console.log("reqData"+reqData)  
        const co_Data = {co_name,email,mobile,password} 
        console.log("co_Data"+co_Data)  
        const couns = await Counsellor.create(co_Data); 

    
        response.status(201).json(new ApiResponse(true,"Counsellor Saved !",couns,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Counsellor Not Saved !",null,err.message))
    }
})
//f_name,email,mobile,password,status
router.post("/faculty_reg",async (request,response)=>
{  
    const reqData = request.body;
    try
    {  
        const {f_name,email,mobile,password} = reqData;  
        const f_Data = {f_name,email,mobile,password}   
        const fac = await Faculty.create(f_Data); 

    
        response.status(201).json(new ApiResponse(true,"Faculty Saved !",fac,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Faculty Not Saved !",null,err.message))
    }
})
//crs_name,crs_duration,crs_fees,crs_image,syllabus,status
router.post("/add_course",async (request,response)=>{

    const reqData = request.body;
try{
    const{crs_name,crs_duration,crs_fees,crs_image,syllabus}=reqData;
    const crs_Data ={crs_name,crs_duration,crs_fees,crs_image,syllabus}
    const crs = await Course.create(crs_Data);
 
    response.status(201).json(new ApiResponse(true,"Course Saved !",crs,null))
}catch(err){
    response.status(500).json(new ApiResponse(false,"Course Not Saved !",null,err.message))
}

})






module.exports = router