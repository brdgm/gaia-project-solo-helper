import BotFaction from './enum/BotFaction'
import ResearchTrack from './enum/ResearchTrack'

/**
 * Research track bonus on game start.
 */
export default interface ResearchTrackBonus {
  botFaction: BotFaction
  steps: ResearchTrackBonusSteps[]
}
export interface ResearchTrackBonusSteps {
  researchTrack: ResearchTrack
  advanceSteps: number
}
