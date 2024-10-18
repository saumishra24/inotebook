const mongoose = require('mongoose')
require('dotenv').config();
const db_pass = process.env.DB_PASS;
const mongoURI = `mongodb+srv://test:${db_pass}@cluster0.8bfbbjk.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0`;
// const mongoURI = "mongodb://localhost:27017/inotebook";
const connectToMongo = () =>{
  mongoose.connect(mongoURI).then(
    () =>{console.log("connected to Mongo successfully")},
    () => {console.log("couldn't connect to mongoose")}
  )
}

module.exports = connectToMongo;
