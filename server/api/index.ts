import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index';
import errorMiddleware from './middlewares/error-middleware';
import { WebSocket, WebSocketServer } from 'ws';
import http from 'http';
import url from 'url';
import { v4 as uuidv4 } from 'uuid';

const PORT: number = Number(process.env.PORT) || 5000;
const app: Express = express();
const server = http.createServer(app)
const wsServer = new WebSocketServer({ server })


const rooms: { [key: string]: Room } = {};

const createRoom = () => {
   const roomId = uuidv4()
   rooms[roomId] = {
      id: roomId,
      users: {},
      connections: {}
   }
   return roomId
}

const getRoom = (roomId: any) => {
   return rooms[roomId] || null
}

const broadCastToRoom = (roomId: any, message: any) => {
   var room = rooms[roomId]
   if (!room) return
   message = JSON.stringify(message)
   console.log("🚀 ~ broadCastToRoom ~ message:", message)
   Object
      .keys(room.connections)
      .forEach(uuid => {
         const connection = room.connections[uuid]
         connection.send(message)
      })
}


const handleMessage = (bytes: any, roomId: any, userId: any) => {
   const message = JSON.parse(bytes.toString())
   console.log("message:", message)
   const room = rooms[roomId]
   console.log("🚀 ~ handleMessage ~ room:", room)

   if (!room) return

   const user = room.users[userId]
   console.log("🚀 ~ handleMessage ~ user:", user)

   user.state = message

   console.log("try happen")
   broadCastToRoom(roomId, room.users)
}

type Room = {
   id: string;
   users: { [key: string]: any };
   connections: { [key: string]: WebSocket };
};

wsServer.on("connection", (connection, request) => {

   const { username, roomId: roomIdParam } = url.parse(request.url || "", true).query as any;

   // Перевіряємо, чи користувач хоче підключитись до існуючої кімнати або створити нову
   let roomId = roomIdParam;
   if (!roomId || !rooms[roomId]) {
      roomId = createRoom();  // Створюємо нову кімнату, якщо не задано roomId або кімнати не існує
   }

   const room = rooms[roomId];
   const userId = uuidv4();

   room.connections[userId] = connection;
   room.users[userId] = { username, state: {} };

   // Відправляємо новому користувачу інформацію про його кімнату
   connection.send(JSON.stringify({ roomId }));

   connection.on("message", (message) => handleMessage(message, roomId, userId));

   // Видаляємо користувача з кімнати після відключення
   connection.on("close", () => {
      delete room.connections[userId];
      delete room.users[userId];

      // Якщо в кімнаті більше немає користувачів, видаляємо кімнату
      if (room.users.length === 0) {
         delete rooms[roomId];
      }
   });
});



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL as string);
      server.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
   } catch (e) {
      console.error(e);
   }
};

start();