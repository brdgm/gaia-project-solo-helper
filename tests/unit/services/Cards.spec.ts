import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import { expect } from 'chai'

describe('Cards', () => {
  it('get', () => {
    const card = Cards.get(1)

    expect(card).not.undefined
    expect(card?.id).to.eq(1)
  })

  it('getAll', () => {
    const cards = Cards.getAll()

    expect(cards.length).eq(17)
    expect(cards.filter(card => card.action==Action.UPGRADE).length).eq(4)
    expect(cards.filter(card => card.action==Action.RESEARCH_TRACK_HIGHEST).length).eq(2)
    expect(cards.filter(card => card.action==Action.RESEARCH_TRACK_RANDOM).length).eq(2)
    expect(cards.filter(card => card.action==Action.BUILD_MINE).length).eq(3)
    expect(cards.filter(card => card.action==Action.POWER_QIC_ACTION).length).eq(4)
    expect(cards.filter(card => card.action==Action.FACTION_ACTION).length).eq(2)
  })
})
