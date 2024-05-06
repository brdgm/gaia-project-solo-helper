/**
 * Action
 */
enum Action {
  ADVANCE_HIGHEST_RESEARCH_AREA = 'advance-highest-research-area',
  ADVANCE_RANDOM_RESEARCH_AREA = 'advance-random-research-area',
  BUILD_MINE = 'build-mine',
  FACTION_ACTION = 'faction-action',
  POWER_QIC_ACTION = 'power-qic-action',
  UPGRADE = 'upgrade',

  BLOCK_POWER_ACTION = 'block-power-action',
  GAIN_VICTORY_POINTS = 'gain-victory-points',
  ADVANCE_CULT_TRACK = 'advance-cult-track',
  TAKE_FAVOR_TILE = 'take-favor-tile',
  TRANSFORM_AND_BUILD = 'transform-and-build',
  TRADE = 'trade',
  FACTION_SYMBIONTS_PLACE_CUBE = 'faction-symbionts-place-cube',
  FACTION_BLIGHT_TRANSFORM_FALLOW_LAND = 'faction-blight-transform-fallow-land'
}
export default Action