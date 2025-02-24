import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   stats: [
      {
         date: { type: String, required: true },
         speed: { type: Number, required: true },
         accuracy: { type: Number, required: true },
      },
   ],
});

export const Stats = mongoose.model("Stats", StatsSchema);
