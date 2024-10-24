import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Score.scss"
const Score: FC = () => {
  const score = sessionStorage.getItem("score")
  const location = useNavigate()
  return (
    <>
      <div className='score'>
        <h1>
          Швидкість друку: {score} зн./хв
        </h1>
        <button onClick={() => location(-1)}>Retry</button>
      </div>

    </>
  )
}

export default Score;