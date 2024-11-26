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

}
