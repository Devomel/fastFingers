import { FC, ReactNode } from 'react'
import keyBoards from "../../assets/keyBoards.json"
import { Symbol } from './Key';
import "./Keyboard.scss"


interface KeyboardProps {
   renderKey: (symbol: Symbol) => ReactNode
}

const Keyboard: FC<KeyboardProps> = ({ renderKey }) => {
   const symbols = keyBoards.ua
   return (
      <div className="keyboard">
         <div className="keyboard__container">
            {symbols.map((row, rowIndex) => (
               <div className="keyboard__row" key={rowIndex}>
                  {row.map((symbol) => (
                     renderKey(symbol)
                  ))}
               </div>
            ))
            }
         </div >
      </div >
   )
}


export default Keyboard;