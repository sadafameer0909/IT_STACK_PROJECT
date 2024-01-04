const express = require('express')
const router = express.Router()
const {Enquiry,Registration,Fees,StudBatch,Faculty,Course,StudCourse} = require('../models');
const ApiResponse = require("../utils/ApiResponse");


router.use((request,response,next)=>{
    if(request.user.userstatus==true){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Account Disabled !"))
    }
})

router.get('/batch_view', async (request, response) => {
    try {
        const studreg = request.user.userid;
        console.log('User Object:', request.user);
        console.log('Student Registration Number:', studreg);


        const data = await StudBatch.findAll({
            where: {
                student: studreg,
                status: true
            },
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
        const studentId = request.user.userid;

        // Find the student's batch record
        const fee1 = await Fees.findOne({
            where: {
                student: studentId,
                status: true
            },
            attributes: {
                exclude: ["status", "createdAt", "updatedAt"]
            }
        });

        if (!studentBatch) {
            // If no batch record found for the student
            response.status(404).json(new ApiResponse(false, "Fees record not found for the student!", null, null));
            return;
        }

        const { total_fees, rem_fees } = studentBatch;

        response.status(200).json(new ApiResponse(true, "Fees Records!", { total_fees, rem_fees }, null));
    } catch (err) {
        response.status(500).json(new ApiResponse(false, "Error fetching fees records!", null, err.message));
    }
});
router.put('/stud_change_password/:id', async (request, response) => {
             
    const us=request.user.userid;
          console.log(us)
  const us1=await Registration.findOne({
    where: {id:us}
  })
  console.log(us1)

const ps1=us1.password;
console.log(ps1)
const old1=request.body.oldPassword;
const new1=request.body.newPassword;
 if(ps1==old1){
 const newP= await Registration.update({password:new1},{
    where : {id:us}
});
console.log(newP)
if(newP[0]>0){
    response.status(201).json(new ApiResponse(true,"Password Updated !",null,null))
}else{
response.status(500).json(new ApiResponse(false,"Student Not Found !",null,err.message))
    
}
 
 }else{
    
    response.status(500).json(new ApiResponse(false,"Old and New Password Does not Match !",null,"Password Doesnt Match"))
   
 }

})
router.get('/stud_profile', async (request, response) => {
    try {
        const studr = request.user.userid;
        console.log('User Object:', request.user);
        console.log('Student Registration Number:', studr);


        const data = await Registration.findOne({
            where: {
                 id:studr,
                status: true
            },
            attributes: {
                exclude: ["password","fees","counsellor","status","date","enq_no", "createdAt", "updatedAt"]
            }
        });
        console.log('Student View Data:', data);

        response.status(200).json(new ApiResponse(true, "Student Records!", data, null));
    } catch (err) {
        response.status(500).json(new ApiResponse(false, "Student records not found!", null, err.message));
    }
});

module.exports = router;

  module.exports = router