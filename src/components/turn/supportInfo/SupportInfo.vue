<template>
  <div class="supportInfo">
    <StructureSelection v-if="structure" :type="botAction.structure!"/>
    <TerrainPriority v-if="terrainPriority" :type="botAction.terrainPriority!"/>
    <DirectionalSelection v-if="directionalSelection" :type="botAction.directionalSelection!" :count="botAction.directionalSelectionCount!"/>
    <CultTrackSelection v-if="cultTrackSelection" :type="botAction.cultTrackSelection!"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BotAction from '@/services/BotAction'
import StructureSelection from '@/components/turn/supportInfo/StructureSelection.vue'
import DirectionalSelection from '@/components/turn/supportInfo/DirectionalSelection.vue'
import TerrainPriority from '@/components/turn/supportInfo/TerrainPriority.vue'
import CultTrackSelection from '@/components/turn/supportInfo/CultTrackSelection.vue'

export default defineComponent({
  name: 'SupportInfo',
  components: {
    StructureSelection,
    DirectionalSelection,
    TerrainPriority,
    CultTrackSelection
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    },
    structure: {
      type: Boolean,
      required: false
    },
    terrainPriority: {
      type: Boolean,
      required: false
    },
    directionalSelection: {
      type: Boolean,
      required: false
    },
    cultTrackSelection: {
      type: Boolean,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.supportInfo {
  background-color: #f7d39c;
  border-radius: 0.5rem;
  padding: 0.5rem;
  div {
    margin: 0.2rem;
  }
}
</style>
