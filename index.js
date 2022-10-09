import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import teamRoutes from './routes/team.js';
import offerRoutes from './routes/offer.js';
import connectionRoutes from './routes/connectionrequest.js';
import message from './routes/message.js';
// import {addUser, removeUser, getUserChat, getUsersInRoom} from "./controllers/user.js";
// import { Server } from "socket.io";
// import http from 'http';

const app = express();  
dotenv.config();
// const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
// const PORT2 = process.env.PORT2 || 7000;

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello PilihPartner');
})

app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/offer', offerRoutes);
app.use('/connectionrequest', connectionRoutes);
app.use('/message', message);

// const io = new Server({
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   //on means dia nunggu front end emit sesuatu
//   //emit berarti ngirim sesuatu ke front end

//   console.log(socket)

//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if(error) return callback(error); //if error send error message

    
//     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});//ngirim ke specific user
//     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });//ngirim ke semua user
    
//     socket.join(user.room);

//     io.to(user.room)
//     // .emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUserChat(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });
//     io.to(user.room).emit('roomData', { user: user.room, users: getUsersInRoom(user.room) });
 
//     callback();
//   });

// });

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => (
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))),
    // server.listen(PORT2, () => console.log(`Server has started on Port: http://localhost:${PORT2}`))
    )
  .catch((error) => console.log(`${error} did not connect`));


// const http = require('http');

// const testmodule = require('./testmodule')

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     console.log(url)
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end(testmodule);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//instalasi backend -> npm init, trus ikutin panduannya
//lalu install express -> npm i express --save
//cara jalanin -> node .
