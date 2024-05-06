<template>
  <ol>
    <li>
      <span v-html="t('endOfGame.areaScoring')"></span>
      <ShipLevel :shipLevel="shipLevel"/>
    </li>
    <ul v-if="isStrongholdSancturaryScoring || isOutpostsScoring">
      <li class="fire-ice" v-if="isStrongholdSancturaryScoring">
        <AppIcon type="expansion" name="fire-and-ice" class="expansionIcon"/>
        <span v-html="t('endOfGame.areaScoringFireIceStrongholdSanctuary')"></span>
      </li>
      <li class="fire-ice" v-if="isOutpostsScoring">
        <AppIcon type="expansion" name="fire-and-ice" class="expansionIcon"/><span v-html="t('endOfGame.areaScoringFireIceOutposts')"></span>
      </li>
    </ul>
    <li v-html="t('endOfGame.cultScoring')"></li>
    <li v-if="isFactionWanderers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('endOfGame.factionWanderers')"></span></li>
    <li v-if="isFactionGognomes"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('endOfGame.factionGognomes')"></span></li>
    <li v-html="t('endOfGame.resourceScoring')"></li>
  </ol>
</template>

<script lang="ts">
import DifficultyLevelParameters from '@/services/DifficultyLevelParameters'
import BotFaction from '@/services/enum/BotFaction'
import FinalScoringTile from '@/services/enum/FinalScoringTile'
import { useStateStore } from '@/store/state'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import ShipLevel from './supportInfo/ShipLevel.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    AppIcon,
    ShipLevel
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    round : {
      type: Number,
      required: true
    }
  },
  computed: {
    isStrongholdSancturaryScoring() : boolean {
      return this.state.setup.finalScoringTile == FinalScoringTile.STRONGHOLD_SANCTUARY
    },
    isOutpostsScoring() : boolean {
      return this.state.setup.finalScoringTile == FinalScoringTile.OUTPOSTS
    },
    shipLevel() : number {
      const params = DifficultyLevelParameters.get(this.state.setup.difficultyLevel, this.round)
      return params.shipLevel
    },
    isFactionWanderers() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.WANDERERS)
    },
    isFactionGognomes() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.GOGNOMES)
    }
  }
})
</script>

<style lang="scss" scoped>
.expansionIcon, .factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
.fire-ice {
  color: #a1350e;
}
</style>
