import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import DirectionalSelection from './enum/DirectionalSelection'
import FinalScoringTileTieBreaker from './enum/FinalScoringTileTieBreaker'
import RoundBoosterSelection from './enum/RoundBoosterSelection'
import InitialRoundBoosterSelection from './enum/InitialRoundBoosterSelection'

const cards = [
  {
    id: 1,
    starter: true,
    pass: true,
    action: Action.UPGRADE,
    victoryPoints: 1,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 4,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 1,
    roundBoosterSelection: RoundBoosterSelection.LEFT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_1
  },
  {
    id: 2,
    starter: true,
    pass: true,
    action: Action.UPGRADE,
    victoryPoints: 1,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.BOTTOM,
    range: 2,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 2,
    roundBoosterSelection: RoundBoosterSelection.MIDDLE,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_2
  },
  {
    id: 3,
    pass: true,
    action: Action.RESEARCH_TRACK_HIGHEST,
    victoryPoints: 1,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 2,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 3,
    roundBoosterSelection: RoundBoosterSelection.RIGHT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_3
  },
  {
    id: 4,
    starter: true,
    action: Action.BUILD_MINE,
    victoryPoints: 1,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.NONE,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 4,
    roundBoosterSelection: RoundBoosterSelection.LEFT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_4
  },
  {
    id: 5,
    starter: true,
    pass: true,
    action: Action.POWER_QIC_ACTION,
    victoryPoints: 1,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.BOTTOM,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 5,
    roundBoosterSelection: RoundBoosterSelection.MIDDLE,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_5
  },
  {
    id: 6,
    action: Action.BUILD_MINE,
    victoryPoints: 3,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 2,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 1,
    roundBoosterSelection: RoundBoosterSelection.RIGHT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_1
  },
  {
    id: 7,
    starter: true,
    action: Action.RESEARCH_TRACK_RANDOM,
    victoryPoints: 0,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 2,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 4,
    roundBoosterSelection: RoundBoosterSelection.RIGHT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_2
  },
  {
    id: 8,
    pass: true,
    action: Action.BUILD_MINE,
    victoryPoints: 3,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.BOTTOM,
    range: 4,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 1,
    roundBoosterSelection: RoundBoosterSelection.MIDDLE,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_3
  },
  {
    id: 9,
    action: Action.FACTION_ACTION,
    victoryPoints: 0,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.BOTTOM,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    roundBoosterSelection: RoundBoosterSelection.RIGHT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_4
  },
  {
    id: 10,
    pass: true,
    action: Action.UPGRADE,
    victoryPoints: 3,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 3,
    roundBoosterSelection: RoundBoosterSelection.LEFT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_5
  },
  {
    id: 11,
    action: Action.UPGRADE,
    victoryPoints: 2,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.BOTTOM,
    range: 4,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 1,
    roundBoosterSelection: RoundBoosterSelection.MIDDLE,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_1
  },
  {
    id: 12,
    pass: true,
    action: Action.POWER_QIC_ACTION,
    victoryPoints: 3,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 1,
    roundBoosterSelection: RoundBoosterSelection.RIGHT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_2
  },
  {
    id: 13,
    starter: true,
    action: Action.FACTION_ACTION,
    victoryPoints: 0,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.NONE,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    roundBoosterSelection: RoundBoosterSelection.RIGHT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_3
  },
  {
    id: 14,
    action: Action.POWER_QIC_ACTION,
    victoryPoints: 3,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.BOTTOM,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 3,
    roundBoosterSelection: RoundBoosterSelection.MIDDLE,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_4
  },
  {
    id: 15,
    action: Action.RESEARCH_TRACK_HIGHEST,
    victoryPoints: 1,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 2,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    roundBoosterSelection: RoundBoosterSelection.LEFT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_5
  },
  {
    id: 16,
    pass: true,
    action: Action.POWER_QIC_ACTION,
    victoryPoints: 3,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.TOP,
    range: 2,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 3,
    roundBoosterSelection: RoundBoosterSelection.LEFT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_1
  },
  {
    id: 17,
    action: Action.RESEARCH_TRACK_RANDOM,
    victoryPoints: 2,
    finalScoringTileTieBreaker: FinalScoringTileTieBreaker.BOTTOM,
    range: 2,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 5,
    roundBoosterSelection: RoundBoosterSelection.LEFT,
    initialRoundBoosterSelection: InitialRoundBoosterSelection.SLOT_2
  }
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  },

}
