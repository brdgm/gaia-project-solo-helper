<template>
  <div class="actionCol action">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol support">
    <SupportInfo :botAction="botAction" :numberedSelection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.researchArea.validResearchArea')"></li>
      <li v-html="t('botAction.researchArea.tiebreaker.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.researchArea.tiebreaker.numberedSelection')"></li>
      </ol>
      <li v-html="t('botAction.researchArea.execute.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.researchArea.execute.techTile')"></li>
        <li v-html="t('botAction.researchArea.execute.advance')"></li>
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
  name: 'ActionResearchAreaRandom',
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
