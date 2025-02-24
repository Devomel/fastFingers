// import { WebSocket } from "ws";

// export type Room = {
//    id: string;
//    users: Record<string, object>;
//    connections: Record<string, WebSocket>;
//    textIndex: number
// };

// // додати конкретики типу 
// export type MessageType = {
//    type: string;
//    payload: string
// }

// export interface IGameRoomService {
//    createRoom(roomId: string): Room;
//    deleteRoom(roomId: string): void
//    addUserToRoom(room: Room, username: string, connection: WebSocket): void
//    getRoomById(roomId: string): Room | null
//    updateRoomTextIndex(): number
// }

// export class GameRoomService implements IGameRoomService {
//    private rooms: Map<string, Room> = new Map()

//    createRoom(roomId: string): Room {
//       const room = {
//          id: roomId,
//          users: {},
//          connections: {},
//          textIndex: +(Math.random() * 20).toFixed(0)
//       }
//       this.rooms.set(roomId, room)
//       return room
//    }
//    updateRoomTextIndex() {
//       return +(Math.random() * 20).toFixed(0)
//    }
//    getRoomById(roomId: string) {
//       return this.rooms.get(roomId) ?? null;
//       //ADD HANDLER FOR NOT FOUND ROOM

//    }
//    addUserToRoom(room: Room, username: string, connection: WebSocket) {
//       room.connections[username] = connection
//       room.users[username] = { state: {} }
//    }
//    updateUserState(room: Room, username: string, newState: string) {
//       room.users[username] = { state: newState }
//    }
//    createRoomId(): string {
//       return Math.random().toString(36).substring(7)
//    }
//    broadCastToRoom(room: Room, message: any) {
//       Object
//          .keys(room.connections)
//          .forEach(username => {
//             const connection = room.connections[username]
//             connection.send(JSON.stringify({ type: "UPDATE", payload: message }))
//          })
//    }
//    deleteRoom(roomId: string): void {
//       return
//    }
// }