const crypto = require("crypto");
const cloudinary = require("cloudinary");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");

const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const User = require("../models/userSchema")

/* ===================================================
        Register User  (/api/v1/create/user) (req : POST)
   =================================================== */
   exports.resigsterUser = catchAsyncError(async (req, res, next) => {
    const { email, name, password, age } = req.body;
    if (!email | !password) {
      return next(new ErrorHandler("Please enter username & password", 400));
    }
    const user = await User.find({email});

    // if(user){
    //   return next(new ErrorHandler("This email is created", 400));
    // }
    await User.create({email, password, age, name})
    res.status(200).json({
        success:true,
        messaage:"Successfully Register"
    })
   
  });
  
  /* ===================================================
        Login User User  (/api/v1/login/user) (req : POST)
   =================================================== */
   exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email | !password) {
      return next(new ErrorHandler("Please enter username & password", 400));
    }
    const user  = await User.findOne({email}).select("+password");
    if(!user){
           return next(new ErrorHandler("Invalid Email & Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid username or password", 401));
    }
    sendToken(user, 200, res);
   
  });
  