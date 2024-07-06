require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(express.json())
const mongoose = require('mongoose')
const cors = require('cors')

const productsRouter = require('./router/product.route')
const usersRouter = require('./router/users.route')
const httpStatusText = require('./utils/httpStatusText')

const uri = process.env.MONGO_URL

mongoose.connect(uri).then(()=>{
    console.log('db connected')
 })

app.use(cors())

app.use('/api/products',productsRouter)
app.use('/api/users',usersRouter)

app.all('*',(req,res,next)=>{
    return res.status(400).json({status:httpStatusText.ERROR,data:null,massage:'this resource is not available'.massage,code:400})
})

app.use((error,req,res,next)=>{
    return res.status(error.statusCode || 500).json({status:error.statusText || httpStatusText.ERROR,message:error.message,code:error.statusCode||500,data:null})
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('listening on port: 3000')
})