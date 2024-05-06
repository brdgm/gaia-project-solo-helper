<template>
  <h4>{{t('setupGameAutoma.generalSetup')}}</h4>
  <p v-html="t('setupGameAutoma.generalSetupIntro')"></p>
  <ol>
    <li>
      <AppIcon name="directional-selection" class="directional-selection"/>
      <span v-html="t('setupGameAutoma.step1')"></span>
    </li>
    <li>
      <span v-html="t('setupGameAutoma.step2')"></span>
    </li>
    <li v-html="t('setupGameAutoma.step3')"></li>
    <li>
      <span v-html="t('setupGameAutoma.step4')"></span>
      <ol type="a">
        <li v-html="t('setupGameAutoma.step4a')"></li>
        <li v-html="t('setupGameAutoma.step4b')"></li>
        <li v-html="t('setupGameAutoma.step4d')"></li>
        <li>
          <span v-html="t('setupGameAutoma.step4e')"></span>
          <ul>
            <li v-for="faction in factions" :key="faction">
              <b>{{t(`botFaction.${faction}`)}}</b>:
              <span v-for="(bonus,index) in getResearchTrackBonus(faction)" :key="index">
                <template v-if="index > 0">, </template>
                <AppIcon type="research-track" :name="bonus.researchTrack" class="researchTrackIcon"/>
                {{bonus.advanceSteps}}
              </span>
              <span v-if="getResearchTrackBonus(faction).length == 0" v-html="t('setupGameAutoma.stepNone')"></span>
            </li>
          </ul>
        </li>
        <li v-if="isFactionSymbionts" v-html="t('setupGameAutoma.step4f',{faction:t('botFaction.symbionts')})"></li>
        <li v-if="isFactionBlight" v-html="t('setupGameAutoma.step4f',{faction:t('botFaction.blight')})"></li>
        <li v-if="isFactionGognomes" v-html="t('setupGameAutoma.step4f',{faction:t('botFaction.gognomes')})"></li>
        <li v-html="t('setupGameAutoma.step4g')"></li>
      </ol>
    </li>
  </ol>

  <h4>{{t('setupGameAutoma.initialDwelling')}}</h4>
  <p v-html="t('setupGameAutoma.initialDwellingIntro')"></p>
  <ol>
    <li v-html="t('setupGameAutoma.initialDwellingPlayer')"></li>
    <li>
      <AppIcon type="structure" name="marked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialDwellingMarked', {character:randomCard.initialDwellingMarked})"></span>
    </li>
    <li>
      <AppIcon type="structure" name="unmarked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialDwellingUnmarked', {character:randomCard.initialDwellingUnmarked})"></span>
    </li>
    <li v-html="t('setupGameAutoma.initialDwellingPlayerSecond')"></li>
  </ol>

  <h4>{{t('setupGameAutoma.bonusCards')}}</h4>
  <ul>
    <li v-html="t('setupGameAutoma.bonusCardsTake',{count:bonusCardCount})"></li>
    <li v-html="t('setupGameAutoma.bonusCardsCoins')"></li>
  </ul>
</template>

<script lang="ts">
import Card from '@/services/Card'
import Cards from '@/services/Cards'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import AppIcon from '../structure/AppIcon.vue'
import BotFaction from '@/services/enum/BotFaction'
import { ResearchTrackBonusSteps } from '@/services/ResearchTrackBonus'
import ResearchTrackBonuses from '@/services/ResearchTrackBonuses'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'AutomaSetup',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    bonusCardCount() : number {
      return this.state.setup.playerSetup.botCount + this.state.setup.playerSetup.playerCount + 3
    },
    randomCard(): Card {
      const allCards = Cards.getAll()
      const index = rollDice(allCards.length)
      return allCards[index - 1]
    },    
    isFactionSymbionts() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.SYMBIONTS)
    },
    isFactionBlight() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.BLIGHT)
    },
    isFactionGognomes() : boolean {
      return this.state.setup.playerSetup.botFaction.includes(BotFaction.GOGNOMES)
    },
    factions() : BotFaction[] {
      return this.state.setup.playerSetup.botFaction
    }
  },
  methods: {
    getResearchTrackBonus(botFaction : BotFaction) : ResearchTrackBonusSteps[] {
      return ResearchTrackBonuses.get(botFaction)
    }
  }
})
</script>

<style lang="scss" scoped>
li {
  margin-top: 0.5rem;
  clear: both;
  li {
    margin-top: 0rem;
  }
}
.structureIcon, .researchTrackIcon {
  height: 1.5rem;
}
.directional-selection {
  float: right;
  width: 12rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>