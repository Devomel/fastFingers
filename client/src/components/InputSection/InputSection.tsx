import { useEffect, useRef } from "react";
import "./InputText.scss"
import { InitialStateType } from "../../state/reducer";

interface InputSectionProps {
  missprint: string;
  state: InitialStateType;
}
const InputSection = ({ missprint, state }: InputSectionProps) => {

  const cursorRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLParagraphElement>(null)
  const prevCursorPosition = useRef(0)
  useEffect(() => {
    if (cursorRef.current && inputRef.current) {
      if (prevCursorPosition.current < cursorRef.current.offsetTop) {
        inputRef.current.scroll({
          top: prevCursorPosition.current,
          left: 0,
          behavior: "smooth"
        });
      }
      prevCursorPosition.current = cursorRef.current.offsetTop
    }
  }, [state.rest])

  return (
    <div style={{ position: "relative" }}>
      <p className='input' ref={inputRef}>
        <span className='input__done'>{state.done}</span>

        <span
          ref={cursorRef}
          className={['input__curr', missprint ? "wrong" : ""].join(" ")}>
          {state.currChar}
        </span>

        <span className='input__rest'>{state.rest}</span>
      </p >
    </div>
  )
}
export default InputSection