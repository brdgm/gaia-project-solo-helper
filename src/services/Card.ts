import Action from './enum/Action'
import BonusCardSelection from './enum/BonusCardSelection'
import CultTrackSelection from './enum/CultTrackSelection'
import DirectionalSelection from './enum/DirectionalSelection'
import InitialDwelling from './enum/InitialDwelling'
import Structure from './enum/Structure'
import TerrainPriority from './enum/TerrainPriority'

export default interface Card {
  id: string
  starter?: boolean
  merchantsOfTheSeas?: boolean
  actions: Action[]
  shipLevel?: number
  tradeMinRound?: number
  victoryPoints?: number
  victoryPointsDifficultyLevel?: boolean
  structure: Structure
  terrainPriority: TerrainPriority
  directionalSelection: DirectionalSelection
  directionalSelectionCount: number
  cultTrackSelection: CultTrackSelection
  bonusCardSelection: BonusCardSelection
  initialDwellingMarked: InitialDwelling
  initialDwellingUnmarked: InitialDwelling
  pass?: boolean
}
