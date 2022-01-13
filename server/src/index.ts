import express, { NextFunction } from 'express'
import { Socket } from "socket.io"
import v1Router from './routes/v1/index';
import v2Router from './routes/v2/index';

const app = express()
const server = require("http").Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ['GET', 'POST'],
    },
  });

// CORSを許可する
app.use(function(req: express.Request, res:express.Response, next:NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Max-Age', '86400');
  next();
});
// JSONオブジェクトの受信設定
app.use(express.json())
// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use('/v1', v1Router);
app.use('/v2', v2Router);

io.on('connection', function (socket: Socket) {
    console.log('A Websocket connection Established');
    setInterval(() => getApiAndEmit(socket), 3000);
});

const getApiAndEmit = (socket: Socket) => {
  let num: number = Math.floor(Math.random() * 10 + 1)
  const response: string = num.toString();
  socket.emit("FromAPI", response);
};

const PORT = process.env.SERVER_PORT || 3001;
server.listen(PORT, () => {
    console.log(`port is running : ${PORT}`)
})