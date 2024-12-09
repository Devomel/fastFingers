import { memo, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import useTimer from '../../hooks/useTimer';



interface ITimerArgs {
   duration: number;
   onFinish: (isFinished: boolean) => void;
}

const Timer = memo(({ duration, onFinish }: ITimerArgs) => {

   const { done } = useAppSelector(state => state.typing);
   const { time } = useTimer({ duration, isStarted: done.length > 1 });
   useEffect(() => { if (time === 0) onFinish(true) }, [time])
   const minutes = ((time / 60) | 0).toString().padStart(2, "0")
   const seconds = (time % 60).toString().padStart(2, "0")

   return (
      <div style={{ color: "#fff" }}>
         {minutes}:{seconds}
      </div>
   );
});

Timer.displayName = 'Timer';

export default Timer;
