import { TypingState } from "../../store/typing/reducer"
import Keyboard from "./Keyboard"
import MisprintKey from "./MisprintKey"

interface DefaultKeyboardProps {
   state: TypingState
}

const ResultKeyboard = ({ state }: DefaultKeyboardProps) => {

   return (
      <Keyboard
         renderKey={(symbol) => (
            <MisprintKey
               symbol={symbol}
               key={symbol.key}
               mistakes={new Set([...state.mistakes])} />
         )}
      />
   )
}

export default ResultKeyboard