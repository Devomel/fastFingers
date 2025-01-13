import { memo } from 'react';

interface ITimerArgs {
   time: number
}

const Timer = memo(({ time }: ITimerArgs) => {

   const minutes = Math.floor((time) / 60).toString().padStart(2, "0");
   const seconds = ((time) % 60).toString().padStart(2, "0");

   return (
      <div style={{ color: "#fff" }}>
         {minutes}:{seconds}
      </div>
   );
});
Timer.displayName = "Timer"


export default Timer;
