import { FC, useState } from 'react'
import GameSection from '../components/GameSection/GameSection';



const GamePage: FC = () => {
   const [isNewGame, setIsNewGame] = useState(false)
   const [roomId, setRoomId] = useState("")
   const [username, setUsername] = useState("")

   return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: "50vw", color: "#fff" }}>
         <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username' />
         <input type="text" onChange={(e) => setRoomId(e.target.value)} placeholder='roomId' />
         <button onClick={() => setIsNewGame(true)}>Почати</button>
         {
            isNewGame && <GameSection roomId={roomId} username={username} />
         }

      </div>
   )
}

export default GamePage;