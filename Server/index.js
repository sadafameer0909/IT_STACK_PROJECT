const express = require('express')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const websRouter = require('./routers/WebsRouter')


dotenv.config();
const server = express()
// server.use(express.urlencoded())
// server.use(fileUpload())
// server.use(express.json())

server.get("/",(request,respose)=>
{
    respose.setHeader('Content-Type','text/html');
    respose.send(fs.readFileSync(path.join(__dirname,'apiDocs.html'),'utf-8'))
})

server.use("/browse",websRouter)



server.listen(process.env.PORT,()=>
{
    console.log(`Server Running http://localhost:${process.env.PORT}`)
});