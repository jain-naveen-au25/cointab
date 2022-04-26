const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors=require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


let isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies;
    if (!token){
        return next(errorHandler("Please Login to Access this resource",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next()
})
exports.module = isAuthenticatedUser
