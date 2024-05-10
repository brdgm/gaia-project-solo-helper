<template>
  <div>
    <AppIcon type="directional-selection" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'DirectionalSelection',
  components: {
    AppIcon
  },
  props: {
    type: {
      type: String as PropType<DirectionalSelection>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 3rem;
}
</style>
