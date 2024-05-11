<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="expansionFireAndIce" :checked="hasLostFleet" @input="toggleLostFleet">
        <label class="form-check-label" for="expansionFireAndIce">
          {{t('expansion.lost-fleet')}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'

export default defineComponent({
  name: 'ExpansionsSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasLostFleet() : boolean {
      return this.state.setup.expansions.includes(Expansion.LOST_FLEET)
    }
  },
  methods: {
    toggleLostFleet() {
      toggleArrayItem(this.state.setup.expansions, Expansion.LOST_FLEET)
    }
  }
})
</script>
