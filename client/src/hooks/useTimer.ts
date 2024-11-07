import { useEffect, useState } from "react";

interface IUseTimerArgs {
  duration: number;
  isStarted: boolean;
}

const useTimer = ({ duration, isStarted }: IUseTimerArgs) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTime(duration);

    if (!isStarted) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [duration, isStarted]);

  return { time };
};

export default useTimer;
