<template>
  <p v-html="t('setupTiles.intro')"></p>
  <AppIcon name="directional-selection" class="directional-selection"/>
  <ol>
    <li v-html="t('setupTiles.gameBoard', {playerCount:gameBoardPlayerCount})"></li>
    <li v-html="t('setupTiles.federationTokens')"></li>
    <li>
      <span v-html="t('setupTiles.scoringRoundTiles')"></span>:<br/>
      <AppIcon v-for="tile of scoringRoundTiles" :key="tile" type="scoring-round" extension="webp" :name="tile" class="scoringRoundTileIcon"/><br/>
      <button class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#scoringRoundTilesModal">{{t('setupTiles.select')}}</button>
      <button class="btn btn-sm btn-secondary me-2" @click="randomizeScoringRoundTiles">{{t('action.randomize')}}</button>
    </li>
    <li>
      <span v-html="t('setupTiles.scoringFinalTiles')"></span>:<br/>
      <AppIcon v-for="tile of scoringFinalTiles" :key="tile" type="scoring-final" extension="webp" :name="tile" class="scoringFinalTileIcon"/><br/>
      <button class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#scoringFinalTilesModal">{{t('setupTiles.select')}}</button>
      <button class="btn btn-sm btn-secondary me-2" @click="randomizeScoringFinalTiles">{{t('action.randomize')}}</button>
    </li>
    <li>
      <span v-html="t('setupTiles.roundBooster', {count:roundBoosterCount})"></span><br/>
    </li>
  </ol>

  <div>
    <button class="btn btn-outline-secondary me-2 mb-2" data-bs-toggle="collapse" data-bs-target="#randomizedSetup">
      {{t('setupTiles.tileRandomizer.title')}} &#x25BC;      
    </button>
    <button class="btn btn-outline-secondary me-2 mb-2" data-bs-toggle="collapse" data-bs-target="#mapRandomizer">
      {{t('setupTiles.map')}} &#x25BC;      
    </button>
  </div>
  <div id="randomizerCollapseParent">
    <div class="collapse mt-2" id="randomizedSetup" data-bs-parent="#randomizerCollapseParent">
      <div class="alert alert-secondary fst-italic">
        <span v-html="t('setupTiles.tileRandomizer.notice')"></span>
        <button class="btn btn-sm btn-secondary ms-2" @click="randomizeRoundBoostersResearchBoard">{{t('action.randomize')}}</button>
      </div>

      <h5 v-html="t('setupTiles.tileRandomizer.roundBoosters')"></h5>
      <template v-for="id of roundBoosterTiles" :key="id">
        <AppIcon type="round-booster" :name="`${id}`" extension="webp" class="roundBoosterTile"/>
      </template>

      <h5 v-html="t('setupTiles.tileRandomizer.researchBoard')"></h5>
      <div class="researchBoardWrapper">
        <div class="researchBoard">
          <img src="@/assets/research-board.jpg" alt="" class="background"/>
          <AppIcon type="federation-token" :name="`${researchFederationToken}`" class="federationToken"/>
          <div class="techAdvanced">
            <template v-for="(id,index) of techAdvancedTiles" :key="id">
              <AppIcon v-if="index < 6" type="tech-advanced-tile" :name="`${id}${id==7 && hasLostFleet ?'-lost-fleet':''}`" extension="webp" class="tile"/>
            </template> 
          </div>
          <div class="techStandard">
            <template v-for="(id,index) of techStandardTiles" :key="id">
              <AppIcon v-if="id==2 && hasLostFleet" type="tech-standard-tile" :name="`${id}-lost-fleet`" extension="webp" class="tile" :class="{'column': index < 6, 'common': index >= 6}"/>
              <AppIcon v-else type="tech-standard-tile" :name="`${id}`" class="tile" :class="{'column': index < 6, 'common': index >= 6}"/>
            </template>
          </div>
        </div>
      </div>

      <template v-if="hasLostFleet">
        <h5 v-html="t('expansion.lost-fleet')" class="mt-3"></h5>
        <div v-for="(ship,index) of lostFleetShips" :key="ship" class="lostFleetShipWrapper">
          <div class="lostFleetShip" :class="{[ship]:true}">
            <AppIcon class="board" type="lost-fleet-ship-board" :name="ship" extension="webp"/>
            <AppIcon class="federationToken" type="federation-token-lost-fleet" :name="`${federationTokenLostFleetTiles[index]}`" extension="webp"/>
            <AppIcon class="techStandard" v-if="index<3" type="tech-standard-tile-lost-fleet" :name="`${techStandardLostFleetTiles[index]}`" extension="webp"/>
            <div v-if="index==3">
              <AppIcon v-for="artifact of lostFleetTwilightArtifactTiles" :key="artifact" class="artifact" type="lost-fleet-twilight-artifact" :name="`${artifact}`" extension="webp"/>
            </div>
          </div>
        </div>
        <div class="lostFleetScoringExtension">
          <AppIcon class="board" type="lost-fleet-scoring-extension" :name="totalPlayerCount > 2 ? 'player-34' : 'player-12'" extension="webp"/>
          <template v-for="(id,index) of techAdvancedTiles" :key="id">
            <AppIcon v-if="index == 6" type="tech-advanced-tile" :name="`${id}${id==7 && hasLostFleet ?'-lost-fleet':''}`" extension="webp" class="techAdvanced"/>
          </template> 
        </div>
      </template>

    </div>
    <div class="collapse mt-2" id="mapRandomizer" data-bs-parent="#randomizerCollapseParent">
      <MapRandomizer/>
    </div>
  </div>

  <ModalDialog id="scoringRoundTilesModal" :title="t('setupTiles.scoringRoundTiles')" :size-lg="true">
    <template #body>
      {{t('setupTiles.available')}}<br/>
      <AppIcon v-for="tile of scoringRoundTilesAllWithoutSelection" :key="tile" type="scoring-round" extension="webp" :name="tile"
          class="scoringRoundTileIcon select" @click="selectScoringRoundTile(tile)"/>
      <hr/>
      {{t('setupTiles.selected')}}<br/>
      <AppIcon v-for="tile of scoringRoundTilesSelection" :key="tile" type="scoring-round" extension="webp" :name="tile"
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
      <AppIcon v-for="tile of scoringFinalTilesAllWithoutSelection" :key="tile" type="scoring-final" extension="webp" :name="tile"
          class="scoringFinalTileIcon select" @click="selectScoringFinalTile(tile)"/>
      <hr/>
      {{t('setupTiles.selected')}}<br/>
      <AppIcon v-for="tile of scoringFinalTilesSelection" :key="tile" type="scoring-final" extension="webp" :name="tile"
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
import rollDiceMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/rollDiceMultiDifferentValue'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import MapRandomizer from './MapRandomizer.vue'
import getScoringRoundTiles from '@/util/getScoringRoundTiles'
import getScoringFinalTiles from '@/util/getScoringFinalTiles'
import Expansion from '@/services/enum/Expansion'
import LostFleetShip from '@/services/enum/LostFleetShip'

const SCORING_ROUND_TILES_COUNT = 6
const SCORING_FINAL_TILES_COUNT = 2
const FEDERATION_TOKEN_TOTAL = 6
const ROUND_BOOSTER_TOTAL = 10
const ROUND_BOOSTER_TOTAL_LOST_FLEET = 14
const TECH_STANDARD_TILE_TOTAL = 9
const TECH_STANDARD_TILE_COUNT = 9
const TECH_STANDARD_LOST_FLEET_TILE_TOTAL = 3
const TECH_STANDARD_LOST_FLEET_TILE_COUNT = 3
const TECH_ADVANCED_TILE_TOTAL = 15
const TECH_ADVANCED_TILE_TOTAL_LOST_FLEET = 21
const TECH_ADVANCED_TILE_COUNT = 6
const TECH_ADVANCED_TILE_COUNT_LOST_FLEET = 7
const FEDERATION_TOKEN_LOST_FLEET_TOTAL = 8
const FEDERATION_TOKEN_LOST_FLEET_COUNT = 4
const LOST_FLEET_TWILIGHT_ARTIFACT_TOTAL = 13
const LOST_FLEET_TWILIGHT_ARTIFACT_COUNT = 4

export default defineComponent({
  name: 'TilesSetup',
  components: {
    AppIcon,
    ModalDialog,
    MapRandomizer
  },
  emits: {
    scoringTiles: (_scoringRoundTiles: ScoringRoundTile[], _scoringFinalTiles: ScoringFinalTile[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const hasLostFleet = state.setup.expansions.includes(Expansion.LOST_FLEET)

    const totalPlayerCount = state.setup.playerSetup.botCount + state.setup.playerSetup.playerCount
    const roundBoosterCount = totalPlayerCount + 3

    const scoringRoundTilesAll = getScoringRoundTiles(state.setup.expansions)
    const scoringFinalTilesAll = getScoringFinalTiles(state.setup.expansions)
    const roundBoosterTotal = hasLostFleet ? ROUND_BOOSTER_TOTAL_LOST_FLEET : ROUND_BOOSTER_TOTAL
    const techAdvancedTileTotal = hasLostFleet ? TECH_ADVANCED_TILE_TOTAL_LOST_FLEET : TECH_ADVANCED_TILE_TOTAL
    const techAdvancedTileCount = hasLostFleet ? TECH_ADVANCED_TILE_COUNT_LOST_FLEET : TECH_ADVANCED_TILE_COUNT

    const scoringRoundTiles = ref(randomListMultiDifferentValue(scoringRoundTilesAll, SCORING_ROUND_TILES_COUNT))
    const scoringFinalTiles = ref(randomListMultiDifferentValue(scoringFinalTilesAll, SCORING_FINAL_TILES_COUNT))
    const scoringRoundTilesSelection = ref([] as ScoringRoundTile[])
    const scoringFinalTilesSelection = ref([] as ScoringFinalTile[])

    const researchFederationToken = ref(rollDice(FEDERATION_TOKEN_TOTAL))
    const roundBoosterTiles = ref(rollDiceMultiDifferentValue(roundBoosterTotal, roundBoosterCount))
    const techStandardTiles = ref(rollDiceMultiDifferentValue(TECH_STANDARD_TILE_TOTAL, TECH_STANDARD_TILE_COUNT))
    const techAdvancedTiles = ref(rollDiceMultiDifferentValue(techAdvancedTileTotal, techAdvancedTileCount))
    const techStandardLostFleetTiles = ref(rollDiceMultiDifferentValue(TECH_STANDARD_LOST_FLEET_TILE_TOTAL, TECH_STANDARD_LOST_FLEET_TILE_COUNT))
    const federationTokenLostFleetTiles = ref(rollDiceMultiDifferentValue(FEDERATION_TOKEN_LOST_FLEET_TOTAL, FEDERATION_TOKEN_LOST_FLEET_COUNT))
    const lostFleetTwilightArtifactTiles = ref(rollDiceMultiDifferentValue(LOST_FLEET_TWILIGHT_ARTIFACT_TOTAL, LOST_FLEET_TWILIGHT_ARTIFACT_COUNT))

    return { t, state, totalPlayerCount, roundBoosterCount, hasLostFleet,
        scoringRoundTilesAll, scoringFinalTilesAll, roundBoosterTotal, techAdvancedTileTotal, techAdvancedTileCount,
        scoringRoundTiles, scoringFinalTiles, scoringRoundTilesSelection, scoringFinalTilesSelection,
        researchFederationToken,  roundBoosterTiles, techStandardTiles, techAdvancedTiles, techStandardLostFleetTiles,
        federationTokenLostFleetTiles, lostFleetTwilightArtifactTiles }
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
      return this.scoringRoundTilesAll.filter(tile => !this.scoringRoundTilesSelection.includes(tile))
    },
    scoringFinalTilesAllWithoutSelection() : ScoringFinalTile[] {
      return this.scoringFinalTilesAll.filter(tile => !this.scoringFinalTilesSelection.includes(tile))
    },
    lostFleetShips() : LostFleetShip[] {
      const ships = Object.values(LostFleetShip)
      if (this.totalPlayerCount == 2) {
        return ships.filter(ship => ship != LostFleetShip.TWILIGHT)
      }
      else {
        return ships
      }
    }
  },
  methods: {
    emitScoringTiles() {
      this.$emit('scoringTiles', this.scoringRoundTiles, this.scoringFinalTiles)
    },
    randomizeScoringRoundTiles() : void {
      this.scoringRoundTiles = randomListMultiDifferentValue(this.scoringRoundTilesAll, SCORING_ROUND_TILES_COUNT)
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
      this.scoringFinalTiles = randomListMultiDifferentValue(this.scoringFinalTilesAll, SCORING_FINAL_TILES_COUNT)
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
      this.roundBoosterTiles = rollDiceMultiDifferentValue(this.roundBoosterTotal, this.roundBoosterCount)
      this.techStandardTiles = rollDiceMultiDifferentValue(TECH_STANDARD_TILE_TOTAL, TECH_STANDARD_TILE_COUNT)
      this.techAdvancedTiles = rollDiceMultiDifferentValue(this.techAdvancedTileTotal, this.techAdvancedTileCount)
      this.techStandardLostFleetTiles = rollDiceMultiDifferentValue(TECH_STANDARD_LOST_FLEET_TILE_TOTAL, TECH_STANDARD_LOST_FLEET_TILE_COUNT)
      this.federationTokenLostFleetTiles = rollDiceMultiDifferentValue(FEDERATION_TOKEN_LOST_FLEET_TOTAL, FEDERATION_TOKEN_LOST_FLEET_COUNT)
      this.lostFleetTwilightArtifactTiles = rollDiceMultiDifferentValue(LOST_FLEET_TWILIGHT_ARTIFACT_TOTAL, LOST_FLEET_TWILIGHT_ARTIFACT_COUNT)
    }
  },
  mounted() {
    this.emitScoringTiles()
  }
})

function randomListMultiDifferentValue<T>(values: T[], count: number): T[] {
  return rollDiceMultiDifferentValue(values.length, count).map(index => values[index-1])
}
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
.lostFleetShipWrapper {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 0.5rem;
}
.lostFleetShip {
  position: relative;
  width: 570px;
  img {
    filter: drop-shadow(5px 5px 4px #555);
  }
  .board {
    width: 100%;
    opacity: 60%;
  }
  .federationToken {
    position: absolute;
    height: 4rem;
    left: 371px;
    top: 96px;
    z-index: 100;
  }
  &.rebellion .federationToken {
    left: 367px;
    top: 85px;
  }
  &.twilight .federationToken {
    left: 327px;
    top: 104px;
  }
  .techStandard {
    position: absolute;
    width: 100px;
    left: 420px;
    top: 47px;
    z-index: 100;
  }
  &.tfmars .techStandard {
    top: 42px;
  }
  &.eclipse .techStandard {
    left: 406px;
    top: 24px;
  }
  .artifact {
    position: absolute;
    width: 70px;
    z-index: 100;
    &:nth-child(1) {
      left: 393px;
      top: 16px;
    }
    &:nth-child(2) {
      left: 489px;
      top: 21.5px;
    }
    &:nth-child(3) {
      left: 392px;
      top: 96px;
    }
    &:nth-child(4) {
      left: 488px;
      top: 90px;
    }
  }
}
.lostFleetScoringExtension {
  position: relative;
  width: 320px;
  .board {
    width: 100%;
    opacity: 60%;
  }
  .techAdvanced {
    position: absolute;
    width: 81px;
    left: 118px;
    top: 40px;
    filter: drop-shadow(5px 5px 4px #555);
  }
}
</style>
