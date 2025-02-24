import { useEffect, useState } from "react";
import timerDuration from "../constants/timerDuration";
import { setIsTypingDone, setTimeSpent } from "../store/typing/actions";
import { TypingDispatch } from "../store/typing/reducer";


interface UseTimerProps {
   dispatch: TypingDispatch
   isTypingDone: boolean
   sentenceProgress: number
}
export const useTimer = ({ sentenceProgress, isTypingDone, dispatch }: UseTimerProps) => {
   const [timeSpentLocal, setTimeSpentLocal] = useState(0)
   const timeLeft = timerDuration.ONE_MINUTE - timeSpentLocal
   const isStarted = Boolean(sentenceProgress)

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
   return { timeSpentLocal, timeLeft }
}