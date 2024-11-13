import { WebSocket } from "ws";

type Room = {
   id: string;
   users: { [key: string]: {} };
   connections: { [key: string]: WebSocket };
};

export interface IGameRoomService {
   createRoom(roomId: string): Room;
   deleteRoom(roomId: string): void
   addUserToRoom(room: Room, username: string, connection: WebSocket): void
   getRoomById(roomId: string): Room | null
}

export class GameRoomService implements IGameRoomService {
   private rooms: Map<string, Room> = new Map()

   createRoom(roomId: string): Room {
      const room = {
         id: roomId,
         users: {},
         connections: {}
      }
      this.rooms.set(roomId, room)
      return room
   }
   getRoomById(roomId: string) {

      return this.rooms.get(roomId) ?? null;
      //ADD HANDLER FOR NOT FOUND ROOM

   }
   addUserToRoom(room: Room, username: string, connection: WebSocket) {
      room.connections[username] = connection
      room.users[username] = { state: {} }
   }
   updateUserState(room: Room, username: string, newState: string) {
      room.users[username] = { state: newState }
   }
   createRoomId(): string {
      return Math.random().toString(36).substring(7)
   }
   broadCastToRoom(room: Room, message: any) {
      console.log(room)
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