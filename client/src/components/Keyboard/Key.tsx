import { memo } from 'react'

interface KeyProps {
   symbol: {
      key: string;
      color: string;
      type: string;
      keyCode: string
   }
   isCurrChar: boolean
   missprint: string
}

const Key = memo(({ symbol, isCurrChar, missprint }: KeyProps) => {
   return (
      <span
         key={symbol.key}
         data-key={symbol.key}
         className={[
            isCurrChar ? "highlight" : "",
            symbol.type,
            symbol.color,
            symbol.keyCode === missprint ? "missprint" : "",
            "keyboard__btn"
         ].join(" ")}
      >
         {symbol.key}
      </span>
   )
})
Key.displayName = "Key"
export default Key;