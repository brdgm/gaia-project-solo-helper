/**
 * Space sector tile
 */
export default class SpaceSector {

  readonly id: string
  readonly outline: boolean
  rotation: number
  
  constructor(id: string, outline?: boolean) {
    this.id = id
    this.outline = outline ?? false
    this.rotation = 0
  }

  rotate() : void {
    if (this.rotation == 5) {
      this.rotation = 0
    }
    else {
      this.rotation += 1
    }
  }

}
