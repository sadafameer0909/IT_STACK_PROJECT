const express = require('express')
const router = express.Router()
const ApiResponse = require("../utils/ApiResponse");


router.use((request,response)=>{
    if(request.user.userstatus=="true"){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Account Disabled !"))
    }
})
//enq_no,enq_date,stud_name,mobile,qualification,clg_name,course,counsellor,fees,placement,enq_type,feedback,status
router.post('/enquiry',async(request,response)=>{
    const reqData = request.body;
    try
    {  
        const {} = reqData;    
        const co_Data = {co_name,email,mobile,password} 
        const couns = await Counsellor.create(co_Data);   
        response.status(201).json(new ApiResponse(true,"Counsellor Saved !",couns,null))
    }catch(err)
    {
        response.status(500).json(new ApiResponse(false,"Counsellor Not Saved !",null,err.message))
    }
})
router.post('/registration',(request,response)=>{
    
})
router.post('/batch_create',(request,response)=>{
    
})
router.post('/fees',(request,response)=>{
    
})
router.post('/enquiry',(request,response)=>{
    
})

module.exports = router