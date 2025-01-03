import lessons from '../assets/lessons.json'

export const createTypingInitialState = ({ lessonIndex }: { lessonIndex?: number }) => {
   if (!lessonIndex) {
      lessonIndex = +(Math.random() * 20).toFixed(0)
   }

   const currLesson = lessons.facts[lessonIndex]
   currLesson.replace(" ", "//")
   return {
      done: [""],
      currChar: currLesson[0],
      rest: currLesson.split("").slice(1),
      mistakes: [""],
      isMissprint: false,
      opponentProgress: 0
   }
}