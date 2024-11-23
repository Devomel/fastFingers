import { FC, useState } from "react"
import { useAppDispatch } from "../../hooks/redux"
import useTyping from "../../hooks/typing/useTyping"
import { setStartSentence } from "../../store/typingSlice"
import InputSection from "../InputSection/InputSection"
import Keyboard from "../Keyboard/Keyboard";
import Score from "../Score/Score"
import Timer from "../Timer/Timer";
import "./TypingSection.scss";


const TypingSection: FC = () => {
   const duration = 30000
   const dispatch = useAppDispatch()
   const [isTimerFinish, setIsTimerFinish] = useState(false)
   const [missprint, setMissprint] = useState<string>("")
   useTyping({ isTimerFinish, missprint, setMissprint })

   return (
      <div className="typingSection">
         {
            isTimerFinish
               ? <Score timeSpent={duration} />
               : <InputSection missprint={missprint} />
         }
         <Timer duration={duration} setTimerState={setIsTimerFinish} />
         <Keyboard missprint={missprint} isTimerFinish={isTimerFinish} />
         <button onClick={() => {
            setIsTimerFinish(false)
            dispatch(setStartSentence())
            setMissprint("")
         }}>РЕСТАРТ</button>
      </div>
   )

}

export default TypingSection;
