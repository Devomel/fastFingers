import { useEffect } from "react";
import { setIsTypingDone, setTimeSpent } from "../store/typing/actions";
import { TypingDispatch, TypingState } from "../store/typing/reducer";

interface IUseTimerArgs {
   state: TypingState;
   dispatch: TypingDispatch
}

const useTimer = ({ state, dispatch }: IUseTimerArgs) => {
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
}

export default useTimer;
