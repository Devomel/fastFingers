import { FC } from 'react'
import keyBoards from "../../assets/keyBoards.json"
import { TypingState } from '../../store/typing/reducer';
import Key from './Key';


import "./Keyboard.scss"
import MisprintKey from './MisprintKey';

interface KeyboardProps {
   state: TypingState
}

const Keyboard: FC<KeyboardProps> = ({ state }) => {
   const symbols = keyBoards.ua
   const { currentCharIndex, mistakes, sentence } = state
   console.log(1)
   return (
      state.isTypingDone
         ? <div className="keyboard">
            <div className="keyboard__container">
               {symbols.map((row, rowIndex) => (
                  <div className="keyboard__row" key={rowIndex}>
                     {row.map((symbol) => (
                        <MisprintKey symbol={symbol} key={symbol.key} mistakes={new Set([...mistakes])} />
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
                           isCurrChar={sentence[currentCharIndex].toLocaleLowerCase() == symbol.key}
                           key={symbol.key}
                           misprintKey={state.misprintKey} />
                     ))}
                  </div>
               ))
               }
            </div >
         </div >


   )

}
export default Keyboard;