import { FC, useState } from 'react'
import GameForm, { wsActions } from '../components/GameSection/GameForm';
import GameSection from '../components/GameSection/GameSection';




const GamePage: FC = () => {

   const [queryParams, setQueryParams] = useState({
      username: "",
      roomId: "",
      action: wsActions.NEW_ROOM
   });

   const [start, setStart] = useState(false);

   return (
      <>
         {start
            ? <GameSection queryParams={queryParams} setStart={setStart} />
            : <GameForm queryParams={queryParams} setQueryParams={setQueryParams} setStart={setStart} />
         }
      </>

   )
}

export default GamePage;