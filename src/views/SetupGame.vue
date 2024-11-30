<template>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <DifficultyLevel/>
  <ExpansionsSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'SetupGame',
  components: {
    PlayersSetup,
    DifficultyLevel,
    ExpansionsSetup,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  methods: {
    next() : void {
      this.state.resetGame()
      this.$router.push('/setupGameTiles')
    }
  }
})
</script>
