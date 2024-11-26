<template>
  <ol>
    <li v-html="t('endOfGame.scoringFinalTileScoring')"></li>
    <ul v-if="isScoringFinalTileFederationStructures">
      <li v-html="t('endOfGame.scoringFinalTileFederationStructures')"></li>
    </ul>
    <li v-html="t('endOfGame.researchScoring')"></li>
    <li v-html="t('endOfGame.resourceScoring')"></li>
  </ol>
  <p>{{t('setup.difficultyLevel.title')}}: <b>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</b></p>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'

export default defineComponent({
  name: 'EndOfGame',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    round : {
      type: Number,
      required: true
    }
  },
  computed: {
    isScoringFinalTileFederationStructures() : boolean {
      return (this.state.setup.scoringFinalTiles ?? []).includes(ScoringFinalTile.FEDERATION_STRUCTURES)
    }
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 0.5rem;
}
</style>
