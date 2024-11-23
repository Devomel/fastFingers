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
   queryParams.roomId ||= createUniqueId()
   const dispatch = useAppDispatch()
   useEffect(() => {
      // if (!done) return
      sendMessage(`${done.length - 1}`)
   }, [done])

   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
      queryParams,
      onOpen: () => setStart(true),
      onClose: () => setStart(false),
      onMessage: (event) => {
         console.log(event)
         console.log(JSON.stringify(JSON.parse(event.data).users["opponent"].state));
         dispatch(setOpponentProgress(JSON.stringify(JSON.parse(event.data).users["opponent"].state)))
      }
   });
   // useEffect(() => {
   //    if (!lastMessage?.data || !lastMessage?.data.users?.opponent) return
   //    console.log("work", !lastMessage?.data)
   //    console.log(JSON.stringify(JSON.parse(lastMessage?.data).users["opponent"].state))

   // }, [lastMessage?.data.users])
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