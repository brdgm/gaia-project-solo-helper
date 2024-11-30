<template>
  <ul>
    <li v-html="t('setupGameAutoma.structures')"></li>
    <li v-html="t('setupGameAutoma.playerTokens')"></li>
    <li v-html="t('setupGameAutoma.startVP', {count:botStartVP})"></li>
    <li v-html="t('setupGameAutoma.satellites')"></li>
    <ul v-if="isScoringFinalTileFederationStructures">
      <li v-html="t('endOfGame.scoringFinalTileFederationStructures')"></li>
    </ul>
    <template v-if="hasLostFleet">
      <li v-html="t('setupGameAutoma.explorationShuttle')"></li>
    </template>
    <li v-for="(faction,index) of botFactions" :key="faction">
      <AppIcon type="faction" :name="faction" class="factionIcon"/>
      <span class="fw-bold" v-html="t(`botFaction.${faction}`)"></span>
      <ul>
        <li v-if="hasResearchAreaBonus(faction)">
          <span v-html="t('setupGameAutoma.bonus')"></span>
          <AppIcon type="faction-setup-bonus" :name="faction" class="bonusIcon"/>
        </li>
        <li>
          <span v-html="t('setupGameAutoma.initialMinePlacement', {count:mineCount(faction)})"></span>
          <AppIcon type="directional-selection" :name="randomDirectionalSelection()" class="directionalSelectionIcon"/>
        </li>
        <li v-html="t('setupGameAutoma.roundBooster', {index:botFactionRoundBoosterIndex[index]})"></li>
      </ul>
    </li>
    <li v-if="isNeutralPlayer" v-html="t('setupGameAutoma.neutralPlayer')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDiceMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/rollDiceMultiDifferentValue'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import AppIcon from '../structure/AppIcon.vue'
import BotFaction from '@/services/enum/BotFaction'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import Expansion from '@/services/enum/Expansion'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'

export default defineComponent({
  name: 'AutomaSetup',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    return { t, state }
  },
  computed: {
    hasLostFleet() : boolean {
      return this.state.setup.expansions.includes(Expansion.LOST_FLEET)
    },
    totalPlayerCount() : number {
      return this.state.setup.playerSetup.botCount + this.state.setup.playerSetup.playerCount
    },
    roundBoosterCount() : number {
      return this.totalPlayerCount + 3
    },
    botFactions() : BotFaction[] {
      return this.state.setup.playerSetup.botFaction.toReversed()
    },
    botStartVP() : number {
      if (this.hasLostFleet) {
        if (this.state.setup.difficultyLevel == DifficultyLevel.AUTOMA) {
          return 15
        }
        else if (this.state.setup.difficultyLevel == DifficultyLevel.AUTOMAECHTIG) {
          return 20
        }
        else if (this.state.setup.difficultyLevel == DifficultyLevel.ULTOMA) {
          return 25
        }
      }
      if (this.state.setup.difficultyLevel == DifficultyLevel.AUTOMALEIN) {
        return 0
      }
      return 10
    },
    botFactionRoundBoosterIndex() : number[] {
      return rollDiceMultiDifferentValue(this.roundBoosterCount, this.botFactions.length)
    },
    isNeutralPlayer() : boolean {
      return this.totalPlayerCount < 3
    },
    isScoringFinalTileFederationStructures() : boolean {
      return (this.state.setup.scoringFinalTiles ?? []).includes(ScoringFinalTile.FEDERATION_STRUCTURES)
    }
  },
  methods: {
    hasResearchAreaBonus(faction: BotFaction) : boolean {
      return faction == BotFaction.TERRANS
          || faction == BotFaction.GEODENS
          || faction == BotFaction.HADSCH_HALLAS
          || faction == BotFaction.XENOS
    },
    mineCount(faction: BotFaction) : number {
      if (faction == BotFaction.XENOS) {
        return 3
      }
      return 2
    },
    randomDirectionalSelection() : DirectionalSelection {
      return randomEnum(DirectionalSelection)
    }
  }
})
</script>

<style lang="scss" scoped>
li {
  margin-top: 0.5rem;
  li {
    margin-top: 0rem;
  }
}
.factionIcon {
  height: 1.5rem;
  margin-right: 0.25rem;
}
.bonusIcon, .directionalSelectionIcon {
  height: 1.5rem;
  margin-left: 0.25rem;
}
</style>
