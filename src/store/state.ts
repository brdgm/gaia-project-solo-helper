import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { defineStore } from 'pinia'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import FinalScoringTile from '@/services/enum/FinalScoringTile'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.AUTOMALEIN,
        expansions: [],
        finalScoringTile: FinalScoringTile.DEFAULT,
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          botFaction: [BotFaction.SIMPLETONS]
        }
      },
      rounds: []
    } as State
  },
  actions: {
    setupToggleExpansionFireAndIce() {
      toggleArrayItem(this.setup.expansions, Expansion.FIRE_AND_ICE)
      if (!this.setup.expansions.includes(Expansion.FIRE_AND_ICE)) {
        this.setup.finalScoringTile = FinalScoringTile.DEFAULT
      }
    },
    setupToggleExpansionMerchantsOfTheSeas() {
      toggleArrayItem(this.setup.expansions, Expansion.MERCHANTS_OF_THE_SEAS)
    },
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
  finalScoringTile: FinalScoringTile
  playerSetup: PlayerSetup
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
