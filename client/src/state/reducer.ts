import { createInitialState } from "./createInitialState";

export const initialState = {
  done: "",
  currChar: "",
  rest: "",
  mistakes: new Set<string>(),
};

export type InitialStateType = typeof initialState;

export enum SentenceActionTypes {
  INCREMENT_MISTAKES = "INCREMENT_MISTAKES",
  CREDIT_KEYPRESS = "CREDIT_KEYPRESS",
  TOGGLE_IS_MISSPRINT = "TOGGLE_IS_MISSPRINT",
  SET_START_SENTENCE = "SET_START_SENTENCE",
  RESET = "RESET"
}

// Типи для дій
export interface IIncrementMistakesAction {
  type: SentenceActionTypes.INCREMENT_MISTAKES;
  payload: string;
}

export interface IToggleIsMissprintAction {
  type: SentenceActionTypes.TOGGLE_IS_MISSPRINT;
}

export interface ICreditKeypressAction {
  type: SentenceActionTypes.CREDIT_KEYPRESS;
}

export interface ISetStartSentenceAction {
  type: SentenceActionTypes.SET_START_SENTENCE;
  payload: string;
}

export interface IResetAction {
  type: SentenceActionTypes.RESET;
}

// Об'єднаний тип для всіх дій
export type SentenceAction =
  | ICreditKeypressAction
  | IIncrementMistakesAction
  | IToggleIsMissprintAction
  | ISetStartSentenceAction
  | IResetAction;

// Ред'юсер з типами для state та action
export const sentenceReducer = (
  state: InitialStateType,
  action: SentenceAction
): InitialStateType => {
  switch (action.type) {
    case SentenceActionTypes.INCREMENT_MISTAKES: {
      return {
        ...state,
        mistakes: new Set([...state.mistakes, action.payload]),
      };
    }
    case SentenceActionTypes.CREDIT_KEYPRESS: {
      return {
        ...state,
        done: state.done + state.currChar,
        currChar: state.rest.charAt(0),
        rest: state.rest.slice(1),
      };
    }
    case SentenceActionTypes.SET_START_SENTENCE: {
      return {
        ...state,
        done: "",
        currChar: action.payload.charAt(0),
        rest: action.payload.substring(1),
      };
    }
    case SentenceActionTypes.RESET: {
      return createInitialState();
    }
    default:
      return state;
  }
};
