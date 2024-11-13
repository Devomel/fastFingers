import { WebSocket } from "ws";

export interface IConnectionParams {
   username: string;
   roomId: string;
   connection: WebSocket;
}