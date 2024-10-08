const express=require('express');
const router=express.Router();
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config')
const User =require('../models/User');
const {check,validationResult}=require('express-validator');
const {jwtSecret}=require("../config/keys")
//@route POST api/users
//@desc register a user
//@access public
router.post('/',[
    check('name','Name is required').not().isEmpty(), //combine .not() and .isEmpty() for checking feild is empty or not 
    check('email','Please enter a valid email').isEmail(),
    check('password','Please enter a password of 6 or more characters').isLength({min:6})
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body;
    try {
        let user=await User.findOne({email:email});
        if(user){
           return res.status(400).json({msg:"User already exists"});
        }
        user=new User({
            name:name,
            email:email,
            password:password
        })
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
        //for jwt token
        const payload={
            user:{
                id:user.id,
            }
        }
        jwt.sign(payload,jwtSecret,{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err;
            res.json({token})
        }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

module.exports=router;