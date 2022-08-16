const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cookieParserSocket = require('socket.io-cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const redisConn = require('./utils/redis-client');
const { getDashboardData } = require('./services/dashboard-service');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/faker', require('./routes/faker'));
app.use('/api/users', require('./routes/user'));
app.use('/api/dashboard', require('./routes/dashboard'));

const port = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
global.io = io.use(cookieParserSocket());
global.io = io.on('connection', async (socket) => {
  // console.log('A socket user connected');
  try {
    const data = await getDashboardData();
    socket.emit('dashboard', data);
  } catch (e) {
    console.log('socket send error!');
    socket.emit('dashboard', {});
  }
});

async function redisStart() {
  await redisConn.defaultConn();
}
redisStart();

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(port, () => {
      console.log(
        `\n\nmongodb is connected!\nserver: http://localhost:${port}`
      );
    });
  })
  .catch((err) => console.log(err));
