import { FC } from 'react'
import { useAppSelector } from '../../hooks/redux'
import "./Score.scss"
import { countScore } from '../../utils/countScore'


interface IScoreProps {
   timeSpent: number
}

const Score: FC<IScoreProps> = ({ timeSpent }) => {
   const { done, mistakes } = useAppSelector(state => state.typing)
   const score = countScore(done.length, timeSpent)

   return (
      <>
         <div className='score'>
            <h1>
               Швидкість: {score} зн./хв
            </h1>

            <h1>Помилки: {mistakes.length}</h1>
            <h1>Точність: {(100 - mistakes.length * 100 / done.length).toFixed(2)}%</h1>

         </div>
      </>
   )
}

export default Score;