// Unit Categories
export const UNIT_CATEGORIES = {
  SPARK_UP: 'Spark-Up',
  FLICKER_ROAR: 'Flicker-Roar',
  AI_OVERRIDER: 'AI-Overrider',
  ZYLO_APEX: 'Zylo-Apex',
  ZYLO_UNIVERSE: 'Zylo-Universe',
} as const;

export type UnitCategory = typeof UNIT_CATEGORIES[keyof typeof UNIT_CATEGORIES];

// Asset name mappings for each unit category
export const ASSET_NAMES = {
  [UNIT_CATEGORIES.SPARK_UP]: {
    1: 'Ember',
    2: 'Glow',
    3: 'Spark',
    4: 'Flicker',
    5: 'Flame',
    6: 'Bubble',
    7: 'Prism',
    8: 'Pebble',
    9: 'Crystal',
    10: 'Leaf',
    11: 'Cloud',
    12: 'Bolt',
    13: 'Raindrop',
    14: 'Ice',
    15: 'Sunbeam',
  },
  [UNIT_CATEGORIES.FLICKER_ROAR]: {
    1: 'Lion',
    2: 'Tiger',
    3: 'Wolf',
    4: 'Eagle',
    5: 'Panther',
    6: 'Dragon',
    7: 'Goat',
    8: 'Fox',
    9: 'Owl',
    10: 'Rat',
    11: 'Dog',
    12: 'Cat',
    13: 'Bear',
    14: 'Rhino',
    15: 'Snake',
  },
  [UNIT_CATEGORIES.AI_OVERRIDER]: {
    1: 'Robot',
    2: 'Drone',
    3: 'AI Core',
    4: 'NanoBot',
    5: 'Holo Chip',
    6: 'Cyber Lion',
    7: 'Cyber Tiger',
    8: 'Mecha Dragon',
    9: 'Neural Orb',
    10: 'Laser',
    11: 'Hologram',
    12: 'Tech Fox',
    13: 'AI Wolf',
    14: 'Circuit Bot',
    15: 'Cyber Panther',
  },
  [UNIT_CATEGORIES.ZYLO_APEX]: {
    1: 'Star',
    2: 'Planet',
    3: 'Black Hole',
    4: 'Nebula',
    5: 'Comet',
    6: 'Supernova',
    7: 'Void',
    8: 'Galaxy',
    9: 'Alien',
    10: 'Phoenix',
    11: 'Cosmic Dragon',
    12: 'Meteor',
    13: 'Aurora',
    14: 'Quantum Star',
    15: 'Celestial Orb',
  },
  [UNIT_CATEGORIES.ZYLO_UNIVERSE]: {
    // Special milestone assets - to be defined
  },
} as const;

/**
 * Get asset name by unit category and asset number
 */
export function getAssetName(unitCategory: UnitCategory, assetNumber: number): string {
  const names = ASSET_NAMES[unitCategory];
  if (!names || !names[assetNumber as keyof typeof names]) {
    return `Asset ${assetNumber}`;
  }
  return names[assetNumber as keyof typeof names] as string;
}

/**
 * Get asset component path by unit category and asset number
 */
export function getAssetComponentPath(unitCategory: UnitCategory, assetNumber: number): string {
  const categoryPath = unitCategory.replace(/\s+/g, '-');
  return `./${categoryPath}/Asset${assetNumber}`;
}

/**
 * Validate asset number (must be between 1 and 15)
 */
export function isValidAssetNumber(assetNumber: number): boolean {
  return assetNumber >= 1 && assetNumber <= 15;
}

