const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const {check,validationResult}=require('express-validator');
const Contact =require('../models/Contact');
//@route GET api/contacts
//@desc get all user contacts
//@access private
router.get('/',auth,async (req,res)=>{
    try{
        const contacts=await Contact.find({user:req.user.id}).sort({date:-1});
        return res.json(contacts);
    }
    catch(err){
        console.log(err.message);
        res.send('server error'); 
    }
})
//@route Post api/contacts
//@desc add new contact
//@access private
router.post('/',[auth,[
    check('name','Name is required').not().isEmpty()
]],async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,phone,type}=req.body;
    try{
        const newContact=new Contact({
            name:name,
            email:email,
            phone:phone,
            user:req.user.id,
        });
        const contact=await newContact.save();
        res.json(contact);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
})

//@route PUT api/contacts/:id
//@desc update contact
//@access private
router.put('/:id',auth,async(req,res)=>{
    const {name,email,phone,type}=req.body;
    //build contactFields
    const contactFields={};
    if(name){
        contactFields.name=name
    }
    if(email){
        contactFields.email=email
    }
    if(phone){
        contactFields.phone=phone
    }
    if(type){
        contactFields.type=type
    }

    try{
        let contact=await Contact.findById(req.params.id);
        if(!contact){
            return res.status(400).json({msg:"Contact not found"});
        }
        //make sure user owns the contact
        if(contact.user.toString()!==req.user.id){
            return res.status(401).json({msg:'Not authorized'});
        }
        contact=await Contact.findByIdAndUpdate(req.params.id,
        {$set:contactFields},
        {new:true});
        res.json(contact);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
})

//@route DELETE api/contacts/:id
//@desc delete contact
//@access private
router.delete('/:id',auth,async(req,res)=>{
    try{
        let contact=await Contact.findById(req.params.id);
        if(!contact){
            return res.status(400).json({msg:"Contact not found"});
        }
        //make sure user owns the contact
        if(contact.user.toString()!==req.user.id){
            return res.status(401).json({msg:'Not authorized'});
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg:"contact removed"});

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
})

module.exports=router;