import { cloneDeep } from 'lodash'
import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerOrder from '@/services/PlayerOrder'
import { Round, RoundTurn, useStateStore } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import Player from '@/services/Player'
import getDifficultyLevel from './getDifficultyLevel'
import Expansion from '@/services/enum/Expansion'

export default class NavigationState {

  readonly state
  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  private readonly playerOrder : PlayerOrder
  readonly anyonePassed : boolean
  readonly round : number
  readonly turn : number
  readonly roundTurn? : RoundTurn
  readonly botFaction? : BotFaction
  readonly cardDeck? : CardDeck

  constructor(route : RouteLocation) {    
    this.state = useStateStore()
    const setup = this.state.setup
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = Number.parseInt(route.params['round'] as string)
    this.turn = Number.parseInt(route.params['turn'] as string)

    const roundData = this.getRound(this.round)
    const previousRoundData = this.getRound(this.round-1)
    const variableTurnOrder = setup.expansions.includes(Expansion.VARIABLE_TURN_ORDER)
    this.playerOrder = new PlayerOrder(roundData.turns.slice(0, this.turn), previousRoundData.turns,
        setup.playerSetup.playerCount, setup.playerSetup.botCount, variableTurnOrder)
    this.anyonePassed = this.playerOrder.hasAnyonePassed()

    this.roundTurn = cloneDeep(this.getRoundTurn(roundData, this.turn))
    if (this.roundTurn?.bot) {
      this.botFaction = setup.playerSetup.botFaction[this.roundTurn?.bot - 1]
    }
    if (this.roundTurn?.cardDeck) {
      this.cardDeck = CardDeck.fromPersistence(this.roundTurn?.cardDeck)
    }
    this.difficultyLevel = getDifficultyLevel(setup, this.roundTurn?.bot ?? 1)
  }

  private getRound(round : number) : Round {
    let roundData = this.state.rounds[round - 1]
    if (!roundData) {
      roundData = {
        round: round,
        turns: []
      }
    }
    return roundData
  }

  private getRoundTurn(roundData : Round, turn : number) : RoundTurn|undefined {
    let turnData : |RoundTurn|undefined = roundData.turns[turn - 1]
    if (!turnData) {
      turnData = this.createNextRoundTurn(roundData.round, turn)
    }
    return turnData
  }

  private createNextRoundTurn(round : number, turn : number) : RoundTurn|undefined {
    let startPlayer = false
    const nextPlayer = this.playerOrder.getNextPlayer()
    if (nextPlayer) {
      startPlayer = this.playerOrder.getStartPlayer().is(nextPlayer)
      const turnData : RoundTurn = { round : round, turn : turn, player : nextPlayer.player, bot : nextPlayer.bot }
      if (startPlayer) {
        turnData.startPlayer = startPlayer
      }
      if (turnData.bot) {
        const cardDeck = this.createCardDeck(round, nextPlayer)
        if (cardDeck.isPass()) {
          turnData.pass = true
          if (!this.playerOrder.hasAnyonePassed()) {
            turnData.startPlayer = true
          }
        }
        turnData.cardDeck = cardDeck.toPersistence()
      }
      this.state.roundTurn(turnData)
      return turnData
    }
    return undefined
  }

  private createCardDeck(round : number, player : Player) : CardDeck {
    let cardDeck

    // get card deck from last turn in current round and draw a new card
    let turnData = this.playerOrder.getLastTurn(player)
    if (turnData?.cardDeck) {
      cardDeck = CardDeck.fromPersistence(turnData.cardDeck)
      cardDeck.draw()
      return cardDeck
    }

    // get card deck from previous round and prepare for new round
    if (round > 1) {
      const previousRound = this.state.rounds[round-2]
      if (previousRound) {
        turnData = this.playerOrder.getLastTurnPreviousRound(player)
        if (turnData?.cardDeck) {
          cardDeck = CardDeck.fromPersistence(turnData.cardDeck)
          cardDeck.prepareForNextRound()
          cardDeck.draw()
          return cardDeck
        }
      }
    }

    // prepare new card deck
    cardDeck = CardDeck.new(getDifficultyLevel(this.state.setup, player.bot ?? 1))
    cardDeck.draw()
    return cardDeck
  }

}
