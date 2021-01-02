const express =require ('express')
// const cors =require ('cors')

const app =express()
const PORT = process.env.PORT || 5000;
const mongoose =require('mongoose')
const {mongo_link} = require('./key')


mongoose.connect(mongo_link,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb")
})

mongoose.connection.on('error',(err)=>{
    console.log("error",err)
})



require('./models/user')
require('./models/createPost')

app.use(express.json())
// app.use(cors()) 

app.use(require('./router/auth'))
app.use(require('./router/postCreate'))
app.use(require('./router/Others'))

const custommiddleware =(req,res,next)=>{
    console.log("middleware executed")
    next()
}
// app.use(custommiddleware)

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})