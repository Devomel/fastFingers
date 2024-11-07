import { ISentence } from "../../models/ISentence";

export const handleKeyPress = (prev: ISentence, key: string) => {
  const nextChar = prev.rest.charAt(0);
  if (key === nextChar) {
    return updateSentence(prev, nextChar);
  }

  return prev
}
const updateSentence = (prev: ISentence, nextChar: string) => {
  const updatedDone = prev.done + nextChar;
  const updatedRest = prev.rest.substring(1);
  return {
    done: updatedDone,
    rest: updatedRest,
  };
};