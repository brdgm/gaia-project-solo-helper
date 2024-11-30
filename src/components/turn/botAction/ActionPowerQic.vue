<template>
  <div class="actionCol action">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol support">
    <SupportInfo :botAction="botAction" :navigationState="navigationState" :numberedSelection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <template v-if="hasLostFleet">
        <li v-html="t('botAction.powerQic.lostFleetPlaceToken.title')"></li>
        <ul>
          <li v-html="t('botAction.powerQic.lostFleetPlaceToken.power')"></li>
          <li v-html="t('botAction.powerQic.lostFleetPlaceToken.spaceshipFaceDown')"></li>
          <li v-html="t('botAction.powerQic.lostFleetPlaceToken.spaceshipFaceUp')"></li>
        </ul>
        <li v-html="t('botAction.powerQic.numberedSelection')"></li>
      </template>
      <template v-else>
        <li v-html="t('botAction.powerQic.placeToken')"></li>
        <li v-html="t('botAction.powerQic.numberedSelection')"></li>
      </template>
      <li v-if="isFactionXenosNormalAction">
        <span class="fst-italic" v-html="t(`botFaction.${botFaction}`)"></span>:
        <span class="fw-bold" v-html="t(`botAction.powerQic.executeTwice`)"></span>
      </li>
    </ol>
    <a v-html="t('botAction.powerQic.lostFleetSpaceship.title')" data-bs-toggle="collapse" data-bs-target="#lostFleetSpaceshipDetails" href="#"></a>
    <ul class="collapse" id="lostFleetSpaceshipDetails">
      <li v-html="t('botAction.powerQic.lostFleetSpaceship.faceDown')"></li>
      <li v-html="t('botAction.powerQic.lostFleetSpaceship.faceUp')"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'ActionPowerQic',
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
    hasLostFleet() : boolean {
      return this.state.setup.expansions.includes(Expansion.LOST_FLEET)
    },
    botFaction() : BotFaction|undefined {
      return this.navigationState.botFaction
    },
    isFactionXenosNormalAction() : boolean {
      return this.botFaction === BotFaction.XENOS && this.botAction.botFaction == undefined
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
a[data-bs-toggle=collapse]:link {
  color: unset;
  text-decoration: underline dotted;
}
</style>
