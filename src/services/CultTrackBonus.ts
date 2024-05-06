import BotFaction from './enum/BotFaction'
import CultTrack from './enum/CultTrack'

/**
 * Cult track bonus on game start.
 */
export default interface CultTrackBonus {
  botFaction: BotFaction
  steps: CultTrackBonusSteps[]
}
export interface CultTrackBonusSteps {
  cultTrack: CultTrack
  advanceSteps: number
}
