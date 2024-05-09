<template>
  <h1>{{t('setupGameAutoma.title')}}</h1>

  <AutomaSetup @scoringTiles="setScoringTiles"/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame" :disabled="!scoringRoundTiles || !scoringFinalTiles">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import AutomaSetup from '@/components/setup/AutomaSetup.vue'
import { useStateStore } from '@/store/state'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'

export default defineComponent({
  name: 'SetupGameAutoma',
  components: {
    AutomaSetup,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      scoringRoundTiles: undefined as ScoringRoundTile[]|undefined,
      scoringFinalTiles: undefined as ScoringFinalTile[]|undefined
    }
  },
  methods: {
    startGame() : void {
      if (!this.scoringRoundTiles || !this.scoringFinalTiles) {
        return
      }
      this.state.resetGame()
      this.state.setup.scoringRoundTiles = this.scoringRoundTiles
      this.state.setup.scoringFinalTiles = this.scoringFinalTiles
      this.$router.push('/round/1/income')
    },
    setScoringTiles(scoringRoundTiles: ScoringRoundTile[], scoringFinalTiles: ScoringFinalTile[]) : void {
      this.scoringRoundTiles = scoringRoundTiles
      this.scoringFinalTiles = scoringFinalTiles
    }
  }
})
</script>
