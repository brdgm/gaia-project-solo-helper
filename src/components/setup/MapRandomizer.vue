<template>
  <div class="map" :class="{large:!twoPlayerMap,small:twoPlayerMap}">
    <div v-for="spaceSector of spaceSectors" :key="spaceSector.id" class="spaceSector">
      <AppIcon type="map-space-sector" :name="`${spaceSector.id + (spaceSector.outline ? '-outline' : '')}`" extension="webp"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import MapGenerator from '@/services/map/MapGenerator';
import SpaceSector from '@/services/map/SpaceSector';

export default defineComponent({
  name: 'MapRandomizer',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    
    const { playerCount, botCount } = state.setup.playerSetup
    const totalPlayerCount = playerCount + botCount
    const mapGenerator = new MapGenerator(totalPlayerCount)

    return { t, state, totalPlayerCount, mapGenerator }
  },
  computed: {
    spaceSectors() : readonly SpaceSector[] {
      return this.mapGenerator.spaceSectors
    },
    twoPlayerMap() : boolean {
      return this.totalPlayerCount < 3
    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>
.map {
  z-index: -10;
  .spaceSector {
    position: absolute;
    display: inline-block;
    width: 150px;
    filter: drop-shadow(0 0 0.25rem #fff);
    img {
      width: 100%;
    }
  }
  &.large {
    position: relative;
    height: 440px;
    width: 570px;
    transform: translate(-18px,38px) rotate(30deg);
    margin-bottom: 76px;
    .spaceSector:nth-child(1) {
      left: 84px;
    }
    .spaceSector:nth-child(2) {
      top: 16px;
      left: calc(84px + 140px);
    }
    .spaceSector:nth-child(3) {
      top: 32px;
      left: calc(84px + 140px + 140px);
    }
    .spaceSector:nth-child(4) {
      top: 114px;
    }
    .spaceSector:nth-child(5) {
      top: calc(114px + 16px);
      left: 140px;
    }
    .spaceSector:nth-child(6) {
      top: calc(114px + 32px);
      left: calc(140px + 140px);
    }
    .spaceSector:nth-child(7) {
      top: calc(114px + 48px);
      left: calc(140px + 140px + 140px);
    }
    .spaceSector:nth-child(8) {
      top: calc(244px);
      left: 56px;
    }
    .spaceSector:nth-child(9) {
      top: calc(244px + 16px);
      left: calc(56px + 140px);
    }
    .spaceSector:nth-child(10) {
      top: calc(244px + 32px);
      left: calc(56px + 140px + 140px);
    }
  }
  &.small {
    position: relative;
    height: 440px;
    width: 430px;
    transform: translate(-10px,2px) rotate(30deg);
    margin-bottom: -8px;
    .spaceSector:nth-child(1) {
      left: 84px;
    }
    .spaceSector:nth-child(2) {
      top: 16px;
      left: calc(84px + 140px);
    }
    .spaceSector:nth-child(3) {
      top: 114px;
    }
    .spaceSector:nth-child(4) {
      top: calc(114px + 16px);
      left: 140px;
    }
    .spaceSector:nth-child(5) {
      top: calc(114px + 32px);
      left: calc(140px + 140px);
    }
    .spaceSector:nth-child(6) {
      top: calc(244px);
      left: 56px;
    }
    .spaceSector:nth-child(7) {
      top: calc(244px + 16px);
      left: calc(56px + 140px);
    }
  }
}
</style>
