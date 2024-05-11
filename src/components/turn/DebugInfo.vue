<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <ul>
        <li v-if="cardDeck?.actionCard">Action card: {{cardDeck?.actionCard}}</li>
        <li v-if="cardDeck?.supportCard">Support card: {{cardDeck?.supportCard}}</li>
        <li v-if="cardDeck">Deck: {{getCardIds(cardDeck.deck)}}, Discard: {{getCardIds(cardDeck.discard)}}, Reserve: {{getCardIds(cardDeck.reserve)}}</li>
        <li>Round Scoring: {{state.setup.scoringRoundTiles}}</li>
        <li>Final Scoring: {{state.setup.scoringFinalTiles}}</li>
      </ul>
    </p>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import Card from '@/services/Card'

export default defineComponent({
  name: 'DebugInfo',
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
    cardDeck() : CardDeck|undefined {
      return this.navigationState.cardDeck
    }
  },
  methods: {
    getCardIds(cards: readonly Card[]) : string {
      return '[' + cards.map(card => card.id).join(',') + ']'
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
</style>
