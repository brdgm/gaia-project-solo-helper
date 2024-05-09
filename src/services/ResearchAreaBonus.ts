import BotFaction from './enum/BotFaction'
import ResearchArea from './enum/ResearchArea'

/**
 * Research track bonus on game start.
 */
export default interface ResearchAreaBonus {
  botFaction: BotFaction
  steps: ResearchAreaBonusSteps[]
}
export interface ResearchAreaBonusSteps {
  researchArea: ResearchArea
  advanceSteps: number
}
