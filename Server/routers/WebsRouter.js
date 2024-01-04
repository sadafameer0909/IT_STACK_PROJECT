const express = require('express')
const router = express.Router()
const ApiResponse = require("../utils/ApiResponse")
 const jwt = require('jsonwebtoken')
 
const {Course,Admin,Counsellor,Registration} = require('../models');

    router.post("/admin_login",async (request, response) => {
        // console.log(request.body)
        const {email,password} = request.body;
        try {
          const user = await Admin.findOne({
            where: { email, password }
          });
          if (user == null) {
            response
              .status(500)
              .json(new ApiResponse(false, "Invalid User , Wrong Email or Password !"));
          } else {
            const token = jwt.sign(
              {
                userid: user.id,
                useremail:user.email
              },
              process.env.TOKEN_SECRET,
              { expiresIn: '500m' }
            );
          
            response.status(200).json(
              new ApiResponse(true, "Login Success!", {
                token,
              }, null)
            );
          }
        } catch (err) {
          response
            .status(500)
            .json(new ApiResponse(false, "Login Failed !", null, err.message));
        }
       
      });


router.get("/list/course",async (request,response)=>
{
    const data = await Course.findAll({
        where : {status:true},
        attributes:{
            exclude : ["status","createdAt","updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true,"Course Data !",data,null)) 
})
//email,password
router.post("/couns_login", async (request, response) => {
  const reqData = request.body
  try {
      const { email, password } = reqData;
      const counsellor = await Counsellor.findOne({
          where: { email, password }
      });
      if (counsellor == null) {
          response.status(500).json(new ApiResponse(false, "Invalid User,Wrong Email or Password !"));
      }
      else {
          const token = jwt.sign({ userid: counsellor.id,useremail:counsellor.email,userstatus:counsellor.status }, process.env.TOKEN_SECRET, { expiresIn: '50m' });
          response.status(200).json(new ApiResponse(true, "Counsellor Login Success!", { token }, null));
      }
  } catch (err) {
      response.status(500).json(new ApiResponse(false, "Login Failed !", null, err.message));
  }
})
//reg_no,password
router.post("/stud_login", async (request, response) => {
  const reqData = request.body
  try {
      const { reg_no, password } = reqData;
      const reg1 = await Registration.findOne({
          where: { reg_no, password }
      });
      if (!reg1) {
        response.status(401).json(new ApiResponse(false, "Invalid User, Wrong reg_no or Password!"));
    } else if (!reg1.status) {
        response.status(401).json(new ApiResponse(false, "Account is inactive!"));
    } else {
        const token = jwt.sign(
            { userid: reg1.id, user: reg1.reg_no, userstatus: reg1.status },
            process.env.TOKEN_SECRET,
            { expiresIn: '500m' }
        );
        response.status(200).json(new ApiResponse(true, "Student Login Success!", { token }, null));
      }
  } catch (err) {
      response.status(500).json(new ApiResponse(false, "Login Failed !", null, err.message));
  }
})
module.exports = router

//email,password
router.post("/fac_login", async (request, response) => {
  const reqData = request.body
  try {
      const {email,password} = reqData;
      const faculty = await Faculty.findOne({
          where: {email,password}
      });
      if (faculty == null) {
          response.status(500).json(new ApiResponse(false, "Invalid User,Wrong Email or Password !"));
      }
      else {
          const token = jwt.sign({ userid: faculty.id, useremail: faculty.email }, process.env.TOKEN_SECRET, { expiresIn: '50m' });
          response.status(200).json(new ApiResponse(true, "Faculty Login Success!",{ token },null));
      }
  } catch (err) {
      response.status(500).json(new ApiResponse(false, "Login Failed !", null, err.message));
  }
})



module.exports = router

