import "./SpeedProgress.scss";

interface SpeedProgressProps {
   speed: number;
   maxSpeed?: number;
}

export const SpeedProgress = ({ speed, maxSpeed = 300 }: SpeedProgressProps) => {
   const progress = Math.min((speed / maxSpeed) * 100, 100);

   return (
      <div className="speedWrapper">
         <div
            style={{
               width: `${progress}%`,
            }}
            data-progress={Math.round(speed) > 10 ? Math.round(speed) : null}
            className="speedIndicator"
         ></div>
      </div>
   );
};
