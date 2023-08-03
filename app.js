const express = require("express");
const http = require ("http");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//*********** DEFINE SCHEMA *****************
const ContactSchema = new mongoose.Schema({
 name: String,
 mob: String,
 mail: String,
 address: String,
 more: String,
});

const conatct = mongoose.model('contact', ContactSchema);

//Express Stuff
app.use('/static', express.static('static'));//serving static files
app.use(express.urlencoded());

//SetUp pug
app.set('view engine','pug');
app.set('views' , path.join(__dirname,'views'));

//ENDPOINTS
app.get('/',(req,res)=>{
 const params ={}
 res.render('index.pug',params);
})
app.get('/contact',(req,res)=>{
 const params ={}
 res.render('contact.pug',params);
})


app.post('/contact',(req,res)=>{
 var myData = new conatct(req.body);
 myData.save().then(()=>{
   res.send("This data has been saved in the database")
 }).catch(()=>{
  res.send(400).send("Item was not saved to the database")
 })
})

//Server
app.listen(80 , ()=>{
 console.log("The server is running at Port 80");
})