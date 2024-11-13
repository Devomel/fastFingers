import { WebSocket } from 'ws';
import { IGameRoomService } from './../gameRoom-service';
import { IConnectionParams } from '../../models/IConnectionParams';



export class wsActionHandler {
   private gameRoomService: IGameRoomService

   constructor(gameRoomService: IGameRoomService) {
      this.gameRoomService = gameRoomService
   }
   public handleAction(action: string, params: IConnectionParams) {
      const handlers: Record<string, (params: IConnectionParams) => void> = {
         "NEW_ROOM": this.newRoom.bind(this),
         "JOIN_ROOM": this.joinRoom.bind(this)
      }
      const handler = handlers[action]
      handler(params)
   }

   public newRoom({ username, roomId, connection }: IConnectionParams) {
      const room = this.gameRoomService.createRoom(roomId)
      this.gameRoomService.addUserToRoom(room, username, connection)
   }
   public joinRoom({ username, roomId, connection }: IConnectionParams) {
      const room = this.gameRoomService.getRoomById(roomId);
      if (room) {
         this.gameRoomService.addUserToRoom(room, username, connection);
      }
   }
}