'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const User = require('../models/users-model');

module.exports = async (req, res,next)=> {
   
    console.log(req.headers);
    let basicHeader = req.headers.authorization.split(' ');
    let encoded = basicHeader.pop(); 
    console.log("encoded -----> ", encoded)
    let decoded = base64.decode(encoded); 
    let [username, password] = decoded.split(':'); 
    console.log(`username: ${username} password: ${password}`)
    
    try{
    const user = await User.findOne({username: username});
    const valid = await bcrypt.compare(password, user.password);
if (valid) {
    req.user = user;
    next();
    } else {
        res.status(403).send('Wrong username or password');
    }}
    catch(e){
      res.status(403).send('Wrong username!');
    }
};

