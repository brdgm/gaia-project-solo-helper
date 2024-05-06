<template>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <DifficultyLevel/>
  <ExpansionsSetup/>

  <router-link to="/setupGameAutoma" class="btn btn-primary btn-lg mt-4">
    {{t('setupGameAutoma.title')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

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
    return { t }
  }
})
</script>
