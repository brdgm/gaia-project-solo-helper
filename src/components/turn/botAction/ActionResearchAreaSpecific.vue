<template>
  <div class="actionCol">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :botAction="botAction" :scoringFinalTiebreaker="true" :range="true" :directionalSelection="true" />
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.researchArea.notMarker10')"></li>
      <li v-html="t('botAction.researchArea.execute.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.researchArea.execute.placePriest')"></li>
        <li v-html="t('botAction.researchArea.execute.noPriest')"></li>
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
  name: 'ActionResearchAreaSpecific',
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
  }
)
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
</style>
