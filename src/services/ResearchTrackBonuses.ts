import findMandatoryMap from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import researchTrackBonus, { ResearchTrackBonusSteps } from './ResearchTrackBonus'
import BotFaction from './enum/BotFaction'
import researchTrack from './enum/ResearchTrack'

const items = [
  {
    botFaction: BotFaction.TERRANS,
    steps: [
      { researchTrack: researchTrack.GAIA_PROJECT, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.XENOS,
    steps: [
      { researchTrack: researchTrack.ARTIFICIAL_INTELLIGENCE, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.TAKLONS,
    steps: []
  },
  {
    botFaction: BotFaction.HADSCH_HALLAS,
    steps: [
      { researchTrack: researchTrack.ECONOMY, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.GEODENS,
    steps: [
      { researchTrack: researchTrack.TERRAFORMING, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.FIRAKS,
    steps: []
  },
  {
    botFaction: BotFaction.ITARS,
    steps: []
  }
]

const itemsMap = new Map<BotFaction,researchTrackBonus>()
items.forEach(item => itemsMap.set(item.botFaction, item))

export default {

  /**
   * Get Research track bonus for bot faction
   * @param botFaction Bot faction
   * @returns Research track bonus
   */
  get(botFaction: BotFaction) : ResearchTrackBonusSteps[] {
    const item = findMandatoryMap(itemsMap, botFaction)
    return item.steps
  }

}
