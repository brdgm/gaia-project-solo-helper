import BotActions from '@/services/BotActions'
import Cards from '@/services/Cards'
import Action from '@/services/enum/Action'
import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import NumberedSelection from '@/services/enum/NumberedSelection'
import ResearchArea from '@/services/enum/ResearchArea'
import ScoringFinalTiebreaker from '@/services/enum/ScoringFinalTiebreaker'
import { expect } from 'chai'

describe('BotActions', () => {
  it('1,6-round1', () => {
    const botActions = new BotActions(Cards.get(1), Cards.get(6),
        1, BotFaction.TERRANS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(2)
    expect(botActions.actions[0]).to.eql({
      action: Action.UPGRADE,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.TOP, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.LEFT, numberedSelectionCount: 1
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1
    })
  })

  it('13/2-terrans', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.TERRANS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(3)
    expect(botActions.actions[0]).to.eql({
      action: Action.RESEARCH_AREA_SPECIFIC, researchArea: ResearchArea.GAIA_PROJECT,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.BUILD_MINE, botFaction: BotFaction.TERRANS,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 4,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[2]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2
    })
  })

  it('13/2-xenos', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.XENOS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(3)
    expect(botActions.actions[0]).to.eql({
      action: Action.BUILD_MINE,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.POWER_QIC,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[2]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2
    })
  })

  it('13/2-taklons', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.TAKLONS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(3)
    expect(botActions.actions[0]).to.eql({
      action: Action.BUILD_MINE, botFaction: BotFaction.TAKLONS,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 3,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.POWER_QIC,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[2]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2
    })
  })

  it('13/2-hadsch-hallas', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.HADSCH_HALLAS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(2)
    expect(botActions.actions[0]).to.eql({
      action: Action.UPGRADE, botFaction: BotFaction.HADSCH_HALLAS,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 3,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1
    })
  })

  it('13/2-geodens', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.GEODENS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(3)
    expect(botActions.actions[0]).to.eql({
      action: Action.RESEARCH_AREA_RANDOM,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.POWER_QIC,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[2]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1
    })
  })

  it('13/2-firaks', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.FIRAKS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(2)
    expect(botActions.actions[0]).to.eql({
      action: Action.UPGRADE, botFaction: BotFaction.FIRAKS,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2
    })
  })

  it('13/2-itars', () => {
    const botActions = new BotActions(Cards.get(13), Cards.get(2),
        1, BotFaction.ITARS, DifficultyLevel.AUTOMA)

    expect(botActions.actions.length).to.eq(3)
    expect(botActions.actions[0]).to.eql({
      action: Action.POWER_QIC,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[1]).to.eql({
      action: Action.POWER_QIC,
      scoringFinalTiebreaker: ScoringFinalTiebreaker.BOTTOM, range: 2,
      directionalSelection: DirectionalSelection.RIGHT_DOWN, numberedSelection: NumberedSelection.RIGHT, numberedSelectionCount: 2
    })
    expect(botActions.actions[2]).to.eql({
      action: Action.GAIN_VICTORY_POINTS, victoryPoints: 4
    })
  })
})
