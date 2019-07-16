// code away!
const express = require('express');
const {logger} = require('./middleware/middleware');
const userRoute = require('./users/userRouter');
const postRoute = require('./posts/postRouter');
const dotenv = require('dotenv');

const server = express();
dotenv.config();

const PORT = process.env.PORT;

server.use(express.json());
server.use(logger);
server.use('/api/user', userRoute);
server.use('/api/post', postRoute)
server.get('/', (req,res)=>{
    res.status(200).json({
        status: 200,
        message: "welcome user"
    })
})
server.listen(PORT, ()=>{
    console.log(`server is listening at ${PORT}`)
})