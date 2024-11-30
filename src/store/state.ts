import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'
import Interspace from '@/services/map/Interspace'

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
      this.setup.setupResearchFederationToken = undefined
      this.setup.setupRoundBoosterTiles = undefined
      this.setup.setupTechStandardTiles = undefined
      this.setup.setupTechAdvancedTiles = undefined
      this.setup.setupTechStandardLostFleetTiles = undefined
      this.setup.setupFederationTokenLostFleetTiles = undefined
      this.setup.setupLostFleetTwilightArtifactTiles = undefined
      this.setup.setupLostFleetShipAutomaTileActive = undefined
      this.setup.setupLostFleetEconomyOverlay = undefined
      this.setup.setupMap = undefined
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
  // parameters not relevant for the application, but persistent for back button support in setup screens
  setupResearchFederationToken?: number
  setupRoundBoosterTiles?: number[]
  setupTechStandardTiles?: number[]
  setupTechAdvancedTiles?: number[]
  setupTechStandardLostFleetTiles?: number[]
  setupFederationTokenLostFleetTiles?: number[]
  setupLostFleetTwilightArtifactTiles?: number[]
  setupLostFleetShipAutomaTileActive?: number
  setupLostFleetEconomyOverlay?: number
  setupMap?: MapPersistence
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  botFaction: BotFaction[]
}
export interface MapPersistence {
  spaceSectors: SpaceSectorPersistence[]
  deepSpaceSectors: DeepSpaceSectorPersistence[]
  interspaces: Interspace[]
}
export interface SpaceSectorPersistence {
  id: string
  outline: boolean
  rotation: number  
}
export interface DeepSpaceSectorPersistence {
  id: string
  outline: boolean
  rotation: number  
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
