// import { Room } from './../service/gameRoom-service';
// import { wsActionHandler } from '../service/wsActionHandler';
// import http from "http";
// import url from "url";
// import WebSocket, { RawData, WebSocketServer } from "ws";
// import { GameRoomService, MessageType } from "../service/gameRoom-service";
// import { RoomDto } from '../dtos/room-dto';


// export class WebSocketController {
//    private gameRoomService: GameRoomService
//    private ws: WebSocketServer
//    private actionHandler: wsActionHandler
//    constructor(server: http.Server, gameRoomService: GameRoomService, wsActionHandler: wsActionHandler) {
//       this.gameRoomService = gameRoomService
//       this.ws = new WebSocketServer({ server })
//       this.actionHandler = wsActionHandler
//       this.ws.on("connection", this.handleConnection.bind(this))
//    }

//    private handleMessage(message: RawData, roomId: string, username: string) {
//       const decodedMessage: MessageType = JSON.parse(message.toString())
//       console.log(decodedMessage)
//       const room = this.gameRoomService.getRoomById(roomId)
//       if (room) {
//          const client = room.users[username]
//          this.gameRoomService.updateUserState(room, username, decodedMessage.payload)
//          this.gameRoomService.broadCastToRoom(room, { roomId: room.id, users: room.users })
//       }
//    }

//    private handleConnection(connection: WebSocket, request: http.IncomingMessage) {
//       const queryParams = url.parse(request.url || "", true).query;
//       const { username, action, roomId } = queryParams;
//       if (typeof username !== 'string' || typeof action !== 'string' || typeof roomId !== 'string') {

//          //Add error exceptions
//          console.log("Invalid username or type in request");
//          return;
//       }
//       this.actionHandler.handleAction(action, {
//          username,
//          roomId,
//          connection
//       });

//       const firstMessage = this.gameRoomService.getRoomById(roomId)
//       if (firstMessage)
//          connection.send(JSON.stringify({ type: "ROOM_DATA", payload: new RoomDto(firstMessage) }));

//       connection.on("message", (message) => {
//          // console.log(message)
//          this.handleMessage(message, roomId, username)
//       }
//       );
//    }
// }