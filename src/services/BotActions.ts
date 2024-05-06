import BotAction from './BotAction'
import Card from './Card'
import { DifficultyLevelParameterRound } from './DifficultyLevelParameter'
import DifficultyLevelParameters from './DifficultyLevelParameters'
import Action from './enum/Action'
import BotFaction from './enum/BotFaction'
import CultTrackSelection from './enum/CultTrackSelection'
import DifficultyLevel from './enum/DifficultyLevel'

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
    this._actions = actionCard.actions
        .flatMap(action => this.toBotActions(action, actionCard, supportCard, round, botFaction))
  }

  public get actions() : readonly BotAction[] {
    return this._actions
  }

  private toBotActions(action : Action, actionCard : Card, supportCard : Card,
        round : number, botFaction : BotFaction) : BotAction[] {
    let result
    
    if (action == Action.FACTION_ACTION) {
      result = this.getFactionBotActions(botFaction)
    }
    else {
      result = [{action: action}]
    }

    // ongoing benefit for powermongers
    if (botFaction == BotFaction.POWERMONGERS) {
      const benefitApplyIndex = result.findIndex(botAction => botAction.action == Action.TRANSFORM_AND_BUILD || botAction.action == Action.UPGRADE || botAction.action == Action.TRADE)
      if (benefitApplyIndex >= 0) {
        result = [
          ...result.slice(0, benefitApplyIndex+1),
          {action: Action.ADVANCE_CULT_TRACK, botFaction: BotFaction.POWERMONGERS, cultTrackSelection: CultTrackSelection.CATCH_UP},
          ...result.slice(benefitApplyIndex+1,result.length)
        ] 
      }
    }

    // apply defaults from support card
    result.forEach(botAction => {
      botAction.shipLevel = botAction.shipLevel ?? actionCard.shipLevel ?? this._dlParams.shipLevel
      botAction.tradeMinRound = botAction.tradeMinRound ?? actionCard.tradeMinRound
      botAction.victoryPointsDifficultyLevel = botAction.victoryPointsDifficultyLevel ?? actionCard.victoryPointsDifficultyLevel
      botAction.victoryPoints = botAction.victoryPoints ?? actionCard.victoryPoints 
      if (!botAction.victoryPoints && botAction.victoryPointsDifficultyLevel) {
        botAction.victoryPoints = this._dlParams.victoryPoints
        botAction.victoryPointsDifficultyLevel = undefined
      }
      botAction.structure = botAction.structure ?? supportCard.structure
      botAction.terrainPriority = botAction.terrainPriority ?? supportCard.terrainPriority
      botAction.directionalSelection = botAction.directionalSelection ?? supportCard.directionalSelection
      botAction.directionalSelectionCount = botAction.directionalSelectionCount ?? supportCard.directionalSelectionCount
      botAction.cultTrackSelection = botAction.cultTrackSelection ?? supportCard.cultTrackSelection
    })

    // filter out actions not relevant for current round
    return result.filter(botAction => (botAction.action != Action.TAKE_FAVOR_TILE || round >= 5)
        && (botAction.action != Action.TRADE || round >= (botAction.tradeMinRound ?? 0))
        && (botAction.action != Action.GAIN_VICTORY_POINTS || (botAction.victoryPoints && botAction.victoryPoints > 0)))
  }

  private getFactionBotActions(botFaction : BotFaction) : BotAction[] {
    switch (botFaction) {
      case BotFaction.SIMPLETONS:
        return [
          {action: Action.TRANSFORM_AND_BUILD},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.KUDDLERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.KUDDLERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.DRUIDS:
        return [
          {action: Action.TRANSFORM_AND_BUILD},
          {action: Action.ADVANCE_CULT_TRACK, botFaction: BotFaction.DRUIDS, cultTrackSelection: CultTrackSelection.CATCH_UP}
        ]
      case BotFaction.RACELINGS:
        return [
          {action: Action.TRANSFORM_AND_BUILD}
        ]
      case BotFaction.WANDERERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.WANDERERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1}
        ]
      case BotFaction.MIMICS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.MIMICS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.POWERMONGERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.POWERMONGERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.SYMBIONTS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.SYMBIONTS},
          {action: Action.FACTION_SYMBIONTS_PLACE_CUBE, botFaction: BotFaction.SYMBIONTS}
        ]
      case BotFaction.BLIGHT:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.BLIGHT},
          {action: Action.FACTION_BLIGHT_TRANSFORM_FALLOW_LAND, botFaction: BotFaction.BLIGHT},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1}
        ]
      case BotFaction.GOGNOMES:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.GOGNOMES}
        ]
      default:
        throw new Error('Invalid bot faction: ' + botFaction)
    }
  }

}
