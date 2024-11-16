import { FC, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import useTyping from "../../hooks/typing/useTyping"
import {
   keyCodePreventExceptions,
   keyCodeReturnExceptions
} from "../../models/eventCodeExceptions"
import { creditKeypress, incrementMistakes } from "../../store/typingSlice"
import InputSection from "../InputSection/InputSection"
import Keyboard from "../Keyboard/Keyboard";
import Score from "../Score/Score"
import Timer from "../Timer/Timer";
import "./TypingSection.scss";


const TypingSection: FC = () => {

   const { done, currChar, mistakes, rest } = useAppSelector(state => state.typing)
   const dispatch = useAppDispatch()
   console.log(1)
   const [missprint, setMissprint] = useState<string>("")
   const mistakeRef = useRef(missprint)
   mistakeRef.current = missprint

   const [isTimerFinish, setIsTimerFinish] = useState(false)

   const onKeyUp = () => {
      if (mistakeRef.current) {
         setMissprint("")
      }
   }

   const onKeyDown = (e: globalThis.KeyboardEvent) => {

      if (e.code in keyCodePreventExceptions) {
         e.preventDefault();
      }
      if (e.code in keyCodeReturnExceptions || isTimerFinish) {
         return;
      }
      if (e.key === currChar) {
         dispatch(creditKeypress())

      } else {
         setMissprint(e.code)
         if (done) dispatch(incrementMistakes(e.code))
      }
   };

   useTyping({ onKeyUp, onKeyDown, isTimerFinish })

   return (
      <div className="typingSection">
         {
            isTimerFinish
               ? <Score sentenceLenght={done.length} timeSpent={4} />
               : <InputSection missprint={missprint} state={{ done, currChar, mistakes, rest }} />
         }
         <Timer duration={4} isStarted={!!done} setTimerState={setIsTimerFinish} />
         <Keyboard currChar={currChar} missprint={missprint} mistakes={new Set([...mistakes])} isTimerFinish={isTimerFinish} />
      </div>
   )

}

export default TypingSection;
