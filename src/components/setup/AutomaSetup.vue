<template>
  <h4>{{t('setupGameAutoma.generalSetup.title')}}</h4>
  <p v-html="t('setupGameAutoma.generalSetup.intro')"></p>
  <AppIcon name="directional-selection" class="directional-selection"/>
  <ol>
    <li v-html="t('setupGameAutoma.generalSetup.gameBoard', {playerCount:gameBoardPlayerCount})"></li>
    <li v-html="t('setupGameAutoma.generalSetup.federationTokens')"></li>
    <li>
      <span v-html="t('setupGameAutoma.generalSetup.roundScoringTiles')"></span><br/>
      <AppIcon v-for="tile of scoringRoundTiles" :key="tile"  type="scoring-round" :name="tile" class="scoringRoundTileIcon"/>
    </li>
    <li>
      <span v-html="t('setupGameAutoma.generalSetup.finalScoringTiles')"></span><br/>
      <AppIcon v-for="tile of scoringFinalTiles" :key="tile"  type="scoring-final" :name="tile" class="scoringFinalTileIcon"/>
    </li>
  </ol>
  <h4>{{t('setupGameAutoma.faction.title')}}</h4>
  <ul>
    <li v-html="t('setupGameAutoma.faction.structures')"></li>
    <li v-html="t('setupGameAutoma.faction.playerTokens')"></li>
    <li v-html="t('setupGameAutoma.faction.startVP', {count:botStartVP})"></li>
    <li v-html="t('setupGameAutoma.faction.satellites')"></li>
    <li v-for="(faction,index) of botFactions" :key="faction">
      <AppIcon type="faction" :name="faction" class="factionIcon"/>
      <span class="fw-bold" v-html="t(`botFaction.${faction}`)"></span>
      <ul>
        <li v-if="hasResearchAreaBonus(faction)">
          <span v-html="t('setupGameAutoma.faction.bonus')"></span>
          <AppIcon type="faction-setup-bonus" :name="faction" class="bonusIcon"/>
        </li>
        <li>
          <span v-html="t('setupGameAutoma.faction.initialMinePlacement', {count:mineCount(faction)})"></span>
          <AppIcon type="directional-selection" :name="randomDirectionalSelection()" class="directionalSelectionIcon"/>
        </li>
        <li v-html="t('setupGameAutoma.faction.roundBooster', {index:botFactionRoundBoosterIndex[index]})"></li>
      </ul>
    </li>
    <li v-if="isNeutralPlayer" v-html="t('setupGameAutoma.faction.neutralPlayer')"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDiceMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/rollDiceMultiDifferentValue'
import randomEnumMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/randomEnumMultiDifferentValue'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import AppIcon from '../structure/AppIcon.vue'
import BotFaction from '@/services/enum/BotFaction'
import { useStateStore } from '@/store/state'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'

export default defineComponent({
  name: 'AutomaSetup',
  components: {
    AppIcon
  },
  emits: {
    scoringTiles: (_scoringRoundTiles: ScoringRoundTile[], _scoringFinalTiles: ScoringFinalTile[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const scoringRoundTiles = ref(randomEnumMultiDifferentValue(ScoringRoundTile, 6))
    const scoringFinalTiles = ref(randomEnumMultiDifferentValue(ScoringFinalTile, 2))

    return { t, state, scoringRoundTiles, scoringFinalTiles }
  },
  computed: {
    totalPlayerCount() : number {
      return this.state.setup.playerSetup.botCount + this.state.setup.playerSetup.playerCount
    },
    gameBoardPlayerCount(): string {
      if (this.totalPlayerCount > 2) {
        return '3-4'
      }
      else {
        return '1-2'
      }
    },
    roundBoosterCount() : number {
      return this.totalPlayerCount + 3
    },
    botFactions() : BotFaction[] {
      return this.state.setup.playerSetup.botFaction.toReversed()
    },
    botStartVP() : number {
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
  },
  mounted() {
    this.$emit('scoringTiles', this.scoringRoundTiles, this.scoringFinalTiles)  
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
.directional-selection {
  float: right;
  width: 12rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.factionIcon {
  height: 1.5rem;
  margin-right: 0.25rem;
}
.bonusIcon, .directionalSelectionIcon {
  height: 1.5rem;
  margin-left: 0.25rem;
}
.scoringRoundTileIcon {
  height: 6rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}
.scoringFinalTileIcon {
  height: 4rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}
</style>
