<template>
  <div class="fixed-bottom text-muted cardDebugInfo">
    {{cardDeck.actionCard?.id}} / {{cardDeck.supportCard?.id}}
  </div>

  <template v-if="isPass">
    <BotPass :navigationState="navigationState"/>
  </template>
  <div v-else class="actions">
    <template v-for="(botAction, index) of botActions" :key="index">
      <hr v-if="index > 0" class="actionSeparator"/>
      <div class="actionRow">
        <component :is="`action-${botAction.action}`" :botAction="botAction" :navigationState="navigationState"
            @showBotAction="(botAction:BotAction,hideInitialAction:boolean) => showBotAction(botAction, hideInitialAction, index)"/>
      </div>
    </template>
  </div>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'
import BotActions from '@/services/BotActions'
import BotAction from '@/services/BotAction'
import ActionBuildMine from './botAction/ActionBuildMine.vue'
import ActionGainVictoryPoints from './botAction/ActionGainVictoryPoints.vue'
import ActionPowerQic from './botAction/ActionPowerQic.vue'
import ActionResearchAreaHighest from './botAction/ActionResearchAreaHighest.vue'
import ActionResearchAreaRandom from './botAction/ActionResearchAreaRandom.vue'
import ActionResearchAreaSpecific from './botAction/ActionResearchAreaSpecific.vue'
import ActionUpgrade from './botAction/ActionUpgrade.vue'
import BotPass from './BotPass.vue'

export default defineComponent({
  name: 'BotTurn',
  components: {
    ActionBuildMine,
    ActionGainVictoryPoints,
    ActionPowerQic,
    ActionResearchAreaHighest,
    ActionResearchAreaRandom,
    ActionResearchAreaSpecific,
    ActionUpgrade,
    BotPass
  },
  setup(props) {
    const { t } = useI18n()

    const navigationState = props.navigationState
    const cardDeck = navigationState.cardDeck!

    const botActions = ref([] as BotAction[])
    if (cardDeck.actionCard && cardDeck.supportCard && navigationState.botFaction) {
      botActions.value = [...new BotActions(cardDeck.actionCard, cardDeck.supportCard,
        navigationState.round, navigationState.botFaction, navigationState.difficultyLevel).actions]
    }

    return { t, cardDeck, botActions }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    nextButtonRouteTo: {
      type: String,
      required: true
    }
  },
  computed: {
    isPass() : boolean {
      return this.cardDeck.isPass()
    }
  },
  methods: {
    showBotAction(botAction: BotAction, hideInitialAction: boolean, initialActionIndex: number) : void {
      if (hideInitialAction) {
        this.botActions.splice(initialActionIndex, 1, botAction)
      }
      else {
        this.botActions.splice(initialActionIndex + 1, 0, botAction)
      }
    }
  }
})
</script>

<style lang="scss">
.actions {
  .actionRow {
    margin-top: 1rem;
    display: flex;
    flex-flow: wrap;
    .actionCol {
      margin: 0.5rem;
      max-width: 500px;
      &.action {
        padding: 0.5rem;
        background-color: #000;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        margin-right: 0;
      }
      &.support {
        background-color: #000;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        margin-left: 0;
      }
    }
  }
  .actionSeparator {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    color: gray;
  }
}
.cardDebugInfo {
  margin-bottom: 2rem;
  padding-right: 0.5rem;
  font-size: 0.6rem;
  background-color: transparent;
  text-align: right;
}
</style>
