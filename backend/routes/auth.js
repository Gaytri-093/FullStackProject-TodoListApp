const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');

//SignIn
router.post("/register", async(req,res)=>{
    try{
        const {email,username,password} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const existUser = await User.findOne({email});
        const user = new User({email, username , password:hashPassword});
        if(existUser){
            res.status(200).json({message : "User Already Exist"});
            return;
        }  
        await user.save().then(()=>res.status(200).json({message:"SignUp successfull"}))
    }catch(error){
        console.log(error);
        res.status(400).json({message:"Internal Server Error"});

        
    }
});


//LogIn OR SignIn

router.post("/signin", async(req,res)=>{
    try{
       const user = await User.findOne({email:req.body.email});
       if(!user){
        res.status(200).json({message:"Please SignUp First"});

       }
       const ispasswordCorrect = bcrypt.compareSync(req.body.password,user.password);
       if(!ispasswordCorrect){
        res.status(200).json({message:"Password is Not Correct"});

       }
       //password and other things
       const {password , ...others}= user._doc;
        res.status(200).json({others});

    }catch(error){
        console.log(error);
        res.status(400).json({message:"Internal Server Error"});

        
    }
});


module.exports = router;