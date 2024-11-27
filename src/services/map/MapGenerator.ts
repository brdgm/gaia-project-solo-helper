import { shuffle } from 'lodash'
import SpaceSector from './SpaceSector'
import { ref } from 'vue'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

/**
 * Map Generator.
 */
export default class MapGenerator {

  readonly playerCount : number
  private readonly _spaceSectors = ref([] as SpaceSector[])

  constructor(playerCount: number) {
    this.playerCount = playerCount
    this.reset()
  }

  get spaceSectors() : readonly SpaceSector[] {
    return this._spaceSectors.value
  }

  reset() : void {
    if (this.playerCount > 2) {
      this._spaceSectors.value = INITIAL_SETUP_PLAYER_34
    }
    else {
      this._spaceSectors.value = INITIAL_SETUP_PLAYER_12
    }
    this.spaceSectors.forEach(sector => sector.rotation = 0)
  }

  randomize() : void {
    this._spaceSectors.value = shuffle(this._spaceSectors.value)
    this.spaceSectors.forEach(sector => sector.rotation = rollDice(6) - 1)
    if (!this.isValid()) {
      this.randomize()
    }
  }

  /**
   * @returns true if map is valid, that means no two faction home planets are directly adjacent.
   */
  isValid() : boolean {
    for (let sectorIndex=0; sectorIndex<this.spaceSectors.length; sectorIndex++) {
      const currentSector = this.spaceSectors[sectorIndex]
      for (let hexIndex=0; hexIndex<12; hexIndex++) {
        const currentHexFactionPlanet = currentSector.getRotatedFactionPlanets()[hexIndex]
        if (currentHexFactionPlanet) {
          const adjacentSectorIndexes = this.getAdjacentSectorsIndexes(sectorIndex)
          const adjacentSectorHexes = this.getAdjacentSectorHexes(hexIndex)
          for (let adjacentSector=0;adjacentSector<adjacentSectorHexes.length;adjacentSector++) {
            const otherSectorIndex = adjacentSectorIndexes[adjacentSector]
            const otherSectorHexes = adjacentSectorHexes[adjacentSector]
            if (otherSectorIndex && otherSectorHexes) {
              const otherSectorFactionPlanets = this.spaceSectors[otherSectorIndex].getRotatedFactionPlanets()
              for (const otherSectorHex of otherSectorHexes) {
                if (otherSectorFactionPlanets[otherSectorHex] == currentHexFactionPlanet) {
                  return false
                }
              }
            }
          }
        }
      }
    }
    return true
  }

  /**
   * 3-4 player:
   *      0     1     2
   *   3     4     5     6
   *      7     8     9
   * 1-2 player:
   *      0     1
   *   2     3     4
   *      5     6
   * @returns Adjacent sector indexes. Array indexes:
   *       5  0
   *     4      1
   *       3  2
   */
  private getAdjacentSectorsIndexes(sectorIndex: number) : (number|undefined)[] {
    if (this.playerCount > 2) {
      switch (sectorIndex) {
        case 0: return [,1,4,3,,]
        case 1: return [,2,5,4,0,]
        case 2: return [,,6,5,1,]
        case 3: return [0,4,7,,,]
        case 4: return [1,5,8,7,3,0]
        case 5: return [2,6,9,8,4,1]
        case 6: return [,,,9,5,2]
        case 7: return [4,8,,,,3]
        case 8: return [5,9,,,7,4]
        case 9: return [6,,,,8,5]
        default:
          throw new Error(`Invalid index: ${sectorIndex}`)
      }
    }
    else {
      switch (sectorIndex) {
        case 0: return [,1,3,2,,]
        case 1: return [,,4,3,0,]
        case 2: return [0,3,5,,,]
        case 3: return [1,4,6,5,2,0]
        case 4: return [,,,6,3,1]
        case 5: return [3,6,,,,2]
        case 6: return [4,,,,5,3]
        default:
          throw new Error(`Invalid index: ${sectorIndex}`)
      }
    }
  }

  /**
   * @param hexIndex Hex index
   * @returns Outer array: Array indexes (see above), inner array hex indexes on adjacent sector tile.
   */
  private getAdjacentSectorHexes(hexIndex: number) : (number[]|undefined)[] {
    switch (hexIndex) {
      case 0: return [[8],,,,,[4,5]]
      case 1: return [[7,8]]
      case 2: return [[6,7],[10]]
      case 3: return [,[9,10]]
      case 4: return [,[8,9],[0]]
      case 5: return [,,[0,11]]
      case 6: return [,,[10,11],[2]]
      case 7: return [,,,[1,2]]
      case 8: return [,,,[0,1],[4]]
      case 9: return [,,,,[3,4]]
      case 10: return [,,,,[2,3],[6]]
      case 11: return [,,,,,[5,6]]
      default:
        throw new Error(`Invalid index: ${hexIndex}`)
    }
  }

}

/**
 *      10    01    05
 *   09    02    03    06
 *      08    04    07
 */
const INITIAL_SETUP_PLAYER_34 : SpaceSector[] = [
  new SpaceSector('10'),
  new SpaceSector('01'),
  new SpaceSector('05'),
  new SpaceSector('09'),
  new SpaceSector('02'),
  new SpaceSector('03'),
  new SpaceSector('06'),
  new SpaceSector('08'),
  new SpaceSector('04'),
  new SpaceSector('07')
]

/**
 *     01    05*
 *  02    03    06*
 *     04    07*
 */
const INITIAL_SETUP_PLAYER_12 : SpaceSector[] = [
  new SpaceSector('01'),
  new SpaceSector('05', true),
  new SpaceSector('02'),
  new SpaceSector('03'),
  new SpaceSector('06', true),
  new SpaceSector('04'),
  new SpaceSector('07', true)
]
