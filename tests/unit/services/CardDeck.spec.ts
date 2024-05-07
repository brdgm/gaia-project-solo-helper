import CardDeck from '@/services/CardDeck'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('CardDeck', () => {
  it('new-level1', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.AUTOMALEIN)

    expect(cardDeck.deck.length, 'deck size').to.eq(6)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(11)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.deck.includes(2), '2 not in deck').to.false
  })

  it('new-level2', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.AUTOMA)

    expect(cardDeck.deck.length, 'deck size').to.eq(7)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(10)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('new-level3', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.AUTOMAECHTIG)

    expect(cardDeck.deck.length, 'deck size').to.eq(8)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(9)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.deck.includes(9), '9 in deck').to.true
  })

  it('new-level4', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.ULTOMA)

    expect(cardDeck.deck.length, 'deck size').to.eq(9)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(8)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.deck.includes(9), '9 in deck').to.true
    expect(persistence.deck.includes(15), '15 in deck').to.true
  })

  it('new-level5', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.ALPTRAUMA)

    expect(cardDeck.deck.length, 'deck size').to.eq(9)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(8)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.deck.includes(9), '9 in deck').to.true
    expect(persistence.deck.includes(15), '15 in deck').to.true
  })

  it('draw-pass-deck-empty', () => {
    const cardDeck = CardDeck.fromPersistence({
      deck: [4,6,7,9],
      discard: [],
      reserve: []
    })

    expect(cardDeck.draw(), '1st draw').to.true
    expect(cardDeck.actionCard?.id, '1st action card').to.eq(6)
    expect(cardDeck.supportCard?.id, '1st support card').to.eq(4)
    expect(cardDeck.isPass(), '1st pass').to.false

    expect(cardDeck.draw(), '2nd draw').to.true
    expect(cardDeck.actionCard?.id, '2nd action card').to.eq(7)
    expect(cardDeck.supportCard?.id, '2nd support card').to.eq(6)
    expect(cardDeck.isPass(), '2nd pass').to.false

    expect(cardDeck.draw(), '3rd draw').to.true
    expect(cardDeck.actionCard?.id, '3rd action card').to.eq(9)
    expect(cardDeck.supportCard?.id, '3rd support card').to.eq(7)
    expect(cardDeck.isPass(), '3rd pass').to.false

    expect(cardDeck.draw(), '4th draw').to.false
    expect(cardDeck.actionCard, '4th action card').to.undefined
    expect(cardDeck.supportCard?.id, '4th support card').to.eq(9)
    expect(cardDeck.isPass(), '4th pass').to.true
  })

  it('draw-pass-last-3', () => {
    const cardDeck = CardDeck.fromPersistence({
      deck: [1,2,3,4],
      discard: [],
      reserve: []
    })

    expect(cardDeck.draw(), '1st draw').to.true
    expect(cardDeck.actionCard?.id, '1st action card').to.eq(2)
    expect(cardDeck.supportCard?.id, '1st support card').to.eq(1)
    expect(cardDeck.isPass(), '1st pass').to.false

    expect(cardDeck.draw(), '2nd draw').to.true
    expect(cardDeck.actionCard?.id, '2nd action card').to.eq(3)
    expect(cardDeck.supportCard?.id, '2nd support card').to.eq(2)
    expect(cardDeck.isPass(), '2nd pass').to.true
  })

  it('prepareForNextRound', () => {
    const cardDeck = CardDeck.fromPersistence({
      deck: [1,2],
      discard: [3,4],
      reserve: [6,7]
    })

    cardDeck.prepareForNextRound()
    const persistence = cardDeck.toPersistence()

    expect(persistence.deck.length, 'deck size').to.eq(5)
    expect(persistence.discard.length, 'deck size').to.eq(0)
    expect(persistence.reserve.length, 'deck size').to.eq(1)
    expect(persistence.deck.includes(6), 'includes reserve card').to.true
  })
})
