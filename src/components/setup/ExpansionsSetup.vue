<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-switch" v-for="expansion of expansions" :key="expansion">
        <input class="form-check-input" type="checkbox" :id="`expansion-${expansion}`" :checked="hasExpansion(expansion)" @input="toggleExpansion(expansion)">
        <label class="form-check-label" :for="`expansion-${expansion}`">
          {{t(`expansion.${expansion}`)}}
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
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

export default defineComponent({
  name: 'ExpansionsSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    expansions() : Expansion[] {
      return getAllEnumValues(Expansion)
    }
  },
  methods: {
    hasExpansion(expansion: Expansion) : boolean {
      return this.state.setup.expansions.includes(expansion)
    },
    toggleExpansion(expansion: Expansion) {
      toggleArrayItem(this.state.setup.expansions, expansion)
    }
  }
})
</script>
