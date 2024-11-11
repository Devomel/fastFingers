import { WebSocket } from "ws";

type Room = {
   id: string;
   users: { [key: string]: {} };
   connections: { [key: string]: WebSocket };
};

export interface IGameRoomService {
   createRoom(clientId: string): { roomId: string, room: Room }
   deleteRoom(roomId: string): void
}

export class GameRoomService implements IGameRoomService {
   private rooms: Map<string, Room> = new Map()

   createRoom(): { roomId: string, room: Room } {
      const roomId = this.createRoomId()
      const room = {
         id: roomId,
         users: {},
         connections: {}
      }
      this.rooms.set(roomId, room)
      return { roomId, room }
   }
   getRoomById(roomId: string) {

      if (this.rooms.has(roomId)) {
         return this.rooms.get(roomId)
      }
      //ADD HANDLER FOR NOT FOUND ROOM
      return null
   }
   addConnection(room: Room, username: string, connection: WebSocket) {
      room.connections[username] = connection
   }
   addClient(room: Room, username: string) {
      room.users[username] = { state: {} }
   }
   updateUserState(room: Room, username: string, newState: string) {
      room.users[username] = { state: newState }
   }
   createRoomId(): string {
      return Math.random().toString(36).substring(7)
   }
   broadCastToRoom(room: Room, message: any) {
      Object
         .keys(room.connections)
         .forEach(username => {
            const connection = room.connections[username]
            connection.send(JSON.stringify(message))
         })
   }
   deleteRoom(roomId: string): void {
      return
   }
}