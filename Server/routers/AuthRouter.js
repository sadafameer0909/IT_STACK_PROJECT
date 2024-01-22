const express = require('express');
const router = express.Router();
const ApiResponse = require('../utils/ApiResponse');
const adminRouter = require('./AdminRouter');
const counsellorRouter = require('./CounsellorRouter');
const studRouter=require('./StudRouter');
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
                const {userid,useremail,userreg_no,usertype} = tokendata
                request.user = { userid, useremail, userreg_no, usertype};
                // const token = authHeader && authHeader.split(' ')[1];
                // console.log('Tokendata:', tokendata);

                next()
            }
        })
    }
})

router.use("/admin", adminRouter);
router.use('/couns',counsellorRouter);
router.use('/stud',studRouter)


module.exports = router
