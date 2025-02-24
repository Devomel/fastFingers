import { formatTime } from '../../utils/formatTime';

interface ITimerArgs {
   timeLeft: number
}

const Timer = ({ timeLeft }: ITimerArgs) => {
   const { minutes, seconds } = formatTime(timeLeft)
   return (
      <>
         <div style={{ color: "#fff" }}>
            {minutes}:{seconds}
         </div>
      </>

   );
}



export default Timer;
