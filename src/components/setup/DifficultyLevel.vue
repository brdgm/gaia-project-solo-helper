<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <template v-for="bot in botCount" :key="bot">
    <h6 v-if="botCount > 1">{{t('botFaction.' + getBotFaction(bot))}}</h6>
    <div class="row">
      <div class="col-3 col-sm-2 col-md-1 text-end">
        <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
      </div>
      <div class="col-6 col-sm-8 col-md-5">
        <input type="range" class="form-range" min="1" max="5" id="difficultyLevel"
            :value="levels[bot-1]" @input="updateDifficultyLevel(bot, $event)">
      </div>
      <div class="col-3 col-sm-2 col-md-1">
        <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
      </div>
    </div>  
    <div class="row">
      <div class="col-11 offset-1">
        <img src="@/assets/icons/difficulty-level.png" class="difficultyLevelIcon" v-for="level in levels[bot-1]" :key="level" alt=""/>
        &nbsp;<i>{{t(`difficultyLevel.${levels[bot-1]}`)}}</i>
      </div>
    </div>
  </template>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import BotFaction from '@/services/enum/BotFaction'
import getDifficultyLevel from '@/util/getDifficultyLevel'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const initialLevels : number[] = []
    for (let bot = 1; bot<=3; bot++) {
      initialLevels[bot-1] = getDifficultyLevel(state.setup, bot)
    }
    const levels = ref(initialLevels)
    return { t, state, levels }
  },
  computed: {
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    }
  },
  methods: {
    getBotFaction(bot: number) : BotFaction {
      return this.state.setup.playerSetup.botFaction[bot - 1] ?? BotFaction.TAKLONS
    },
    updateDifficultyLevel(bot : number, event: Event) {
      const level = Number.parseInt((event.target as HTMLInputElement).value)
      this.levels[bot-1] = level
      this.state.setup.difficultyLevels = this.levels.slice(0, this.botCount)
    }
  }
})
</script>

<style lang="scss" scoped>
.difficultyLevelIcon {
  height: 1.5rem;
}
</style>