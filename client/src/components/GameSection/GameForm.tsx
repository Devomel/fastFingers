import { Dispatch, FC, useState } from 'react'
import { wsQueryParams } from '../../models/wsQueryParams';

interface GameFormProps {
   setQueryParams: Dispatch<wsQueryParams>
   queryParams: wsQueryParams
   setStart: Dispatch<boolean>
}
export enum wsActions {
   NEW_ROOM = "NEW_ROOM",
   JOIN_ROOM = "JOIN_ROOM"
}
const GameForm: FC<GameFormProps> = ({ queryParams, setQueryParams, setStart }) => {
   const [isNewGame, setIsNewGame] = useState(true);
   return (
      <>
         <div style={{ display: "flex", gap: 20, maxWidth: "50vw", color: "#fff" }}>
            <button
               onClick={() => {
                  setIsNewGame(true);
                  setQueryParams({ ...queryParams, action: wsActions.NEW_ROOM })
               }}>
               Нова гра
            </button>
            <button
               onClick={() => {
                  setIsNewGame(false);
                  setQueryParams({ ...queryParams, action: wsActions.JOIN_ROOM })
               }}>
               Приєднатись до гри
            </button>
         </div>

         <form>
            <input
               type="text"
               placeholder='username'
               onChange={(e) => setQueryParams({ ...queryParams, username: e.target.value })} />
            {
               !isNewGame
               && <input
                  type="text"
                  placeholder='roomId'
                  onChange={(e) => setQueryParams({ ...queryParams, roomId: e.target.value })} />
            }
            <button onClick={() => setStart(true)} type='submit'>Почати</button>
         </form>

      </>
   )
}

export default GameForm;