<template>
  <div class="float-end">
    {{t('income.turnInfo', {round:round})}}
  </div>
  <h1>{{t('income.title')}}</h1>

  <ul>
    <li v-html="t('income.collect')"></li>
    <li v-html="t('income.gaia')"></li>
  </ul>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'RoundIncome',
  components: {
    FooterButtons,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const navigationState = new NavigationState(route)
    const round = navigationState.round

    return { t, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round > 1) {
        const lastRound = this.state.rounds[this.round-2]
        if (lastRound && lastRound.turns) {
          return `/round/${this.round-1}/turn/${lastRound.turns.length+1}`
        }
      }
      return ''
    },
    nextButtonRouteTo() : string {
      return `/round/${this.round}/turn/1`
    }
  }
})
</script>
