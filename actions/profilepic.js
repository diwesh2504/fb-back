const express=require('express');
const router=express.Router();
const cors=require('cors');
const {conn,Grid,mongoose,multer}=require('../config/upload');
const {GridFsStorage}=require('multer-gridfs-storage');

router.use(express.json())
router.use(cors())
let gfs;
conn.once('open',()=>{
    gfs=Grid(conn.db,mongoose.mongo)
    gfs.collection('profilepics')
});
const storage = new GridFsStorage({
    url:"mongodb://localhost:27017/socialmedia",
    file:(req, file) => {
      if (file.mimetype === 'image/jpeg') {
        return {
          filename:'profile_pic'+req.body.user_id,
          bucketName: 'profilepics'
        };
      } else {
        return null;
      }
    }
  });

const upload=multer({storage})
router.post("/upload",upload.single('profile_pic_upload'),async (req,res)=>{
  res.json({"file":req.file})
})
router.get("/viewprofilepic/:id", async (req,res)=>{
  gfs.files.find({filename:`profile_pic${req.params.id}`}).toArray((err,files)=>{
    if(files){
      res.status(200).json(files)
    }else{
      res.status(404).json({text:"No Profile Pic"})
    }
    if(err){
      console.log(err)
    }
  })
})
module.exports=router