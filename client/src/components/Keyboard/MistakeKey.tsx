import { FC } from 'react'

interface MistakeKeyProps {
  symbol: {
    key: string;
    color: string;
    type: string;
    keyCode: string
  }
  mistakes: Set<string>
}

const MistakeKey: FC<MistakeKeyProps> = ({ symbol, mistakes }) => {
  return (
    <span
      key={symbol.key}
      data-key={symbol.key}
      className={[
        symbol.type,
        // symbol.color,
        mistakes.has(symbol.keyCode) ? "missprint" : "",
        "keyboard__btn",
        "keyboard__mistakeKey"

      ].join(" ")}
    >
      {symbol.key}
    </span>
  )
}

export default MistakeKey;