import { useEffect, useRef } from "react";
import { countScore } from "../utils/countScore";
import { useNavigate } from "react-router-dom";
import { ISentence } from "../models/ISentence";

interface useScoreArgs {
  sentence: ISentence
}
export function useScore({ sentence }: useScoreArgs) {
  const navigate = useNavigate()
  const startTime = useRef<number>(0);
  useEffect(() => {
    if (sentence.done.length === 1) startTime.current = Date.now() / 1000
    if (!sentence.rest.length) {
      const now = Date.now() / 1000;
      const timeSpent = now - startTime.current;
      const score = countScore(sentence.done.length, timeSpent)
      sessionStorage.setItem("score", `${score}`)
      navigate("score")
    }
  }, [sentence])
}