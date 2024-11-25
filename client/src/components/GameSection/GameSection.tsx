import { Dispatch, FC, useEffect } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setOpponentProgress } from '../../store/typingSlice';
import { createUniqueId } from '../../utils/webSocket/createUniqueId';
import TypingSection from '../TypingSection/TypingSection';
import { wsActions } from './GameForm';

interface GameSectionProps {
   queryParams: { username: string, roomId: string, action: wsActions };
   setStart: Dispatch<boolean>
}
const socketUrl = 'ws://localhost:5000';

const GameSection: FC<GameSectionProps> = ({ queryParams, setStart }) => {
   const { done } = useAppSelector(state => state.typing)
   const { user } = useAppSelector(state => state.auth)
   console.log("🚀 ~ user:", user)
   queryParams.roomId ||= createUniqueId()
   const dispatch = useAppDispatch()
   useEffect(() => {
      sendMessage(`${done.length - 1}`)
   }, [done])

   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
      queryParams,
      onOpen: () => setStart(true),
      onClose: () => setStart(false),
      onMessage: (event) => {
         const data = JSON.parse(event.data);

         const opponentState = data.users["opponent"].state;
         dispatch(setOpponentProgress(Number(opponentState)));
      }
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
         <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <h1>Last message: {lastMessage.data}</h1> : null}
         </div>
      </>
   )

}

export default GameSection;