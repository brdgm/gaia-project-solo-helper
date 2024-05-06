<template>
  <div>
    <AppIcon type="structure" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'StructureSelection',
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
  height: 1.7rem;
}
</style>
