import { memo, useEffect } from 'react';
import useTimer from '../../hooks/useTimer';



interface ITimerArgs {
  duration: number;
  isStarted: boolean;
  setTimerState: (isFinished: boolean) => void;
}

const Timer = memo(({ duration, isStarted, setTimerState }: ITimerArgs) => {
  const { time } = useTimer({ duration, isStarted });
  useEffect(() => { if (time === 0) setTimerState(true) }, [time])
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
