const express=require('express');
const router = express.Router()
const ApiResponse = require("../utils/ApiResponse");
const {user,Counsellor,Faculty,Course,Registration,Fees,Batch,StudBatch,Admin,sequelize} = require('../models');
const fileUpload = require('express-fileupload')
const {v4:uuidv4}=require('uuid');
const path=require('path')
const fs = require('fs')

router.use((request,response,next)=>{
    if(request.user.usertype=='admin'){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Account Disabled !"))
    }
})
//co_name,email,mobile,password,status
router.post("/counsellor_reg",async (request,response)=>
{  console.log("in couns log")
    const reqData = request.body;
    const tran=await sequelize.transaction()
    try
    {  
        const{email,password}=reqData;
            const user1 = await user.create({
                email,
                password,
                type: "counsellor",
                status: true},{transaction:tran}
              );
        const {co_name,mobile} = reqData;  
        console.log("reqData"+reqData)  
        const co_Data = {co_name,email,mobile,password,Uuser:user1.id} 
        console.log("co_Data"+co_Data)  
        const couns = await Counsellor.create(co_Data,{transaction:tran}); 

        tran.commit()
        response.status(201).json(new ApiResponse(true,"Counsellor Saved !",couns,null))
    }catch(err)
    {  tran.rollback();
        response.status(500).json(new ApiResponse(false,"Counsellor Not Saved !",null,err.message))
    }
})
//f_name,email,mobile,password,status
router.post("/faculty_reg",async (request,response)=>
{  console.log("faculty log")
    const reqData = request.body;
    const tran=await sequelize.transaction()
    try
    {  
        const{email,password}=reqData;
            const user1 = await user.create({
                email,
                password,
                type: "faculty",
                status: true},{transaction:tran}
              );
        const {f_name,mobile} = reqData;  
        console.log("reqData"+reqData)  
        const f_Data = {f_name,email,mobile,password,Uuser:user1.id} 
        console.log("F_Data"+f_Data)  
        const fac1 = await Faculty.create(f_Data,{transaction:tran}); 

        tran.commit()
        response.status(201).json(new ApiResponse(true,"Faculty Saved !",fac1,null))
    }catch(err)
    {  tran.rollback();
        response.status(500).json(new ApiResponse(false,"Faculty Not Saved !",null,err.message))
    }
})
//crs_name,crs_duration,crs_fees,crs_image,syllabus,status
// router.post("/add_course",async (request,response)=>{

//   //  const reqData = request.body;
// try{
//     const uploadFile = request.files.crs_image;
//     if(uploadFile==null||uploadFile==undefined)
//     {
//         response.status(500).json(new ApiResponse(false,"Image not uploaded !",null,null))
//     }else{
//         if(uploadFile.mimetype.includes("image/"))
//         {
//             const name=uuidv4()+path.extname(uploadFile.name);
//             const filePath='./uploads/'+name;
//               uploadFile.mv(filePath)
//     // const{crs_name,crs_duration,crs_fees,crs_image,syllabus}=reqData;
//     // const crs_Data ={crs_name,crs_duration,crs_fees,crs_image,syllabus,status:true}

//     const data={...request.body,crs_image:name,status:true}
//     const crs = await Course.create(data);
//     const imageUrl = '/uploads/' + name;
//     response.status(201).json(new ApiResponse(true,"Course Saved !",crs,null))
//         }else{
//             response.status(500).json(new ApiResponse(false,"Course image wrong Format !",null,"Wrong Format")) 
//         }}
    
// }catch(err){
//     response.status(500).json(new ApiResponse(false,"Course Not Saved !",null,err.message))
// }
// })
router.post("/add_course",async (request,response)=>{
      try {
        const { crs_name, crs_duration, crs_fees } = request.body;
        const imageFile = request.files.crs_image;
        const syllabusFile = request.files.syllabus; // Assuming you have a 'syllabus' field in your form
    
        if (!imageFile || !syllabusFile) {
          return response.status(400).json(new ApiResponse(false, "Both image and syllabus files are required!", null, null));
        }
    
        // Check if the image file is an image (you can add more image mime types if needed)
        if (!imageFile.mimetype.includes("image/")) {
          return response.status(400).json(new ApiResponse(false, "Image file must be an image!", null, "Wrong Format"));
        }
    
        // Check if the syllabus file is a PDF
        if (syllabusFile.mimetype !== 'application/pdf') {
          return response.status(400).json(new ApiResponse(false, "Syllabus file must be a PDF!", null, "Wrong Format"));
        }
    
        // Generate unique filenames using uuid
        const imageFileName = uuidv4() + path.extname(imageFile.name);
        const syllabusFileName = uuidv4() + path.extname(syllabusFile.name);
    
        const imagePath = './uploads/Pic/' + imageFileName;
        const syllabusPath = './uploads/Pdfs/' + syllabusFileName;
    
        // Move the uploaded files to the server
        imageFile.mv(imagePath);
        syllabusFile.mv(syllabusPath);
    
        const data = {
          crs_name,
          crs_duration,
          crs_fees,
          crs_image:imagePath,
          syllabus:syllabusPath,
          status: true,
        };
        const crs = await Course.create(data);
        response.status(201).json(new ApiResponse(true, "Course Saved!", crs, null));
      } catch (err) {
        console.error(err);
        response.status(500).json(new ApiResponse(false, "Course Not Saved!", null, err.message));
      }
    });
    
    module.exports = router;
    
  
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
//where: { status: true },
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
        response.status(500).json(new ApiResponse(false," Faculty List Not Found !",null,err.message))  
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
    router.put('/admin_change_password', async (request, response) => {
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
     if(ps1==old1){c
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
  //course,start_date,batch_timing,faculty,status
     router.post('/add_batch', async (request, response) => {

            const reqData = request.body;
        try{
            const{course,start_date,batch_timing,faculty}=reqData;
            const bat_Data ={course,start_date,batch_timing,faculty,status:true}
            const bat = await Batch.create(bat_Data);
         
            response.status(201).json(new ApiResponse(true,"Batch Saved !",bat,null))
        }catch(err){
            response.status(500).json(new ApiResponse(false,"Batch Not Saved !",null,err.message))
        }
        })

        router.patch("/change_course_image/:id",async (request,response)=>
        {
            const cid = request.params.id;
            
            try{
                var crs3 = await Course.findOne({
                    where : {id:cid}
                })
                if(crs3==null)
                {
                    response.status(500).json(new ApiResponse(false,"Course Not Found !",null,null))
                }else
                {  
                    if(request.files.crs_image==undefined || request.files.crs_image==null || request.files.crs_image==undefined)
                    {
                        response.status(500).json(new ApiResponse(false,"Course Image Not Uploaded !",null,null))
                    }else
                    {
                        const uploadFile = request.files.crs_image;
                        if(uploadFile.mimetype.includes("image/"))
                        {
                                fs.unlinkSync(path.join(crs3.crs_image));
        
                                const name = uuidv4() + path.extname(uploadFile.name);
                                const filePath = './uploads/Pic/'+name;
                                uploadFile.mv(filePath)
                                console.log(filePath)
                                crs3.crs_image = filePath;
                                crs3.save();
                                response.status(200).json(new ApiResponse(true,"Course Image Changed !",null,null))
                        }else{
                            response.status(500).json(new ApiResponse(false,"Course Image Wrong Format !",null,null))
                        }
                    }
                }
                
            }catch(err){
                console.error(err);
                response.status(500).json(new ApiResponse(false,"Course Image Not Updated !",null,err.message))
            }
        })    
    //course, batch, fees, student course, student batch, enquiry

module.exports = router