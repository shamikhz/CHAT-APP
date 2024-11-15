import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { connect } from './config.js';
import { chatModel } from './chat.schema.js';
import { timeStamp } from 'console';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'], 
  },
});

io.on('connection', (socket) => {
  console.log('Connection is established');
  socket.on("join",(data)=>{
    socket.username=data;
    chatModel.find().sort({timeStamp:1})
    .then(message=>{
      socket.emit("load_message",message)
    }).catch(err=>{
      console.log(err)
    })
  })
  // Listen for "new_message" event and broadcast it to all other clients
  socket.on('new_message', (message) => {
    let usermessage={
      username:socket.username,
      message:message
    }

    const newChat=new chatModel({
      username:socket.username,
      message:message,
      timeStamp:new Date()
    })
    newChat.save()
    // Broadcast to all other clients except the sender
    socket.broadcast.emit('broadcast_message',usermessage);
  });

  socket.on('disconnect', () => {
    console.log('Connection is disconnected');
  });
});

server.listen(3001, () => {
  console.log('App is listening on port 3000');
  connect()
});
