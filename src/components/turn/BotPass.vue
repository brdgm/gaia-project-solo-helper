<template>
  <h5 v-html="t('botPass.title')"></h5>
  <ol>
    <li>
      <span v-html="t('botPass.scoringTile')"></span>
      <AppIcon name="scoring-tile-cult-color" class="scoringTile"/>
    </li>
    <li v-if="isFactionRacelings && isStartPlayer">
      <AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botPass.scoringTileFactionRacelings')"></span>
      <AppIcon name="scoring-tile-cult-color" class="scoringTile"/>
    </li>
    <li>
      <span v-html="t('botPass.bonusCard')"></span>
      <AppIcon type="bonus-card-selection" :name="bonusCardSelection" class="bonusCardSelection"/>
    </li>
    <li v-html="t('botPass.bonusCardGold')"></li>
  </ol>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import BonusCardSelection from '@/services/enum/BonusCardSelection'
import BotFaction from '@/services/enum/BotFaction'

export default defineComponent({
  name: 'BotPass',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    bonusCardSelection() : BonusCardSelection {
      return this.navigationState.cardDeck?.supportCard?.bonusCardSelection as BonusCardSelection
    },
    isFactionRacelings() : boolean {
      return this.navigationState.botFaction == BotFaction.RACELINGS
    },
    isStartPlayer(): boolean {
      return this.navigationState.roundTurn?.startPlayer ?? false
    }
  }
})
</script>

<style lang="scss" scoped>
.scoringTile {
  display: block;
  width: 6rem; 
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 3rem;
}
.bonusCardSelection {
  display: block;
  width: 6rem; 
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 3rem;
}
.factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
</style>
