import { memo, useEffect, useRef } from "react";
import "./InputText.scss"
import { useAppSelector } from "../../hooks/redux";




interface InputSectionProps {
   missprint: string;
}
const Char = memo(({ char, options }: { char: string, options?: object }) => {
   return <span {...options}>{char}</span>
})
Char.displayName = "Char"
const InputSection = ({ missprint }: InputSectionProps) => {
   const { done, currChar, rest } = useAppSelector(state => state.typing)
   const sentence = done.concat(currChar, rest).slice(1)
   const cursorRef = useRef<HTMLSpanElement>(null)
   const inputRef = useRef<HTMLDivElement>(null)
   const prevCursorPosition = useRef(0)
   useEffect(() => {
      console.log(cursorRef.current)

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

   const getOptions = (index: number, doneLength: number) => {
      if (index < doneLength) {
         return { className: "input__done" };
      } else if (index > doneLength) {
         return {
            className: "input__rest"
         };
      } else {
         return {
            className: ['input__curr', missprint ? "wrong" : ""].join(" "),
            ref: cursorRef
         };
      }
   };
   console.log(done, currChar, rest)

   return (
      <div style={{ position: "relative" }}>
         <div className='input' ref={inputRef} style={{ display: "flex", flexWrap: "wrap" }}>

            {
               sentence.map((char, index) => {
                  return <Char
                     char={char}
                     key={index}
                     options={getOptions(index, done.length - 1)}
                  />
               })
            }
         </div >
      </div>
   )
}
export default InputSection