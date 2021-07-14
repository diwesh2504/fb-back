const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require('dotenv').config()

const hashing = async(value)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        // console.log("Salt-",salt);

        const hashed = await bcrypt.hash(value,salt);
        // console.log("hashed-",hashed);
        return hashed;

    } catch (error) {
        return error;
    }
}

const hashCompare = async(password,hashValue)=>{
    try {
        return await bcrypt.compare(password,hashValue)
    } catch (error) {
        return error;
    }
}

const createJWT = async (user_id,obj_id,friends)=>{
    return await JWT.sign(
        {
            user_id,obj_id,friends
        },
        process.env.SECRET_KEY
        
    )
}

const authenticate = async (req,res,next)=>{
    try {
        //check if the token is present
        const bearereToken = await req.headers.authorization
        if(bearereToken){
            JWT.verify(bearereToken,process.env.SECRET_KEY,(err,decode)=>{
                if(decode !== undefined){
                    req.body.auth=true;
                    req.body.decode=decode;
                    next()
                }else{
                    req.body.auth=false;
                    next()
                }
            })
        }else{
            return res.sendStatus(403)
        }
        
        //check whether it is valid
        //if valid allow the user
    } catch (error) {
        
    }
}
module.exports={hashing,hashCompare,createJWT,authenticate};