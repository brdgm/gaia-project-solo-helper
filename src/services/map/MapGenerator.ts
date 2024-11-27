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
  }

}

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

const INITIAL_SETUP_PLAYER_12 : SpaceSector[] = [
  new SpaceSector('01'),
  new SpaceSector('05', true),
  new SpaceSector('02'),
  new SpaceSector('03'),
  new SpaceSector('06', true),
  new SpaceSector('04'),
  new SpaceSector('07', true)
]
