// create server 
const express=require('express')
const cookieParser = require('cookie-parser');
const authroutes=require('./routes/auth.routes')
const foodroutes=require('./routes/food.routes')
const foodpartnerroutes=require('./routes/food-partner.routes')
const app=express();
const dotenv=require('dotenv').config
const cors=require('cors');
app.use(cors({
origin:"http://localhost:5173",credentials:true
}))
app.use(express.json())
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("HELLO")
})

app.use('/api/auth',authroutes);
app.use('/api/food',foodroutes);
app.use('/api/food-partner',foodpartnerroutes);
module.exports=app