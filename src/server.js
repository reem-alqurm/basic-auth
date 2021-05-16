'use strict';

const express = require('express');
const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const UserModel = require('./auth/models/users-model');
const { response } = require('express');

const app = express();

app.use(express.json())

app.use(express.urlencoded({extended: true}))


app.post('/signin', async (req, res)=> {
   
    console.log(req.headers);
    let basicHeader = req.headers.authorization.split(' ');
    let encoded = basicHeader.pop(); 
    console.log("encoded -----> ", encoded)
    let decoded = base64.decode(encoded); 
    let [username, password] = decoded.split(':'); 
    console.log(`username: ${username} password: ${password}`)
    
    try{
    const user = await UserModel.findOne({username: username});
    console.log("user -----> ", user);
    const valid = await bcrypt.compare(password, user.password);
    console.log("valid : ", valid)
if (valid) {
        res.status(200).json(user);
    } else {
        res.status(403).send('Wrong username or password');
    }}
    catch(e){
      res.status(403).send('Wrong username!');
    }
});

app.post('/signup', async (req, res)=> {
    
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel(req.body);
        const record = await user.save();
        res.status(200).json(user);
    } catch(e) {
      console.log(e);
        res.status(403).send('Error Happened!');
    }
   
});

function listen (PORT){
  app.listen(PORT,()=>{
    console.log(`Hello form ${PORT}`);
  });
}

module.exports={
  app,
  listen
};