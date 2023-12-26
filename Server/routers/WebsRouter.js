const router = require('express').Router()
const ApiResponse = require("../utils/ApiResponse")

// const jwt = require('jsonwebtoken')
const {Course,Admin} = require('../models');

router.post("/login",(request,response)=>{
    response.send("Hello")
})



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

