import { memo, useRef } from "react";
import { useScrollingWhileTyping } from "../../hooks/useScrollWhileTyping";
import Char from "./Char";
import "./InputText.scss"


interface InputSectionProps {
   currentCharIndex: number;
   sentence: string;
   misprintKey: string
}


const InputSection = memo(({ currentCharIndex, sentence, misprintKey }: InputSectionProps) => {

   const splitedSentence = sentence.split("")
   const cursorRef = useRef<HTMLSpanElement>(null)
   const inputRef = useRef<HTMLDivElement>(null)
   useScrollingWhileTyping({ currentCharIndex, cursorRef, inputRef })

   const getCharOptions = (
      index: number,
      doneLength: number,
      misprint: string,
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
               className: ["input__curr", misprint ? "wrong" : ""].join(" "),
               ref: cursorRef,
            };
      }
      return result
   };
   console.log(1)
   return (
      <div style={{ position: "relative" }}>
         <div className='input' ref={inputRef}>
            {

               splitedSentence.map((char, index) => {
                  return <Char
                     char={char}
                     key={index}
                     options={getCharOptions(index, currentCharIndex, misprintKey, cursorRef)}
                  />
               })
            }
         </div >
      </div>
   )
})
InputSection.displayName = "InputSection"

export default InputSection