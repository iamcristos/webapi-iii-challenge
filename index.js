// code away!
const express = require('express');
const {logger} = require('./middleware/middleware');
const userRoute = require('./users/userRouter');
const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(logger);
server.use('/api/user', userRoute);
server.get('/', (req,res)=>{
    res.status(200).json({
        status: 200,
        message: "welcome user"
    })
})
server.listen(PORT, ()=>{
    console.log(`server is listening at ${PORT}`)
})