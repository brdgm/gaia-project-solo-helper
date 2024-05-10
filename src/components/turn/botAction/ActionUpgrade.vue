<template>
  <div class="actionCol action">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol support">
    <SupportInfo :botAction="botAction" :navigationState="navigationState" :directionalSelection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.upgrade.choose.title')"></li>
      <ol>
        <li v-html="t('botAction.upgrade.choose.planetaryInstitute')"></li>
        <li v-if="isFactionFiraks">
          <span class="fst-italic" v-html="t(`botFaction.${botFaction}`)"></span>:
          <span class="fw-bold" v-html="t('botAction.upgrade.choose.downgradeResearchLab')"></span>
        </li>
        <li v-html="t('botAction.upgrade.choose.tradingStation')"></li>
        <li v-html="t('botAction.upgrade.choose.academy')"></li>
        <li v-html="t('botAction.upgrade.choose.researchLab')"></li>
      </ol>
      <li v-html="t('botAction.upgrade.tiebreaker.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.upgrade.tiebreaker.closest')"></li>
        <li v-html="t('botAction.upgrade.tiebreaker.directionalSelection')"></li>
      </ol>
      <li v-html="t('botAction.upgrade.execute.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.upgrade.execute.upgrade')"></li>
        <li v-if="isFactionFiraks">
          <span class="fst-italic" v-html="t(`botFaction.${botFaction}`)"></span>:
          <span class="fw-bold" v-html="t('botAction.upgrade.execute.advanceResearchAreaRandom')"></span>
        </li>
        <li v-if="isFactionHadschHallas">
          <span class="fst-italic" v-html="t(`botFaction.${botFaction}`)"></span>:
          <span class="fw-bold" v-html="t('botAction.upgrade.execute.tradingStationVP')"></span>
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
import { useStateStore } from '@/store/state'
import BotFaction from '@/services/enum/BotFaction'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ActionUpgrade',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo
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
    isFactionFiraks() : boolean {
      return this.botFaction === BotFaction.FIRAKS
    },
    isFactionHadschHallas() : boolean {
      return this.botFaction === BotFaction.HADSCH_HALLAS
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
.factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
.mots {
  color: #007f93;
}
</style>