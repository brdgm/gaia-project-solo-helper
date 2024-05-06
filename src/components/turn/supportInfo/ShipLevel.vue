<template>
  <div>
    <div class="shipLevel">{{shipLevel}}</div>
    <AppIcon name="ship-level" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ShipLevel',
  components: {
    AppIcon
  },
  props: {
    shipLevel: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 3rem;
}
.shipLevel {
  position: absolute;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.2rem;
  margin-left: 1.2rem;
}
</style>
