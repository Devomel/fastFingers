import { FC, useCallback, useState } from "react"
import { useAppDispatch } from "../../hooks/redux"
import useTyping from "../../hooks/typing/useTyping"

import { setStartSentenceForDefaultMode } from "../../store/typingSlice"
import InputSection from "../InputSection/InputSection"
import Keyboard from "../Keyboard/Keyboard";
import Score from "../Score/Score"
import Timer from "../Timer/Timer";
import "./TypingSection.scss";



const durationSeconds = 60
const TypingSection: FC = () => {
   const dispatch = useAppDispatch()
   const [isTimerFinish, setIsTimerFinish] = useState(false)
   const [missprint, setMissprint] = useState<string>("")

   const handleRestart = useCallback(() => {
      setIsTimerFinish(false);
      dispatch(setStartSentenceForDefaultMode());
      setMissprint("");
   }, [dispatch]);

   useTyping({ isTimerFinish, missprint, setMissprint })

   return (
      <div className="typingSection">
         {
            isTimerFinish
               ? <Score timeSpent={durationSeconds} />
               : <InputSection missprint={missprint} />
         }
         <Timer duration={durationSeconds} onFinish={setIsTimerFinish} />
         <Keyboard missprint={missprint} isTimerFinish={isTimerFinish} />
         <button onClick={handleRestart}>РЕСТАРТ</button>
      </div>
   )
}

export default TypingSection;
