import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

/**
 * Deep space sector tile
 */
export default class DeepSpaceSector {

  readonly id: string
  readonly initialOutline: boolean
  outline: boolean
  readonly initialRotation: number
  rotation: number
  
  constructor(id: string, initialOutline: boolean = false, initialRotation: number = 0) {
    this.id = id
    this.initialOutline = initialOutline
    this.outline = this.initialOutline
    this.initialRotation = initialRotation
    this.rotation = this.initialRotation
  }

  rotate() : void {
    if (this.rotation == 2) {
      this.rotation = 0
    }
    else {
      this.rotation += 1
    }
  }

  flip() : void {
    this.outline = !this.outline
  }

  randomizeRotationFlip() {
    this.outline = rollDice(2) == 1
    this.rotation = rollDice(3) - 1
  }

  reset() : void {
    this.outline = this.initialOutline
    this.rotation = this.initialRotation
  }

}
