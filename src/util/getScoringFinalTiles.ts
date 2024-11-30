import Expansion from '@/services/enum/Expansion'
import ScoringFinalTile from '@/services/enum/ScoringFinalTile'

/**
 * Get available scoring final tiles.
 */
export default function getScoringFinalTiles(expansions: Expansion[]) : ScoringFinalTile[] {
  const result = Object.values(ScoringFinalTile)
  const hasLostFleet = expansions.includes(Expansion.LOST_FLEET)
  if (hasLostFleet) {
    return result.filter(tile => tile != ScoringFinalTile.PLANET_TYPES)
  }
  else {
    return result.filter(tile => tile != ScoringFinalTile.LOST_FLEET_ASTEROID
        && tile != ScoringFinalTile.LOST_FLEET_DEEP_SPACE
        && tile != ScoringFinalTile.LOST_FLEET_DISTANCE
        && tile != ScoringFinalTile.LOST_FLEET_PLANET_TYPES)
  }
}
