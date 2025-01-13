import { memo } from 'react'

export type Symbol = {
   key: string;
   color: string;
   type: string;
   keyCode: string
}
interface KeyProps {
   symbol: Symbol
   isCurrChar: boolean
   misprintKey: string
}

const Key = memo(({ symbol, isCurrChar, misprintKey }: KeyProps) => {
   return (
      <span
         key={symbol.key}
         data-key={symbol.key}
         className={[
            isCurrChar ? "highlight" : "",
            symbol.type,
            symbol.color,
            symbol.keyCode === misprintKey ? "misprint" : "",
            "keyboard__btn"
         ].join(" ")}
      >
         {symbol.key}
      </span>
   )
})
Key.displayName = "Key"
export default Key;