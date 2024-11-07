import { FC } from 'react'

interface KeyProps {
  symbol: {
    key: string;
    color: string;
    type: string;
    keyCode: string
  }
  currBtn?: string
  missprint: string
}

const Key: FC<KeyProps> = ({ symbol, currBtn, missprint }) => {
  return (
    <span
      key={symbol.key}
      data-key={symbol.key}
      className={[
        symbol.key.toLowerCase() === currBtn ? "highlight" : "",
        symbol.type,
        symbol.color,
        symbol.keyCode === missprint ? "missprint" : "",
        "keyboard__btn"
      ].join(" ")}
    >
      {symbol.key}
    </span>
  )
}

export default Key;