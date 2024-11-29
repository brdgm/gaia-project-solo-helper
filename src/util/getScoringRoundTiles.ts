import Expansion from '@/services/enum/Expansion'
import ScoringRoundTile from '@/services/enum/ScoringRoundTile'

/**
 * Get available scoring round tiles.
 */
export default function getScoringRoundTiles(expansions: Expansion[]) : ScoringRoundTile[] {
  const result = Object.values(ScoringRoundTile)
  const hasLostFleet = expansions.includes(Expansion.LOST_FLEET)
  if (hasLostFleet) {
    return result
  }
  else {
    return result.filter(tile => tile != ScoringRoundTile.LOST_FLEET_PLANET_TYPE
        && tile != ScoringRoundTile.LOST_FLEET_RESEARCH_LAB
        && tile != ScoringRoundTile.LOST_FLEET_SECTOR_DEEP)
  }
}
