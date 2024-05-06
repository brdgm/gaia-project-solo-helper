import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import BonusCardSelection from './enum/BonusCardSelection'
import CultTrackSelection from './enum/CultTrackSelection'
import DirectionalSelection from './enum/DirectionalSelection'
import InitialDwelling from './enum/InitialDwelling'
import Structure from './enum/Structure'
import TerrainPriority from './enum/TerrainPriority'

const cards = [
  {
    id: '*1',
    starter: true,
    actions: [
      Action.UPGRADE,
      Action.TAKE_FAVOR_TILE,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.MARKED,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 2,
    cultTrackSelection: CultTrackSelection.SCORING_TILE,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.B
  },
  {
    id: '*2',
    starter: true,
    merchantsOfTheSeas: false,
    actions: [
      Action.BLOCK_POWER_ACTION,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.MARKED,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 1,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.B
  },
  {
    id: '*3',
    starter: true,
    actions: [
      Action.ADVANCE_CULT_TRACK
    ],
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 3,
    cultTrackSelection: CultTrackSelection.SCORING_TILE,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.E
  },
  {
    id: '*4',
    starter: true,
    merchantsOfTheSeas: false,
    actions: [
      Action.TRANSFORM_AND_BUILD,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 1,
    structure: Structure.UNMARKED,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 3,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.F,
    pass: true
  },
  {
    id: '*5',
    starter: true,
    actions: [
      Action.FACTION_ACTION
    ],
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    cultTrackSelection: CultTrackSelection.SCORING_TILE,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.C
  },
  {
    id: '6',
    actions: [
      Action.BLOCK_POWER_ACTION,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 3,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.C,
    pass: true
  },
  {
    id: '7',
    actions: [
      Action.FACTION_ACTION
    ],
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 4,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.F,
    pass: true
  },
  {
    id: '8',
    actions: [
      Action.ADVANCE_CULT_TRACK,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 2,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 1,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.E,
    pass: true
  },
  {
    id: '9',
    actions: [
      Action.ADVANCE_CULT_TRACK,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 2,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.B,
    pass: true
  },
  {
    id: '10',
    actions: [
      Action.UPGRADE,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 1,
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 4,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.C,
    pass: true
  },
  {
    id: '11',
    actions: [
      Action.UPGRADE,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.E,
    pass: true
  },
  {
    id: '12',
    actions: [
      Action.BLOCK_POWER_ACTION,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 3,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.F,
    pass: true
  },
  {
    id: '13',
    actions: [
      Action.TRANSFORM_AND_BUILD,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 2,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 1,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.C,
    pass: true
  },
  {
    id: '*2-mots',
    starter: true,
    merchantsOfTheSeas: true,
    actions: [
      Action.BLOCK_POWER_ACTION,
      Action.TRADE
    ],
    tradeMinRound: 5,
    structure: Structure.MARKED,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 1,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialDwellingMarked: InitialDwelling.A,
    initialDwellingUnmarked: InitialDwelling.B
  },
  {
    id: '*4-mots',
    starter: true,
    merchantsOfTheSeas: true,
    actions: [
      Action.TRANSFORM_AND_BUILD,
      Action.GAIN_VICTORY_POINTS
    ],
    shipLevel: 2,
    victoryPoints: 1,
    structure: Structure.UNMARKED,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 3,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.F,
    pass: true
  },
  {
    id: 'mots-special',
    merchantsOfTheSeas: true,
    actions: [
      Action.TRADE
    ],
    tradeMinRound: 3,
    structure: Structure.UNMARKED,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 4,
    cultTrackSelection: CultTrackSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialDwellingMarked: InitialDwelling.D,
    initialDwellingUnmarked: InitialDwelling.E,
    pass: true
  },
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
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
