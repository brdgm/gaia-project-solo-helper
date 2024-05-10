<template>
  <div class="supportInfo d-flex">
    <div>
      <ScoringFinalTiebreaker v-if="scoringFinalTiebreaker && botAction.scoringFinalTiebreaker" :type="botAction.scoringFinalTiebreaker"/>
      <NavigationRange v-if="range && botAction.range" :range="botAction.range"/>
      <DirectionalSelection v-if="directionalSelection && botAction.directionalSelection" :type="botAction.directionalSelection"/>
      <ResearchArea v-if="researchArea && botAction.researchArea" :type="botAction.researchArea"/>
      <NumberedSelection v-if="numberedSelection && botAction.numberedSelection && botAction.numberedSelectionCount"
          :type="botAction.numberedSelection" :count="botAction.numberedSelectionCount"/>
    </div>
    <div v-if="terraformingReference && navigationState.botFaction" >
      <AppIcon type="terraforming-reference" :name="navigationState.botFaction" extension="jpg" class="terraformingReference"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BotAction from '@/services/BotAction'
import ScoringFinalTiebreaker from '@/components/turn/supportInfo/ScoringFinalTiebreaker.vue'
import NavigationRange from '@/components/turn/supportInfo/NavigationRange.vue'
import DirectionalSelection from '@/components/turn/supportInfo/DirectionalSelection.vue'
import ResearchArea from './ResearchArea.vue'
import NumberedSelection from './NumberedSelection.vue'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'SupportInfo',
  components: {
    ScoringFinalTiebreaker,
    NavigationRange,
    DirectionalSelection,
    ResearchArea,
    NumberedSelection,
    AppIcon
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
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
    researchArea: {
      type: Boolean,
      required: false
    },
    numberedSelection: {
      type: Boolean,
      required: false
    },
    terraformingReference: {
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
.terraformingReference {
  width: 4rem;
}
</style>
