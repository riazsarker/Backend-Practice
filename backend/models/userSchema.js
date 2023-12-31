const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password :{
        type:String
    },
    age:{
        type:Number,
    }, 
    role:{
      type:String,
      default : "User"
    }
})
//Hashing Password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
  });
  
  //JWT Token
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  //Compare Password
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
  };
  
  //Generating Password Reset Token
  userSchema.methods.getResetPasswordToken = function () {
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
  };
module.exports = mongoose.model("user",userSchema)