import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import teamRoutes from './routes/team.js';
import offerRoutes from './routes/offer.js';
import connectionRoutes from './routes/connectionrequest.js';

const app = express();  
dotenv.config();

const PORT = process.env.PORT || 5000;


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

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
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
