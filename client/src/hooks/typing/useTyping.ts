import { useEffect } from "react";

interface IUseTypingArgs {
   onKeyUp: () => void;
   onKeyDown: (e: globalThis.KeyboardEvent) => void;
   isTimerFinish?: boolean;
}

function useTyping({ onKeyUp, onKeyDown, isTimerFinish = false }: IUseTypingArgs) {
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
