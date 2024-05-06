<template>
  <ol>
    <li v-html="t('endOfRound.cultBonuses')"></li>
    <li v-html="t('endOfRound.returnActionTokens')"></li>
    <li v-html="t('endOfRound.bonusCardsCoin')"></li>
    <li v-html="t('endOfRound.removeScoringTile')"></li>
  </ol>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.nextRound')}}
  </router-link>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'EndOfRound',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    nextButtonRouteTo: {
      type: String,
      required: true
    }
  }
})
</script>
