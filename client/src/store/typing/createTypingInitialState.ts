// import { useTranslation } from 'react-i18next'
import lessons from '../../assets/lessons.json'

export const createTypingInitialState = () => {
   const sentence = lessons.facts[(Math.random() * 20) | 0]
   sentence.replace(" ", "//")
   return {
      isTypingDone: false,
      sentence,
      currentCharIndex: 0,
      mistakes: [],
      misprintKey: "",
      isMissprint: false,
      timeSpent: 0
   }
}