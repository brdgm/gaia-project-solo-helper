<template>
  <p v-html="t('setupTiles.intro')"></p>
  <AppIcon name="directional-selection" class="directional-selection"/>
  <ol>
    <li v-html="t('setupTiles.gameBoard', {playerCount:gameBoardPlayerCount})"></li>
    <li v-html="t('setupTiles.federationTokens')"></li>
    <li>
      <span v-html="t('setupTiles.roundScoringTiles')"></span><br/>
      <AppIcon v-for="tile of scoringRoundTiles" :key="tile"  type="scoring-round" :name="tile" class="scoringRoundTileIcon"/>
    </li>
    <li>
      <span v-html="t('setupTiles.finalScoringTiles')"></span><br/>
      <AppIcon v-for="tile of scoringFinalTiles" :key="tile"  type="scoring-final" :name="tile" class="scoringFinalTileIcon"/>
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import randomEnumMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/randomEnumMultiDifferentValue'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'

export default defineComponent({
  name: 'TilesSetup',
  components: {
    AppIcon
  },
  emits: {
    scoringTiles: (_scoringRoundTiles: ScoringRoundTile[], _scoringFinalTiles: ScoringFinalTile[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const scoringRoundTiles = ref(randomEnumMultiDifferentValue(ScoringRoundTile, 6))
    const scoringFinalTiles = ref(randomEnumMultiDifferentValue(ScoringFinalTile, 2))

    return { t, state, scoringRoundTiles, scoringFinalTiles }
  },
  computed: {
    totalPlayerCount() : number {
      return this.state.setup.playerSetup.botCount + this.state.setup.playerSetup.playerCount
    },
    gameBoardPlayerCount(): string {
      if (this.totalPlayerCount > 2) {
        return '3-4'
      }
      else {
        return '1-2'
      }
    },
    roundBoosterCount() : number {
      return this.totalPlayerCount + 3
    }
  },
  mounted() {
    this.$emit('scoringTiles', this.scoringRoundTiles, this.scoringFinalTiles)  
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
}
.scoringFinalTileIcon {
  height: 4rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}
</style>
