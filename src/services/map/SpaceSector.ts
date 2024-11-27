import { ref } from "vue"

/**
 * Space sector tile
 */
export default class SpaceSector {

  readonly id: string
  readonly outline: boolean
  rotation
  
  constructor(id: string, outline?: boolean) {
    this.id = id
    this.outline = outline ?? false
    this.rotation = ref(0)
  }

  rotate() : void {
    if (this.rotation.value == 5) {
      this.rotation.value = 0
    }
    else {
      this.rotation.value += 1
    }
  }

}
