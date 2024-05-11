<template>
  <div class="wrapper">
    <div class="count" :class="{left: isLeft, right: !isLeft}">{{count}}</div>
    <AppIcon type="numbered-selection" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NumberedSelection from '@/services/enum/NumberedSelection'

export default defineComponent({
  name: 'NumberedSelection',
  components: {
    AppIcon
  },
  props: {
    type: {
      type: String as PropType<NumberedSelection>,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    isLeft() : boolean {
      return this.type == NumberedSelection.LEFT
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
  top: 0.25rem;
  margin-top: -0.25rem;  
  font-size: 1.5rem;
  font-weight: bold;
  &.left {
    left: 1.4rem;
  }
  &.right {
    left: 0.75rem;
  }
}
</style>
