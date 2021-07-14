const express=require('express');
const app=express();
const login=require('./routes/login');
const register=require('./routes/register');
const landing=require('./routes/landing');
const cors=require('cors');
const profilepic=require('./actions/profilepic');

app.use('/login',login);
app.use('/register',register);
app.use('/landing',landing);
app.use('/profilepic',profilepic)
app.use(cors());
app.use(express.json());


app.listen(4040,()=>{
    console.log("Server Listening");
})