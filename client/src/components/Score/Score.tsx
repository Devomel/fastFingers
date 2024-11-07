import { FC } from 'react'
import "./Score.scss"
import { countScore } from '../../utils/countScore'

interface IScoreProps {
  sentenceLenght: number,
  timeSpent: number
}

const Score: FC<IScoreProps> = ({ sentenceLenght, timeSpent }) => {
  const score = countScore(sentenceLenght, timeSpent)

  return (
    <>
      <div className='score'>
        <h1>
          Швидкість друку: {score} зн./хв
        </h1>
      </div>
    </>
  )
}

export default Score;