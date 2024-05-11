import DifficultyLevel from './enum/DifficultyLevel'

/**
 * Victory points and ship level per round and difficulty level
 */
export default interface DifficultyLevelParameter {
  difficultyLevel: DifficultyLevel,
  round: DifficultyLevelParameterRound[]
}
export interface DifficultyLevelParameterRound {
  round: number,
  shipLevel: number,
  victoryPoints: number
}