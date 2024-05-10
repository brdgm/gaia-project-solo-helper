<template>
  <div class="actionCol">
    <div class="count">{{botAction.victoryPoints}}</div>
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div v-if="!hideText" class="actionCol"></div>
  <div v-if="!hideText" class="actionCol text-muted small">
    <p v-html="t('botAction.gainVictoryPoints.text', {count:botAction.victoryPoints}, botAction.victoryPoints!)"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ActionGainVictoryPoints',
  inheritAttrs: false,
  components: {
    AppIcon
  },
  emits: {
    showBotAction: (_botAction: BotAction, _hideInitialAction: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    },
    hideText: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
.count {
  position: absolute;
  width: 6rem;
  padding-top: 0.15rem;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 10px #000, 1px 1px 10px #000;
}
</style>