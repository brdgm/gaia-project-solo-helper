<template>
  <div class="supportInfo">
    <ScoringFinalTiebreaker v-if="scoringFinalTiebreaker && botAction.scoringFinalTiebreaker" :type="botAction.scoringFinalTiebreaker"/>
    <NavigationRange v-if="range && botAction.range" :range="botAction.range"/>
    <DirectionalSelection v-if="directionalSelection && botAction.directionalSelection" :type="botAction.directionalSelection"/>
    <NumberedSelection v-if="numberedSelection && botAction.numberedSelection && botAction.numberedSelectionCount"
        :type="botAction.numberedSelection" :count="botAction.numberedSelectionCount"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BotAction from '@/services/BotAction'
import ScoringFinalTiebreaker from '@/components/turn/supportInfo/ScoringFinalTiebreaker.vue'
import NavigationRange from '@/components/turn/supportInfo/NavigationRange.vue'
import DirectionalSelection from '@/components/turn/supportInfo/DirectionalSelection.vue'
import NumberedSelection from './NumberedSelection.vue'

export default defineComponent({
  name: 'SupportInfo',
  components: {
    ScoringFinalTiebreaker,
    NavigationRange,
    DirectionalSelection,
    NumberedSelection
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    },
    scoringFinalTiebreaker: {
      type: Boolean,
      required: false
    },
    range: {
      type: Boolean,
      required: false
    },
    directionalSelection: {
      type: Boolean,
      required: false
    },
    numberedSelection: {
      type: Boolean,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.supportInfo {
  padding: 0.5rem;
  div {
    margin: 0.2rem;
  }
}
</style>
