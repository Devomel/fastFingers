import { Dispatch, FC, useEffect } from 'react'
import useWebSocket from 'react-use-websocket';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setOpponentProgress, setTextIndex } from '../../store/typingSlice';
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
      sendMessage(JSON.stringify({ type: "UPDATE", payload: done.length - 1 }))
   }, [done])


   const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
      queryParams,
      onOpen: () => {
         setStart(true)

      },
      onClose: () => setStart(false),
      onMessage: (event) => {
         const data = JSON.parse(event.data);
         switch (data.type) {
            case "UPDATE": {
               const opponent = Object.keys(data.payload.users).find(user => user !== queryParams.username);
               if (opponent) dispatch(setOpponentProgress(Number(data.payload.users[opponent].state)));
               break;
            }
            case "ROOM_DATA":
               dispatch(setTextIndex(data.payload.textIndex))
               break;
            default:
               console.warn("Unknown message type")
               break;
         }

      }
   });


   return (
      <>
         <TypingSection />
         <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
            {lastMessage ? <h1>Last message: {lastMessage.data}</h1> : null}
         </div>
      </>
   )

}

export default GameSection;