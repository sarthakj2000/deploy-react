const express=require('express');
const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config')
const User =require('../models/User');
const auth=require('../middleware/auth');
const {jwtSecret}= require("../config/keys")
const {check,validationResult}=require('express-validator');
const router=express.Router();
//@route GET api/auth
//@desc get logged in user
//@access private
router.get('/',auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
})
//@route POST api/auth
//@desc Auth user & get token
//@access public
router.post('/',[
    check('email','Please include a email').isEmail(),
    check('password','password is required').exists()
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        const payload={
            user:{
                id:user.id,
            }
        }
        jwt.sign(payload,jwtSecret,{
            expiresIn:3600000
        },(err,token)=>{
            if(err) throw err;
            res.json({token:token});
        });

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
})
module.exports=router;