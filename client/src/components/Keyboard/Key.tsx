import { FC } from 'react'

interface KeyProps {
  symbol: {
    key: string;
    color: string;
    type: string;
  }
  currBtn: string
}

const Key: FC<KeyProps> = ({ symbol, currBtn }) => {
  return (
    <button
      key={symbol.key}
      data-key={symbol.key}
      className={[
        symbol.key.toLowerCase() === currBtn ? "highlight" : "",
        symbol.type,
        symbol.color,
        "keyboard__btn"
      ].join(" ")}
    >
      {symbol.key}
    </button>
  )
}

export default Key;