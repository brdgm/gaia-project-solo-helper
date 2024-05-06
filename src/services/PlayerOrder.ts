import { RoundTurn } from '@/store/state'
import Player from './Player'

/**
 * Determines next player and start player based on player order and the current round's turn history.
 */
export default class PlayerOrder {

  private readonly turns : RoundTurn[]
  private readonly allPlayers : Player[]

  private static readonly MAX_RECURSION_DEPTH = 5

  constructor(turns : RoundTurn[], playerCount : number, botCount : number) {
    this.turns = turns
    this.allPlayers = PlayerOrder.getAllPlayers(playerCount, botCount)
  }

  /**
   * Get starting player from this round (may have changed during round).
   */
  public getStartPlayer() : Player {
    const startPlayerTurns = this.turns.filter(item => item.startPlayer)
    if (startPlayerTurns.length > 0) {
      return Player.fromTurn(startPlayerTurns[startPlayerTurns.length -1])
    }
    if (this.turns.length > 0) {
      return Player.fromTurn(this.turns[0])
    }
    return this.allPlayers[0]
  }

  /**
   * Get next player in player order (that has not yet passed)
   */
  public getNextPlayer() : Player|undefined {
    return this.getNextPlayerRecursively(this.getLastPlayer(), 0)
  }

  /**
   * Checks if anyone has already passed this round.
   */
  public hasAnyonePassed() : boolean {
    return this.turns.find(item => item.pass) != undefined
  }

  /**
   * Get last turn in this round of given player.
   */
  public getLastTurn(player : Player) : RoundTurn|undefined {
    const playerTurns = this.turns.filter(item => player.is(item) && item.cardDeck)
    if (playerTurns.length > 0) {
      return playerTurns[playerTurns.length - 1]
    }
    else {
      return undefined
    }
  }

  private getLastPlayer() : Player|undefined {
    if (this.turns.length > 0) {
      const lastTurn = this.turns[this.turns.length-1]
      if (lastTurn) {
        return Player.fromTurn(lastTurn)
      }
    }
    return undefined
  }

  private getNextPlayerRecursively(lastPlayer: Player|undefined, recursionDepth : number) : Player|undefined {
    if (recursionDepth > PlayerOrder.MAX_RECURSION_DEPTH) {
      return undefined
    }

    // get next player or start with first one
    let nextPlayer
    if (lastPlayer) {
      const lastIndex = this.allPlayers.findIndex(item => item.is(lastPlayer))
      if (lastIndex < this.allPlayers.length - 1) {
        nextPlayer = this.allPlayers[lastIndex + 1]
      }
    }
    if (!nextPlayer) {
      nextPlayer = this.allPlayers[0]
    }

    // use next player if current next has already passed
    if (this.hasPassed(nextPlayer)) {
      nextPlayer = this.getNextPlayerRecursively(nextPlayer, recursionDepth + 1)
    }

    return nextPlayer
  }

  private hasPassed(player : Player) : boolean {
    return this.turns.find(item => player.is(item) && item.pass) != undefined
  }

  private static getAllPlayers(playerCount : number, botCount : number) : Player[] {
    const result : Player[] = []
    for (let player=1; player<=playerCount; player++) {
      result.push(Player.player(player))
    }
    for (let bot=1; bot<=botCount; bot++) {
      result.push(Player.bot(bot))
    }
    return result
  }

}
