const express = require('express');
const socket = require ('socket.io')
const http = require('http');


const app = express()

const server = http.createServer(app)
const io = socket(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

  const getReceiverSocketId = (receiverId) =>{
    return userSocketMap[receiverId]
 }

       const userSocketMap = {}      // {userId => socket.id}
// io.on  is used to connect to the server
io.on('connection',(socket)=>{
  console.log("User connected",socket.id);
       const userId = socket.handshake.query.userId
       if(userId !== undefined) {
        userSocketMap[userId] = socket.id
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap))  ;     
                     // backend se frontend me data bhejta he io.emit

    socket.on('disconnect',()=>{
        console.log("User disconnected",socket.id);
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))  ;       
    })
    
})

module.exports ={app,server,io,getReceiverSocketId}