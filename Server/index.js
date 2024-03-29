const express = require('express')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const websRouter = require('./routers/WebsRouter')
const authRouter = require('./routers/AuthRouter')
const fileUpload = require('express-fileupload')
const cors=require('cors')


dotenv.config();
const server = express()
server.use(express.urlencoded())
server.use(express.json())
server.use(cors())
server.use(fileUpload())
 server.use(express.json())

server.get("/",(request,response)=>
{
    response.setHeader('Content-Type','text/html');
    response.send(fs.readFileSync(path.join(__dirname,'apiDocs.html'),'utf-8'))
})

server.use("/browse",websRouter)
server.use("/auth",authRouter)


server.listen(process.env.PORT,()=>
{
    console.log(`Server Running http://localhost:${process.env.PORT}`)
});
