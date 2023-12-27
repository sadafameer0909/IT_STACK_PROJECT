const express = require('express')
const router = express.Router()
const ApiResponse = require("../utils/ApiResponse")
 const jwt = require('jsonwebtoken')
 
const {Course,Admin} = require('../models');

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
              { expiresIn: '50m' }
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




module.exports = router

