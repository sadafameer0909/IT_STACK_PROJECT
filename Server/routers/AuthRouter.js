const express = require('express');
const router = express.Router();
const ApiResponse = require('../utils/ApiResponse');
const adminRouter = require('./AdminRouter');
const counsellorRouter = require('./CounsellorRouter');
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
                const {userid,useremail,userstatus} = tokendata
                request.user = {userid,useremail,userstatus}
                next()
            }
        })
    }
})

router.use("/admin", adminRouter);
router.use('/couns',counsellorRouter)


module.exports = router
