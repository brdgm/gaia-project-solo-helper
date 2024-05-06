import CardDeck from '@/services/CardDeck'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('CardDeck', () => {
  it('new-level1', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.AUTOMALEIN, false)

    expect(cardDeck.deck.length, 'deck size').to.eq(4)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(9)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.deck.includes('*3'), '*3 not in deck').to.false
    expect(persistence.reserve[0], '*3 top of reserve').to.eq('*3')

    expect(cardDeck.deck.filter(card => card.merchantsOfTheSeas).length, 'no MotS cards in deck').to.eq(0)
    expect(cardDeck.reserve.filter(card => card.merchantsOfTheSeas).length, 'no MotS cards in reserve').to.eq(0)
  })

  it('new-level1-mots', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.AUTOMALEIN, true)

    expect(cardDeck.deck.length, 'deck size').to.eq(4)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(9)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    const persistence = cardDeck.toPersistence()
    expect(persistence.deck.includes('*3'), '*3 not in deck').to.false
    expect(persistence.reserve[0], '*3 top of reserve').to.eq('*3')

    expect(cardDeck.deck.filter(card => card.merchantsOfTheSeas).length, 'MotS cards in deck').to.eq(2)
    expect(cardDeck.reserve.filter(card => card.merchantsOfTheSeas).length, 'no MotS cards in reserve').to.eq(0)
  })

  it('new-level2', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.AUTOMA, false)

    expect(cardDeck.deck.length, 'deck size').to.eq(5)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(8)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('new-level3', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.AUTOMAECHTIG, false)

    expect(cardDeck.deck.length, 'deck size').to.eq(6)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(7)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('new-level4', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.ULTOMA, false)

    expect(cardDeck.deck.length, 'deck size').to.eq(6)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(7)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('new-level5', () => {
    const cardDeck = CardDeck.new(DifficultyLevel.ALPTRAUMA, false)

    expect(cardDeck.deck.length, 'deck size').to.eq(7)
    expect(cardDeck.reserve.length, 'reserve size').to.eq(6)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })

  it('draw-pass-deck-empty', () => {
    const cardDeck = CardDeck.fromPersistence({
      deck: ['*1','*2','*3','*5'],
      discard: [],
      reserve: []
    })

    expect(cardDeck.draw(), '1st draw').to.true
    expect(cardDeck.actionCard?.id, '1st action card').to.eq('*2')
    expect(cardDeck.supportCard?.id, '1st action card').to.eq('*1')
    expect(cardDeck.isPass(), '1st pass').to.false

    expect(cardDeck.draw(), '2nd draw').to.true
    expect(cardDeck.actionCard?.id, '2nd action card').to.eq('*3')
    expect(cardDeck.supportCard?.id, '2nd action card').to.eq('*2')
    expect(cardDeck.isPass(), '2nd pass').to.false

    expect(cardDeck.draw(), '3rd draw').to.true
    expect(cardDeck.actionCard?.id, '3rd action card').to.eq('*5')
    expect(cardDeck.supportCard?.id, '3rd action card').to.eq('*3')
    expect(cardDeck.isPass(), '3rd pass').to.false

    expect(cardDeck.draw(), '4th draw').to.false
    expect(cardDeck.actionCard, '4th action card').to.undefined
    expect(cardDeck.supportCard?.id, '4th action card').to.eq('*5')
    expect(cardDeck.isPass(), '4th pass').to.true
  })

  it('draw-pass-last-2', () => {
    const cardDeck = CardDeck.fromPersistence({
      deck: ['*1','*2','*4','*5'],
      discard: [],
      reserve: []
    })

    expect(cardDeck.draw(), '1st draw').to.true
    expect(cardDeck.actionCard?.id, '1st action card').to.eq('*2')
    expect(cardDeck.supportCard?.id, '1st action card').to.eq('*1')
    expect(cardDeck.isPass(), '1st pass').to.false

    expect(cardDeck.draw(), '2nd draw').to.true
    expect(cardDeck.actionCard?.id, '2nd action card').to.eq('*4')
    expect(cardDeck.supportCard?.id, '2nd action card').to.eq('*2')
    expect(cardDeck.isPass(), '2nd pass').to.true
  })

  it('prepareForNextRound', () => {
    const cardDeck = CardDeck.fromPersistence({
      deck: ['*1','*2',],
      discard: ['*3','*4'],
      reserve: ['6','7']
    })

    cardDeck.prepareForNextRound(2, false)
    const persistence = cardDeck.toPersistence()

    expect(persistence.deck.length, 'deck size').to.eq(5)
    expect(persistence.discard.length, 'deck size').to.eq(0)
    expect(persistence.reserve.length, 'deck size').to.eq(1)
    expect(persistence.deck.includes('6'), 'includes reserve card').to.true
  })

  it('prepareForNextRound-mots', () => {
    const cardDeck = CardDeck.fromPersistence({
      deck: ['*1','*2',],
      discard: ['*3','*4'],
      reserve: ['6','7']
    })

    cardDeck.prepareForNextRound(3, true)
    const persistence = cardDeck.toPersistence()

    expect(persistence.deck.length, 'deck size').to.eq(6)
    expect(persistence.discard.length, 'deck size').to.eq(0)
    expect(persistence.reserve.length, 'deck size').to.eq(1)
    expect(persistence.deck.includes('6'), 'includes reserve card').to.true
    expect(persistence.deck.includes('mots-special'), 'includes mots-special card').to.true
  })
})
