import express from 'express'
import { Server } from 'socket.io';

import http from 'http'


export const app = express()

export const server = http.createServer(app)
export const io =new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

export const getReceiverSocketId = (receiverId) =>{
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

