import { forwardRef } from 'react'
import "./InputText.scss"
interface InputTextProps {
  sentence: {
    done: string,
    rest: string
  }
}

const InputText = forwardRef<HTMLSpanElement, InputTextProps>(({ sentence }, ref) => {
  return (
    <p className='input'>
      <span className='input__done'>{sentence.done.replace(/ /g, "\u00a0")}</span>
      <span className='input__curr' ref={ref}>{sentence.rest[0]}</span>
      <span className='input__rest'>{sentence.rest.slice(1).replace(/ /g, "\u00a0")}</span>
    </p>
  )
})

export default InputText;