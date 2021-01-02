const mongoose=require('mongoose')
const{ObjectId} = mongoose.Schema.Types

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
   pic:{
       type:String,
       default:"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
   }
})

mongoose.model("User",userSchema)