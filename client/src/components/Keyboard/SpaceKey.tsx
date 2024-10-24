import { FC } from 'react'

interface SpaceKeyProps {
  currBtn: string
}

const SpaceKey: FC<SpaceKeyProps> = ({ currBtn }) => {
  return (
    <button
      key={"space"}
      data-key={" "}
      className={[
        currBtn === " " ? "highlight" : "",
        "grey",
        "keyboard__btn",
        "spaceBtn"
      ].join(" ")}
    >
      {"\u00a0"}
    </button>
  )
}

export default SpaceKey;