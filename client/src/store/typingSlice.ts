import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTypingInitialState } from "./createTypingInitialState";


export const initialState: typingState = {
   done: [""],
   currChar: "",
   rest: [""],
   mistakes: [""],
   opponentProgress: 0,
   textIndex: "0"
};
// type TypeMode = "dual" | "default"

export type typingState = {
   done: string[];
   currChar: string;
   rest: string[];
   mistakes: string[];
   opponentProgress: number;
   textIndex: string
}

const typingSlice = createSlice({
   name: "typing",
   initialState,
   reducers: {
      incrementMistakes(state, action: PayloadAction<string>) {
         state.mistakes.push(action.payload)
      },
      creditKeypress(state) {
         state.done = state.done.concat(state.currChar)
         state.currChar = state.rest[0];
         state.rest = state.rest.slice(1)
      },
      setStartSentenceForDefaultMode(state) {
         Object.assign(state, { ...createTypingInitialState({}) })
      },
      setStartSentenceForDualMode(state, action: PayloadAction<string>) {
         Object.assign(state, createTypingInitialState({ lessonIndex: action.payload }))
      },
      setOpponentProgress(state, action: PayloadAction<number>) {
         state.opponentProgress = action.payload
      },
      setTextIndex(state, action: PayloadAction<string>) {
         state.textIndex = action.payload
      }
   }
})
export const {
   creditKeypress,
   incrementMistakes,
   setStartSentenceForDualMode,
   setStartSentenceForDefaultMode,
   setOpponentProgress,
   setTextIndex
} = typingSlice.actions
export default typingSlice.reducer