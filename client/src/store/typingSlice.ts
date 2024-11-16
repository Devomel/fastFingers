import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTypingInitialState } from "./createTypingInitialState";

export const initialState: typingState = {
   done: [""],
   currChar: "",
   rest: [""],
   mistakes: [""],
};

export type typingState = {
   done: string[];
   currChar: string;
   rest: string[];
   mistakes: string[];
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
      setStartSentence(state, action: PayloadAction<string>) {
         state.done = [""]
         state.currChar = action.payload[0]
         state.rest = action.payload.split('').slice(1)
         state.mistakes = [""]
      }
   }
})
export const { creditKeypress, incrementMistakes, setStartSentence } = typingSlice.actions
export default typingSlice.reducer