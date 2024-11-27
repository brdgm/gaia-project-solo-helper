<template>
  <button class="btn btn-sm btn-secondary me-2 mb-2" @click="mapGenerator.randomize()">{{t('action.randomize')}}</button>
  <button class="btn btn-sm btn-secondary me-2 mb-2" @click="mapGenerator.reset()">{{t('action.reset')}}</button>
  <div class="mapWrapper">
    <div class="map" :class="{large:!twoPlayerMap,small:twoPlayerMap}">
      <div v-for="spaceSector of spaceSectors" :key="spaceSector.id" class="spaceSector" @click="spaceSector.rotate()"
          :style="`transform: rotate(${spaceSector.rotation*60}deg);`">
        <AppIcon type="map-space-sector" :name="`${spaceSector.id + (spaceSector.outline ? '-outline' : '')}`" extension="webp"/>
        <svg class="overlay">
          <defs>
            <polygon id="spaceSectorArrow" points="8,5 13,10 3,10" style="fill:#fff" />
          </defs>
          <circle cx="74.75" cy="81" r="25" class="circle" />
          <text x="61" y="90" class="id" :class="{outline:spaceSector.outline}">{{spaceSector.id}}</text>
          <use x="68" y="55" xlink:href="#spaceSectorArrow"/>
        </svg>
      </div>
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
.mapWrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
.map {
  .spaceSector {
    position: absolute;
    display: inline-block;
    width: 150px;
    filter: drop-shadow(0 0 0.25rem #fff);
    cursor: pointer;
    user-select: none;
    img {
      width: 100%;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      .circle {
        fill:#000;
        filter: drop-shadow(0 0 0.25rem #fff);
      }
      .id {
        fill: #fff;
        font-size: 1.5rem;
        font-weight: bold;
        &.outline {
          fill: none;
          stroke: #fff;
          stroke-width: 1px;
          font-weight: 800;
        }
      }
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
