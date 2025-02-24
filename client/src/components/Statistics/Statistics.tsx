import { useMemo, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { StatisticsDateRange } from "../../models/statistics";
import MyButton from "../../UI/button/MyButton";
import { filterDataByRange, formatXAxis, groupByMonth } from "../../utils/statistics/statisticsUtils";




// Генерація випадкових даних
const generateData = () => {
   const now = new Date();
   const data = [];
   const formatDate = (date: Date) => date.toISOString().split("T")[0];
   for (let i = 0; i < 360; i++) {
      data.push({
         date: formatDate(new Date(+now - i * 86400000)),
         speed: Math.floor(Math.random() * 80 + 20),
         accuracy: Math.floor(Math.random() * 80 + 20)
      });
   }
   return data.reverse();
};

const Statistics = () => {

   const [range, setRange] = useState<StatisticsDateRange>(StatisticsDateRange.WEEK);
   const [data, setData] = useState(generateData());

   const filteredData = useMemo(() => {
      const dataInRange = filterDataByRange(data, range);
      return range === "year" ? groupByMonth(dataInRange) : dataInRange;
   }, [data, range]);

   useEffect(() => {
      setData(generateData());
   }, []);

   return (
      <div>
         <div>
            <MyButton onClick={() => setRange(StatisticsDateRange.WEEK)} text={"Тиждень"} />
            <MyButton onClick={() => setRange(StatisticsDateRange.MONTH)} text={"Місяць"} />
            <MyButton onClick={() => setRange(StatisticsDateRange.YEAR)} text={"Рік"} />
         </div>
         <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
               <XAxis fontSize={10} dataKey="date" tickFormatter={(tick) => formatXAxis(tick, range)} />
               <YAxis />

               <Legend />
               <Line type="monotone" dataKey="speed" stroke="#8884d8" strokeWidth={2} />
               <Line type="monotone" dataKey="accuracy" stroke="#2884d8" strokeWidth={2} />

            </LineChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Statistics;
