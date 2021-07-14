const mongodb=require('mongodb');
const dbURL="mongodb://localhost:27017";
const mongoClient=mongodb.MongoClient;


module.exports={dbURL,mongoClient}