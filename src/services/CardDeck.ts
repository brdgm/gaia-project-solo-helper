import { CardDeckPersistence } from '@/store/state'
import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import DifficultyLevel from './enum/DifficultyLevel'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

/**
 * Deck of cards with action/support cards and reserve.
 */
export default class CardDeck {

  // special cards for setup
  private static readonly CARD_2 = '2'
  private static readonly CARD_9 = '9'
  private static readonly CARD_15 = '15'

  private _deck : Card[]
  private _reserve : Card[]
  private _discard : Card[]

  public constructor(deck : Card[], reserve : Card[], discard : Card[]) {
    this._deck = deck
    this._reserve = reserve
    this._discard = discard
  }

  public get deck() : readonly Card[] {
    return this._deck
  }

  public get reserve() : readonly Card[] {
    return this._reserve
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  public get actionCard() : Card|undefined {
    return this._deck[0]
  }

  public get supportCard() : Card|undefined {
    return this._discard[0]
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      deck: this._deck.map(card => card.id),
      reserve: this._reserve.map(card => card.id),
      discard: this._discard.map(card => card.id)      
    }
  }

  /**
   * Draw a new card. Topmost card on discard pile is support card, topmost card on deck is action card.
   * @return true if a card was drawn and there is still an action card left. if false, automa will pass.
   */
  public draw() : boolean {
    const drawnCard = this._deck.shift()
    if (drawnCard) {
      this._discard.unshift(drawnCard)
    }
    return drawnCard != undefined && this._deck.length >= 1
  }

  /**
   * Checks if Automa passes in this round.
   */
  public isPass() : boolean {
    return (this._deck.length == 0)
        || (this._deck.length <= 2 && (this.actionCard?.pass || false))
  }

  /**
   * Prepare card deck for new round, adding additional card from reserve.
   */
  public prepareForNextRound() : void {
    // discard all remaining cards
    this._deck.forEach(card => this._discard.push(card))
    this._deck = []
    // pull in a reserve card
    const reserveCard = this._reserve.shift()
    if (reserveCard) {
      this._discard.push(reserveCard)
    }
    // shuffle discard as new deck
    this._deck = shuffle(this._discard)
    this._discard = []
  }

  /**
   * Creates a shuffled new card deck with random advanced cards.
   */
  public static new(difficultyLevel : DifficultyLevel) : CardDeck {
    let deck = Cards.getAll().filter(card => card.starter)
    let reserve = Cards.getAll().filter(card => !card.starter)

    // handle difficulty levels
    if (difficultyLevel == DifficultyLevel.AUTOMALEIN) {
      moveCardToDeck(deck, reserve, CardDeck.CARD_2)
    }
    if (difficultyLevel == DifficultyLevel.AUTOMAECHTIG || difficultyLevel == DifficultyLevel.ULTOMA || difficultyLevel == DifficultyLevel.ALPTRAUMA) {
      moveCardToDeck(reserve, deck, CardDeck.CARD_9)
    }
    if (difficultyLevel == DifficultyLevel.ULTOMA || difficultyLevel == DifficultyLevel.ALPTRAUMA) {
      moveCardToDeck(reserve, deck, CardDeck.CARD_15)
    }

    // add one random card
    const randomReserveIndex = rollDice(reserve.length) - 1
    moveCardToDeck(reserve, deck, reserve[randomReserveIndex].id)

    // shuffle decks
    deck = shuffle(deck)
    reserve = shuffle(reserve)

    return new CardDeck(deck, reserve, [])
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.deck.map(Cards.get),
      persistence.reserve.map(Cards.get),
      persistence.discard.map(Cards.get)
    )
  }

}

function moveCardToDeck(deck1: Card[], deck2: Card[], cardId: string) {
  const cardIndex = deck1.findIndex(card => card.id == cardId)
  const movedCard = deck1.splice(cardIndex, 1)[0]
  deck2.unshift(movedCard)
}
