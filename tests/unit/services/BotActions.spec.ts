import BotActions from '@/services/BotActions'
import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import FinalScoringTileTieBreaker from '@/services/enum/FinalScoringTileTieBreaker'
import ResearchArea from '@/services/enum/ResearchArea'
import { expect } from 'chai'

describe('BotActions', () => {
  it('1,6-round1', () => {
    const botActions = new BotActions(Cards.get(1), Cards.get(6),
        1, BotFaction.TERRANS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(1)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.UPGRADE)
    expect(action1.victoryPoints).to.eq(1)
    expect(action1.finalScoringTileTieBreaker).to.eq(FinalScoringTileTieBreaker.TOP)
    expect(action1.range).to.eq(2)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(1)
  })

  it('13/2-terrans', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.TERRANS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.RESEARCH_TRACK_SPECIFIC)
    expect(action1.researchArea == ResearchArea.GAIA_PROJECT)
    expect(action1.victoryPoints).to.undefined
    expect(action1.finalScoringTileTieBreaker).to.eq(FinalScoringTileTieBreaker.BOTTOM)
    expect(action1.range).to.eq(2)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(2)
    expect(action1.botFaction).to.undefined

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.BUILD_MINE)
    expect(action2.range).to.eq(4)
    expect(action2.victoryPoints).to.eq(2)
    expect(action1.finalScoringTileTieBreaker).to.eq(FinalScoringTileTieBreaker.BOTTOM)
    expect(action1.range).to.eq(2)
    expect(action1.directionalSelection).to.eq(DirectionalSelection.RIGHT_DOWN)
    expect(action1.directionalSelectionCount).to.eq(2)
    expect(action2.botFaction).to.eq(BotFaction.TERRANS)
  })

  it('13/2-xenos', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.XENOS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.BUILD_MINE)
    expect(action1.range).to.eq(2)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.POWER_QIC_ACTION)
    expect(action2.victoryPoints).to.eq(2)
  })

  it('13/2-taklons', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.TAKLONS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.BUILD_MINE)
    expect(action1.range).to.eq(3)
    expect(action1.botFaction).to.eq(BotFaction.TAKLONS)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.POWER_QIC_ACTION)
    expect(action2.victoryPoints).to.eq(2)
  })

  it('13/2-hadsch-hallas', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.HADSCH_HALLAS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(1)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.UPGRADE)
    expect(action1.range).to.eq(3)
    expect(action1.botFaction).to.eq(BotFaction.HADSCH_HALLAS)
  })

  it('13/2-geodens', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.GEODENS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.RESEARCH_TRACK_RANDOM)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.POWER_QIC_ACTION)
    expect(action2.victoryPoints).to.eq(1)
  })

  it('13/2-firaks', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.FIRAKS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(1)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.UPGRADE)
    expect(action1.range).to.eq(2)
    expect(action1.botFaction).to.eq(BotFaction.FIRAKS)
  })

  it('13/2-itars', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.ITARS, DifficultyLevel.AUTOMA)
    expect(botActions.actions.length).to.eq(2)

    const action1 = botActions.actions[0]
    expect(action1.action).to.eq(Action.POWER_QIC_ACTION)

    const action2 = botActions.actions[1]
    expect(action2.action).to.eq(Action.POWER_QIC_ACTION)
    expect(action2.victoryPoints).to.eq(4)
  })
})
