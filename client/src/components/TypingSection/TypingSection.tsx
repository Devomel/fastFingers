import { useReducer } from "react"
import useTimer from "../../hooks/useTimer"
import useTyping from "../../hooks/useTyping"

import { createTypingInitialState } from "../../store/typing/createTypingInitialState"
import { initialState, typingReducer } from "../../store/typing/reducer"
import InputSection from "../InputSection/InputSection"
import Keyboard from "../Keyboard/Keyboard";
import Score from "../Score/Score"
import Timer from "../Timer/Timer"
import RestartButton from "./RestartButton"
import "./TypingSection.scss";


const TypingSection = () => {
   const [state, dispatch] = useReducer(
      typingReducer,
      initialState,
      createTypingInitialState
   )
   useTyping({ state, dispatch })
   useTimer({ state, dispatch })
   return (
      <div className="typingSection">
         {
            state.isTypingDone
               ? <Score typingState={state} />
               : <InputSection typingState={state} />
         }
         <Timer time={60 - state.timeSpent} />
         <Keyboard state={state} />
         <RestartButton dispatch={dispatch} />
      </div>
   )
}

export default TypingSection;
