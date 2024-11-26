<template>
  <h5 v-html="t('botPass.title')"></h5>
  <ol>
    <li>
      <span v-html="t('botPass.scoringTile')"></span>
      <div class="ms-4 mt-2 mb-3">
        <ActionGainVictoryPoints :botAction="victoryPointsBotAction" :navigationState="navigationState" :hideText="true"/>
      </div>
    </li>
    <template v-if="!isLastRound">
      <li>
        <span v-html="t('botPass.roundBoosterTake')"></span>
        <div class="ms-4 mt-2 mb-3">
          <AppIcon type="round-booster-selection" :name="roundBoosterSelection" class="roundBoosterSelection"/>
        </div>
      </li>
      <li v-html="t('botPass.roundBoosterReturn')"></li>
    </template>
  </ol>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import RoundBoosterSelection from '@/services/enum/RoundBoosterSelection'
import { useStateStore } from '@/store/state'
import getScoringRoundVP from '@/util/getScoringRoundVP'
import ActionGainVictoryPoints from './botAction/ActionGainVictoryPoints.vue'
import BotAction from '@/services/BotAction'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'BotPass',
  components: {
    AppIcon,
    ActionGainVictoryPoints
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    roundBoosterSelection() : RoundBoosterSelection {
      return this.navigationState.cardDeck?.supportCard?.roundBoosterSelection ?? RoundBoosterSelection.LEFT
    },
    scoreVP() : number {
      const scoreRoundTile = (this.state.setup.scoringRoundTiles ?? [])[this.navigationState.round-1]
      if (scoreRoundTile) {
        return getScoringRoundVP(scoreRoundTile, this.navigationState.round)
      }
      return 0
    },
    victoryPointsBotAction() : BotAction {
      return { action: Action.GAIN_VICTORY_POINTS, victoryPoints: this.scoreVP }
    },
    isLastRound() : boolean {
      return this.navigationState.round == 6
    }
  }
})
</script>

<style lang="scss" scoped>
.roundBoosterSelection {
  display: block;
  width: 6rem; 
}
</style>
