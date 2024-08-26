const express=require('express');
const connectDB=require('./config/db');

const app=express();
//connect database
connectDB();
const PORT=process.env.PORT || 5000;
//Init Middleware
app.use(express.json({extented:true}));//for req.body


// app.get('/',(req,res)=>res.json({msg:'welcome to the contact keeper api'}));
//Define Routes
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

if(process.env.NODE_ENV=="production"){
    const path=require("path")
    app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT,()=>console.log(`Server started on ${PORT}`));