import { useEffect, useRef } from "react";
import "./InputText.scss"
import { useAppSelector } from "../../hooks/redux";
import Char from "./Char";


interface InputSectionProps {
   missprint: string;
}


const InputSection = ({ missprint }: InputSectionProps) => {
   const { done, currChar, rest, opponentProgress } = useAppSelector(state => state.typing)
   const sentence = done.concat(currChar, rest).slice(1)
   const cursorRef = useRef<HTMLSpanElement>(null)
   const inputRef = useRef<HTMLDivElement>(null)
   const prevCursorPosition = useRef(0)

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
   }, [rest])

   const getOptions = (
      index: number,
      doneLength: number,
      missprint: string,
      cursorRef: React.RefObject<HTMLSpanElement>) => {
      let result;
      switch (true) {
         case index < doneLength:
            result = { className: "input__done" };
            break
         case index > doneLength:
            result = { className: "input__rest" };
            break
         default:
            result = {
               className: ["input__curr", missprint ? "wrong" : ""].join(" "),
               ref: cursorRef,
            };
      }
      if (index === +opponentProgress && index > 0) result.className += " opponentCursor"
      return result
   };


   return (
      <div style={{ position: "relative" }}>
         <div className='input' ref={inputRef}>
            {
               sentence.map((char, index) => {
                  return <Char
                     char={char}
                     key={index}
                     options={getOptions(index, done.length - 1, missprint, cursorRef)}
                  />
               })
            }
         </div >
      </div>
   )
}
export default InputSection