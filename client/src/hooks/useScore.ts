import { useEffect, useRef } from "react";

import { ISentence } from "../models/ISentence";
import { countScore } from "../utils/countScore";

interface useScoreArgs {
  sentence: ISentence
}
export function useScore({ sentence }: useScoreArgs) {
  const startTime = useRef<number>(0);
  const stopScore = () => {
    const now = Date.now() / 1000;
    const timeSpent = now - startTime.current;
    const score = countScore(sentence.done.length, timeSpent)
    sessionStorage.setItem("score", `${score}`)
  }
  useEffect(() => {
    if (!startTime.current) return
  }, [startTime.current])


  useEffect(() => {
    if (sentence.done.length === 1) startTime.current = Date.now() / 1000
    if (!sentence.rest.length) {
      stopScore()
    }
  }, [sentence])
}