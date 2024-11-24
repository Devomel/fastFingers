import { Dispatch, useCallback, useEffect, useRef } from "react";
import { keyCodePreventExceptions, keyCodeReturnExceptions } from "../../models/eventCodeExceptions";
import { creditKeypress, incrementMistakes } from "../../store/typingSlice";
import { useAppDispatch, useAppSelector } from "../redux";

interface IUseTypingArgs {
   isTimerFinish?: boolean;
   missprint: string;
   setMissprint: Dispatch<string>
}





function useTyping({ missprint, setMissprint, isTimerFinish = false }: IUseTypingArgs) {
   const dispatch = useAppDispatch()
   const { currChar, rest, done } = useAppSelector(state => state.typing)
   const mistakeRef = useRef(missprint)
   mistakeRef.current = missprint

   const onKeyUp = useCallback(() => {
      if (mistakeRef.current) {
         setMissprint("")
      }
   }, [])

   const onKeyDown = ((e: globalThis.KeyboardEvent) => {
      if (e.code in keyCodePreventExceptions) {
         e.preventDefault();
      }
      if (e.code in keyCodeReturnExceptions || !rest.length) {
         return;
      }
      if (e.key === currChar) {
         dispatch(creditKeypress())
      } else {
         setMissprint(e.code)
         if (done.length) dispatch(incrementMistakes(e.code))
      }
   });

   useEffect(() => {
      if (!isTimerFinish) {
         document.addEventListener("keyup", onKeyUp);
         document.addEventListener("keydown", onKeyDown);
      }

      return () => {
         document.removeEventListener("keyup", onKeyUp);
         document.removeEventListener("keydown", onKeyDown);
      };
   }, [isTimerFinish, onKeyUp, onKeyDown]);
}
export default useTyping;
