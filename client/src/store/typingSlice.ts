import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTypingInitialState } from "./createTypingInitialState";


export const initialState: typingState = {
   done: [""],
   currChar: "",
   rest: [""],
   mistakes: [""],
   opponentProgress: 0
};

export type typingState = {
   done: string[];
   currChar: string;
   rest: string[];
   mistakes: string[];
   opponentProgress: number;
}
const typingSlice = createSlice({
   name: "typing",
   initialState: createTypingInitialState(),
   reducers: {
      incrementMistakes(state, action: PayloadAction<string>) {
         state.mistakes.push(action.payload)
      },
      creditKeypress(state) {
         state.done = state.done.concat(state.currChar)
         state.currChar = state.rest[0];
         state.rest = state.rest.slice(1)
      },
      setStartSentence() {
         return { ...createTypingInitialState() }
      },
      setOpponentProgress(state, action: PayloadAction<number>) {
         state.opponentProgress = action.payload
      }
   }
})
export const { creditKeypress, incrementMistakes, setStartSentence, setOpponentProgress } = typingSlice.actions
export default typingSlice.reducer