const {authenticate} =require('../config/auth')
const express=require('express')
const router=express.Router()
const cors=require('cors')
router.use(express.json())
router.use(cors())

router.post("/",[authenticate],async (req,res)=>{
    try{
        res.json({isAuth:req.body.auth,decode:req.body.decode})
    }catch(err){
        res.staus(403)
    }
})

module.exports=router