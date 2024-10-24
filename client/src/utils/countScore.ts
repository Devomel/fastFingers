export function countScore(sentenceLength: number, timeSpent: number): number {
  return Math.floor(sentenceLength / timeSpent * 60)
}