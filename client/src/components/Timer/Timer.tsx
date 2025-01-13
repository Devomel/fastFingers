import { memo, useEffect } from 'react';
import { setIsTypingDone, setTimeSpent } from '../../store/typing/actions';
import { TypingDispatch, TypingState } from '../../store/typing/reducer';

interface ITimerArgs {
   state: TypingState
   dispatch: TypingDispatch
}

const Timer = memo(({ state, dispatch }: ITimerArgs) => {

   const time = 60 - state.timeSpent
   const minutes = Math.floor((time) / 60).toString().padStart(2, "0");
   const seconds = ((time) % 60).toString().padStart(2, "0");

   useEffect(() => {
      const isTypingStarted = state.currentCharIndex > 0
      if (!isTypingStarted) return
      const intervalId = setInterval(() => {
         if (state.isTypingDone) {
            clearInterval(intervalId)
            return
         }
         const timeSpent = state.timeSpent
         if (timeSpent !== 60) dispatch(setTimeSpent(timeSpent + 1))
         else dispatch(setIsTypingDone(true))
      }, 1000)
      return () => clearInterval(intervalId)
   }, [state])

   return (
      <div style={{ color: "#fff" }}>
         {minutes}:{seconds}
      </div>
   );
});
Timer.displayName = "Timer"


export default Timer;
