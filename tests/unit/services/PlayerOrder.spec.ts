import Player from '@/services/Player'
import PlayerOrder from '@/services/PlayerOrder'
import { expect } from 'chai'

describe('PlayerOrder', () => {
  it('new-round', () => {
    const playerOrder = new PlayerOrder([],[],1,2,false)

    expect(playerOrder.getStartPlayer()).to.eql(Player.player(1))
    expect(playerOrder.getNextPlayer()).to.eql(Player.player(1))
    expect(playerOrder.hasAnyonePassed()).to.false
    expect(playerOrder.startPlayerOrder).to.eql([Player.player(1),Player.bot(1),Player.bot(2)])
  })

  it('new-round-previous-round', () => {
    const playerOrder = new PlayerOrder([],[
      {round:1,turn:1,player:1,startPlayer:true},
      {round:1,turn:3,bot:1},
      {round:1,turn:4,bot:2,pass:true,startPlayer:true,cardDeck:{deck:[],discard:[],reserve:[]}},
      {round:1,turn:5,player:1},
      {round:1,turn:6,bot:1,pass:true,cardDeck:{deck:[],discard:[],reserve:[]}},
      {round:1,turn:7,player:1},
      {round:1,turn:8,player:1,pass:true,cardDeck:{deck:[],discard:[],reserve:[]}},
    ],1,2,false)

    expect(playerOrder.getStartPlayer()).to.eql(Player.bot(2))
    expect(playerOrder.getNextPlayer()).to.eql(Player.bot(2))
    expect(playerOrder.hasAnyonePassed()).to.false
    expect(playerOrder.startPlayerOrder).to.eql([Player.bot(2),Player.player(1),Player.bot(1)])

    expect(playerOrder.getLastTurnPreviousRound(Player.bot(1))?.turn).to.eq(6)
    expect(playerOrder.getLastTurnPreviousRound(Player.bot(2))?.turn).to.eq(4)
  })

  it('new-round-previous-round-variable-turn-order', () => {
    const playerOrder = new PlayerOrder([],[
      {round:1,turn:1,player:1,startPlayer:true},
      {round:1,turn:3,bot:1},
      {round:1,turn:4,bot:2,pass:true,startPlayer:true},
      {round:1,turn:5,player:1},
      {round:1,turn:6,bot:1,pass:true},
      {round:1,turn:7,player:1},
      {round:1,turn:8,player:1,pass:true},
    ],1,2,true)

    expect(playerOrder.getStartPlayer()).to.eql(Player.bot(2))
    expect(playerOrder.getNextPlayer()).to.eql(Player.bot(2))
    expect(playerOrder.hasAnyonePassed()).to.false
    expect(playerOrder.startPlayerOrder).to.eql([Player.bot(2),Player.bot(1),Player.player(1)])
  })

  it('next11-bot', () => {
    const playerOrder = new PlayerOrder([
      {round:1,turn:1,player:1}
    ],[],1,1,false)

    expect(playerOrder.getNextPlayer()).to.eql(Player.bot(1))
    expect(playerOrder.hasAnyonePassed()).to.false
  })

  it('next11-player', () => {
    const playerOrder = new PlayerOrder([
      {round:1,turn:1,player:1},
      {round:1,turn:2,bot:1}
    ],[],1,1,false)

    expect(playerOrder.getNextPlayer()).to.eql(Player.player(1))
    expect(playerOrder.hasAnyonePassed()).to.false
  })

  it('next22-bot2', () => {
    const playerOrder = new PlayerOrder([
      {round:1,turn:1,player:1},
      {round:1,turn:2,player:2},
      {round:1,turn:3,bot:1},
      {round:1,turn:4,bot:2},
      {round:1,turn:5,player:1,pass:true,startPlayer:true},
      {round:1,turn:6,player:2,pass:true},
      {round:1,turn:7,bot:1,pass:true},
      {round:1,turn:8,bot:2},
      {round:1,turn:9,bot:2},
    ],[],2,2,false)

    expect(playerOrder.getNextPlayer()).to.eql(Player.bot(2))
    expect(playerOrder.getStartPlayer()).to.eql(Player.player(1))
    expect(playerOrder.hasAnyonePassed()).to.true
  })

  it('next22-none', () => {
    const playerOrder = new PlayerOrder([
      {round:1,turn:1,player:1},
      {round:1,turn:2,player:2,pass:true,startPlayer:true},
      {round:1,turn:3,bot:1},
      {round:1,turn:4,bot:2},
      {round:1,turn:5,player:1,pass:true},
      {round:1,turn:6,bot:1,pass:true},
      {round:1,turn:7,bot:2,pass:true}
    ],[],2,2,false)

    expect(playerOrder.getNextPlayer()).to.undefined
    expect(playerOrder.getStartPlayer()).to.eql(Player.player(2))
    expect(playerOrder.hasAnyonePassed()).to.true
  })

  it('getLastTurn', () => {
    const playerOrder = new PlayerOrder([
      {round:1,turn:1,player:1},
      {round:1,turn:2,player:2,pass:true,startPlayer:true},
      {round:1,turn:3,bot:1,cardDeck:{deck:[],discard:[],reserve:[]}},
      {round:1,turn:4,bot:2,cardDeck:{deck:[],discard:[],reserve:[]}},
      {round:1,turn:5,player:1,pass:true},
      {round:1,turn:6,bot:1,pass:true},
      {round:1,turn:7,bot:2,pass:true}
    ],[],2,2,false)

    expect(playerOrder.getLastTurn(Player.bot(1))?.turn).to.eq(3)
    expect(playerOrder.getLastTurn(Player.bot(2))?.turn).to.eq(4)
  })
})
