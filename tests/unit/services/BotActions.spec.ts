import BotActions from '@/services/BotActions'
import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import BotFaction from '@/services/enum/BotFaction'
import CultTrackSelection from '@/services/enum/CultTrackSelection'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import Structure from '@/services/enum/Structure'
import TerrainPriority from '@/services/enum/TerrainPriority'
import { expect } from 'chai'

describe('BotActions', () => {
  it('*1/*2-level3-round1', () => {
    const botActions = new BotActions(Cards.get('*1'), Cards.get('*2'),
        1, BotFaction.SIMPLETONS, DifficultyLevel.AUTOMAECHTIG)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.UPGRADE)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.LEFT_UP)
    expect(action1.directionalSelectionCount).to.eq(1)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.GAIN_VICTORY_POINTS)
    expect(action2.victoryPoints).to.eq(1)
  })

  it('*1/*2-level4-round6', () => {
    const botActions = new BotActions(Cards.get('*1'), Cards.get('*2'),
        6, BotFaction.SIMPLETONS, DifficultyLevel.ULTOMA)
    expect(botActions.actions.length).to.eq(3)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.UPGRADE)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.LEFT_UP)
    expect(action1.directionalSelectionCount).to.eq(1)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.TAKE_FAVOR_TILE)
    expect(action2.cultTrackSelection).to.eq(CultTrackSelection.CATCH_UP)

    const action3 = botActions.actions[2]
    expect(action3.action).to.eq(Action.GAIN_VICTORY_POINTS)
    expect(action3.victoryPoints).to.eq(3)
  })

  it('*2-mots/6-level2-round3', () => {
    const botActions = new BotActions(Cards.get('*2-mots'), Cards.get('6'),
        3, BotFaction.SIMPLETONS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(1)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.BLOCK_POWER_ACTION)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(3)
  })

  it('*2-mots/6-level2-round5', () => {
    const botActions = new BotActions(Cards.get('*2-mots'), Cards.get('6'),
        5, BotFaction.SIMPLETONS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.BLOCK_POWER_ACTION)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(3)

    const action3 = botActions.actions[1]
    expect(action3.action).to.eq(Action.TRADE)
    expect(action3.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action3.directionalSelectionCount).to.eq(3)
  })

  it('*5/*2-simpletons', () => {
    const botActions = new BotActions(Cards.get('*5'), Cards.get('*2'),
        1, BotFaction.SIMPLETONS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.TRANSFORM_AND_BUILD)
    expect(action1.structure).to.eq(Structure.MARKED)
    expect(action1.terrainPriority).to.eq(TerrainPriority.B)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.LEFT_UP)
    expect(action1.directionalSelectionCount).to.eq(1)
    expect(action1.botFaction).to.undefined

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.GAIN_VICTORY_POINTS)
    expect(action2.victoryPoints).to.eq(2)
    expect(action2.botFaction).to.undefined
  })

  it('*5/*2-wanderers', () => {
    const botActions = new BotActions(Cards.get('*5'), Cards.get('*2'),
        1, BotFaction.WANDERERS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.TRANSFORM_AND_BUILD)
    expect(action1.structure).to.eq(Structure.MARKED)
    expect(action1.terrainPriority).to.eq(TerrainPriority.B)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.LEFT_UP)
    expect(action1.directionalSelectionCount).to.eq(1)
    expect(action1.botFaction).to.eq(BotFaction.WANDERERS)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.GAIN_VICTORY_POINTS)
    expect(action2.victoryPoints).to.eq(1)
    expect(action2.botFaction).to.undefined
  })

  it('*5/*3-druids', () => {
    const botActions = new BotActions(Cards.get('*5'), Cards.get('*3'),
        1, BotFaction.DRUIDS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.TRANSFORM_AND_BUILD)
    expect(action1.structure).to.eq(Structure.UNMARKED_REACHING)
    expect(action1.terrainPriority).to.eq(TerrainPriority.B)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(3)
    expect(action1.botFaction).to.undefined

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.ADVANCE_CULT_TRACK)
    expect(action2.cultTrackSelection).to.eq(CultTrackSelection.CATCH_UP)
    expect(action2.botFaction).to.eq(BotFaction.DRUIDS)
  })

  it('*5/*1-powermongers', () => {
    const botActions = new BotActions(Cards.get('*5'), Cards.get('*1'),
        1, BotFaction.POWERMONGERS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(3)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.TRANSFORM_AND_BUILD)
    expect(action1.structure).to.eq(Structure.MARKED)
    expect(action1.terrainPriority).to.eq(TerrainPriority.A)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(2)
    expect(action1.botFaction).to.eq(BotFaction.POWERMONGERS)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.ADVANCE_CULT_TRACK)
    expect(action2.cultTrackSelection).to.eq(CultTrackSelection.CATCH_UP)
    expect(action2.botFaction).to.eq(BotFaction.POWERMONGERS)

    const action3 = botActions.actions[2]
    expect(action3.action).to.eq(Action.GAIN_VICTORY_POINTS)
    expect(action3.victoryPoints).to.eq(2)
    expect(action3.botFaction).to.undefined
  })

  it('11/*1-powermongers', () => {
    const botActions = new BotActions(Cards.get('11'), Cards.get('*1'),
        3, BotFaction.POWERMONGERS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(3)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.UPGRADE)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(2)
    expect(action1.botFaction).to.undefined

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.ADVANCE_CULT_TRACK)
    expect(action2.cultTrackSelection).to.eq(CultTrackSelection.CATCH_UP)
    expect(action2.botFaction).to.eq(BotFaction.POWERMONGERS)

    const action3 = botActions.actions[2]
    expect(action3.action).to.eq(Action.GAIN_VICTORY_POINTS)
    expect(action3.victoryPoints).to.eq(1)
    expect(action3.botFaction).to.undefined
  })
})
