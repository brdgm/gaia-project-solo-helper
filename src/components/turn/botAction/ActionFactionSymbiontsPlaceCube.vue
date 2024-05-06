<template>
  <div class="actionCol">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :terrain-priority="true" :directional-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol class="mt-2">
      <li v-html="t('botAction.factionSymbiontsPlaceCube.validSpaces')"></li>
      <li v-html="t('botAction.transformAndBuild.tiebreaker.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.factionSymbiontsPlaceCube.symbiontYouthATP',{terrainPriority:botAction.terrainPriority})"></li>
        <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
      </ol>
      <li v-html="t('botAction.transformAndBuild.execute.title')"></li>
      <ol type="a">
        <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t(`botAction.factionSymbiontsPlaceCube.placeCube`)"></span></li>
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
  name: 'ActionFactionSymbiontsPlaceCube',
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
.factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
</style>