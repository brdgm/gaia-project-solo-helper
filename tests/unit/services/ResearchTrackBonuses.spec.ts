import ResearchAreaBonuses from '@/services/ResearchAreaBonuses'
import BotFaction from '@/services/enum/BotFaction'
import ResearchArea from '@/services/enum/ResearchArea'
import { expect } from 'chai'

describe('ResearchAreaBonuses', () => {
  it('get', () => {
    const steps = ResearchAreaBonuses.get(BotFaction.TERRANS)

    expect(steps.length).to.eq(1)
    expect(steps[0].researchArea).to.eq(ResearchArea.GAIA_PROJECT)
    expect(steps[0].advanceSteps).to.eq(1)
  })
})
