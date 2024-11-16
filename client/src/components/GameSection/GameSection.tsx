import { Dispatch, FC, useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useAppSelector } from '../../hooks/redux';
import { createUniqueId } from '../../utils/webSocket/createUniqueId';
import TypingSection from '../TypingSection/TypingSection';
import { wsActions } from './GameForm';

interface GameSectionProps {
   queryParams: { username: string, roomId: string, action: wsActions };
   setStart: Dispatch<boolean>
}
const socketUrl = 'ws://localhost:5000';

const GameSection: FC<GameSectionProps> = ({ queryParams, setStart }) => {
   const [testMessage, settestMessage] = useState('')
   const { done } = useAppSelector(state => state.typing)
   queryParams.roomId ||= createUniqueId()
   useEffect(() => {
      if (!done) return
      sendMessage(`${done.length}`)
   }, [done])
   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
      queryParams,
      onOpen: () => setStart(true),
      onClose: () => setStart(false)
   });

   const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
   }[readyState];


   return (
      <>
         <TypingSection />

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
      </>
   )

}

export default GameSection;