import { FC, useState } from 'react'
import GameSection from '../components/GameSection/GameSection';


export enum wsActions {
   NEW_ROOM = "NEW_ROOM",
   JOIN_ROOM = "JOIN_ROOM"
}
// export type socketDataType = typeof socketInitialData
// const socketInitialData = {
//    username: "",
//    action: wsActions.NEW_ROOM,
// }

const GamePage: FC = () => {

   const [isNewGame, setIsNewGame] = useState(true)
   const [queryParams, setQueryParams] = useState({
      username: "",
      roomId: "",
      action: wsActions.NEW_ROOM
   })
   const [start, setStart] = useState(false)


   return (
      <>
         {start
            ? <GameSection queryParams={queryParams} />
            : <>
               <div style={{ display: "flex", gap: 20, maxWidth: "50vw", color: "#fff" }}>
                  <button onClick={() => { setIsNewGame(true); setQueryParams({ ...queryParams, action: wsActions.NEW_ROOM }) }}>Нова гра</button>
                  <button onClick={() => { setIsNewGame(false); setQueryParams({ ...queryParams, action: wsActions.JOIN_ROOM }) }}>Приєднатись до гри</button>
               </div>

               <div>
                  <input type="text" placeholder='username' onChange={(e) => setQueryParams({ ...queryParams, username: e.target.value })} />
                  {
                     !isNewGame && <input type="text" placeholder='roomId' onChange={(e) => setQueryParams({ ...queryParams, roomId: e.target.value })} />
                  }
                  <button onClick={() => setStart(true)}>ПОчати</button>
               </div>

            </>
         }

      </>

   )
}

export default GamePage;