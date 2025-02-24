import { useReducer } from "react"
import useTyping from "../../hooks/useTyping"

import { createTypingInitialState } from "../../store/typing/createTypingInitialState"
import { initialState, typingReducer } from "../../store/typing/reducer"

import InputSection from "../InputSection/InputSection"
import DefaultKeyboard from "../Keyboard/DefaultKeyboard"
import ResultKeyboard from "../Keyboard/ResultKeyboard"
import Score from "../Score/Score"
import TypingIndicators from "../TypingIndicators/TypingIndicators"
import RestartButton from "./RestartButton"
import "./TypingSection.scss";



const TypingSection = () => {
   const [state, dispatch] = useReducer(
      typingReducer,
      initialState,
      createTypingInitialState
   )
   useTyping({ state, dispatch })
   const { isTypingDone, currentCharIndex, sentence, misprintKey } = state;

   return (
      <div className="typingSection">
         <TypingIndicators dispatch={dispatch} isTypingDone={isTypingDone} sentenceProgress={currentCharIndex} />
         {
            isTypingDone
               ? <>
                  <Score typingState={state} />
                  <ResultKeyboard state={state} />
               </>
               : <>
                  <InputSection
                     currentCharIndex={currentCharIndex}
                     sentence={sentence}
                     misprintKey={misprintKey}
                  />
                  <DefaultKeyboard state={state} />
               </>
         }

         <RestartButton dispatch={dispatch} />
      </div>
   )
}

export default TypingSection;
