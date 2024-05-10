<template>
  <div class="actionCol action">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol support">
    <SupportInfo :botAction="botAction" :navigationState="navigationState" :numberedSelection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.powerQic.placeToken')"></li>
      <li v-html="t('botAction.powerQic.numberedSelection')"></li>
      <li v-if="isFactionXenosNormalAction">
        <span v-html="t(`botFaction.${botFaction}`)"></span>:
        <span class="fw-bold" v-html="t(`botAction.powerQic.executeTwice`)"></span>
      </li>
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
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'

export default defineComponent({
  name: 'ActionPowerQic',
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
.mots {
  color: #007f93;
}
</style>
