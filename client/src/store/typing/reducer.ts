import { Dispatch } from "react";
import * as actions from "./actions"
import { createTypingInitialState } from "./createTypingInitialState";


export const initialState: TypingState = {
   isTypingDone: false,
   sentence: "",
   currentCharIndex: 0,
   mistakes: [],
   misprintKey: "",
   timeSpent: 0
};

export type TypingState = {
   isTypingDone: boolean
   sentence: string,
   currentCharIndex: number
   mistakes: string[];
   misprintKey: string;
   timeSpent: number
}
export type Action = ReturnType<typeof actions[keyof typeof actions]>
export type TypingDispatch = Dispatch<Action>
export function typingReducer(state: TypingState, action: Action): TypingState {
   switch (action.type) {
      case 'incrementMistakes':
         return { ...state, mistakes: [...state.mistakes, action.payload] };

      case 'creditKeypress':
         return {
            ...state,
            currentCharIndex: state.currentCharIndex + 1
         };

      case 'setTimeSpent':
         return { ...state, timeSpent: action.payload };

      case 'setStartSentence':
         return {
            ...createTypingInitialState(),
         };
      case 'setIsTypingDone':
         return {
            ...state,
            isTypingDone: true
         }
      case 'setMisprintKey':
         return {
            ...state,
            misprintKey: action.payload
         }
      case "resetState":
         return {
            ...createTypingInitialState()
         }
      default:
         return state;
   }
}