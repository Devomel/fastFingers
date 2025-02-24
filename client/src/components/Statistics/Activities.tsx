import { useState } from "react";
import "./Activities.scss"
import { statsService } from "../../services/statsService";



const Activities = () => {
   const userId = "67b58c1e34077e77101cb9a6"
   const { data: stats, isLoading } = statsService.useGetStatsQuery(userId);
   const [addStats] = statsService.useAddStatsMutation();
   const [speed, setSpeed] = useState<number>(0);
   const [accuracy, setAccuracy] = useState<number>(0);
   const handleAddStat = async () => {
      await addStats({
         userId,
         data: { date: new Date().toISOString(), speed, accuracy },
      });
   };

   return (
      <div>
         <h2>Статистика</h2>
         {isLoading ? (
            <p>Завантаження...</p>
         ) : (
            <ul>
               {stats?.map((stat, index) => (
                  <li key={index}>
                     {stat.date} - {stat.speed} WPM, {stat.accuracy}%
                  </li>
               ))}
            </ul>
         )}
         <div>
            <input type="number" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
            <input type="number" value={accuracy} onChange={(e) => setAccuracy(+e.target.value)} />
            <button onClick={handleAddStat}>Додати статистику</button>
         </div>
      </div>
   );
}

export default Activities;

