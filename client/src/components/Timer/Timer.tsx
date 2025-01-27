import { useEffect, useState } from 'react';
import timerDuration from '../../constants/timerDuration';
import { setIsTypingDone, setTimeSpent } from '../../store/typing/actions';
import { TypingDispatch } from '../../store/typing/reducer';
import { formatTime } from '../../utils/formatTime';

interface ITimerArgs {
   dispatch: TypingDispatch
   isStarted: boolean
   isTypingDone: boolean
}

const Timer = ({ dispatch, isStarted, isTypingDone }: ITimerArgs) => {

   const [timeSpentLocal, setTimeSpentLocal] = useState(0)
   const time = timerDuration.ONE_MINUTE - timeSpentLocal
   const { minutes, seconds } = formatTime(time)

   useEffect(() => {
      if (isStarted && !isTypingDone) {
         (async () => {
            await new Promise((res) => setTimeout(res, 1000))
            if (timeSpentLocal === timerDuration.ONE_MINUTE) {
               dispatch(setIsTypingDone(true))
               return
            }
            setTimeSpentLocal((prev) => prev + 1)
            dispatch(setTimeSpent(timeSpentLocal + 1))
         })()
      }
      else setTimeSpentLocal(0)
   }, [timeSpentLocal, isStarted]);

   return (
      <div style={{ color: "#fff" }}>
         {minutes}:{seconds}
      </div>
   );
}



export default Timer;
