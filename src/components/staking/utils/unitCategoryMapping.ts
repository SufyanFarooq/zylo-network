import { UnitCategory, UNIT_CATEGORIES } from '@/components/SVG-Assets/assetMapping';

/**
 * Unit names mapping
 */
export const UNIT_NAMES = [
  'Spark Up',
  'Flicker Roar',
  'AI Overrider',
  'Zylo Apex',
  'Zylo Universe',
  'Zylo Infinity'
] as const;

/**
 * Map unitIndex to UnitCategory
 * @param unitIndex - The unit index (0-3)
 * @returns The corresponding UnitCategory
 */
export function getUnitCategory(unitIndex: number): UnitCategory {
  switch (unitIndex) {
    case 0:
      return UNIT_CATEGORIES.SPARK_UP; // 'Spark-Up'
    case 1:
      return UNIT_CATEGORIES.FLICKER_ROAR; // 'Flicker-Roar'
    case 2:
      return UNIT_CATEGORIES.AI_OVERRIDER; // 'AI-Overrider'
    case 3:
      return UNIT_CATEGORIES.ZYLO_APEX; // 'Zylo-Apex'
    case 4:
      return UNIT_CATEGORIES.ZYLO_UNIVERSE; // 'Zylo-Universe'
    default:
      // Default to Spark-Up if invalid index
      return UNIT_CATEGORIES.SPARK_UP;
  }
}

/**
 * Get unit name by unit index
 * @param unitIndex - The unit index
 * @returns The corresponding unit name
 */
export function getUnitName(unitIndex: number): string {
  if (unitIndex >= 0 && unitIndex < UNIT_NAMES.length) {
    return UNIT_NAMES[unitIndex];
  }
  return 'Unknown Unit';
}

