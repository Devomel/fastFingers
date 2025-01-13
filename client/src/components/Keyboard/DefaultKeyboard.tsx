import { TypingState } from "../../store/typing/reducer"
import Key from "./Key"
import Keyboard from "./Keyboard"

interface DefaultKeyboardProps {
   state: TypingState
}
const DefaultKeyboard = ({ state }: DefaultKeyboardProps) => {

   return (
      <Keyboard
         renderKey={(symbol) => (
            <Key
               symbol={symbol}
               key={symbol.key}
               isCurrChar={state.sentence[state.currentCharIndex].toLocaleLowerCase() === symbol.key}
               misprintKey={state.misprintKey} />
         )}
      />
   )
}
export default DefaultKeyboard