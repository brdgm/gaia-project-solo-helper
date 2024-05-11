import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.AUTOMALEIN,
        expansions: [],
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          botFaction: [BotFaction.TAKLONS]
        }
      },
      rounds: []
    } as State
  },
  actions: {
    roundTurn(roundTurn : RoundTurn) {
      let round = this.rounds[roundTurn.round - 1]
      if (!round) {
        round = {
          round : roundTurn.round,
          turns: []
        }
      }
      round.turns[roundTurn.turn - 1] = roundTurn
      // delete all "future" turns
      round.turns = round.turns.slice(0, roundTurn.turn)
      this.rounds[roundTurn.round - 1] = round
    },
    resetGame() {
      this.setup.scoringRoundTiles = undefined
      this.setup.scoringFinalTiles = undefined
      this.rounds = []
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  expansions: Expansion[]
  playerSetup: PlayerSetup
  scoringRoundTiles?: ScoringRoundTile[]
  scoringFinalTiles?: ScoringFinalTile[]
  debugMode?: boolean
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  botFaction: BotFaction[]
}
export interface Round {
  round: number
  turns: RoundTurn[]
}
export interface RoundTurn {
  round: number
  turn: number
  player?: number
  bot?: number
  startPlayer?: boolean
  pass?: boolean
  cardDeck?: CardDeckPersistence
}
export interface CardDeckPersistence {
  deck: string[]
  reserve: string[]
  discard: string[]
}
