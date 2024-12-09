import { Room } from "../service/gameRoom-service";

export class RoomDto {
   private textIndex: number
   constructor(Room: Room) {
      this.textIndex = Room.textIndex
   }
}
