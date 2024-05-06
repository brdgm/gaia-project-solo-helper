<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerCount')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="playerCount" v-model="playerCount">
        <option v-for="i in maxPlayerCount" :key="i" :value="i">{{t('setup.players.playerCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in maxBotCount" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>

  <div class="row mt-3" v-for="bot in botCount" :key="bot">
    <div class="col-5 col-md-3">
      <label :for="`botFaction${bot}`" class="form-label">{{t('setup.players.botFaction', {bot:bot}, botCount)}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" :id="`botFaction${bot}`" v-model="botFaction[bot-1]">
        <option v-for="faction of factions" :key="faction" :value="faction">{{t('botFaction.' + faction)}}</option>
      </select>
    </div>
  </div>
  <div class="row mt-3" v-if="playerCount > 1">
    <div class="offset-5 offset-md-3 col-5 col-md-7 text-muted" v-html="t('setup.players.twoPlayerBotFaction')"></div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import BotFaction from '@/services/enum/BotFaction'

export default defineComponent({
  name: 'PlayersSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const playerCount = ref(state.setup.playerSetup.playerCount)
    const botCount = ref(state.setup.playerSetup.botCount)
    const botFaction = ref(state.setup.playerSetup.botFaction)

    return { t, state, playerCount, botCount, botFaction }
  },
  data() {
    return {
      factions: Object.values(BotFaction)
    }
  },
  computed: {
    maxPlayerCount() : number {
      return 3 - this.botCount
    },
    maxBotCount() : number {
      return 3 - this.playerCount
    }
  },
  watch: {
    playerCount() {
      if (this.botCount > this.maxBotCount) {
        this.botCount = this.maxBotCount
      }
      this.storePlayerSetup()
    },
    botCount() {
      if (this.playerCount > this.maxPlayerCount) {
        this.playerCount = this.maxPlayerCount
      }
      this.botFaction = this.botFaction.splice(0, this.botCount)
      this.storePlayerSetup()
    },
    botFaction: {
      handler() {
        this.storePlayerSetup()
      },
      deep: true
    }
  },
  methods: {
    storePlayerSetup() {
      for (let bot=1; bot<=this.botCount; bot++) {
        if (!this.botFaction[bot-1]) {
          this.botFaction[bot-1] = BotFaction.SIMPLETONS
        }
      }
      this.state.setup.playerSetup = {
        playerCount: this.playerCount,
        botCount: this.botCount,
        botFaction: this.botFaction
      }
    }
  }
})
</script>
