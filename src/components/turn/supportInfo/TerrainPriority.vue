<template>
  <div>
    <div class="letter">{{type}}</div>
    <AppIcon name="terrain-priority" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'TerrainPriority',
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
.letter {
  position: absolute;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: -0.3rem;  
}
.icon {
  margin-left: 1.1rem;
  height: 1.7rem;
}
</style>
