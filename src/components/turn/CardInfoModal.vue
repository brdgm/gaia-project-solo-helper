<template>
  <ModalDialog id="cardInfoModal" sizeLg>
    <template #body>
      <div class="cardInfoGrid">
        <div v-for="entry of cardEntries" :key="entry.label" class="cardBlock">
          <h6 class="cardHeading">
            {{t(entry.label)}} <span class="cardId">{{entry.card.id}}</span>
          </h6>
          <div class="cardColumns">
            <div class="actionColumn">
              <div><AppIcon type="action" :name="entry.card.action" class="actionIcon"/></div>
              <div v-if="entry.card.victoryPoints > 0" class="vpItem">
                <div class="vpCount">{{entry.card.victoryPoints}}</div>
                <AppIcon type="action" name="gain-victory-points" class="vpIcon"/>
              </div>
              <div v-if="entry.card.pass"><AppIcon name="pass" class="passIcon"/></div>
            </div>
            <div class="supportColumn">
              <ScoringFinalTiebreaker :type="entry.card.scoringFinalTiebreaker"/>
              <NavigationRange :range="entry.card.range"/>
              <DirectionalSelection :type="entry.card.directionalSelection"/>
              <NumberedSelection :type="entry.card.numberedSelection" :count="entry.card.numberedSelectionCount"/>
              <div><AppIcon type="round-booster-selection" :name="entry.card.roundBoosterSelection" class="roundBoosterIcon"/></div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/services/Card'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import ScoringFinalTiebreaker from './supportInfo/ScoringFinalTiebreaker.vue'
import NavigationRange from './supportInfo/NavigationRange.vue'
import DirectionalSelection from './supportInfo/DirectionalSelection.vue'
import NumberedSelection from './supportInfo/NumberedSelection.vue'

interface CardEntry {
  label: string
  card: Card
}

export default defineComponent({
  name: 'CardInfoModal',
  components: {
    ModalDialog,
    AppIcon,
    ScoringFinalTiebreaker,
    NavigationRange,
    DirectionalSelection,
    NumberedSelection
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    actionCard: {
      type: Object as PropType<Card>,
      required: true
    },
    supportCard: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  computed: {
    cardEntries() : CardEntry[] {
      return [
        { label: 'cardInfo.actionCard', card: this.actionCard },
        { label: 'cardInfo.supportCard', card: this.supportCard }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.cardInfoGrid {
  display: flex;
  flex-flow: wrap;
  gap: 1rem;
}
.cardBlock {
  flex: 1 1 14rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  padding: 0.75rem;
}
.cardHeading {
  margin-bottom: 0.75rem;
  .cardId {
    color: #6c757d;
    font-weight: normal;
  }
}
.cardColumns {
  display: flex;
  gap: 1rem;
}
.actionColumn, .supportColumn {
  background-color: #000;
  border-radius: 0.5rem;
  padding: 0.5rem;
  div {
    margin: 0.2rem;
  }
}
.actionColumn {
  .actionIcon {
    width: 4rem;
  }
  .vpItem {
    position: relative;
    .vpCount {
      position: absolute;
      width: 4rem;
      padding-top: 0.1rem;
      font-size: 2.2rem;
      font-weight: bold;
      text-align: center;
      color: white;
      text-shadow: 1px 1px 10px #000, 1px 1px 10px #000;
    }
    .vpIcon {
      width: 4rem;
    }
  }
  .passIcon {
    width: 3rem;
  }
}
.supportColumn {
  .roundBoosterIcon {
    width: 3rem;
  }
}
</style>
