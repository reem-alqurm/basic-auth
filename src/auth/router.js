'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/users-model');
const basicAuth = require('./middleware/basic.js');

router.post('/signup', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new User(req.body);
        const record = await user.save(req.body);
        res.status(201).json(record);
    } catch (e) { res.status(403).send("Error Creating User"); }
});


router.post('/signin', basicAuth,(req, res) => {
    res.status(200).json(req.user);
});

module.exports=router;