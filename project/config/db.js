const mongoose=require('mongoose')
const connect=mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
}).then(()=>{
    console.log('database connected successfully')
}).catch((err)=>{
    console.log('error in connection')
})
module.exports=connect
