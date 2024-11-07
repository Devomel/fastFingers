import { FC, useReducer, useRef, useState } from "react"
import useTyping from "../../hooks/typing/useTyping"
import {
  keyCodePreventExceptions,
  keyCodeReturnExceptions
} from "../../models/eventCodeExceptions"
import { createInitialState } from "../../state/createInitialState"
import { initialState, InitialStateType, SentenceActionTypes, sentenceReducer } from "../../state/reducer"
import InputSection from "../InputSection/InputSection"
import Keyboard from "../Keyboard/Keyboard";
import Score from "../Score/Score"
import Timer from "../Timer/Timer";
import "./TypingSection.scss";



const TypingSection: FC = () => {

  const [state, dispatch] = useReducer(sentenceReducer, initialState, createInitialState)
  const stateRef = useRef<InitialStateType>()
  stateRef.current = state

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
    if (e.key === stateRef.current?.currChar) {
      dispatch({ type: SentenceActionTypes.CREDIT_KEYPRESS })
    } else {
      setMissprint(e.code)
      if (stateRef.current?.done) dispatch({ type: SentenceActionTypes.INCREMENT_MISTAKES, payload: e.code })
    }
  };

  useTyping({ onKeyUp, onKeyDown, isTimerFinish })

  return (
    <div className="typingSection">
      {
        isTimerFinish
          ? <Score sentenceLenght={state.done.length} timeSpent={4} />
          : <InputSection missprint={missprint} state={state} />
      }
      <Timer duration={4} isStarted={!!state.done} setTimerState={setIsTimerFinish} />
      <Keyboard currChar={state.currChar} missprint={missprint} mistakes={state.mistakes} isTimerFinish={isTimerFinish} />
    </div>
  )

}

export default TypingSection;
