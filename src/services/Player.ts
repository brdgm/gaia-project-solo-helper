import { RoundTurn } from '@/store/state'

export default class Player {
  private readonly _player?: number
  private readonly _bot?: number

  private constructor(player : number|undefined, bot : number|undefined) {
    this._player = player
    this._bot = bot
  }

  public get player() : number|undefined {
    return this._player
  }

  public get bot() : number|undefined {
    return this._bot
  }

  public is(item : RoundTurn|Player) : boolean {
    return item.player == this._player && item.bot == this._bot
  }

  public static player(player : number) : Player {
    return new Player(player, undefined)
  }

  public static bot(bot : number) : Player {
    return new Player(undefined, bot)
  }

  public static fromTurn(turn : RoundTurn) : Player {
    return new Player(turn.player, turn.bot)
  }

}
