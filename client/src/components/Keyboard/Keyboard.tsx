import { FC } from 'react'
import keyBoards from "../../assets/keyBoards.json"
import Key from './Key';


import "./Keyboard.scss"
import MistakeKey from './MistakeKey';
interface KeyboardProps {
  currChar: string
  missprint: string
  mistakes: Set<string>
  isTimerFinish: boolean
}

const Keyboard: FC<KeyboardProps> = ({ currChar, missprint, mistakes, isTimerFinish }) => {
  const symbols = keyBoards.ua
  console.log("🚀 ~ isTimerFinish:", isTimerFinish)
  return (
    isTimerFinish
      ? <div className="keyboard">
        <div className="keyboard__container">
          {symbols.map((row, rowIndex) => (
            <div className="keyboard__row" key={rowIndex}>
              {row.map((symbol) => (
                <MistakeKey symbol={symbol} key={symbol.key} mistakes={mistakes} />
              ))}
            </div>
          ))
          }
        </div >
      </div >
      : <div className="keyboard">
        <div className="keyboard__container">
          {symbols.map((row, rowIndex) => (
            <div className="keyboard__row" key={rowIndex}>
              {row.map((symbol) => (
                <Key symbol={symbol} currBtn={currChar} key={symbol.key} missprint={missprint} />
              ))}
            </div>
          ))
          }
        </div >
      </div >


  )

}
export default Keyboard;