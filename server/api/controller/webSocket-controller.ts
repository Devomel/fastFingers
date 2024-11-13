import { wsActionHandler } from './../service/webSocket/wsActionHandler';
import http from "http";
import url from "url";
import WebSocket, { RawData, WebSocketServer } from "ws";
import { GameRoomService } from "../service/gameRoom-service";

export class WebSocketController {
   private gameRoomService: GameRoomService
   private ws: WebSocketServer
   private actionHandler: wsActionHandler
   constructor(server: http.Server, gameRoomService: GameRoomService, wsActionHandler: wsActionHandler) {
      this.gameRoomService = gameRoomService
      this.ws = new WebSocketServer({ server })
      this.actionHandler = wsActionHandler
      this.ws.on("connection", this.handleConnection.bind(this))
   }

   private handleMessage(message: RawData, roomId: string, username: string) {
      const decodedMessage = JSON.parse(message.toString())
      const room = this.gameRoomService.getRoomById(roomId)
      console.log(room)
      if (room) {
         const client = room.users[username]
         this.gameRoomService.updateUserState(room, username, decodedMessage)
         this.gameRoomService.broadCastToRoom(room, { roomId: room.id, users: room.users })
      }
   }
   private handleConnection(connection: WebSocket, request: http.IncomingMessage) {
      const queryParams = url.parse(request.url || "", true).query;

      const { username, action, roomId } = queryParams;
      if (typeof username !== 'string' || typeof action !== 'string' || typeof roomId !== 'string') {
         console.log("Invalid username or type in request");
         return;
      }

      this.actionHandler.handleAction(action, {
         username,
         roomId,
         connection
      });

      connection.on("message", (message) =>
         this.handleMessage(message, roomId, username)
      );
   }

   private paramTypeCheck(param: any) {
      return typeof param === 'string' ? param : param
   }

   private validateConnectionParams(params: any) {
      return {
         username: this.paramTypeCheck(params.username),
         action: this.paramTypeCheck(params.action),
         roomId: this.paramTypeCheck(params.roomId)
      };
   }
}