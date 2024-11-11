import http from "http";
import url from "url";
import WebSocket, { RawData, WebSocketServer } from "ws";
import { GameRoomService } from "../service/gameRoom-service";

export class WebSocketController {
   private gameRoomService: GameRoomService
   private ws: WebSocketServer
   private roomId: string = ''
   constructor(server: http.Server, gameRoomService: GameRoomService) {
      this.gameRoomService = gameRoomService
      this.ws = new WebSocketServer({ server })
      this.ws.on("connection", this.handleConnection.bind(this))
   }

   private handleMessage(message: RawData, roomId: string, username: string) {
      const decodedMessage = JSON.parse(message.toString())
      const room = this.gameRoomService.getRoomById(roomId)
      if (room) {
         const client = room.users[username]
         this.gameRoomService.updateUserState(room, username, decodedMessage)
         this.gameRoomService.broadCastToRoom(room, room.users)
      }
   }
   private handleConnection(connection: WebSocket, request: http.IncomingMessage) {
      const { username, action } = url.parse(request.url || "", true).query;
      if (typeof username !== 'string' || typeof action !== 'string') {
         console.log("Invalid username or type in request");
         return;
      }

      switch (action) {
         case "NEW_ROOM": {
            console.log(this, this.gameRoomService)
            const { roomId, room } = this.gameRoomService.createRoom()
            this.roomId = roomId

            // ADD LINK CREATOR
            console.log(roomId)
            this.gameRoomService.addClient(room, username)
            this.gameRoomService.addConnection(room, username, connection)

            break
         }
         case "JOIN_ROOM": {
            const { roomId } = url.parse(request.url || "", true).query;
            if (typeof roomId === 'string') {
               this.roomId = roomId
            }
            const room = this.gameRoomService.getRoomById(typeof roomId === 'string' ? roomId : '');
            if (room) {
               this.gameRoomService.addClient(room, username)
               this.gameRoomService.addConnection(room, username, connection)
            }
            break
         }
         default:
            console.log(`Unknown message type: ${action}`)
      }

      connection.on("message", (message) => this.handleMessage(message, this.roomId, username))
   }

}