const express = require('express');
const router = express.Router();
const ApiResponse = require('../utils/ApiResponse');
const adminRouter = require('./AdminRouter');
const jwt = require('jsonwebtoken');

router.use((request,response,next)=>{
    const authHeader = request.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null || token== undefined || token.length==0)
    {
        response.status(500).json(new ApiResponse(false, "Token Not Found !", null, "Token Not Provided"))
    }
    else
    {
        jwt.verify(token,process.env.TOKEN_SECRET,(err,tokendata)=>{
            if(err)
            {
                response.status(500).json(new ApiResponse(false, "Token Expire !", null, "Token Expired")) 
            }
            else
            {
                const { userid, useremail } = tokendata;
                request.user = { userid, useremail };
                console.log('Authenticated User:', request.user);
                 
                next()
            }
        })
    }
})

router.use("/admin", adminRouter);


module.exports = router
