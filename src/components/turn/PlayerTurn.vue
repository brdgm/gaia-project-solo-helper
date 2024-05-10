<template>

  <p class="mt-4" v-html="t('playerTurn.text')"></p>

  <button :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4" tag="button" @click="next" :disabled="hasPassed">
    {{t('action.next')}}
  </button>
  <button class="btn btn-outline-danger btn-lg mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#passModal">
    {{t('action.pass')}}
  </button>

  <ModalDialog id="passModal" :title="t('action.pass')">
    <template #body>
      <p v-html="t('playerTurn.passConfirm')"></p>
      <p v-html="t('playerTurn.passInfo')"></p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="pass" data-bs-dismiss="modal">{{t('action.pass')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import { useRoute } from 'vue-router'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'PlayerTurn',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    useRoute()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    nextButtonRouteTo: {
      type: String,
      required: true
    }
  },
  computed: {
    hasPassed() : boolean|undefined {
      return this.navigationState.roundTurn?.pass
    }
  },
  methods: {
    next() : void {
      this.$router.push(this.nextButtonRouteTo)
    },
    pass() : void {
      const roundTurn = this.navigationState.roundTurn
      if (!roundTurn) {
        return
      }
      roundTurn.pass = true
      if (!this.navigationState.anyonePassed) {
        roundTurn.startPlayer = true
      }
      this.state.roundTurn(roundTurn)
      this.$router.push(this.nextButtonRouteTo)
    }
  }
})
</script>
