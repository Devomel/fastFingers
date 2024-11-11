import { FC, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { wsActions } from '../../pages/GamePage';
// import { WebSocketMessage } from 'react-use-websocket/dist/lib/types';

interface GameSectionProps {
   roomId: string | null;
   username: string;
   action: wsActions
}

const GameSection: FC<GameSectionProps> = ({ roomId, username, action }) => {

   const socketUrl = `ws://localhost:5000?action=${action}&roomId=${roomId}&username=${username}`

   const [testMessage, settestMessage] = useState('')
   const [messageHistory] = useState<MessageEvent<string>[]>([]);

   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

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
            <ul>
               {messageHistory.map((message, idx) => (
                  <span key={idx}>{message ? message.data : null}</span>
               ))}
            </ul>
         </div>
      </div>
   )

}

export default GameSection;