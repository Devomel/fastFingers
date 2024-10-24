import { RefObject, SetStateAction, useEffect } from "react";
import { ISentence } from "../models/ISentence";
import { Dispatch } from "react";



interface UseKeyboardArgs {
  inputRef: RefObject<any>,
  setSentence: Dispatch<SetStateAction<ISentence>>,
}
export function useKeyboard({ setSentence, inputRef }: UseKeyboardArgs) {

  const onKeyUp = () => {
    inputRef.current?.classList.remove("wrong");
  };
  const onKeyPressed = (e: globalThis.KeyboardEvent) => {
    setSentence((prev) => updateSentenceState(prev, e.key))
  }

  const updateSentenceState = (prev: ISentence, key: string) => {
    const nextChar = prev.rest.charAt(0);
    if (key === nextChar) {
      const updatedDone = prev.done + nextChar;
      const updatedRest = prev.rest.substring(1);
      return {
        done: updatedDone,
        rest: updatedRest
      }
    }
    inputRef.current?.classList.add("wrong");
    return prev
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyPressed);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [])
}