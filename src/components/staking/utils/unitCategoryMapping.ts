import { UnitCategory, UNIT_CATEGORIES } from '@/components/SVG-Assets/assetMapping';

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
    default:
      // Default to Spark-Up if invalid index
      return UNIT_CATEGORIES.SPARK_UP;
  }
}

