const mongoose=require('mongoose');
const multer=require('multer')

const Grid=require('gridfs-stream');
const { dbURL } = require('./db');

const conn=mongoose.createConnection(dbURL);



module.exports={conn,multer,Grid,mongoose}