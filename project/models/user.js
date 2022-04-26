let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name:{
        type:String,
        required:[true,"Name is required"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name cannot be less than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"E-Mail Already exist"],
        

    },
    password:{
        type:String,
        required:[true,"Please Enter Password"],
        minLength:[8,"Password length shoud be between 8 to 20"],
        maxLength:[20,"Password length shoud be between 8 to 20"]
    }
})
module.exports=new mongoose.model("User",userSchema)
