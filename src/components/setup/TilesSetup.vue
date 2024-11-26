<template>
  <p v-html="t('setupTiles.intro')"></p>
  <AppIcon name="directional-selection" class="directional-selection"/>
  <ol>
    <li v-html="t('setupTiles.gameBoard', {playerCount:gameBoardPlayerCount})"></li>
    <li v-html="t('setupTiles.federationTokens')"></li>
    <li>
      <span v-html="t('setupTiles.scoringRoundTiles')"></span>:<br/>
      <AppIcon v-for="tile of scoringRoundTiles" :key="tile" type="scoring-round" :name="tile" class="scoringRoundTileIcon"/><br/>
      <button class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#scoringRoundTilesModal">{{t('setupTiles.select')}}</button>
      <button class="btn btn-sm btn-secondary me-2" @click="randomizeScoringRoundTiles">{{t('setupTiles.randomize')}}</button>
    </li>
    <li>
      <span v-html="t('setupTiles.scoringFinalTiles')"></span>:<br/>
      <AppIcon v-for="tile of scoringFinalTiles" :key="tile" type="scoring-final" :name="tile" class="scoringFinalTileIcon"/><br/>
      <button class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#scoringFinalTilesModal">{{t('setupTiles.select')}}</button>
      <button class="btn btn-sm btn-secondary me-2" @click="randomizeScoringFinalTiles">{{t('setupTiles.randomize')}}</button>
    </li>
    <li>
      <span v-html="t('setupTiles.roundBooster', {count:roundBoosterCount})"></span><br/>
    </li>
  </ol>

  <div>
    <button class="btn btn-outline-secondary me-2 mb-2" data-bs-toggle="collapse" data-bs-target="#randomizedSetup">
      {{t('setupTiles.tileRandomizer.title')}} &#x25BC;      
    </button>
    <a href="https://rygg-gaard.no/gaia/" target="_blank" rel="noopener" class="btn btn-outline-secondary me-2 mb-2">
      {{t('setupTiles.map')}}
    </a>
  </div>
  <div class="collapse mt-2" id="randomizedSetup">
    <div class="alert alert-secondary fst-italic">
      <span v-html="t('setupTiles.tileRandomizer.notice')"></span>
      <button class="btn btn-sm btn-secondary ms-2" @click="randomizeRoundBoostersResearchBoard">{{t('setupTiles.randomize')}}</button>
    </div>

    <h5 v-html="t('setupTiles.tileRandomizer.roundBoosters')"></h5>
    <AppIcon v-for="id of roundBoosterTiles" :key="id" type="round-booster" :name="id.toString()" class="roundBoosterTile"/>

    <h5 v-html="t('setupTiles.tileRandomizer.researchBoard')"></h5>
    <div class="researchBoardWrapper">
      <div class="researchBoard">
        <img src="@/assets/research-board.jpg" alt="" class="background"/>
        <AppIcon type="federation-token" :name="researchFederationToken.toString()" class="federationToken"/>
        <div class="techAdvanced">
          <AppIcon v-for="id of techAdvancedTiles" :key="id" type="tech-advanced-tile" :name="id.toString()" class="tile"/>
        </div>
        <div class="techStandard">
          <AppIcon v-for="(id,index) of techStandardTiles" :key="id" type="tech-standard-tile" :name="id.toString()" class="tile"
              :class="{'column': index < 6, 'common': index >= 6}"/>
        </div>
      </div>
    </div>
  </div>

  <ModalDialog id="scoringRoundTilesModal" :title="t('setupTiles.scoringRoundTiles')" :size-lg="true">
    <template #body>
      {{t('setupTiles.available')}}<br/>
      <AppIcon v-for="tile of scoringRoundTilesAllWithoutSelection" :key="tile" type="scoring-round" :name="tile"
          class="scoringRoundTileIcon select" @click="selectScoringRoundTile(tile)"/>
      <hr/>
      {{t('setupTiles.selected')}}<br/>
      <AppIcon v-for="tile of scoringRoundTilesSelection" :key="tile" type="scoring-round" :name="tile"
          class="scoringRoundTileIcon select" @click="deselectScoringRoundTile(tile)"/>
      <p v-if="scoringRoundTilesSelection.length == 0" class="fst-italic">
        {{t('setupTiles.none')}}
      </p>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary" @click="scoringRoundTilesSelection=[]">{{t('action.reset')}}</button>
      <button class="btn btn-success" data-bs-dismiss="modal" :disabled="scoringRoundTilesSelection.length != 6" @click="setScoringRoundTileSelection">{{t('setupTiles.select')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
  
  <ModalDialog id="scoringFinalTilesModal" :title="t('setupTiles.scoringFinalTiles')" :size-lg="true">
    <template #body>
      {{t('setupTiles.available')}}<br/>
      <AppIcon v-for="tile of scoringFinalTilesAllWithoutSelection" :key="tile" type="scoring-final" :name="tile"
          class="scoringFinalTileIcon select" @click="selectScoringFinalTile(tile)"/>
      <hr/>
      {{t('setupTiles.selected')}}<br/>
      <AppIcon v-for="tile of scoringFinalTilesSelection" :key="tile" type="scoring-final" :name="tile"
          class="scoringFinalTileIcon select" @click="deselectScoringFinalTile(tile)"/>
      <p v-if="scoringFinalTilesSelection.length == 0" class="fst-italic">
        {{t('setupTiles.none')}}
      </p>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary" @click="scoringFinalTilesSelection=[]">{{t('action.reset')}}</button>
      <button class="btn btn-success" data-bs-dismiss="modal" :disabled="scoringFinalTilesSelection.length != 2" @click="setScoringFinalTileSelection">{{t('setupTiles.select')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
  
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import randomEnumMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/randomEnumMultiDifferentValue'
import rollDiceMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/rollDiceMultiDifferentValue'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

const SCORING_ROUND_TILES_COUNT = 6
const SCORING_FINAL_TILES_COUNT = 2
const FEDERATION_TOKEN_TOTAL = 6
const ROUND_BOOSTER_TOTAL = 10
const TECH_STANDARD_TILE_TOTAL = 9
const TECH_STANDARD_TILE_COUNT = 9
const TECH_ADVANCED_TILE_TOTAL = 15
const TECH_ADVANCED_TILE_COUNT = 6

export default defineComponent({
  name: 'TilesSetup',
  components: {
    AppIcon,
    ModalDialog
  },
  emits: {
    scoringTiles: (_scoringRoundTiles: ScoringRoundTile[], _scoringFinalTiles: ScoringFinalTile[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const totalPlayerCount = state.setup.playerSetup.botCount + state.setup.playerSetup.playerCount
    const roundBoosterCount = totalPlayerCount + 3

    const scoringRoundTiles = ref(randomEnumMultiDifferentValue(ScoringRoundTile, SCORING_ROUND_TILES_COUNT))
    const scoringFinalTiles = ref(randomEnumMultiDifferentValue(ScoringFinalTile, SCORING_FINAL_TILES_COUNT))
    const scoringRoundTilesSelection = ref([] as ScoringRoundTile[])
    const scoringFinalTilesSelection = ref([] as ScoringFinalTile[])

    const researchFederationToken = ref(rollDice(FEDERATION_TOKEN_TOTAL))
    const roundBoosterTiles = ref(rollDiceMultiDifferentValue(ROUND_BOOSTER_TOTAL, roundBoosterCount))
    const techStandardTiles = ref(rollDiceMultiDifferentValue(TECH_STANDARD_TILE_TOTAL, TECH_STANDARD_TILE_COUNT))
    const techAdvancedTiles = ref(rollDiceMultiDifferentValue(TECH_ADVANCED_TILE_TOTAL, TECH_ADVANCED_TILE_COUNT))

    return { t, state, totalPlayerCount, roundBoosterCount,
        scoringRoundTiles, scoringFinalTiles, scoringRoundTilesSelection, scoringFinalTilesSelection,
        researchFederationToken,  roundBoosterTiles, techStandardTiles, techAdvancedTiles }
  },
  computed: {
    gameBoardPlayerCount(): string {
      if (this.totalPlayerCount > 2) {
        return '3-4'
      }
      else {
        return '1-2'
      }
    },
    scoringRoundTilesAllWithoutSelection() : ScoringRoundTile[] {
      return Object.values(ScoringRoundTile).filter(tile => !this.scoringRoundTilesSelection.includes(tile))
    },
    scoringFinalTilesAllWithoutSelection() : ScoringFinalTile[] {
      return Object.values(ScoringFinalTile).filter(tile => !this.scoringFinalTilesSelection.includes(tile))
    }
  },
  methods: {
    emitScoringTiles() {
      this.$emit('scoringTiles', this.scoringRoundTiles, this.scoringFinalTiles)
    },
    randomizeScoringRoundTiles() : void {
      this.scoringRoundTiles = randomEnumMultiDifferentValue(ScoringRoundTile, SCORING_ROUND_TILES_COUNT)
      this.scoringRoundTilesSelection = []
      this.emitScoringTiles()
    },
    selectScoringRoundTile(tile: ScoringRoundTile) : void {
      if (this.scoringRoundTilesSelection.length < SCORING_ROUND_TILES_COUNT) {
        this.scoringRoundTilesSelection.push(tile)
      }
    },
    deselectScoringRoundTile(tile: ScoringRoundTile) : void {
      this.scoringRoundTilesSelection = this.scoringRoundTilesSelection.filter(t => t != tile)
    },
    setScoringRoundTileSelection() : void {
      this.scoringRoundTiles = this.scoringRoundTilesSelection
      this.emitScoringTiles()
    },
    randomizeScoringFinalTiles() : void {
      this.scoringFinalTiles = randomEnumMultiDifferentValue(ScoringFinalTile, SCORING_FINAL_TILES_COUNT)
      this.scoringFinalTilesSelection = []
      this.emitScoringTiles()
    },
    selectScoringFinalTile(tile: ScoringFinalTile) : void {
      if (this.scoringFinalTilesSelection.length < SCORING_FINAL_TILES_COUNT) {
        this.scoringFinalTilesSelection.push(tile)
      }
    },
    deselectScoringFinalTile(tile: ScoringFinalTile) : void {
      this.scoringFinalTilesSelection = this.scoringFinalTilesSelection.filter(t => t != tile)
    },
    setScoringFinalTileSelection() : void {
      this.scoringFinalTiles = this.scoringFinalTilesSelection
      this.emitScoringTiles()
    },
    randomizeRoundBoostersResearchBoard() : void {
      this.researchFederationToken = rollDice(FEDERATION_TOKEN_TOTAL)
      this.roundBoosterTiles = rollDiceMultiDifferentValue(ROUND_BOOSTER_TOTAL, this.roundBoosterCount)
      this.techStandardTiles = rollDiceMultiDifferentValue(TECH_STANDARD_TILE_TOTAL, TECH_STANDARD_TILE_COUNT)
      this.techAdvancedTiles = rollDiceMultiDifferentValue(TECH_ADVANCED_TILE_TOTAL, TECH_ADVANCED_TILE_COUNT)
    }
  },
  mounted() {
    this.emitScoringTiles()
  }
})
</script>

<style lang="scss" scoped>
li {
  margin-top: 0.5rem;
  li {
    margin-top: 0rem;
  }
}
.directional-selection {
  float: right;
  width: 12rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.scoringRoundTileIcon {
  height: 6rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  &.select {
    cursor: pointer;
  }
}
.scoringFinalTileIcon {
  height: 4rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  &.select {
    cursor: pointer;
  }
}
.roundBoosterTile {
  height: 10rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
}
.researchBoardWrapper {
  width: 100%;
  overflow-x: auto;
}
.researchBoard {
  position: relative;
  width: 600px;
  height: calc(600px / 1008px * 539px);
  img {
    filter: drop-shadow(5px 5px 4px #555);
  }
  .background {
    position: absolute;
    width: 600px;
    opacity: 30%;
    border-radius: 5px;
    z-index: -100;
  }
  .federationToken {
    position: absolute;
    height: 4rem;
    left: 5px;
    z-index: 100;
  }
  .techAdvanced {
    .tile {
      margin-top: 50px;
      margin-left: 18.5px;
      width: 81px;
    }
  }
  .techStandard {
    .tile {
      width: 100px;
      margin-top: 35px;
    }
    .tile:nth-child(7), .tile:nth-child(8), .tile:nth-child(9) {
      margin-top: 13px;
    }
    .tile:nth-child(7) {
      margin-left: 36px;
    }
    .tile:nth-child(8) {
      margin-left: 105px;
    }
    .tile:nth-child(9) {
      margin-left: 94px;
    }
  }
}
</style>
