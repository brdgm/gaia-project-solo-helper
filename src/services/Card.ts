import Action from './enum/Action'
import FinalScoringTileTieBreaker from './enum/FinalScoringTileTieBreaker'
import DirectionalSelection from './enum/DirectionalSelection'
import InitialRoundBoosterSelection from './enum/InitialRoundBoosterSelection'
import RoundBoosterSelection from './enum/RoundBoosterSelection'

export default interface Card {
  id: number
  starter?: boolean
  action: Action
  victoryPoints: number
  finalScoringTileTieBreaker: FinalScoringTileTieBreaker
  range: number
  directionalSelection: DirectionalSelection
  directionalSelectionCount: number
  roundBoosterSelection: RoundBoosterSelection
  initialRoundBoosterSelection: InitialRoundBoosterSelection
  pass?: boolean
}
