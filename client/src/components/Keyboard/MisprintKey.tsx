import { FC } from 'react'

interface MisprintKeyProps {
   symbol: {
      key: string;
      color: string;
      type: string;
      keyCode: string
   }
   mistakes: Set<string>
}

const MisprintKey: FC<MisprintKeyProps> = ({ symbol, mistakes }) => {
   return (
      <span
         key={symbol.key}
         data-key={symbol.key}
         className={[
            symbol.type,
            mistakes.has(symbol.keyCode) ? "missprint" : "",
            "keyboard__btn",
            "keyboard__mistakeKey"
         ].join(" ")}
      >
         {symbol.key}
      </span>
   )
}

export default MisprintKey;