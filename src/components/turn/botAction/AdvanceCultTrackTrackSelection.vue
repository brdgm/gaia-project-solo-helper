<template>
  <template v-if="isScoringTileCultTrackSelection">
    <li v-html="t('botAction.advanceCultTrack.scoringTile.title')"></li>
    <li v-html="t('botAction.advanceCultTrack.catchUp.otherwiseTitle')"></li>
  </template>
  <template v-else>
    <li v-html="t('botAction.advanceCultTrack.catchUp.title')"></li>
  </template>
  <ol type="a">
    <li v-html="t('botAction.advanceCultTrack.catchUp.marketAt0')"></li>
    <li v-if="isMultipleHumanPlayers" v-html="t('botAction.advanceCultTrack.catchUp.highestMarkerMultipleHumans')"></li>
    <li v-else v-html="t('botAction.advanceCultTrack.catchUp.highestMarker')"></li>
    <li v-html="t('botAction.advanceCultTrack.catchUp.directionalSelection')"></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import CultTrackSelection from '@/services/enum/CultTrackSelection'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'AdvanceCultTrackTrackSelection',
  inheritAttrs: false,
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    }
  },
  computed: {
    isScoringTileCultTrackSelection() : boolean {
      return this.botAction.cultTrackSelection == CultTrackSelection.SCORING_TILE
    },
    isMultipleHumanPlayers() : boolean {
      return this.state.setup.playerSetup.playerCount > 1
    }
  }
})
</script>
