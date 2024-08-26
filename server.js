const express=require('express');
const connectDB=require('./config/db');
const path=require('path')
const app=express();
//connect database
connectDB();
const PORT=process.env.PORT || 5000;
//Init Middleware
app.use(express.json({extented:true}));//for req.body
app.get("/",(req,res)=>{res.send("heloo")})

// app.get('/',(req,res)=>res.json({msg:'welcome to the contact keeper api'}));
//Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));


app.listen(PORT,()=>console.log(`Server started on ${PORT}`));