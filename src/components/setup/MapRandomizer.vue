<template>
  <p>Map Randomizer...</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'MapRandomizer',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    return { t, state }
  },
  computed: {
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
</style>
