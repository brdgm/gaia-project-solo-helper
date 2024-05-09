import Action from './enum/Action'
import DirectionalSelection from './enum/DirectionalSelection'
import InitialRoundBoosterSelection from './enum/InitialRoundBoosterSelection'
import RoundBoosterSelection from './enum/RoundBoosterSelection'
import ScoringFinalTiebreaker from './enum/ScoringFinalTiebreaker'

export default interface Card {
  id: number
  starter?: boolean
  action: Action
  victoryPoints: number
  scoringFinalTiebreaker: ScoringFinalTiebreaker
  range: number
  directionalSelection: DirectionalSelection
  directionalSelectionCount: number
  roundBoosterSelection: RoundBoosterSelection
  initialRoundBoosterSelection: InitialRoundBoosterSelection
  pass?: boolean
}
