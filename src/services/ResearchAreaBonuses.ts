import findMandatoryMap from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import researchAreaBonus, { ResearchAreaBonusSteps } from './ResearchAreaBonus'
import BotFaction from './enum/BotFaction'
import researchArea from './enum/ResearchArea'

const items = [
  {
    botFaction: BotFaction.TERRANS,
    steps: [
      { researchArea: researchArea.GAIA_PROJECT, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.XENOS,
    steps: [
      { researchArea: researchArea.ARTIFICIAL_INTELLIGENCE, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.TAKLONS,
    steps: []
  },
  {
    botFaction: BotFaction.HADSCH_HALLAS,
    steps: [
      { researchArea: researchArea.ECONOMY, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.GEODENS,
    steps: [
      { researchArea: researchArea.TERRAFORMING, advanceSteps: 1 }
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

const itemsMap = new Map<BotFaction,researchAreaBonus>()
items.forEach(item => itemsMap.set(item.botFaction, item))

export default {

  /**
   * Get Research track bonus for bot faction
   * @param botFaction Bot faction
   * @returns Research track bonus
   */
  get(botFaction: BotFaction) : ResearchAreaBonusSteps[] {
    const item = findMandatoryMap(itemsMap, botFaction)
    return item.steps
  }

}
