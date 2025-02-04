import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import BotFaction from '../enum/BotFaction'
import { SpaceSectorPersistence } from '@/store/state'

/**
 * Space sector tile
 */
export default class SpaceSector {

  readonly id: string
  readonly outline: boolean
  readonly initialRotation: number
  rotation: number
  readonly factionPlanets: (BotFaction|undefined)[]
  
  constructor(id: string, outline: boolean = false, initialRotation: number = 0) {
    this.id = id
    this.outline = outline
    this.initialRotation = initialRotation
    this.rotation = this.initialRotation
    this.factionPlanets = getFactionPlanets(id, outline)
  }

  rotate() : void {
    if (this.rotation == 5) {
      this.rotation = 0
    }
    else {
      this.rotation += 1
    }
  }

  randomizeRotation() {
    this.rotation = rollDice(6) - 1
  }

  reset() : void {
    this.rotation = this.initialRotation
  }

  /**
   * Returns faction planets on the tile, taking current rotation into account.
   * @returns Faction planets on the outer edge of the sector tile.
   *   Top hex is index 0, further hexes are counted in clockwise order.
   *              0
   *          11     1
   *       10           2
   *        9           3
   *        8           4
   *           7     5
   *              6
   */
  getRotatedFactionPlanets() : (BotFaction|undefined)[] {
    const result : (BotFaction|undefined)[] = []
    for (let i = 0; i < 12; i++) {
      result.push(this.factionPlanets[(i - this.rotation*2 + 12) % 12])
    }
    return result
  }

  public toPersistence() : SpaceSectorPersistence {
    return {
      id: this.id,
      outline: this.outline,
      rotation: this.rotation
    }
  }

  public static fromPersistence(persistence : SpaceSectorPersistence) : SpaceSector {
    return new SpaceSector(
      persistence.id,
      persistence.outline,
      persistence.rotation
    )
  }

}

function getFactionPlanets(id: string, outline?: boolean) : (BotFaction|undefined)[] {
  switch (id) {
    case '01':
      return [
        ,
        ,
        ,
        , // transdim
        ,
        BotFaction.GEODENS,
        BotFaction.HADSCH_HALLAS,
        ,
        ,
        BotFaction.XENOS
      ]
    case '02':
      return [
        BotFaction.FIRAKS,
        ,
        ,
        BotFaction.XENOS,
        ,
        , // transdim
        ,
        BotFaction.HADSCH_HALLAS,
        ,
        ,
        ,
        BotFaction.GEODENS
      ]
    case '03':
      return [
        , // transdim
        ,
        ,
        BotFaction.FIRAKS,
        ,
        ,
        BotFaction.XENOS,
        BotFaction.TERRANS
      ]
    case '04':
      return [
        BotFaction.FIRAKS,
        ,
        ,
        ,
        BotFaction.TERRANS,
        ,
        ,
        ,
        ,
        BotFaction.ITARS
      ]
    case '05':
      return [
        BotFaction.ITARS,
        ,
        , // transdim
        BotFaction.HADSCH_HALLAS,
        ,
        ,
        outline ? undefined : BotFaction.XENOS,
        BotFaction.HADSCH_HALLAS
      ]
    case '06':
      return [
        ,
        , // transdim
        ,
        ,
        BotFaction.XENOS,
        , // transdmin
      ]
    case '07':
      return [
        ,
        outline ? undefined : BotFaction.TAKLONS,
        ,
        ,
        ,
        ,
        BotFaction.FIRAKS,
        ,
        ,
        ,
        , // transdim
      ]
    case '08':
      return [
        BotFaction.TERRANS,
        ,
        , // transdim
        ,
        ,
        ,
        ,
        , // transdim
      ]
    case '09':
      return [
        ,
        , // transdim
        BotFaction.ITARS,
        ,
        ,
        ,
        ,
        ,
        BotFaction.TAKLONS,
        ,
        ,
        BotFaction.GEODENS
      ]
    case '10':
      return [
        ,
        , // transdim
        , // transdim
        ,
        ,
        ,
        ,
        BotFaction.HADSCH_HALLAS,
        BotFaction.TERRANS
      ]
    default:
      throw new Error(`Unknown space sector id: ${id}`)
  }
}
