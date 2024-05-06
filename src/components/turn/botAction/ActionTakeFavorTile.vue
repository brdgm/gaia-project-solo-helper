<template>
  <div class="actionCol">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :directional-selection="true" :cult-track-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.takeFavorTile.selectCultFavorTile')"></li>
      <AdvanceCultTrackTrackSelection :bot-action="botAction"/>
      <li v-html="t('botAction.takeFavorTile.execute')"></li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import AdvanceCultTrackTrackSelection from './AdvanceCultTrackTrackSelection.vue'

export default defineComponent({
  name: 'ActionTakeFavorTile',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo,
    AdvanceCultTrackTrackSelection
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