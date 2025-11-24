import React from 'react';
import { getAssetName, isValidAssetNumber, UnitCategory } from './SVG-Assets/assetMapping';

// Dynamic imports for Spark-Up assets
const SparkUpAssets = {
  1: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset1')),
  2: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset2')),
  3: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset3')),
  4: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset4')),
  5: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset5')),
  6: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset6')),
  7: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset7')),
  8: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset8')),
  9: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset9')),
  10: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset10')),
  11: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset11')),
  12: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset12')),
  13: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset13')),
  14: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset14')),
  15: React.lazy(() => import('./SVG-Assets/Spark-Up/Asset15')),
};

// Dynamic imports for Flicker-Roar assets
const FlickerRoarAssets = {
  1: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset1')),
  2: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset2')),
  3: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset3')),
  4: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset4')),
  5: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset5')),
  6: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset6')),
  7: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset7')),
  8: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset8')),
  9: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset9')),
  10: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset10')),
  11: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset11')),
  12: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset12')),
  13: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset13')),
  14: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset14')),
  15: React.lazy(() => import('./SVG-Assets/Flicker-Roar/Asset15')),
};

// Dynamic imports for AI-Overrider assets
const AIOverriderAssets = {
  1: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset1')),
  2: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset2')),
  3: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset3')),
  4: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset4')),
  5: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset5')),
  6: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset6')),
  7: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset7')),
  8: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset8')),
  9: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset9')),
  10: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset10')),
  11: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset11')),
  12: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset12')),
  13: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset13')),
  14: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset14')),
  15: React.lazy(() => import('./SVG-Assets/AI-Overrider/Asset15')),
};

// Dynamic imports for Zylo-Apex assets
const ZyloApexAssets = {
  1: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset1')),
  2: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset2')),
  3: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset3')),
  4: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset4')),
  5: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset5')),
  6: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset6')),
  7: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset7')),
  8: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset8')),
  9: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset9')),
  10: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset10')),
  11: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset11')),
  12: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset12')),
  13: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset13')),
  14: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset14')),
  15: React.lazy(() => import('./SVG-Assets/Zylo-Apex/Asset15')),
};

interface AssetRendererProps {
  unitCategory: UnitCategory;
  assetNumber: number;
  className?: string;
}

const AssetRenderer: React.FC<AssetRendererProps> = ({ 
  unitCategory, 
  assetNumber, 
  className = '' 
}) => {
  if (!isValidAssetNumber(assetNumber)) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-red-500">Invalid asset number: {assetNumber}</span>
      </div>
    );
  }

  type AssetComponentType = React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;
  let AssetComponent: AssetComponentType | null = null;

  switch (unitCategory) {
    case 'Spark-Up':
      AssetComponent = SparkUpAssets[assetNumber as keyof typeof SparkUpAssets] || null;
      break;
    case 'Flicker-Roar':
      AssetComponent = FlickerRoarAssets[assetNumber as keyof typeof FlickerRoarAssets] || null;
      break;
    case 'AI-Overrider':
      AssetComponent = AIOverriderAssets[assetNumber as keyof typeof AIOverriderAssets] || null;
      break;
    case 'Zylo-Apex':
      AssetComponent = ZyloApexAssets[assetNumber as keyof typeof ZyloApexAssets] || null;
      break;
    case 'Zylo-Universe':
      // Skip Zylo-Universe for now
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <span className="text-yellow-500">Zylo-Universe assets coming soon</span>
        </div>
      );
    default:
      return (
        <div className={`flex items-center justify-center ${className}`}>
          <span className="text-red-500">Unknown unit category: {unitCategory}</span>
        </div>
      );
  }

  if (!AssetComponent) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-yellow-500">
          Asset {assetNumber} ({getAssetName(unitCategory, assetNumber)}) not yet implemented
        </span>
      </div>
    );
  }

  return (
    <React.Suspense fallback={<div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <AssetComponent />
      </div>
    </React.Suspense>
  );
};

export default AssetRenderer;
export { getAssetName };

