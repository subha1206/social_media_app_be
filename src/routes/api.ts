import express from "express"

const userRouter = require('./user/user.routes');

const api = express.Router();

api.use('/user', userRouter);

module.exports = api;