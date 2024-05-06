import findMandatoryArray from '@brdgm/brdgm-commons/src/util/array/findMandatory'
import findMandatoryMap from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import DifficultyLevelParameter, { DifficultyLevelParameterRound } from './DifficultyLevelParameter'
import DifficultyLevel from './enum/DifficultyLevel'

const items = [
  {
    difficultyLevel: DifficultyLevel.AUTOMALEIN,
    round: [
      { round: 1, shipLevel: 0, victoryPoints: 0 },
      { round: 2, shipLevel: 0, victoryPoints: 0 },
      { round: 3, shipLevel: 1, victoryPoints: 0 },
      { round: 4, shipLevel: 1, victoryPoints: 0 },
      { round: 5, shipLevel: 1, victoryPoints: 0 },
      { round: 6, shipLevel: 1, victoryPoints: 0 },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.AUTOMA,
    round: [
      { round: 1, shipLevel: 0, victoryPoints: 0 },
      { round: 2, shipLevel: 0, victoryPoints: 0 },
      { round: 3, shipLevel: 1, victoryPoints: 1 },
      { round: 4, shipLevel: 1, victoryPoints: 1 },
      { round: 5, shipLevel: 2, victoryPoints: 1 },
      { round: 6, shipLevel: 2, victoryPoints: 1 },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.AUTOMAECHTIG,
    round: [
      { round: 1, shipLevel: 0, victoryPoints: 1 },
      { round: 2, shipLevel: 0, victoryPoints: 1 },
      { round: 3, shipLevel: 1, victoryPoints: 2 },
      { round: 4, shipLevel: 1, victoryPoints: 2 },
      { round: 5, shipLevel: 2, victoryPoints: 2 },
      { round: 6, shipLevel: 2, victoryPoints: 2 },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.ULTOMA,
    round: [
      { round: 1, shipLevel: 1, victoryPoints: 2 },
      { round: 2, shipLevel: 1, victoryPoints: 2 },
      { round: 3, shipLevel: 2, victoryPoints: 2 },
      { round: 4, shipLevel: 2, victoryPoints: 2 },
      { round: 5, shipLevel: 2, victoryPoints: 3 },
      { round: 6, shipLevel: 2, victoryPoints: 3 },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.ALPTRAUMA,
    round: [
      { round: 1, shipLevel: 1, victoryPoints: 2 },
      { round: 2, shipLevel: 1, victoryPoints: 2 },
      { round: 3, shipLevel: 2, victoryPoints: 3 },
      { round: 4, shipLevel: 2, victoryPoints: 3 },
      { round: 5, shipLevel: 3, victoryPoints: 4 },
      { round: 6, shipLevel: 3, victoryPoints: 4 },
    ]
  },
]

const itemsMap = new Map<DifficultyLevel,DifficultyLevelParameter>()
items.forEach(item => itemsMap.set(item.difficultyLevel, item))

export default {

  /**
   * Get difficulty level parameters for given round
   * @param difficultyLevel Difficulty level
   * @param round Round
   * @returns Difficulty level parameters
   */
  get(difficultyLevel: DifficultyLevel, round: number) : DifficultyLevelParameterRound {
    const params = findMandatoryMap(itemsMap, difficultyLevel)
    return findMandatoryArray(params.round, item => item.round == round)
  }

}
