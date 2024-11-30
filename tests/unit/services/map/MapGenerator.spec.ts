import Expansion from '@/services/enum/Expansion'
import MapGenerator from '@/services/map/MapGenerator'
import { expect } from 'chai'

describe('services/map/MapGenerator', () => {
  it('2player', () => {
    const map = new MapGenerator(2, [])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(7)
    expect(map.deepSpaceSectors.length).to.eq(0)
    expect(map.interspaces.length).to.eq(0)
    expect(map.isValid()).to.eq(true)
  })

  it('3player', () => {
    const map = new MapGenerator(3, [])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(10)
    expect(map.deepSpaceSectors.length).to.eq(0)
    expect(map.interspaces.length).to.eq(0)
    expect(map.isValid()).to.eq(true)
  })

  it('4player', () => {
    const map = new MapGenerator(4, [])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(10)
    expect(map.deepSpaceSectors.length).to.eq(0)
    expect(map.interspaces.length).to.eq(0)
    expect(map.isValid()).to.eq(true)
  })

  it('2player-lostfleet', () => {
    const map = new MapGenerator(2, [Expansion.LOST_FLEET])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(7)
    expect(map.deepSpaceSectors.length).to.eq(6)
    expect(map.interspaces.length).to.eq(6)
    expect(map.isValid()).to.eq(true)
  })

  it('3player-lostfleet', () => {
    const map = new MapGenerator(3, [Expansion.LOST_FLEET])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(9)
    expect(map.deepSpaceSectors.length).to.eq(8)
    expect(map.interspaces.length).to.eq(8)
    expect(map.isValid()).to.eq(true)
  })

  it('4player-lostfleet', () => {
    const map = new MapGenerator(4, [Expansion.LOST_FLEET])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(10)
    expect(map.deepSpaceSectors.length).to.eq(8)
    expect(map.interspaces.length).to.eq(10)
    expect(map.isValid()).to.eq(true)
  })
})
