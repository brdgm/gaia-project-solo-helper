import Action from './enum/Action'
import BotFaction from './enum/BotFaction'
import DirectionalSelection from './enum/DirectionalSelection'
import NumberedSelection from './enum/NumberedSelection'
import ResearchArea from './enum/ResearchArea'
import RoundBoosterSelection from './enum/RoundBoosterSelection'
import ScoringFinalTiebreaker from './enum/ScoringFinalTiebreaker'

/**
 * Aggregated bot action
 */
export default interface BotAction {
  action: Action
  victoryPoints?: number
  scoringFinalTiebreaker?: ScoringFinalTiebreaker
  range?: number
  directionalSelection?: DirectionalSelection
  numberedSelection?: NumberedSelection
  numberedSelectionCount?: number
  roundBoosterSelection?: RoundBoosterSelection
  researchArea?: ResearchArea
  botFaction?: BotFaction
}
