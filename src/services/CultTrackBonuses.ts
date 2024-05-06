import findMandatoryMap from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import CultTrackBonus, { CultTrackBonusSteps } from './CultTrackBonus'
import BotFaction from './enum/BotFaction'
import CultTrack from './enum/CultTrack'

const items = [
  {
    botFaction: BotFaction.SIMPLETONS,
    steps: [
      { cultTrack: CultTrack.FIRE, advanceSteps: 1 },
      { cultTrack: CultTrack.WATER, advanceSteps: 1 },
      { cultTrack: CultTrack.EARTH, advanceSteps: 1 },
      { cultTrack: CultTrack.AIR, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.KUDDLERS,
    steps: [
      { cultTrack: CultTrack.FIRE, advanceSteps: 1 },
      { cultTrack: CultTrack.WATER, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.DRUIDS,
    steps: [
      { cultTrack: CultTrack.FIRE, advanceSteps: 2 }
    ]
  },
  {
    botFaction: BotFaction.RACELINGS,
    steps: [
      { cultTrack: CultTrack.FIRE, advanceSteps: 1 },
      { cultTrack: CultTrack.WATER, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.WANDERERS,
    steps: [
      { cultTrack: CultTrack.FIRE, advanceSteps: 1 },
      { cultTrack: CultTrack.EARTH, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.MIMICS,
    steps: [
      { cultTrack: CultTrack.WATER, advanceSteps: 1 },
      { cultTrack: CultTrack.EARTH, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.POWERMONGERS,
    steps: []
  },
  {
    botFaction: BotFaction.SYMBIONTS,
    steps: [
      { cultTrack: CultTrack.FIRE, advanceSteps: 1 },
      { cultTrack: CultTrack.EARTH, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.BLIGHT,
    steps: [
      { cultTrack: CultTrack.WATER, advanceSteps: 1 },
      { cultTrack: CultTrack.EARTH, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.GOGNOMES,
    steps: [
      { cultTrack: CultTrack.FIRE, advanceSteps: 1 },
      { cultTrack: CultTrack.AIR, advanceSteps: 1 }
    ]
  }
]

const itemsMap = new Map<BotFaction,CultTrackBonus>()
items.forEach(item => itemsMap.set(item.botFaction, item))

export default {

  /**
   * Get cult track bonus for bot faction
   * @param botFaction Bot faction
   * @returns Cult track bonus
   */
  get(botFaction: BotFaction) : CultTrackBonusSteps[] {
    const item = findMandatoryMap(itemsMap, botFaction)
    return item.steps
  }

}
