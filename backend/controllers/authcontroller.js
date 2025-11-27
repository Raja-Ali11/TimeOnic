const User=require("../models/models.js")
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")

  const signup=async (req,res)=>{
    
    const {username,email,password}=req.body
    try{
        const existinguser=await User.findOne({email:email});
        if (existinguser){
            return res.status(400).json({message:"user already exist "});

        }
        const hasedpassword=await bcrypt.hash(password,10);

        const result=await User.create({
            email:email,
            password:hasedpassword,
            username:username,

        })

        const token=jwt.sign({email:email, id:result._id},process.env.SECRET_KEY)
        res.status(201).json({user:result, token:token});

    }catch(error){
        console.log(error);
    }

}

  const signin=async (req,res)=>{
    const {username,email,password}=req.body
    try{
        const existinguser=await User.findOne({email:email});
        if (!existinguser){
            return res.status(404).json({message:"invalid user"});
        }

        const matchpassword= await bcrypt.compare(password, existinguser.password)
        if(!matchpassword){
            return res.status(400).json({message:"invalid credential"})

            }
         const token=jwt.sign({email:existinguser.email ,id:existinguser._id },process.env.SECRET_KEY, { expiresIn: '1d' });
          res.status(201).json({user:existinguser, token:token});

        console.log("User login successfully");
        }catch(error){
        console.log(error)
    }



}
module.exports = { signup,signin };