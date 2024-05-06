<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="expansionFireAndIce" :checked="hasFireAndIce" @input="toggleFireAndIce">
        <label class="form-check-label" for="expansionFireAndIce">
          <img src="@/assets/icons/expansion/fire-and-ice.png" class="icon" alt=""/>
          {{t('expansion.fire-and-ice')}}
        </label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="expansionMerchantsOfTheSeas" :checked="hasMerchantsOfTheSeas" @input="toggleMerchantsOfTheSeas">
        <label class="form-check-label" for="expansionMerchantsOfTheSeas">
          <img src="@/assets/icons/expansion/merchants-of-the-seas.png" class="icon" alt=""/>
          {{t('expansion.merchants-of-the-seas')}}
        </label>
      </div>
    </div>
  </div>
  <div class="row mt-3" v-if="hasFireAndIce">
    <div class="col-5 col-md-3">
      <label for="finalScoringTile" class="form-label">{{t('setup.expansions.finalScoringTile')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="finalScoringTile" v-model="finalScoringTile">
        <option v-for="finalScoringTile of finalScoringTiles" :key="finalScoringTile" :value="finalScoringTile">{{t(`finalScoringTile.${finalScoringTile}`)}}</option>
      </select>
      <p v-if="hasMerchantsOfTheSeas" class="small muted mt-2 ms-1" v-html="t('setup.expansions.motsScoringTile')"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'
import FinalScoringTile from '@/services/enum/FinalScoringTile'

export default defineComponent({
  name: 'ExpansionsSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const finalScoringTile = ref(state.setup.finalScoringTile)

    return { t, state, finalScoringTile }
  },
  computed: {
    hasFireAndIce() : boolean {
      return this.state.setup.expansions.includes(Expansion.FIRE_AND_ICE)
    },
    hasMerchantsOfTheSeas() : boolean {
      return this.state.setup.expansions.includes(Expansion.MERCHANTS_OF_THE_SEAS)
    },
    finalScoringTiles() : FinalScoringTile[] {
      return Object.values(FinalScoringTile)
    }
  },
  watch: {
    finalScoringTile() {
      this.state.setup.finalScoringTile = this.finalScoringTile
    }
  },
  methods: {
    toggleFireAndIce() {
      this.state.setupToggleExpansionFireAndIce()
      this.finalScoringTile = this.state.setup.finalScoringTile
    },
    toggleMerchantsOfTheSeas() {
      this.state.setupToggleExpansionMerchantsOfTheSeas()
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.5rem;
  width: 2rem;
  object-fit: contain;
}
</style>