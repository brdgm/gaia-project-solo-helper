import BotFaction from '@/services/enum/BotFaction'
import SpaceSector from '@/services/map/SpaceSector'
import { expect } from 'chai'

describe('services/map/SpaceSector', () => {
  it('no-rotation', () => {
    const sector = new SpaceSector('01')
    expect(sector.getRotatedFactionPlanets()).to.eql([,,,,,BotFaction.GEODENS,BotFaction.HADSCH_HALLAS,,,BotFaction.XENOS,,,])
  })

  it('rotate-1', () => {
    const sector = new SpaceSector('01')
    sector.rotation = 1
    expect(sector.getRotatedFactionPlanets()).to.eql([,,,,,,,BotFaction.GEODENS,BotFaction.HADSCH_HALLAS,,,BotFaction.XENOS,])
  })

  it('rotate-2', () => {
    const sector = new SpaceSector('01')
    sector.rotation = 2
    expect(sector.getRotatedFactionPlanets()).to.eql([,BotFaction.XENOS,,,,,,,,BotFaction.GEODENS,BotFaction.HADSCH_HALLAS,,])
  })

  it('rotate-3', () => {
    const sector = new SpaceSector('01')
    sector.rotation = 3
    expect(sector.getRotatedFactionPlanets()).to.eql([BotFaction.HADSCH_HALLAS,,,BotFaction.XENOS,,,,,,,,BotFaction.GEODENS,])
  })

  it('rotate-4', () => {
    const sector = new SpaceSector('01')
    sector.rotation = 4
    expect(sector.getRotatedFactionPlanets()).to.eql([,BotFaction.GEODENS,BotFaction.HADSCH_HALLAS,,,BotFaction.XENOS,,,,,,,])
  })

  it('rotate-5', () => {
    const sector = new SpaceSector('01')
    sector.rotation = 5
    expect(sector.getRotatedFactionPlanets()).to.eql([,,,BotFaction.GEODENS,BotFaction.HADSCH_HALLAS,,,BotFaction.XENOS,,,,,])
  })
})
