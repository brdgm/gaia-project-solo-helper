<template>
  <template v-if="!isUpgrade">
    <div class="actionCol action">
      <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
    </div>
    <div class="actionCol support">
      <SupportInfo :botAction="botAction" :navigationState="navigationState"
          :scoringFinalTiebreaker="scoringFinalTileTiebreaker != undefined" :range="true" :directionalSelection="true" :terraformingReference="true"/>
    </div>
    <div class="actionCol text-muted small">
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="isUpgrade=true">{{t('botAction.buildMine.noMine')}}</button>
      <ol class="mt-2">
        <li v-html="t('botAction.buildMine.validPlanets')"></li>
        <li v-html="t('botAction.buildMine.tiebreaker.title')"></li>
        <ol type="a">
          <li v-if="isFactionActionTiebreaker">
            <span v-html="t(`botFaction.${botFaction}`)"></span>:
            <span class="fw-bold" v-html="t(`botAction.buildMine.tiebreaker.faction.${botFaction}`)"></span>
          </li>
          <li v-if="isFactionActionTiebreaker">
            <span v-html="t('botAction.buildMine.tiebreaker.finalScoring')"></span>:
            <span class="fw-bold" v-html="t(`botAction.buildMine.tiebreaker.scoringFinalTile.${scoringFinalTileTiebreaker}`)"></span>
          </li>
          <li v-html="t('botAction.buildMine.tiebreaker.fewestTerraformingSteps')"></li>
          <li v-html="t('botAction.buildMine.tiebreaker.closestToYourPlanet')"></li>
          <li v-html="t('botAction.buildMine.tiebreaker.directionalSelection')"></li>
        </ol>
        <li v-html="t('botAction.buildMine.execute.title')"></li>
        <ol type="a">
          <li v-html="t('botAction.buildMine.execute.placeMine')"></li>
          <li v-if="hasScoringFinalTileSatellites" v-html="t('botAction.buildMine.execute.placeSatellite')"></li>
        </ol>
      </ol>
    </div>
  </template>
  <template v-else>
    <Upgrade :bot-action="upgradeBotAction" :navigation-state="navigationState"/>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import Upgrade from './ActionUpgrade.vue'
import Action from '@/services/enum/Action'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'
import ScoringFinalTiebreaker from '@/services/enum/ScoringFinalTiebreaker'

export default defineComponent({
  name: 'ActionBuildMine',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo,
    Upgrade
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      isUpgrade: false,
    }
  },
  computed: {
    upgradeBotAction() : BotAction {
      return {
        action: Action.UPGRADE,
        directionalSelection: this.botAction.directionalSelection
      }
    },
    botFaction() : BotFaction|undefined {
      return this.botAction.botFaction
    },
    isFactionActionTiebreaker() : boolean {
      return this.botFaction != undefined
    },
    scoringFinalTiles() : ScoringFinalTile[] {
      return this.state.setup.scoringFinalTiles ?? []
    },
    scoringFinalTileTiebreaker() : ScoringFinalTile|undefined {
      let result : ScoringFinalTile|undefined = undefined
      if (this.botAction.scoringFinalTiebreaker == ScoringFinalTiebreaker.TOP) {
        result = this.scoringFinalTiles[0]
      }
      else if (this.botAction.scoringFinalTiebreaker == ScoringFinalTiebreaker.BOTTOM) {
        result = this.scoringFinalTiles[1]
      }
      if (!(result == ScoringFinalTile.GAIA_PLANETS
          || result == ScoringFinalTile.PLANET_TYPES
          || result == ScoringFinalTile.SPACE_SECTOR_TILES)) {
        result = undefined
      }
      return result
    },
    hasScoringFinalTileSatellites() : boolean {
      return this.scoringFinalTiles.includes(ScoringFinalTile.SATELLITES)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
.structureIcon, .factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
.fire-ice {
  color: #a1350e;
}
:deep(a) {
  text-decoration: underline;
  text-decoration-style: dotted;
  color: #000;
}
</style>