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
         const timer = setTimeout(() => {
            if (timeSpentLocal === timerDuration.ONE_MINUTE) {
               dispatch(setIsTypingDone(true));
            } else {
               const nextTime = timeSpentLocal + 1;
               setTimeSpentLocal(nextTime);
               dispatch(setTimeSpent(nextTime));
            }
         }, 1000);
         return () => clearTimeout(timer);
      } else if (!isStarted) {
         setTimeSpentLocal(0);
      }
   }, [isStarted, isTypingDone, timeSpentLocal]);


   return (
      <div style={{ color: "#fff" }}>
         {minutes}:{seconds}
      </div>
   );
}



export default Timer;
