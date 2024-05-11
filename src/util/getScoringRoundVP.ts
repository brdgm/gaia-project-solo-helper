import ScoringRoundTile from '@/services/enum/ScoringRoundTile'

/**
 * Get number of VP to score for scoring round tile depending on current round.
 * @param scoringRoundTile Scoring round tile
 * @param round Current round
 * @returns Number of VP to score
 */
export default function getScoringRoundVP(scoringRoundTile: ScoringRoundTile, round: number) : number {
  switch (scoringRoundTile) {
    case ScoringRoundTile.ACADEMY_PLANETARY_INSTITUTE_1:
    case ScoringRoundTile.ACADEMY_PLANETARY_INSTITUTE_2:
    case ScoringRoundTile.FEDERATION_TOKEN:
      return round > 3 ? 5 : 0
    case ScoringRoundTile.GAIA_PLANET_1:
    case ScoringRoundTile.GAIA_PLANET_2:
      return 2
    case ScoringRoundTile.MINE:
    case ScoringRoundTile.TERRAFORMING:
      return round > 3 ? 6 : 4
    case ScoringRoundTile.RESEARCH_AREA:
      return round > 3 ? 4 : 2
    case ScoringRoundTile.TRADING_STATION_1:
    case ScoringRoundTile.TRADING_STATION_2:
      return round > 3 ? 6 : 3
    default:
      throw new Error(`Invalid scoring round tile: ${scoringRoundTile}`)
  }
}
