import { useTimer } from "../../hooks/useTimer"
import { TypingDispatch } from "../../store/typing/reducer"
import { countScore } from "../../utils/countScore"
import { SpeedProgress } from "./SpeedProgress"
import Timer from "./Timer"

interface TypingIndicatorsProps {
   dispatch: TypingDispatch
   isTypingDone: boolean
   sentenceProgress: number
}

const TypingIndicators = ({ dispatch, isTypingDone, sentenceProgress }: TypingIndicatorsProps) => {

   const { timeLeft, timeSpentLocal } = useTimer({ sentenceProgress, isTypingDone, dispatch })


   return (
      <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-evenly" }}>
         <SpeedProgress speed={countScore(sentenceProgress, timeSpentLocal)} />
         <Timer timeLeft={timeLeft} />
      </div>
   );
}

export default TypingIndicators;