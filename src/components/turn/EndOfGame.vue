<template>
  <ol>
    <li v-html="t('endOfGame.scoringFinalTileScoring')"></li>
    <ul v-if="isScoringFinalTileFederationStructures">
      <li v-html="t('endOfGame.scoringFinalTileFederationStructures')"></li>
    </ul>
    <li v-html="t('endOfGame.researchScoring')"></li>
    <li v-html="t('endOfGame.resourceScoring')"></li>
  </ol>
  <p class="fst-italic">{{t('setup.difficultyLevel.title')}}:</p>
  <ul>
    <li v-for="bot in botCount" :key="bot" class="fst-italic">
      {{t('botFaction.' + getBotFaction(bot))}}:
      <img src="@/assets/icons/difficulty-level.png" class="difficultyLevelIcon" v-for="level in getDifficultyLevel(state.setup, bot)" :key="level" alt=""/>
      &nbsp;{{t(`difficultyLevel.${getDifficultyLevel(state.setup, bot)}`)}}
    </li>
  </ul>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'
import getDifficultyLevel from '@/util/getDifficultyLevel'
import BotFaction from '@/services/enum/BotFaction'

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
    },
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    }
  },
  methods: {
    getDifficultyLevel,
    getBotFaction(bot: number) : BotFaction {
      return this.state.setup.playerSetup.botFaction[bot - 1] ?? BotFaction.TAKLONS
    }
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 0.5rem;
}
.difficultyLevelIcon {
  height: 1.5rem;
}
</style>
