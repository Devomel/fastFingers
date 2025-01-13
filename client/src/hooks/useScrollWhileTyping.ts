import { RefObject, useCallback, useEffect, useRef } from 'react';
interface useScrollingHookProps {
   currentCharIndex: number;
   cursorRef: RefObject<HTMLSpanElement>;
   inputRef: RefObject<HTMLDivElement>;
}
export function useScrollingWhileTyping({ currentCharIndex, cursorRef, inputRef }: useScrollingHookProps) {
   const prevCursorPosition = useRef(0)
   const scrollInput = useCallback(() => {
      if (cursorRef.current && inputRef.current) {
         if (prevCursorPosition.current < cursorRef.current.offsetTop) {
            inputRef.current.scroll({
               top: prevCursorPosition.current,
               left: 0,
               behavior: "smooth"
            });
         }
         prevCursorPosition.current = cursorRef.current.offsetTop
      }
   }, [])
   useEffect(() => scrollInput(), [currentCharIndex])
}