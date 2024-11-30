import { shuffle } from 'lodash'
import SpaceSector from './SpaceSector'
import { ref } from 'vue'
import Expansion from '../enum/Expansion'
import DeepSpaceSector from './DeepSpaceSector'
import Interspace from './Interspace'
import { MapPersistence } from '@/store/state'

/**
 * Map Generator.
 */
export default class MapGenerator {

  readonly playerCount : number
  private readonly hasLostFleet : boolean
  private readonly _spaceSectors = ref([] as SpaceSector[])
  private readonly _deepSpaceSectors = ref([] as DeepSpaceSector[])
  private readonly _interspaces = ref([] as Interspace[])

  constructor(playerCount: number, expansions: Expansion[],
      spaceSectors?: SpaceSector[], deepSpaceSectors?: DeepSpaceSector[], interspaces?: Interspace[]) {
    this.playerCount = playerCount
    this.hasLostFleet = expansions.includes(Expansion.LOST_FLEET)
    if (spaceSectors && deepSpaceSectors && interspaces) {
      this._spaceSectors.value = spaceSectors
      this._deepSpaceSectors.value = deepSpaceSectors
      this._interspaces.value = interspaces
    }
    else {
      this.reset()
    }
  }

  get spaceSectors() : readonly SpaceSector[] {
    return this._spaceSectors.value
  }

  get deepSpaceSectors() : readonly DeepSpaceSector[] {
    return this._deepSpaceSectors.value
  }

  get interspaces() : readonly Interspace[] {
    return this._interspaces.value
  }

  reset() : void {
    if (this.hasLostFleet) {
      if (this.playerCount == 4) {
        this._spaceSectors.value = INITIAL_SETUP_LOST_FLEET_PLAYER_4
      }
      else if (this.playerCount == 3) {
        this._spaceSectors.value = INITIAL_SETUP_LOST_FLEET_PLAYER_3
      }
      else {
        this._spaceSectors.value = INITIAL_SETUP_LOST_FLEET_PLAYER_2
      }
      this.randomize()
    }
    else {
      if (this.playerCount > 2) {
        this._spaceSectors.value = INITIAL_SETUP_PLAYER_34
      }
      else {
        this._spaceSectors.value = INITIAL_SETUP_PLAYER_2
      }
      this._spaceSectors.value.forEach(sector => sector.reset())
      this._deepSpaceSectors.value = []
      this._interspaces.value = []
    }
  }

  randomize() : void {
    this._spaceSectors.value = shuffle(this._spaceSectors.value)
    this._spaceSectors.value.forEach(sector => sector.randomizeRotation())
    if (this.hasLostFleet) {
      this._deepSpaceSectors.value = this.getRandomDeepSpaceSectors()
      this._interspaces.value = this.getRandomInterspaces()
    }
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
    if (this.hasLostFleet) {
      const centerSectors = ['01','02','03','04']
      if (this.playerCount == 2 && !centerSectors.includes(this.spaceSectors[3].id)) {
        return false
      }
      if (this.playerCount == 3 && !centerSectors.includes(this.spaceSectors[4].id)) {
        return false
      }
      if (this.playerCount == 4 && (!centerSectors.includes(this.spaceSectors[4].id) || !centerSectors.includes(this.spaceSectors[5].id))) {
        return false
      }
    }
    return true
  }

  public toPersistence() : MapPersistence {
    return {
      spaceSectors: this._spaceSectors.value.map(sector => sector.toPersistence()),
      deepSpaceSectors: this._deepSpaceSectors.value.map(sector => sector.toPersistence()),
      interspaces: [...this._interspaces.value]
    }
  }

  public static fromPersistence(playerCount: number, expansions: Expansion[],
      persistence : MapPersistence) : MapGenerator {
    return new MapGenerator(
      playerCount, expansions,
      persistence.spaceSectors.map(SpaceSector.fromPersistence),
      persistence.deepSpaceSectors.map(DeepSpaceSector.fromPersistence),
      [...persistence.interspaces]
    )
  }

  /**
   * 3-4 player:
   *      0     1     2
   *   3     4     5     6
   *      7     8     9
   * 3 player (lost fleet):
   *      0     1     2
   *   3     4     5
   *      6     7     8
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
    if (this.playerCount == 3 && this.hasLostFleet) {
      switch (sectorIndex) {
        case 0: return [,1,4,3,,]
        case 1: return [,2,5,4,0,]
        case 2: return [,,,5,1,]
        case 3: return [0,4,6,,,]
        case 4: return [1,5,7,6,3,0]
        case 5: return [2,,8,7,4,1]
        case 6: return [4,7,,,,3]
        case 7: return [5,8,,,6,4]
        case 8: return [,,,,7,5]
        default:
          throw new Error(`Invalid index: ${sectorIndex}`)
      }
    }
    else if (this.playerCount > 2) {
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
    if (this.hasLostFleet) {
      switch (hexIndex) {
        case 0: return [[6,7]]
        case 1: return [[6]]
        case 2: return [,[8,9]]
        case 3: return [,[8]]
        case 4: return [,,[10,11]]
        case 5: return [,,[10]]
        case 6: return [,,,[0,1]]
        case 7: return [,,,[0]]
        case 8: return [,,,,[2,3]]
        case 9: return [,,,,[2]]
        case 10: return [,,,,,[4,5]]
        case 11: return [,,,,,[4]]
        default:
          throw new Error(`Invalid index: ${hexIndex}`)
      }
    }
    else {
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

  private getRandomDeepSpaceSectors() : DeepSpaceSector[] {
    const sectors = shuffle(this.playerCount == 2 ? LOST_FLEET_DEEP_SPACE_SECTORS_PLAYER_2 : LOST_FLEET_DEEP_SPACE_SECTORS_PLAYER_34)
    sectors.forEach(sector => sector.randomizeRotationFlip())
    return sectors
  }

  private getRandomInterspaces() : Interspace[] {
    let interspaces;
    let adjacents;
    if (this.playerCount == 2) {
      interspaces = shuffle(LOST_FLEET_INTERSPACE_PLAYER_2)
      adjacents = LOST_FLEET_ADJACENT_INTERSPACES_PLAYER_2
    }
    else if (this.playerCount == 3) {
      interspaces = shuffle(LOST_FLEET_INTERSPACE_PLAYER_3)
      adjacents = LOST_FLEET_ADJACENT_INTERSPACES_PLAYER_3
    }
    else {
      interspaces = shuffle(LOST_FLEET_INTERSPACE_PLAYER_4)
      adjacents = LOST_FLEET_ADJACENT_INTERSPACES_PLAYER_4
    }
    for (let i=0; i<interspaces.length && i<adjacents.length; i++) {
      const interspace = interspaces[i]
      const adjacentInterspaces = adjacents[i]
      if (isFleetInterspace(interspace)) {
        for (const adjacentInterspace of adjacentInterspaces) {
          if (isFleetInterspace(interspaces[adjacentInterspace])) {
            // adjacent interspaces must not be occupied by fleet tiles, try again
            return this.getRandomInterspaces()
          }
        }
      }
    }
    return interspaces
  }

}

/**
 *     01    05*
 *  02    03    06*
 *     04    07*
 */
const INITIAL_SETUP_PLAYER_2 : SpaceSector[] = [
  new SpaceSector('01'),
  new SpaceSector('05', true),
  new SpaceSector('02'),
  new SpaceSector('03'),
  new SpaceSector('06', true),
  new SpaceSector('04'),
  new SpaceSector('07', true)
]

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
 *     04    03
 *  05*   01    02
 *     06*   07*
 */
const INITIAL_SETUP_LOST_FLEET_PLAYER_2 : SpaceSector[] = [
  new SpaceSector('04'),
  new SpaceSector('03'),
  new SpaceSector('05', true),
  new SpaceSector('01'),
  new SpaceSector('02'),
  new SpaceSector('06', true),
  new SpaceSector('07', true),
]

/**
 *      04    03    09
 *   05*   01    02
 *      06*   07*   10
 */
const INITIAL_SETUP_LOST_FLEET_PLAYER_3 : SpaceSector[] = [
  new SpaceSector('04'),
  new SpaceSector('03'),
  new SpaceSector('09'),
  new SpaceSector('05', true),
  new SpaceSector('01'),
  new SpaceSector('02'),
  new SpaceSector('06', true),
  new SpaceSector('07', true),
  new SpaceSector('10')
]

/**
 *      04    03    09
 *   05    01    02    08
 *      06    07    10
 */
const INITIAL_SETUP_LOST_FLEET_PLAYER_4 : SpaceSector[] = [
  new SpaceSector('04'),
  new SpaceSector('03', false, 1),
  new SpaceSector('09'),
  new SpaceSector('05', false, 2),
  new SpaceSector('01'),
  new SpaceSector('02'),
  new SpaceSector('08', false, 5),
  new SpaceSector('06'),
  new SpaceSector('07', false, 1),
  new SpaceSector('10')
]

const LOST_FLEET_DEEP_SPACE_SECTORS_PLAYER_2 : DeepSpaceSector[] = [
  new DeepSpaceSector('11'),
  new DeepSpaceSector('12'),
  new DeepSpaceSector('13'),
  new DeepSpaceSector('14'),
  new DeepSpaceSector('15'),
  new DeepSpaceSector('16')
]

const LOST_FLEET_DEEP_SPACE_SECTORS_PLAYER_34 : DeepSpaceSector[] = [
  new DeepSpaceSector('11'),
  new DeepSpaceSector('12'),
  new DeepSpaceSector('13'),
  new DeepSpaceSector('14'),
  new DeepSpaceSector('15'),
  new DeepSpaceSector('16'),
  new DeepSpaceSector('17'),
  new DeepSpaceSector('18')
]

const LOST_FLEET_INTERSPACE_PLAYER_4 : Interspace[] = [
  Interspace.EMPTY,
  Interspace.ASTEROID,
  Interspace.ASTEROID,
  Interspace.ASTEROID,
  Interspace.ASTEROID,
  Interspace.PROTOPLANET,
  Interspace.FLEET_ECLIPSE,
  Interspace.FLEET_REBELLION,
  Interspace.FLEET_TFMARS,
  Interspace.FLEET_TWILIGHT
]

const LOST_FLEET_INTERSPACE_PLAYER_3 : Interspace[] = [
  Interspace.EMPTY,
  Interspace.ASTEROID,
  Interspace.ASTEROID,
  Interspace.PROTOPLANET,
  Interspace.FLEET_ECLIPSE,
  Interspace.FLEET_REBELLION,
  Interspace.FLEET_TFMARS,
  Interspace.FLEET_TWILIGHT
]

const LOST_FLEET_INTERSPACE_PLAYER_2 : Interspace[] = [
  Interspace.ASTEROID,
  Interspace.ASTEROID,
  Interspace.PROTOPLANET,
  Interspace.FLEET_ECLIPSE,
  Interspace.FLEET_REBELLION,
  Interspace.FLEET_TFMARS
]

/**
 * Adjacent interspaces for 4 player. Two fleet place tiles must not be placed to each other here.
 * Outer array: interspace index. Inner Array: adjacent interspace indexes.
 *                  0     2
 *               9     1     3
 *               8     6     4
 *                  7     5
 */
const LOST_FLEET_ADJACENT_INTERSPACES_PLAYER_4 : number[][] = [
  /*0:*/ [9,1],
  /*1:*/ [0,2,6],
  /*2:*/ [1,3],
  /*3:*/ [2,4],
  /*4:*/ [3,5],
  /*5:*/ [4,6],
  /*6:*/ [1,5,7],
  /*7:*/ [6,8],
  /*8:*/ [7,9],
  /*9:*/ [8,0]
]

/**
 * Adjacent interspaces for 3 player. Two fleet place tiles must not be placed to each other here.
 * Outer array: interspace index. Inner Array: adjacent interspace indexes.
 *                  0     2
 *               7     1
 *               6     4
 *                  5     3
 */
const LOST_FLEET_ADJACENT_INTERSPACES_PLAYER_3 : number[][] = [
  /*0:*/ [7,1],
  /*1:*/ [0,2,4],
  /*2:*/ [1],
  /*3:*/ [4],
  /*4:*/ [1,3,5],
  /*5:*/ [4,6],
  /*6:*/ [5,7],
  /*7:*/ [6,0]
]

/**
 * Adjacent interspaces for 2 player. Two fleet place tiles must not be placed to each other here.
 * Outer array: interspace index. Inner Array: adjacent interspace indexes.
 *                  0
 *               5     1
 *               4     2
 *                  3
 */
const LOST_FLEET_ADJACENT_INTERSPACES_PLAYER_2 : number[][] = [
  /*0:*/ [5,1],
  /*1:*/ [0,2],
  /*2:*/ [1,3],
  /*3:*/ [2,4],
  /*4:*/ [3,5],
  /*5:*/ [4,0]
]

function isFleetInterspace(interspace : Interspace) : boolean {
  return interspace == Interspace.FLEET_ECLIPSE
      || interspace == Interspace.FLEET_REBELLION
      || interspace == Interspace.FLEET_TFMARS
      || interspace == Interspace.FLEET_TWILIGHT
}
