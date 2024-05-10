<template>
  <template v-if="!isUpgrade">
    <div class="actionCol action">
      <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
    </div>
    <div class="actionCol support">
      <SupportInfo :botAction="botAction" :scoringFinalTiebreaker="true" :range="true" :directionalSelection="true"/>
    </div>
    <div class="actionCol text-muted small">
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="isUpgrade=true">{{t('botAction.buildMine.noDwelling')}}</button>
      <ol class="mt-2">
        <li v-if="isWanderers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.buildMine.validSpaces.factionWanderers')"></span></li>
        <li v-else v-html="t(`botAction.buildMine.validSpaces.${botAction.structure}`)"></li>
        <li v-html="t('botAction.buildMine.tiebreaker.title')"></li>
        <ol type="a">
          <template v-if="isKuddlers">
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.buildMine.tiebreaker.structureClosest')"></span></li>
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.buildMine.tiebreaker.terrainPriorityYourTerrainType',{terrainPriority:botAction.terrainPriority})"></span></li>
            <li v-html="t('botAction.buildMine.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else-if="isMimics">
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.buildMine.tiebreaker.terrainPriorityYourTerrainType',{terrainPriority:botAction.terrainPriority})"></span></li>
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.buildMine.tiebreaker.structureClosest')"></span></li>
            <li v-html="t('botAction.buildMine.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else>
            <li v-if="isPowerMongers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.buildMine.tiebreaker.factionPowerMongers')"></span></li>
            <li v-html="t('botAction.buildMine.tiebreaker.terrainPriority',{terrainPriority:botAction.terrainPriority})"></li>
            <li v-if="useSpaceFurthestAway" class="fire-ice"><span v-html="t('botAction.buildMine.tiebreaker.structureFurthest')"></span></li>
            <li v-else v-html="t('botAction.buildMine.tiebreaker.structureClosest')"></li>
            <li v-html="t('botAction.buildMine.tiebreaker.directionalSelection')"></li>
          </template>
        </ol>
        <li v-html="t('botAction.buildMine.execute.title')"></li>
        <ol type="a">
          <li v-html="t('botAction.buildMine.execute.homeTerrainTile')"></li>
          <li v-html="t('botAction.buildMine.execute.dwelling')"></li>
          <li v-if="isMarkedStructure" v-html="t('botAction.buildMine.execute.marked')"></li>
        </ol>
      </ol>
    </div>

    <ModalDialog id="modalReaching" :title="t('botAction.buildMine.reaching.title')">
      <template #body>
        <p v-html="t('botAction.buildMine.reaching.text1')"></p>
        <p v-html="t('botAction.buildMine.reaching.text2')"></p>
      </template>
    </ModalDialog>

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
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import Action from '@/services/enum/Action'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'

export default defineComponent({
  name: 'ActionBuildMine',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo,
    Upgrade,
    ModalDialog
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
    useSpaceFurthestAway() : boolean {
      return false
    },
    botFaction() : BotFaction|undefined {
      return this.botAction.botFaction
    },
    isFactionAction() : boolean {
      return this.botFaction != undefined
    },
    isKuddlers() : boolean {
      return false
    },
    isWanderers() : boolean {
      return false
    },
    isMimics() : boolean {
      return false
    },
    isPowerMongers() : boolean {
      return false
    },
    isMarkedStructure() : boolean {
      return false
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