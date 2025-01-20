import { FC } from 'react'
import { TypingState } from '../../store/typing/reducer'
import { countAccuracy, countScore } from '../../utils/countScore'
import "./Score.scss"

interface ScoreProps {
   typingState: TypingState
}

const Score: FC<ScoreProps> = ({ typingState }) => {

   const score = countScore(typingState.currentCharIndex, typingState.timeSpent)
   const accuracy = countAccuracy(typingState.sentence.length, new Set([...typingState.mistakes]).size)
   console.log(typingState)
   return (
      <>
         {score &&
            <div className='score'>
               <h1>
                  Швидкість: {score} зн./хв
               </h1>
               <h1>Помилки: {typingState.mistakes.length}</h1>
               <h1>Точність: {accuracy}%</h1>
            </div>
         }

      </>
   )
}

export default Score;