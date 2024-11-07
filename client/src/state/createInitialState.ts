import lessons from '../assets/lessons.json'



export const createInitialState = () => {
  const lessonIndex = +(Math.random() * 20).toFixed(0)
  const currLesson = lessons.facts[lessonIndex]
  currLesson.replace(" ", "//")
  return {
    done: "",
    currChar: currLesson.charAt(0),
    rest: currLesson.substring(1),
    mistakes: new Set<string>(""),
    isMissprint: false,
  }
}