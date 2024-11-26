import SpaceSector from "./SpaceSector"

/**
 * Map Generator.
 */
export default class MapGenerator {

  readonly spaceSectors : SpaceSector[]

  constructor(playerCount: number) {
    if (playerCount > 2) {
      this.spaceSectors = INITIAL_SETUP_PLAYER_34
    }
    else {
      this.spaceSectors = INITIAL_SETUP_PLAYER_12
    }
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
