const express = require('express')
const router = express.Router()
const {Enquiry,Registration,Fees,StudBatch,Faculty,Course,stude_course,Batch} = require('../models');
const ApiResponse = require("../utils/ApiResponse");


router.use((request,response,next)=>{
    if(request.user.usertype=='student'){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Account Disabled !"))
    }
})
router.get('/batch_view', async (request, response) => {
    try {
      
        console.log('User Object:', request.user);
        const us1=await Registration.findOne ({
        where: {
            Uuser: request.user.userid
        },
        attributes: {
            exclude: ["status", "createdAt", "updatedAt"]
        }
    });
    console.log(us1)
               
        const data = await StudBatch.findAll({
            where: {
                student: us1.id,
                status: true
            },
            include: [
                { model: Batch, as: 'batchdata' }
              ],
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"]
            }
        });
        console.log('Batch View Data:', data);

        response.status(200).json(new ApiResponse(true, "Batch Records!", data, null));
    } catch (err) {
        response.status(500).json(new ApiResponse(false, "Batch records not found!", null, err.message));
    }
});



router.get('/fees_view', async (request, response) => {
    try {
        const uid = request.user.userid;
        
        const fee1 = await Registration.findOne({   
            where: {
                Uuser: uid
            },
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"]
            }
        });
     console.log(fee1.Uuser)
         const regId=fee1.id;
        // Find the student's batch record
        const fee2 = await stude_course.findOne({   
            where: {
                student: regId,
                status: true
            },
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"]
            }
        });

         response.status(200).json(new ApiResponse(true, "Fees Records!", fee2,null));
    } catch (err) {
        response.status(500).json(new ApiResponse(false, "Error fetching fees records!", null, err.message));
    }
});
router.put('/stud_change_password', async (request, response) => {
     
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
    response.status(500).json(new ApiResponse(false,"Student Not Found !",null,null))
        
    }
     
     }else{
        
        response.status(500).json(new ApiResponse(false,"Old and New Password Does not Match !",null,"Password Doesnt Match")) 

    }
    
    }catch(err){
      response.status(500).json(new ApiResponse(false,"Old and New Password Does not Match !",null,err.message)) 
    }
    })

router.get('/stud_profile', async (request, response) => {
    try {
        const studr = request.user.userid;
        console.log('User Object:', request.user);
        console.log('Student Registration Number:', studr);


        const data = await Registration.findOne({
            where: {
                 Uuser:studr,
                //status: true
            },
            attributes: {
                exclude: ["password","fees","counsellor","date","enq_no","Uuser", "createdAt", "updatedAt"]//"status"
            }
        });
        console.log('Student View Data:', data);

        response.status(200).json(new ApiResponse(true, "Student Records!", data, null));
    } catch (err) {
        response.status(500).json(new ApiResponse(false, "Student records not found!", null, err.message));
    }
});
router.get('/stud_course_view', async (request, response) => {
    try {
        const uid = request.user.userid;
        
        const reg1 = await Registration.findOne({   
            where: {
                Uuser: uid
            },
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"]
            }
        });
     console.log(reg1.Uuser)
         const regId=reg1.id;
        // Find the student's batch record
        const crs1 = await stude_course.findOne({   
            where: {
                student: regId,
                status: true
            },
            include: [
                { model: Course, as: 'crs_data' }
              ],
            attributes: {
                exclude: ["total_fees","rem_fees","status", "createdAt", "updatedAt"]
            }
        });


        response.status(200).json(new ApiResponse(true, "Course Data!", crs1, null));
    } catch (err) {
        response.status(500).json(new ApiResponse(false, "Course Data not found!", null, err.message));
    }
});

module.exports = router;
