let User = require('../models/user');
let catchAsyncErrors=require('../middlewares/catchAsyncErrors');
let errorHandler = require('../utils/errorHandler')
let sendToken = require('../utils/jwtToken')

// to get lists of users
exports.getAllUsers=catchAsyncErrors(async (req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    success:true,
    users
  })
});

// Get user by id

exports.getSingleUser=catchAsyncErrors(async (req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(
            new errorHandler(`user doesn't exist with Id ${req.params.id}`),
            400
        )

    }
    res.status(200).json({
        success:true,
        user
    })
});


// Add User
exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
  const {name,email,password}=req.body
  const user = await User.create({
  name,
  email,
  password
  
})
sendToken(user,201,res)
})


// update user

exports.updateUser=catchAsyncErrors(async (req,res,next)=>{
  let user = await User.findById(req.params.id);
  if (!user){
    return next(new errorHandler("Please Enter valid  id",400))
    
  }
  const newUser={
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  }
  await User.findByIdAndUpdate(req.params.id,newUser,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true
  })
})

// delete User
exports.deleteUser=catchAsyncErrors(async (req,res,next)=>{
  const user = await User.findById(req.params.id);
  if (!user){
    return next(new errorHandler('User Doesnt exist',400))
  }
  user.remove();
  res.status(200).json({
    success:true,
    message:"User Deleted Successfully"
  })
});


// login User
exports.loginUser=catchAsyncErrors(async (req,res,next)=>{
    const {email,password}=req.body
    if (!email || !password){
        return next(new errorHandler("please Enter Email & password",400))
    }
    const user=await User.findOne({email}).select("+password");
    if (!user){
        return next(new errorHandler("Please Enter valid E-mail",401))

    }
    const isPasswordMatched=await user.comparePassword(password);
    if (!isPasswordMatched){
        return next(new errorHandler("Please Enter Valid E-Mail or Password",401))
    }
sendToken(user,200,res)

} )
