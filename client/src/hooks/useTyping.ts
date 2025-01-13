import { useEffect, useReducer } from "react";
import { keyCodePreventExceptions, keyCodeReturnExceptions } from "../models/eventCodeExceptions";
import { creditKeypress, incrementMistakes, setIsTypingDone, setMisprintKey } from "../store/typing/actions";
import { TypingState } from "../store/typing/reducer";

interface IUseTypingArgs {
   state: TypingState
   dispatch: ReturnType<typeof useReducer>[1]
}

function useTyping({ state, dispatch }: IUseTypingArgs) {

   const { currentCharIndex, sentence, misprintKey } = state

   const onKeyUp = () => {
      if (misprintKey) {
         dispatch(setMisprintKey(""))
      }
   }

   const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.code in keyCodePreventExceptions) {
         e.preventDefault();
      }
      if (e.code in keyCodeReturnExceptions) {
         return;
      }

      const isCorrectKey = e.key === sentence[currentCharIndex];
      const isLastChar = currentCharIndex === sentence.length - 1;
      const isTypingStarted = currentCharIndex > 0

      if (isCorrectKey) {
         if (isLastChar) dispatch(setIsTypingDone(true));
         else dispatch(creditKeypress());
      }
      else {
         dispatch(setMisprintKey(e.code))
         if (isTypingStarted) dispatch(incrementMistakes(e.code))
      }
   };

   useEffect(() => {
      if (!state.isTypingDone) {
         document.addEventListener("keyup", onKeyUp);
         document.addEventListener("keydown", onKeyDown);
      }
      console.log()
      return () => {
         document.removeEventListener("keyup", onKeyUp);
         document.removeEventListener("keydown", onKeyDown);
      };
   }, [state.isTypingDone, onKeyUp, onKeyDown]);
}
export default useTyping;
