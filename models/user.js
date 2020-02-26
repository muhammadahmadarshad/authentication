const mongoose=require('mongoose')
const joi=require('joi')
const jwt=require("jsonwebtoken")
const config=require('../config/default')
const User=mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    dob:{type:Date},
    password:{type:String, required:true},
    email:{type:String,required:true,unique:true}
})

User.methods.generateAuthToken=function(){
const token=jwt.sign({
    _id:this._id,
    first_name:this.first_name,
    last_name:this.last_name,
    dob:this.dob,
    password:this.password,
    email:this.email,

},config["jwt-key"]);

return token;

}

const Validation=(user)=>{
const Schema={
    first_name:joi.string()
    .min(5)
    .max(15)
    .required(),
    last_name:joi.string()
    .min(5)
    .max(50)
    .required(),
    email:joi.string()
    .min(7)
    .max(50)
    .email()
    .required()
    ,
    password:joi.string()
    .required()
    .min(5)
    .max(50)
    
    
}

return joi.validate(user,Schema)

}


const UserSchema=mongoose.model("User",User)

exports.UserSchema=UserSchema
exports.Validation=Validation