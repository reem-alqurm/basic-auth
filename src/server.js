'use strict';

const express = require('express');
const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const UserModel = require('./auth/models/users-model');
const { response } = require('express');
const userRouter = require('./auth/router');

const app = express();

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(userRouter);



function listen (PORT){
  app.listen(PORT,()=>{
    console.log(`Hello form ${PORT}`);
  });
}

module.exports={
  app,
  listen
};