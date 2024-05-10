<template>
  <div class="wrapper">
    <div class="count" :class="{leftUp: isLeftUp, rightDown: !isLeftUp}">{{count}}</div>
    <AppIcon type="directional-selection" :name="type" class="icon"/>
    <AppIcon type="directional-selection-count" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'DirectionalSelection',
  components: {
    AppIcon
  },
  props: {
    type: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    isLeftUp() : boolean {
      return this.type == DirectionalSelection.LEFT_UP
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
.count {
  position: absolute;
  color: #fff;
  top: 0rem;
  margin-top: -0.25rem;  
  font-size: 1.75rem;
  font-weight: bold;
  &.leftUp {
    left: 4.25rem;
  }
  &.rightDown {
    left: 3.75rem;
  }
}
</style>
