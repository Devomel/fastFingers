import { FC } from 'react'
import keyBoards from "../../assets/keyBoards.json"
import { useAppSelector } from '../../hooks/redux';
import Key from './Key';


import "./Keyboard.scss"
import MistakeKey from './MistakeKey';

interface KeyboardProps {
   missprint: string
   isTimerFinish: boolean
}

const Keyboard: FC<KeyboardProps> = ({ missprint, isTimerFinish }) => {
   const symbols = keyBoards.ua
   const { currChar, mistakes } = useAppSelector(state => state.typing)
   return (
      isTimerFinish
         ? <div className="keyboard">
            <div className="keyboard__container">
               {symbols.map((row, rowIndex) => (
                  <div className="keyboard__row" key={rowIndex}>
                     {row.map((symbol) => (
                        <MistakeKey symbol={symbol} key={symbol.key} mistakes={new Set([...mistakes])} />
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
                        <Key
                           symbol={symbol}
                           isCurrChar={currChar.toLocaleLowerCase() == symbol.key}
                           key={symbol.key}
                           missprint={missprint} />
                     ))}
                  </div>
               ))
               }
            </div >
         </div >


   )

}
export default Keyboard;