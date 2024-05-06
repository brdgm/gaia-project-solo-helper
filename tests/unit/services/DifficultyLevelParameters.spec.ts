import DifficultyLevelParameters from '@/services/DifficultyLevelParameters'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('DifficultyLevelParameters', () => {
  it('get', () => {
    const params = DifficultyLevelParameters.get(DifficultyLevel.AUTOMAECHTIG, 3)

    expect(params).not.undefined
    expect(params?.round).to.eq(3)
    expect(params?.shipLevel).to.eq(1)
    expect(params?.victoryPoints).to.eq(2)
  })
})
