import { FC, useState } from 'react'
import GameSection from '../components/GameSection/GameSection';

export enum wsActions {
   NEW_ROOM = "NEW_ROOM",
   JOIN_ROOM = "JOIN_ROOM"
}


const GamePage: FC = () => {
   const [action, setWsAction] = useState(wsActions.NEW_ROOM)
   const [start, setStart] = useState(false)
   const [roomId, setRoomId] = useState("")
   const [username, setUsername] = useState("")

   return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: "50vw", color: "#fff" }}>

         {
            start
               ? <>
                  <GameSection roomId={roomId} username={username} action={action} />
               </>
               : <>
                  <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username' />
                  <input type="text" onChange={(e) => setRoomId(e.target.value)} placeholder='roomId' />
                  <button onClick={() => { setWsAction(wsActions.NEW_ROOM); setStart(true) }}>Нова гра</button>
                  <button onClick={() => { setWsAction(wsActions.JOIN_ROOM); setStart(true) }}>Приєднатись до гри</button>
               </>
         }


      </div>
   )
}

export default GamePage;