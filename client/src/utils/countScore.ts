export function countScore(sentenceLength: number, timeSpent: number): number {
   return Math.floor(sentenceLength / Math.max(timeSpent, 0.9) * 60)
}