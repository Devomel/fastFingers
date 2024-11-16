import { wsActions } from "../components/GameSection/GameForm";


export interface wsQueryParams {
   username: string;
   roomId: string;
   action: wsActions;
}