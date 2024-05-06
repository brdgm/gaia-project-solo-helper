import ResearchTrackBonuses from '@/services/ResearchTrackBonuses'
import BotFaction from '@/services/enum/BotFaction'
import ResearchTrack from '@/services/enum/ResearchTrack'
import { expect } from 'chai'

describe('ResearchTrackBonuses', () => {
  it('get', () => {
    const steps = ResearchTrackBonuses.get(BotFaction.TERRANS)

    expect(steps.length).to.eq(1)
    expect(steps[0].researchTrack).to.eq(ResearchTrack.GAIA_PROJECT)
    expect(steps[0].advanceSteps).to.eq(1)
  })
})
