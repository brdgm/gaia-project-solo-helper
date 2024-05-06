import CultTrackBonuses from '@/services/CultTrackBonuses'
import BotFaction from '@/services/enum/BotFaction'
import CultTrack from '@/services/enum/CultTrack'
import { expect } from 'chai'

describe('CultTrackBonuses', () => {
  it('get', () => {
    const steps = CultTrackBonuses.get(BotFaction.GOGNOMES)

    expect(steps.length).to.eq(2)
    expect(steps[0].cultTrack).to.eq(CultTrack.FIRE)
    expect(steps[0].advanceSteps).to.eq(1)
    expect(steps[1].cultTrack).to.eq(CultTrack.AIR)
    expect(steps[1].advanceSteps).to.eq(1)
  })
})
