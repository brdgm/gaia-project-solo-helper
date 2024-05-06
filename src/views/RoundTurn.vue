<template>
  <div class="float-end">
    <template v-if="endOfRound">{{t('endOfRound.turnInfo', {round:round})}}</template>
    <template v-else>{{t('roundTurn.turnInfo', {round:round, turn:turn})}}</template>
  </div>
  <h1>
    <template v-if="roundTurn?.player">{{t('roundTurn.titlePlayer', {player:roundTurn?.player}, playerCount)}}</template>
    <template v-if="roundTurn?.bot">{{t('roundTurn.titleBot', {bot:roundTurn?.bot, faction:t('botFaction.'+botFaction)}, botCount)}}</template>
    <img v-if="startPlayer" src="@/assets/icons/start-player-token.png" class="startPlayerIcon" alt=""/>
    <template v-if="endOfGame">{{t('endOfGame.title')}}</template>
    <template v-else-if="endOfRound">{{t('endOfRound.title')}}</template>
  </h1>

  <PlayerTurn v-if="roundTurn?.player" :navigationState="navigationState" :nextButtonRouteTo="nextButtonRouteTo"/>
  <BotTurn v-if="roundTurn?.bot" :navigationState="navigationState" :nextButtonRouteTo="nextButtonRouteTo"/>
  <EndOfGame v-if="endOfGame" :round="round"/>
  <EndOfRound v-else-if="endOfRound" :nextButtonRouteTo="nextButtonRouteTo"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="endOfGame ? 'endGame' : 'abortGame'"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import PlayerTurn from '@/components/turn/PlayerTurn.vue'
import BotTurn from '@/components/turn/BotTurn.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import EndOfRound from '@/components/turn/EndOfRound.vue'
import EndOfGame from '@/components/turn/EndOfGame.vue'

export default defineComponent({
  name: 'RoundTurn',
  components: {
    PlayerTurn,
    BotTurn,
    FooterButtons,
    EndOfRound,
    EndOfGame
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()

    const navigationState = new NavigationState(route)
    const { playerCount, botCount, round, turn, roundTurn, botFaction } = navigationState
    const startPlayer = navigationState.roundTurn?.startPlayer

    return { t, navigationState, playerCount, botCount, round, turn, roundTurn, botFaction, startPlayer }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn-1}`
      }
      else {
        return `/round/${this.round}/income`
      }
    },
    nextButtonRouteTo() : string {
      if (this.endOfRound) {
        return `/round/${this.round+1}/income`
      }
      else {
        return `/round/${this.round}/turn/${this.turn+1}`
      }
    },
    endOfRound() : boolean {
      return !(this.roundTurn?.player || this.roundTurn?.bot)
    },
    endOfGame() : boolean {
      return this.endOfRound && this.round > 5
    }
  }
})
</script>

<style lang="scss" scoped>
.startPlayerIcon {
  height: 2.8rem;
  margin-left: 0.75rem;
  margin-top: -0.5rem;
}
</style>