import { useEffect } from "react";

interface IUseTypingArgs {
  onKeyUp: () => void;
  onKeyDown: (e: globalThis.KeyboardEvent) => void;
  isTimerFinish?: boolean; // Додали як необов'язковий параметр
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
  }, [isTimerFinish, onKeyUp, onKeyDown]); // Додали isTimerFinish як залежність
}
export default useTyping;
