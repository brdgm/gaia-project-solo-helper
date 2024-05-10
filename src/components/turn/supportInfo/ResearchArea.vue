<template>
  <div>
    <AppIcon type="research-area" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import ResearchArea from '@/services/enum/ResearchArea'

export default defineComponent({
  name: 'ResearchArea',
  components: {
    AppIcon
  },
  props: {
    type: {
      type: String as PropType<ResearchArea>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 3rem;
}
</style>
