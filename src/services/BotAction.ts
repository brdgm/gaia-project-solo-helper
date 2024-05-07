import Action from './enum/Action'
import BotFaction from './enum/BotFaction'
import DirectionalSelection from './enum/DirectionalSelection'
import FinalScoringTileTieBreaker from './enum/FinalScoringTileTieBreaker'
import ResearchTrack from './enum/ResearchTrack'
import RoundBoosterSelection from './enum/RoundBoosterSelection'

/**
 * Aggregated bot action
 */
export default interface BotAction {
  action: Action
  victoryPoints?: number
  finalScoringTileTieBreaker?: FinalScoringTileTieBreaker
  range?: number
  directionalSelection?: DirectionalSelection
  directionalSelectionCount?: number
  roundBoosterSelection?: RoundBoosterSelection
  researchTrack?: ResearchTrack
  botFaction?: BotFaction
}
