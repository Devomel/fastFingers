import { FC, useCallback } from 'react'
import { resetState } from '../../store/typing/actions';
import { TypingDispatch } from '../../store/typing/reducer';

interface RestartButtonProps {
   dispatch: TypingDispatch
}

const RestartButton: FC<RestartButtonProps> = ({ dispatch }) => {

   const initialRestart = useCallback(() => {
      dispatch(resetState())
   }, [dispatch]);
   return (
      <button onClick={initialRestart} style={{ fontSize: "3rem" }}>
         ↺
      </button>
   )
}

export default RestartButton;