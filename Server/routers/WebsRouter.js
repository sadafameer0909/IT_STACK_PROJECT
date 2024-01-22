const express = require('express')
const router = express.Router()
const ApiResponse = require("../utils/ApiResponse")
 const jwt = require('jsonwebtoken')
 
const {Course,Admin,Counsellor,Registration,user} = require('../models');

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user1 = await user.findOne({
      where: { email, password }
    });
    if (user1 == null) {
      response
        .status(500)
        .json(new ApiResponse(false, "Invalid User , Wrong Email or Password !"));
    } else {
      const token = jwt.sign(
        {
          userid: user1.id,
         usertype: user1.type
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '500m' }
      );
      // Data User Name .....
      //Get User's name---------------------------
      let usertype = user1.type;

      response.status(200).json(
        new ApiResponse(true, "Login Success!", {
          token,
          usertype
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

