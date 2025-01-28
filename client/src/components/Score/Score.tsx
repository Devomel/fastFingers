import { FC } from 'react'
import { TypingState } from '../../store/typing/reducer'
import { countAccuracy, countScore } from '../../utils/countScore'
import "./Score.scss"

interface ScoreProps {
   typingState: TypingState
}

const Score: FC<ScoreProps> = ({ typingState }) => {
   const { currentCharIndex, timeSpent, sentence, mistakes } = typingState
   console.log(timeSpent)
   const score = countScore(currentCharIndex, timeSpent)
   const accuracy = countAccuracy(sentence.length, mistakes.length)

   return (
      <>
         {score &&
            <div className='score'>
               <h1>
                  Швидкість: {score} зн./хв
               </h1>
               <h1>Помилки: {mistakes.length}</h1>
               <h1>Точність: {accuracy}%</h1>
            </div>
         }

      </>
   )
}

export default Score;