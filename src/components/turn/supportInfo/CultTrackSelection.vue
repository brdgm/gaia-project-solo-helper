<template>
  <div>
    <AppIcon type="cult-track-selection" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'CultTrackSelection',
  components: {
    AppIcon
  },
  props: {
    type: {
      type: String,
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
