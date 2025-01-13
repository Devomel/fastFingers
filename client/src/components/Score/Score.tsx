import { FC } from 'react'
import { TypingState } from '../../store/typing/reducer'
import { countScore } from '../../utils/countScore'
import "./Score.scss"

interface ScoreProps {
   typingState: TypingState
}

const Score: FC<ScoreProps> = ({ typingState }) => {

   const score = countScore(typingState.sentence.length, typingState.timeSpent)
   console.log(typingState)
   return (
      <>
         {score &&
            <div className='score'>
               <h1>
                  Швидкість: {score} зн./хв
               </h1>

               <h1>Помилки: {typingState.mistakes.length}</h1>
               <h1>Точність: {(100 - (typingState.mistakes.length * 100 / typingState.sentence.length)).toFixed(2)}%</h1>

            </div>
         }

      </>
   )
}

export default Score;