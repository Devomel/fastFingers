import lessons from '../../assets/lessons.json'

export const createTypingInitialState = () => {

   const sentence = lessons.facts[(Math.random() * 20) | 0]
   // const sentence = "діо"
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