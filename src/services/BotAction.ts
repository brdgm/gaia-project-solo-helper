import Action from './enum/Action'
import BotFaction from './enum/BotFaction'
import CultTrackSelection from './enum/CultTrackSelection'
import DirectionalSelection from './enum/DirectionalSelection'
import Structure from './enum/Structure'
import TerrainPriority from './enum/TerrainPriority'

/**
 * Aggregated bot action
 */
export default interface BotAction {
  action: Action
  shipLevel?: number
  tradeMinRound?: number
  victoryPointsDifficultyLevel?: boolean
  victoryPoints?: number
  structure?: Structure
  terrainPriority?: TerrainPriority
  directionalSelection?: DirectionalSelection
  directionalSelectionCount?: number
  cultTrackSelection?: CultTrackSelection
  botFaction?: BotFaction
}
