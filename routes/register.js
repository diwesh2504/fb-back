const express=require('express');
const cors=require('cors');
const router=express.Router();

router.use(express.json());
router.use(cors());

const {dbURL,mongoClient}=require('../config/db.js')
const {hashing}=require('../config/auth.js')

router.post('/',async (req,res)=>{
    var {name,email_id,user_id,pass,gender,date_of_birth,user_id}=req.body;
    const client=await mongoClient.connect(dbURL,{ useNewUrlParser: true })
    try{
        const db=await client.db('socialmedia')
        const user=await db.collection('users').findOne({email_id});
        const search_by_ID=await db.collection('users').findOne({user_id})
        if(user || search_by_ID){
            res.status(400).send("User Already Exists")
        }else{
            var hash=await hashing(pass);
            var new_user=await db.collection('users').insertOne({name,email_id,user_id,password:hash,gender,date_of_birth,friends:[],verified:false})
            res.status(200).send("User Created Successfully")
        }
        
    }catch(err){
        console.log(err)
    }
})

module.exports=router