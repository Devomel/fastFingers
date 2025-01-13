import { useReducer } from "react"
import useTyping from "../../hooks/useTyping"

import { createTypingInitialState } from "../../store/typing/createTypingInitialState"
import { initialState, typingReducer } from "../../store/typing/reducer"

import InputSection from "../InputSection/InputSection"
import DefaultKeyboard from "../Keyboard/DefaultKeyboard"
import ResultKeyboard from "../Keyboard/ResultKeyboard"
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

   return (
      <div className="typingSection">
         {
            state.isTypingDone
               ? <>
                  <Score typingState={state} />
                  <ResultKeyboard state={state} />
               </>
               : <>
                  <Timer state={state} dispatch={dispatch} />
                  <InputSection typingState={state} />
                  <DefaultKeyboard state={state} />
               </>
         }
         <RestartButton dispatch={dispatch} />
      </div>
   )
}

export default TypingSection;
