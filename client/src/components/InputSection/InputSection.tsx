import { useRef } from "react";
import { useScrollingWhileTyping } from "../../hooks/useScrollWhileTyping";
import { TypingState } from "../../store/typing/reducer";
import Char from "./Char";
import "./InputText.scss"


interface InputSectionProps {
   typingState: TypingState
}


const InputSection = ({ typingState }: InputSectionProps) => {
   const { currentCharIndex } = typingState
   const splitedSentence = useRef(typingState.sentence.split(""))
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

   return (
      <div style={{ position: "relative" }}>
         <div className='input' ref={inputRef}>
            {

               splitedSentence.current.map((char, index) => {
                  return <Char
                     char={char}
                     key={index}
                     options={getCharOptions(index, currentCharIndex, typingState.misprintKey, cursorRef)}
                  />
               })
            }
         </div >
      </div>
   )
}
export default InputSection