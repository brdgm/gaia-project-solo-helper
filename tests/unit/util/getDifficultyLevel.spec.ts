import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { Setup } from '@/store/state'
import getDifficultyLevel from '@/util/getDifficultyLevel'
import { expect } from 'chai'

describe('util/getDifficultyLevel', () => {
  it('levelInSetup', () => {
    const setup = mockSetup(DifficultyLevel.ULTOMA)

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.ULTOMA)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.ULTOMA)
  })

  it('levelInPlayerSetup', () => {
    const setup = mockSetup(undefined, [DifficultyLevel.AUTOMA, DifficultyLevel.AUTOMAECHTIG])

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.AUTOMA)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.AUTOMAECHTIG)
  })

  it('levelInSetupAndPlayerSetup', () => {
    const setup = mockSetup(DifficultyLevel.ULTOMA, [DifficultyLevel.AUTOMA, DifficultyLevel.AUTOMAECHTIG])

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.AUTOMA)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.AUTOMAECHTIG)
  })

  it('noLevel', () => {
    const setup = mockSetup()

    expect(getDifficultyLevel(setup, 1)).to.eq(DifficultyLevel.AUTOMALEIN)
    expect(getDifficultyLevel(setup, 2)).to.eq(DifficultyLevel.AUTOMALEIN)
  })
})

function mockSetup(globalDifficultyLevel?: DifficultyLevel, botDifficultyLevels?: DifficultyLevel[]) : Setup {
  return {
    playerSetup: {
      playerCount: 3,
      botCount: 2,
      botFaction: []
    },
    difficultyLevel: globalDifficultyLevel,
    difficultyLevels: botDifficultyLevels,
    expansions: []
  }
}
