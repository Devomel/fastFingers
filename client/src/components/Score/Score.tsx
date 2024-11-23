import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import "./Score.scss"
import { countScore } from '../../utils/countScore'


interface IScoreProps {
   timeSpent: number
}

const Score: FC<IScoreProps> = ({ timeSpent }) => {
   const { done } = useAppSelector(state => state.typing)
   const score = countScore(done.length, timeSpent)

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