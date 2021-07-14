const express=require('express');
const cors=require('cors');
const router=express.Router();

router.use(express.json());
router.use(cors());

const {hashCompare,createJWT}=require('../config/auth.js');
const {dbURL,mongoClient}=require('../config/db');

router.post('/',async (req,res)=>{
    console.log(req.body);
    var {id,pass}=req.body;
    try{
        const client=await mongoClient.connect(dbURL,{ useNewUrlParser: true })
        const db=await client.db('socialmedia')
        const user=await db.collection('users').findOne({email_id:id});
        console.log(user)
        if(user){
            const compare=await hashCompare(pass,user.password)
            if(compare){
                //Generate JWT if passwords match
                const token=await createJWT(user.user_id,user._id,user.friends)
                res.json({
                    token,
                    text:"Login Success"
                })
            }else{
                res.json(404).json({
                    text:"Invalid Password!"
                })
            }
        }else if(!user){
            res.status(403).json({
                text:"No Account Registered with Email ID!"
            })
        }
    }catch(err){
        console.log(err);
        res.json({text:"err"});
    }
})

module.exports=router