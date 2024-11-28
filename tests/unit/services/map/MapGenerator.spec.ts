import MapGenerator from '@/services/map/MapGenerator'
import { expect } from 'chai'

describe('services/map/MapGenerator', () => {
  it('2player', () => {
    const map = new MapGenerator(2, [])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(7)
    expect(map.isValid()).to.eq(true)
  })

  it('3player', () => {
    const map = new MapGenerator(3, [])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(10)
    expect(map.isValid()).to.eq(true)
  })

  it('4player', () => {
    const map = new MapGenerator(4, [])
    map.randomize()
    expect(map.spaceSectors.length).to.eq(10)
    expect(map.isValid()).to.eq(true)
  })
})
