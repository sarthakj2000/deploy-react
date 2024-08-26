const mongoose=require('mongoose');
const config=require('config');

const {mongoURI} =require("../config/keys")

const connectDB= ()=>{

       

        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
    

   
}
module.exports=connectDB;