import MapGenerator from '@/services/map/MapGenerator'
import { expect } from 'chai'

describe('MapGenerator', () => {
  it('2player', () => {
    const map = new MapGenerator(2)
    map.randomize()
    expect(map.spaceSectors.length).to.eq(7)
  })

  it('3player', () => {
    const map = new MapGenerator(3)
    map.randomize()
    expect(map.spaceSectors.length).to.eq(10)
  })

  it('4player', () => {
    const map = new MapGenerator(4)
    map.randomize()
    expect(map.spaceSectors.length).to.eq(10)
  })
})
