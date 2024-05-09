<template>
  <div>
    <AppIcon type="structure" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import { PropType } from 'vue';
import ScoringFinalTiebreaker from '@/services/enum/ScoringFinalTiebreaker';

export default defineComponent({
  name: 'ScoringFinalTiebreaker',
  components: {
    AppIcon
  },
  props: {
    type: {
      type: String as PropType<ScoringFinalTiebreaker>,
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
