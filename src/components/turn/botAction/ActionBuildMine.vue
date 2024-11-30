<template>
  <div class="actionCol action">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol support">
    <SupportInfo :botAction="botAction" :navigationState="navigationState"
        :scoringFinalTiebreaker="scoringFinalTileTiebreaker != undefined" :range="true" :directionalSelection="true" :terraformingReference="true"/>
  </div>
  <div class="actionCol text-muted small">
    <button type="button" class="btn btn-outline-secondary btn-sm" @click="showUgrade()">{{t('botAction.buildMine.noMine')}}</button>
    <ol class="mt-2">
      <li v-html="t('botAction.buildMine.validPlanets')"></li>
      <li v-html="t('botAction.buildMine.tiebreaker.title')"></li>
      <ol type="a">
        <li v-if="isFactionActionTiebreaker">
          <span class="fst-italic" v-html="t(`botFaction.${botFaction}`)"></span>:
          <span class="fw-bold" v-html="t(`botAction.buildMine.tiebreaker.faction.${botFaction}`)"></span>
        </li>
        <li v-if="scoringFinalTileTiebreaker">
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
        <li v-if="isFactionGeodens">
          <span class="fst-italic" v-html="t(`botFaction.${botFaction}`)"></span>:
          <span class="fw-bold" v-html="t('botAction.buildMine.execute.planetTypeVP')"></span>
        </li>
      </ol>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
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
    SupportInfo
  },
  emits: {
    showBotAction: (_botAction: BotAction, _hideInitialAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
  computed: {
    botFaction() : BotFaction|undefined {
      return this.navigationState.botFaction
    },
    isFactionActionTiebreaker() : boolean {
      return this.botAction.botFaction != undefined
    },
    isFactionGeodens() : boolean {
      return this.botFaction === BotFaction.GEODENS
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
          || result == ScoringFinalTile.SPACE_SECTOR_TILES
          || result == ScoringFinalTile.LOST_FLEET_ASTEROID
          || result == ScoringFinalTile.LOST_FLEET_DEEP_SPACE)) {
        result = undefined
      }
      return result
    },
    hasScoringFinalTileSatellites() : boolean {
      return this.scoringFinalTiles.includes(ScoringFinalTile.SATELLITES)
    }
  },
  methods: {
    showUgrade() {  
      this.$emit('showBotAction', {
        action: Action.UPGRADE,
        directionalSelection: this.botAction.directionalSelection
      }, true)
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