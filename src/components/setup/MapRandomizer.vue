<template>
  <button class="btn btn-sm btn-secondary me-2" @click="mapGenerator.randomize()">{{t('action.randomize')}}</button>
  <button class="btn btn-sm btn-secondary me-2" @click="mapGenerator.reset()" v-if="!hatLostFleet">{{t('action.reset')}}</button>
  <div class="row mt-3">
    <div class="col">
      <div class="mapWrapper" :class="{'alert':!isValid, 'alert-danger':!isValid}">
        <p v-if="!isValid" v-html="t('mapRandomizer.invalidMap')"></p>
        <div class="map" :class="{
            baseGame:!hatLostFleet,
            lostFleet:hatLostFleet,
            twoPlayer:totalPlayerCount == 2,
            threePlayer:totalPlayerCount == 3 && hatLostFleet,
            fourPlayer:totalPlayerCount == 4 || (totalPlayerCount == 3 && !hatLostFleet)
          }">
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
          <div>
            <div v-for="(deepSpaceSector,index) of deepSpaceSectors" :key="deepSpaceSector.id" class="deepSpaceSector" @click="deepSpaceSector.randomizeRotationFlip()"
                :style="deepSpaceSectorTransform(deepSpaceSector, index)">
              <AppIcon type="map-deep-space-sector" :name="`${deepSpaceSector.id + (deepSpaceSector.outline ? '-outline' : '')}`" extension="webp"/>
            </div>
          </div>
          <div>
            <div v-for="(interspace,index) of interspaces" :key="index" class="interspace">
              <AppIcon type="map-interspace" :name="interspace" extension="webp"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col">
      <div class="alert alert-info" v-html="t('mapRandomizer.externalMapGenerator')"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import MapGenerator from '@/services/map/MapGenerator'
import SpaceSector from '@/services/map/SpaceSector'
import Expansion from '@/services/enum/Expansion'
import DeepSpaceSector from '@/services/map/DeepSpaceSector'
import Interspace from '@/services/map/Interspace'

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
    const mapGenerator = new MapGenerator(totalPlayerCount, state.setup.expansions)

    return { t, state, totalPlayerCount, mapGenerator }
  },
  computed: {
    spaceSectors() : readonly SpaceSector[] {
      return this.mapGenerator.spaceSectors
    },
    deepSpaceSectors() : readonly DeepSpaceSector[] {
      return this.mapGenerator.deepSpaceSectors
    },
    interspaces() : readonly Interspace[] {
      return this.mapGenerator.interspaces
    },
    isValid() : boolean {
      return this.mapGenerator.isValid()
    },
    hatLostFleet() : boolean {
      return this.state.setup.expansions.includes(Expansion.LOST_FLEET)
    }
  },
  methods: {
    deepSpaceSectorTransform(sector: DeepSpaceSector, index: number) {
      let rotation = sector.rotation * 120
      if (index == 2 || index == 4 || index == 5 || index == 7) {
        rotation += 60
      }
      const originX = 43.5
      const originY = 38
      return `transform-origin:${originX}px ${originY}px;transform:rotate(${rotation}deg);`
    }
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
    width: 150px;
    filter: drop-shadow(0 0 0.25rem #fff);
    cursor: pointer;
    user-select: none;
    z-index: 30;
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
  .deepSpaceSector {
    position: absolute;
    width: 76px;
    cursor: pointer;
    user-select: none;
    z-index: 20;
    img {
      width: 100%;
    }
  }
  .interspace {
    position: absolute;
    width: 46px;
    user-select: none;
    z-index: 20;
    img {
      width: 100%;
    }
  }
  &.baseGame.fourPlayer {
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
  &.baseGame.twoPlayer {
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
  &.lostFleet.fourPlayer {
    position: relative;
    height: 504px;
    width: 570px;
    transform: translate(14px,-22px) rotate(30deg);
    margin-bottom: -42px;
    .spaceSector:nth-child(1) {
      top: 96px;
      left: 28px;
    }
    .spaceSector:nth-child(2) {
      top: 48px;
      left: calc(28px + 140px);
    }
    .spaceSector:nth-child(3) {
      left: calc(28px + 140px + 140px);
    }
    .spaceSector:nth-child(4) {
      top: calc(146px + 96px);
      left: 0px;
    }
    .spaceSector:nth-child(5) {
      top: calc(146px + 48px);
      left: calc(0px + 140px);
    }
    .spaceSector:nth-child(6) {
      top: calc(146px + 0px);
      left: calc(0px + 140px + 140px);
    }
    .spaceSector:nth-child(7) {
      top: calc(146px - 48px);
      left: calc(0px + 140px + 140px + 140px);
    }
    .spaceSector:nth-child(8) {
      top: calc(244px + 96px);
      left: 112px;
    }
    .spaceSector:nth-child(9) {
      top: calc(244px + 48px);
      left: calc(112px + 140px);
    }
    .spaceSector:nth-child(10) {
      top: calc(244px + 0px);
      left: calc(112px + 140px + 140px);
    }
    /* deep space sectors */
    .deepSpaceSector:nth-child(1) {
      top: 60px;
      left: 107px;
    }
    .deepSpaceSector:nth-child(2) {
      top: calc(60px - 48px);
      left: calc(107px + 140px);
    }
    .deepSpaceSector:nth-child(3) {
      top: 45px;
      left: 432px;
    }
    .deepSpaceSector:nth-child(4) {
      top: 222px;
      left: 498px;
    }
    .deepSpaceSector:nth-child(5) {
      top: 368px;
      left: 377px;
    }
    .deepSpaceSector:nth-child(6) {
      top: calc(368px + 48px);
      left: calc(377px - 140px);
    }
    .deepSpaceSector:nth-child(7) {
      top: 383px;
      left: 50px;
    }
    .deepSpaceSector:nth-child(8) {
      top: 204px;
      left: -15px;
    }
    /* interspaces */
    .interspace:nth-child(1) {
      top: 175px;
      left: 164px;
    }
    .interspace:nth-child(2) {
      top: 191px;
      left: 248px;
    }
    .interspace:nth-child(3) {
      top: 126px;
      left: 304px;
    }
    .interspace:nth-child(4) {
      top: 143px;
      left: 388px;
    }
    .interspace:nth-child(5) {
      top: 224px;
      left: 416px;
    }
    .interspace:nth-child(6) {
      top: 289px;
      left: 360px;
    }
    .interspace:nth-child(7) {
      top: 272px;
      left: 276px;
    }
    .interspace:nth-child(8) {
      top: 337px;
      left: 220px;
    }
    .interspace:nth-child(9) {
      top: 321px;
      left: 136px;
    }
    .interspace:nth-child(10) {
      top: 239px;
      left: 108px;
    }
  }
  &.lostFleet.threePlayer {
    position: relative;
    height: 504px;
    width: 570px;
    transform: translate(14px,-22px) rotate(30deg);
    margin-bottom: -42px;
    .spaceSector:nth-child(1) {
      top: 96px;
      left: 28px;
    }
    .spaceSector:nth-child(2) {
      top: 48px;
      left: calc(28px + 140px);
    }
    .spaceSector:nth-child(3) {
      left: calc(28px + 140px + 140px);
    }
    .spaceSector:nth-child(4) {
      top: calc(146px + 96px);
      left: 0px;
    }
    .spaceSector:nth-child(5) {
      top: calc(146px + 48px);
      left: calc(0px + 140px);
    }
    .spaceSector:nth-child(6) {
      top: calc(146px + 0px);
      left: calc(0px + 140px + 140px);
    }
    .spaceSector:nth-child(7) {
      top: calc(244px + 96px);
      left: 112px;
    }
    .spaceSector:nth-child(8) {
      top: calc(244px + 48px);
      left: calc(112px + 140px);
    }
    .spaceSector:nth-child(9) {
      top: calc(244px + 0px);
      left: calc(112px + 140px + 140px);
    }
    /* deep space sectors */
    .deepSpaceSector:nth-child(1) {
      top: 60px;
      left: 107px;
    }
    .deepSpaceSector:nth-child(2) {
      top: calc(60px - 48px);
      left: calc(107px + 140px);
    }
    .deepSpaceSector:nth-child(3) {
      top: 190px;
      left: 404px;
    }
    .deepSpaceSector:nth-child(4) {
      top: 124px;
      left: 386px;
    }
    .deepSpaceSector:nth-child(5) {
      top: 368px;
      left: 377px;
    }
    .deepSpaceSector:nth-child(6) {
      top: calc(368px + 48px);
      left: calc(377px - 140px);
    }
    .deepSpaceSector:nth-child(7) {
      top: 383px;
      left: 50px;
    }
    .deepSpaceSector:nth-child(8) {
      top: 204px;
      left: -15px;
    }
    /* interspaces */
    .interspace:nth-child(1) {
      top: 175px;
      left: 164px;
    }
    .interspace:nth-child(2) {
      top: 191px;
      left: 248px;
    }
    .interspace:nth-child(3) {
      top: 126px;
      left: 304px;
    }
    .interspace:nth-child(4) {
      top: 289px;
      left: 360px;
    }
    .interspace:nth-child(5) {
      top: 272px;
      left: 276px;
    }
    .interspace:nth-child(6) {
      top: 337px;
      left: 220px;
    }
    .interspace:nth-child(7) {
      top: 321px;
      left: 136px;
    }
    .interspace:nth-child(8) {
      top: 239px;
      left: 108px;
    }
  }
  &.lostFleet.twoPlayer {
    position: relative;
    height: 504px;
    width: 570px;
    transform: translate(14px,-22px) rotate(30deg);
    margin-bottom: -70px;
    .spaceSector:nth-child(1) {
      top: 96px;
      left: 28px;
    }
    .spaceSector:nth-child(2) {
      top: 48px;
      left: calc(28px + 140px);
    }
    .spaceSector:nth-child(3) {
      top: calc(146px + 96px);
      left: 0px;
    }
    .spaceSector:nth-child(4) {
      top: calc(146px + 48px);
      left: calc(0px + 140px);
    }
    .spaceSector:nth-child(5) {
      top: calc(146px + 0px);
      left: calc(0px + 140px + 140px);
    }
    .spaceSector:nth-child(6) {
      top: calc(244px + 96px);
      left: 112px;
    }
    .spaceSector:nth-child(7) {
      top: calc(244px + 48px);
      left: calc(112px + 140px);
    }
    /* deep space sectors */
    .deepSpaceSector:nth-child(1) {
      top: 60px;
      left: 107px;
    }
    .deepSpaceSector:nth-child(2) {
      top: 271px;
      left: 358px;
    }
    .deepSpaceSector:nth-child(3) {
      top: 92px;
      left: 292.5px;
    }
    .deepSpaceSector:nth-child(4) {
      top: 383px;
      left: 50px;
    }
    .deepSpaceSector:nth-child(5) {
      top: 204px;
      left: -15px;
    }
    .deepSpaceSector:nth-child(6) {
      top: calc(368px + 48px);
      left: calc(377px - 140px);
    }
    /* interspaces */
    .interspace:nth-child(1) {
      top: 175px;
      left: 164px;
    }
    .interspace:nth-child(2) {
      top: 191px;
      left: 248px;
    }
    .interspace:nth-child(3) {
      top: 272px;
      left: 276px;
    }
    .interspace:nth-child(4) {
      top: 337px;
      left: 220px;
    }
    .interspace:nth-child(5) {
      top: 321px;
      left: 136px;
    }
    .interspace:nth-child(6) {
      top: 239px;
      left: 108px;
    }
  }
}
</style>
