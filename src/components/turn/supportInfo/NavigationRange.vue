<template>
  <div class="wrapper">
    <div class="range">{{range}}</div>
    <AppIcon name="range" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'NavigationRange',
  components: {
    AppIcon
  },
  props: {
    range: {
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
.wrapper {
  position: relative;
}
.range {
  position: absolute;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  top: -0.25rem;
}
</style>
