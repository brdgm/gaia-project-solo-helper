import { RoundTurn } from '@/store/state'
import Player from './Player'

/**
 * Determines next player and start player based on player order and the current round's turn history.
 */
export default class PlayerOrder {

  private readonly turns : RoundTurn[]
  private readonly previousRoundTurns : RoundTurn[]
  private readonly allPlayers : Player[]
  readonly startPlayerOrder : Player[]

  private static readonly MAX_RECURSION_DEPTH = 5

  constructor(turns : RoundTurn[], previousRoundTurns : RoundTurn[],
      playerCount : number, botCount : number, variableTurnOrder : boolean) {
    this.turns = turns
    this.previousRoundTurns = previousRoundTurns
    this.allPlayers = getAllPlayers(playerCount, botCount)
    this.startPlayerOrder = getStartPlayerOrder(previousRoundTurns, this.allPlayers, variableTurnOrder)
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
    return this.startPlayerOrder[0]
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
   * Get last turn in this round of given player (bot).
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

  /**
   * Get last turn in previous round of given player (bot).
   */
  public getLastTurnPreviousRound(player : Player) : RoundTurn|undefined {
    const playerTurns = this.previousRoundTurns.filter(item => player.is(item) && item.cardDeck)
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
      const lastIndex = this.startPlayerOrder.findIndex(item => item.is(lastPlayer))
      if (lastIndex < this.startPlayerOrder.length - 1) {
        nextPlayer = this.startPlayerOrder[lastIndex + 1]
      }
    }
    if (!nextPlayer) {
      nextPlayer = this.startPlayerOrder[0]
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

}

function getAllPlayers(playerCount : number, botCount : number) : Player[] {
  const result : Player[] = []
  for (let player=1; player<=playerCount; player++) {
    result.push(Player.player(player))
  }
  for (let bot=1; bot<=botCount; bot++) {
    result.push(Player.bot(bot))
  }
  return result
}

function getStartPlayerOrder(previousRoundTurns : RoundTurn[], allPlayers : Player[], variableTurnOrder : boolean) : Player[] {
  const playerOrder : Player[] = []
  const passingOrder = previousRoundTurns.filter(item => item.pass).map(item => Player.fromTurn(item))
  if (variableTurnOrder) {
    // variable turn order = use passing order from previous round. fallback to initial player order.
    playerOrder.push(...passingOrder)
    for (const player of allPlayers) {
      if (!playerOrder.find(item => item.is(player))) {
        playerOrder.push(player)
      }
    }
  }
  else {
    // first passing player from previous round is start player, then clockwise player order
    const firstPlayer = passingOrder[0] ?? allPlayers[0]
    const firstPlayerIndex = allPlayers.findIndex(item => item.is(firstPlayer))
    for (let i=0; i<allPlayers.length; i++) {
      const index = (firstPlayerIndex + i) % allPlayers.length
      playerOrder.push(allPlayers[index])
    }
  }
  return playerOrder
}
