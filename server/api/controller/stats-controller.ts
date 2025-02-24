import { Request, Response } from "express";
import { Stats } from "../models/stats-model";

class StatsController {
   // Додавання статистики
   async addStats(req: Request, res: Response): Promise<void> {
      const { userId } = req.params;
      const newStat = req.body;

      try {
         let userStats = await Stats.findOne({ userId });

         if (!userStats) {
            userStats = new Stats({ userId, stats: [newStat] });
         } else {
            userStats.stats.push(newStat);
         }

         await userStats.save();
         res.status(201).json({ message: "Статистика додана", stats: userStats.stats });
      } catch (error) {
         res.status(500).json({ message: "Помилка сервера", error });
      }
   }

   // Отримання статистики користувача
   async getStats(req: Request, res: Response): Promise<void> {
      const { userId } = req.params;

      try {
         const userStats = await Stats.findOne({ userId });

         if (!userStats) {
            res.status(404).json({ message: "Статистика не знайдена" });
            return;
         }

         res.json(userStats.stats);
      } catch (error) {
         res.status(500).json({ message: "Помилка сервера", error });
      }
   }
}

export default new StatsController();
