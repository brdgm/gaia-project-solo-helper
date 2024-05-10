import BotAction from './BotAction'
import Card from './Card'
import { DifficultyLevelParameterRound } from './DifficultyLevelParameter'
import DifficultyLevelParameters from './DifficultyLevelParameters'
import Action from './enum/Action'
import BotFaction from './enum/BotFaction'
import DifficultyLevel from './enum/DifficultyLevel'
import ResearchArea from './enum/ResearchArea'

/**
 * Determines actions and parameterization based on current action and support card.
 * Faction actions are resolved, dynamic ship level and victory points as well.
 */
export default class BotActions {

  private readonly _actions : BotAction[]
  private readonly _dlParams : DifficultyLevelParameterRound

  constructor(actionCard : Card, supportCard : Card, round : number,
        botFaction : BotFaction, difficultyLevel : DifficultyLevel) {
    this._dlParams = DifficultyLevelParameters.get(difficultyLevel, round)
    this._actions = this.toBotActions(actionCard.action, actionCard, supportCard, botFaction)
  }

  public get actions() : readonly BotAction[] {
    return this._actions
  }

  private toBotActions(action : Action, actionCard : Card, supportCard : Card,
        botFaction : BotFaction) : BotAction[] {
    let result : BotAction[]
    
    if (action == Action.FACTION) {
      result = this.getFactionBotActions(botFaction)
    }
    else {
      result = [{action: action}]
      if (actionCard.victoryPoints > 0) {
        result.push({action: Action.GAIN_VICTORY_POINTS, victoryPoints: actionCard.victoryPoints})
      }
    }

    // apply defaults
    result.filter(botAction => botAction.action != Action.GAIN_VICTORY_POINTS)
      .forEach(botAction => {
        botAction.scoringFinalTiebreaker = botAction.scoringFinalTiebreaker ?? supportCard.scoringFinalTiebreaker
        botAction.range = botAction.range ?? supportCard.range
        botAction.directionalSelection = botAction.directionalSelection ?? supportCard.directionalSelection
        botAction.numberedSelection = botAction.numberedSelection ?? supportCard.numberedSelection
        botAction.numberedSelectionCount = botAction.numberedSelectionCount ?? supportCard.numberedSelectionCount
      })

    return result
  }

  private getFactionBotActions(botFaction : BotFaction) : BotAction[] {
    switch (botFaction) {
      case BotFaction.TERRANS:
        return [
          {action: Action.RESEARCH_AREA_SPECIFIC, researchArea: ResearchArea.GAIA_PROJECT},
          {action: Action.BUILD_MINE, range: 4, botFaction: BotFaction.TERRANS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.XENOS:
        return [
          {action: Action.BUILD_MINE, range: 2},
          {action: Action.POWER_QIC, botFaction: BotFaction.XENOS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.TAKLONS:
        return [
          {action: Action.BUILD_MINE, range: 3, botFaction: BotFaction.TAKLONS},
          {action: Action.POWER_QIC},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.HADSCH_HALLAS:
        return [
          {action: Action.UPGRADE, range: 3, botFaction: BotFaction.HADSCH_HALLAS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1}
        ]
      case BotFaction.GEODENS:
        return [
          {action: Action.RESEARCH_AREA_RANDOM},
          {action: Action.POWER_QIC},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1}
        ]
      case BotFaction.FIRAKS:
        return [
          {action: Action.UPGRADE, botFaction: BotFaction.FIRAKS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.ITARS:
        return [
          {action: Action.POWER_QIC},
          {action: Action.POWER_QIC},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 4}
        ]
      default:
        throw new Error('Invalid bot faction: ' + botFaction)
    }
  }

}
