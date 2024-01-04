const router = require('express').Router()
const ApiResponse = require("../utils/ApiResponse");
const {Counsellor,Faculty,Course,Registration,Fees,Batch,StudBatch,Admin} = require('../models');

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
        const co_Data = {co_name,email,mobile,password,status:true} 
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

router.put("/couns_update/:id",async (request,response)=>
{
    const id = request.params.id;
    const {co_name,mobile} = request.body;

    try{
        const couns1 = await Counsellor.update({co_name,mobile},{
            where : {id}
        });
        response.status(201).json(new ApiResponse(true,"Counsellor data Updated !",couns1,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Counsellor data Not Updated !",null,err.message))
    }
})

router.put("/faculty_update/:id",async (request,response)=>
{
    const id = request.params.id;
    const {f_name,mobile} = request.body;

    try{
        const fac1 = await Counsellor.update({f_name,mobile},{
            where : {id}
        });
        response.status(201).json(new ApiResponse(true,"Faculty data Updated !",fac1,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Faculty data Not Updated !",null,err.message))
    }
})
router.put("/course_update/:id",async (request,response)=>
{
    const id = request.params.id;
    const {crs_name,crs_duration,crs_fees} = request.body;

    try{
        const crs = await Course.update({crs_name,crs_duration,crs_fees},{
            where : {id}
        });
        response.status(201).json(new ApiResponse(true,"Course data Updated !",crs,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Course data Not Updated !",null,err.message))
    }
})
router.patch("/couns_status/:id",async (request,response)=>
{
    const id = request.params.id;

    try{
        var couns2 = await Counsellor.findOne({
            where : {id}
        })
        if(couns2==null)
        {
            response.status(500).json(new ApiResponse(false,"Counsellor Not Found !",null,null))
        }else
        {
            couns2.status = !couns2.status;
            couns2.save();
            response.status(200).json(new ApiResponse(true,"Counsellor Status Changed !",null,null))
        }
        
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Counsellor Not Updated !",null,err.message))
    }
})
router.patch("/faculty_status/:id",async (request,response)=>
{
    const id = request.params.id;

    try{
        var fac2 = await Faculty.findOne({
            where : {id}
        })
        if(fac2==null)
        {
            response.status(500).json(new ApiResponse(false,"Faculty Not Found !",null,null))
        }else
        {
            fac2.status = !fac2.status;
            fac2.save();
            response.status(200).json(new ApiResponse(true,"Faculty Status Changed !",null,null))
        }
        
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Faculty Not Updated !",null,err.message))
    }
})
router.patch("/course_status/:id",async (request,response)=>
{
    const id = request.params.id;

    try{
        var crs1 = await Course.findOne({
            where : {id}
        })
        if(crs1==null)
        {
            response.status(500).json(new ApiResponse(false,"Course Not Found !",null,null))
        }else
        {
            crs1.status = !crs1.status;
            crs1.save();
            response.status(200).json(new ApiResponse(true,"Course Status Changed !",null,null))
        }
        
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Course Not Updated !",null,err.message))
    }
})
//reg_no,enq_no,stud_name,password,gender,mobile,p_name,p_mobile,
//address,stud_course,qualification,counsellor
router.put('/reg_update/:id',async (request,response)=>
    {
        const id = request.params.id;
        const {reg_no,enq_no,stud_name,password,gender,mobile,p_name,p_mobile,address,stud_course,qualification} = request.body;
    
        try{
            const reg1 = await Registration.update({reg_no,enq_no,stud_name,password,gender,mobile,p_name,p_mobile,address,stud_course,qualification},{
                where : {id}
            });
            response.status(201).json(new ApiResponse(true,"Registration data Updated !",reg1,null))
        }catch(err){
            response.status(500).json(new ApiResponse(false,"Registration data Not Updated !",null,err.message))
        }
    })
    
    router.put('/fees_update/:id',async (request,response)=>
    {
        const id = request.params.id;
        const {student,course,rec_no,fees_amount} = request.body;
    
        try{
            const fees1 = await Fees.update({student,course,rec_no,fees_amount},{
                where : {id}
            });
            response.status(201).json(new ApiResponse(true,"Fees data Updated !",fees1,null))
        }catch(err){
            response.status(500).json(new ApiResponse(false,"Fees data Not Updated !",null,err.message))
        }
    })
    router.get('/list/reg',async(request,response)=>{
        try
        { 
        const data = await Registration.findAll({
            where: { status: true },
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"]
            },
            include: [
                {
                  model: Course,
                  as: 'course_info',
                  attributes: ["crs_name","crs_fees"]
                },
            ]
        });
        response.status(200).json(new ApiResponse(true, "Registered Student List!", data, null))
        }
        catch(err)
        {
        response.status(500).json(new ApiResponse(false,"Student Registration List Not Found !",null,err.message))  
        }
    })

    router.get('/list/couns',async(request,response)=>{
        try
        { 
        const data = await Counsellor.findAll({
            where: { status: true },
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"]
            }
        });
        response.status(200).json(new ApiResponse(true, "Registered Counsellor List!", data, null))
        }
        catch(err)
        {
        response.status(500).json(new ApiResponse(false,"Student RCounsellor List Not Found !",null,err.message))  
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
        response.status(200).json(new ApiResponse(true, "Registered Faculty List!", data, null))
        }
        catch(err)
        {
        response.status(500).json(new ApiResponse(false,"Student Faculty List Not Found !",null,err.message))  
        }
    })
    router.patch("/batch_status/:id",async (request,response)=>
    {
        const id = request.params.id;
    
        try{
            var bat = await Batch.findOne({
                where : {id}
            })
            if(bat==null)
            {
                response.status(500).json(new ApiResponse(false,"Batch Not Found !",null,null))
            }else
            {
                bat.status = !bat.status;
                bat.save();
                response.status(200).json(new ApiResponse(true,"Batch Status Changed !",null,null))
            }
            
        }catch(err){
            response.status(500).json(new ApiResponse(false,"Batch Not Updated !",null,err.message))
        }
    })
    router.patch("/stud_batch_status/:id",async (request,response)=>
    {
        const id = request.params.id;
    
        try{
            var sbat = await StudBatch.findOne({
                where : {id}
            })
            if(sbat==null)
            {
                response.status(500).json(new ApiResponse(false,"Student Batch Not Found !",null,null))
            }else
            {
                sbat.status = !sbat.status;
                sbat.save();
                response.status(200).json(new ApiResponse(true,"Student Batch Status Changed !",null,null))
            }
            
        }catch(err){
            response.status(500).json(new ApiResponse(false,"Student Batch Not Updated !",null,err.message))
        }
    })
    router.put('/admin_change_password/:id', async (request, response) => {
             
        const us=request.user.userid;
              console.log(us)
      const us1=await Admin.findOne({
        where: {id:us}
      })
      console.log(us1)
    
    const ps1=us1.password;
    console.log(ps1)
    const old1=request.body.oldPassword;
    const new1=request.body.newPassword;
     if(ps1==old1){
     const newP= await Admin.update({password:new1},{
        where : {id:us}
    });
    console.log(newP)
    if(newP[0]>0){
        response.status(201).json(new ApiResponse(true,"Password Updated !",null,null))
    }else{
    response.status(500).json(new ApiResponse(false,"Admin Not Found !",null,err.message))
        
    }
     
     }else{
        
        response.status(500).json(new ApiResponse(false,"Old and New Password Does not Match !",null,"Password Doesnt Match"))
       
     }
    
    })

module.exports = router