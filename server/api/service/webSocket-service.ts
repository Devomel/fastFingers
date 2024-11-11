import http from "http";
import url from "url";
import { WebSocketServer } from "ws";
import { GameClientService } from "./gameClient-service";
import { GameRoomService } from "./gameRoom-service";

export class WebSocketService {
   private gameClientService: GameClientService
   private gameRoomService: GameRoomService
   private ws: WebSocketServer

   constructor(server: any, gameClientService: GameClientService, gameRoomService: GameRoomService) {
      this.gameClientService = gameClientService
      this.gameRoomService = gameRoomService
      this.ws = new WebSocketServer(server)
      this.ws.on("connection", this.handleConnection)
   }


   private handleConnection(connection: WebSocket, request: http.IncomingMessage) {
      const { username, type } = url.parse(request.url || "", true).query;
      switch (type) {
         case "NEW_ROOM":
            const clientId = this.gameClientService.generateClientID()
            const roomId = this.gameRoomService.createRoom()

         case "JOIN_ROOM":

         default:
            console.log(`Unknown message type: ${type}`)
      }
   }

}