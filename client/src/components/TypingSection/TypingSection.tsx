import { useEffect, useRef, useState } from 'react'
import InputText from '../InputText/InputText';
import Keyboard from '../Keyboard/Keyboard';
import { useKeyboard } from '../../hooks/useKeyboard';
import "./TypingSection.scss"
import { useScore } from '../../hooks/useScore';
import lessons from "../../assets/lessons.json"
const TypingSection = () => {
  const inputRef = useRef(null);

  const [sentence, setSentence] = useState({
    done: "",
    rest: "не вдалося завантажити тренувальний текст"
  });
  useEffect(() => {
    const currLesson = lessons.section_1.lesson_4 || sentence.rest
    setSentence({ done: "", rest: currLesson })
  }, [])
  useKeyboard({ inputRef, setSentence })
  useScore({ sentence })
  return (
    <div className='typingSection'>
      <InputText sentence={sentence} ref={inputRef} />
      <Keyboard sentence={sentence} />
    </div>
  );
}

export default TypingSection;