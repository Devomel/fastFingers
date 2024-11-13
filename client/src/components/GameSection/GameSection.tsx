import { FC, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { wsActions } from '../../pages/GamePage';
import { createUniqueId } from '../../utils/webSocket/createUniqueId';

interface GameSectionProps {
   queryParams: { username: string, roomId: string, action: wsActions };
   // setStart: D
}
const socketUrl = 'ws://localhost:5000';

const GameSection: FC<GameSectionProps> = ({ queryParams }) => {

   const [testMessage, settestMessage] = useState('')
   queryParams.roomId = queryParams.roomId ? queryParams.roomId : createUniqueId()
   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
      queryParams
   });

   const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
   }[readyState];


   return (
      <div>
         {/* <TypingSection /> */}
         <div style={{ display: "flex", flexDirection: "column" }}>

            <input type="text" onChange={(e) => settestMessage(e.target.value)} placeholder='message' />
            <button
               onClick={() => sendMessage(JSON.stringify(testMessage))}
               disabled={readyState !== ReadyState.OPEN}
            >
               send message
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <h1>Last message: {lastMessage.data}</h1> : null}
         </div>
      </div>
   )

}

export default GameSection;