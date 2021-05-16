'use strict';
require('dotenv').config();
const base64 = require("base-64");
const supertest = require('supertest');
const server = require('../src/server.js');
require('@code-fellows/supergoose');

const request = supertest(server.app);


describe('test server', () => {
    it('to test if its create a new user in the signing up', async () => {
        const response = await request.post('/signup').send({
            username : 'reem',
            password : '1993'
        });
        expect(response.status).toEqual(200)
        expect(response.body.username).toEqual('reem');
        // expect(response.body.password).toEqual('1993');
      })
      it('to test if its log in as a user in the signing in', async () => {
        const user = base64.encode("reem:1993");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(200)
        expect(response.body.username).toEqual('reem');
      })
      it('to test if its fails to log in as an invalid user in the signing in', async () => {
        const user = base64.encode("rem:1993");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(403)
        // expect(response.body.password).toEqual('1993');
      })
      it('to test if its fails to log in with wrong password in the signing in', async () => {
        const user = base64.encode("reem:193");
        const response = await request.post('/signin').set('Authorization', `Basic ${user}`)
        expect(response.status).toEqual(403)
        expect(response.body.password).not.toEqual('1993');
      })
 
})