const express=require('express')
const router=express.Router()
const {UserSchema,Validation}=require('../models/user')
const bycrypt=require('bcryptjs')
const auth=require('../middlewares/auth')
router.post('/signup',async (req,res)=>{
    const {body}=req;
    console.log(body)
    const {error}=Validation(body)
    if(error)
        res.status(400).send(error.details[0].message)

    let user=await UserSchema.findOne({email:body.email})
   
    if(user)
        res.status(400).send("Already exists.")
    
        
           let User=new UserSchema(body)
           const salt= await  bycrypt.genSalt(10)
           User.password=await bycrypt.hash(User.password,salt)
           let i =await User.save()
           console.log(i)
           const token=User.generateAuthToken()
           if(token)
           {
            res.header('auth',token)
            .send({
                   token,
                   authentication:true        
               })
           }
           res.status(400).send({
               token,
               authentication:false        
           })

})

router.post("/login", async(req,res)=>{

    const {body}=req
    console.log(body)
    const user=await UserSchema.findOne({email:body.email})
    console.log(user)
    if(!user)
    {
        res.status(400).send("Invalid Email or Password.")
    }
    const validPassword = await bycrypt.compare(body.password, user.password);
    if (!validPassword) 
        return res.status(400).send("Invalid Email or Password.");
    const token=user.generateAuthToken()   
    if(token)
    {
        res.send({
            token,
            authentication:true        
        })
    }
    res.status(400).send({
        token,
        authentication:false        
    })


})


router.get("/me",auth,async(req,res)=>{
    console.log(req.user)
    const result=await UserSchema.findById(req.user._id)
    res.send(result)
})





module.exports=router