import { useEffect, useRef } from "react";
import "./InputText.scss"
import { typingState } from "../../store/typingSlice";
import Chars from "./Chars";


interface InputSectionProps {
   missprint: string;
   state: typingState;
}
const InputSection = ({ missprint, state }: InputSectionProps) => {


   const cursorRef = useRef<HTMLSpanElement>(null)
   const inputRef = useRef<HTMLDivElement>(null)
   const prevCursorPosition = useRef(0)
   if (inputRef.current) {
      // console.log(inputRef.current.children[opponentCursor])
   }
   useEffect(() => {
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
   }, [state.rest])

   return (
      <div style={{ position: "relative" }}>
         <div className='input' ref={inputRef}>

            <Chars chars={state.done} classname="input__done" />

            <span
               ref={cursorRef}
               className={['input__curr', missprint ? "wrong" : ""].join(" ")}>{state.currChar}
            </span>

            <Chars chars={state.rest} classname="input__rest" />
         </div >
      </div>
   )
}
export default InputSection