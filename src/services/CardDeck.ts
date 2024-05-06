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

  private static readonly CARD_3 = '*3'
  private static readonly CARD_MOTS_SPECIAL = 'mots-special'

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
  public prepareForNextRound(round : number, merchantsOfTheSeas : boolean) : void {
    // discard all remaining cards
    this._deck.forEach(card => this._discard.push(card))
    this._deck = []
    // pull in a reserve card
    const reserveCard = this._reserve.shift()
    if (reserveCard) {
      this._discard.push(reserveCard)
    }
    // add special MotS card for round 3
    if (round == 3 && merchantsOfTheSeas) {
      this._discard.push(Cards.get(CardDeck.CARD_MOTS_SPECIAL))
    }
    // shuffle discard as new deck
    this._deck = shuffle(this._discard)
    this._discard = []
  }

  /**
   * Creates a shuffled new card deck with random advanced cards.
   */
  public static new(difficultyLevel : DifficultyLevel, merchantsOfTheSeas : boolean) : CardDeck {
    let deck = Cards.getAll().filter(card => card.starter
        && (card.merchantsOfTheSeas == undefined || card.merchantsOfTheSeas == merchantsOfTheSeas))
    let reserve = Cards.getAll().filter(card => !card.starter && card.id!=CardDeck.CARD_MOTS_SPECIAL)

    // add additional cards from reserve dock for higher difficulty levels
    let additionalCardCount = 0
    if (difficultyLevel == DifficultyLevel.AUTOMAECHTIG || difficultyLevel == DifficultyLevel.ULTOMA) {
      additionalCardCount = 1
    }
    else if (difficultyLevel == DifficultyLevel.ALPTRAUMA) {
      additionalCardCount = 2
    }
    for (let i=0; i<additionalCardCount; i++) {
      const randomReserveIndex = rollDice(reserve.length) - 1
      const randomReserveCard = reserve.splice(randomReserveIndex, 1)[0]
      deck.push(randomReserveCard)
    }

    // shuffle decks
    deck = shuffle(deck)
    reserve = shuffle(reserve)

    // move card *3 on top of reserve deck for easiest level
    if (difficultyLevel == DifficultyLevel.AUTOMALEIN) {
      const card3Index = deck.findIndex(card => card.id == CardDeck.CARD_3)
      const card3 = deck.splice(card3Index, 1)[0]
      reserve.unshift(card3)
    }

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
