<template>
  <h1>{{t('setupTiles.title')}}</h1>

  <TilesSetup/>

  <router-link to="/setupGameAutoma" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import TilesSetup from '@/components/setup/TilesSetup.vue'

export default defineComponent({
  name: 'SetupGameTiles',
  components: {
    TilesSetup,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
