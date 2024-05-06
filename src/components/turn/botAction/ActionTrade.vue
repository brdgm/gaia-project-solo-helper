<template>
  <div class="actionCol">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :directional-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.trade.selectStructure.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.trade.selectStructure.highestPower')"></li>
        <li v-html="t('botAction.trade.selectStructure.directionalSelection')"></li>
      </ol>
      <li v-html="t('botAction.trade.execute.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.trade.execute.placeMarker')"></li>
        <li v-html="t('botAction.trade.execute.victoryPoints')"></li>
        <li v-html="t('botAction.trade.execute.gainPower')"></li>
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

export default defineComponent({
  name: 'ActionTrade',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
</style>