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

    let user;
    UserSchema.findOne({email:body.email})
    .then(res=>{
        user=res
    })
    .catch(err=>{
        console.log("Error.")
    })
   
    if(user)
        res.status(400).send("Already exists.")
    
        
           let User=new UserSchema(body)
           const salt= await  bycrypt.genSalt(10)
           User.password=await bycrypt.hash(User.password,salt)
            User.save().then((res)=>{
                console.log("User saved.")

            })
            .catch(()=>{
                console.log("not saved")
            })
           const token=User.generateAuthToken()
        res.header('auth',token)
        .send(token)
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

    res.send(token)


})

router.get("/",(req,res)=>{

    res.send("Hello")
})


router.get("/me",auth,async(req,res)=>{

    const result=await UserSchema.findById(req.user._id)
    res.send(result)
})





module.exports=router