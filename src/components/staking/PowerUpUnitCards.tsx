'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider, formatEther, Contract } from 'ethers';
import { useRouter } from 'next/navigation';
import { getPowerUpLength, userPowerUpDetails, getSelfPowerUpReward, claimSelfPowerUnit, getUserClaimSelfDetailsLength, getUserClaimSelfDetails } from '@/blockchain/instances/ZyloPowerUp';
import { ZyloPowerUp_ADDRESS } from '@/blockchain/addresses/addresses.js';
import ZyloPowerUp_ABI from '@/blockchain/abis/ZyloPowerUp.json';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaLock, FaBolt, FaClock } from 'react-icons/fa';
import AssetRenderer, { getAssetName } from '@/components/AssetRenderer';
import { getUnitCategory } from './utils/unitCategoryMapping';
import './ZillowStake.css';

// Import CSS files for slick carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Lazy load react-slick component
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />
});

// Wrapper component to filter out react-slick props from DOM elements
const SlideWrapper: React.FC<{ children: React.ReactNode;[key: string]: unknown }> = (props) => {
  // Filter out react-slick internal props (currentSlide, slideCount) before passing to DOM
  const { children, currentSlide: _currentSlide, slideCount: _slideCount, ...domProps } = props;
  return <div {...domProps}>{children}</div>;
};

// Arrow components that filter out react-slick props
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomPrevArrow: React.FC<any> = ({ currentSlide: _currentSlide, slideCount: _slideCount, ...props }) => {
  // Explicitly filter out react-slick props to prevent them from reaching DOM
  const { ...domProps } = props;
  return (
    <div className="slick-arrow-custom slick-prev-custom" {...domProps}>
      <span className="slick-arrow-icon">←</span>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomNextArrow: React.FC<any> = ({ currentSlide: _currentSlide, slideCount: _slideCount, ...props }) => {
  // Explicitly filter out react-slick props to prevent them from reaching DOM
  const { ...domProps } = props;
  return (
    <div className="slick-arrow-custom slick-next-custom" {...domProps}>
      <span className="slick-arrow-icon">→</span>
    </div>
  );
};

// Component to fetch and display self power up reward for each card
interface SelfPowerUpRewardDisplayProps {
  address: string;
  unitIndex: number;
  cardIndex: number;
  walletClient: unknown;
}

const SelfPowerUpRewardDisplay: React.FC<SelfPowerUpRewardDisplayProps> = ({ address, unitIndex, cardIndex, walletClient }) => {
  const [reward, setReward] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReward = async () => {
      if (!address || !walletClient) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Create provider from wallet client
        const provider = new BrowserProvider(walletClient as never);
        // Call getSelfPowerUpReward with wallet address, unit index, and card index
        const rewardResult = await getSelfPowerUpReward(provider, address, unitIndex, cardIndex);
        if (rewardResult.success && rewardResult.data) {
          setReward(rewardResult.data || '0.00');
        } else {
          setReward('0.00');
        }
      } catch (error) {
        console.error(`Error fetching reward for unit ${unitIndex}, card ${cardIndex}:`, error);
        setReward('0.00');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReward();
  }, [address, unitIndex, cardIndex, walletClient]);

  return (
    <>
      {isLoading ? (
        <span style={{ fontSize: '12px', opacity: 0.7 }}>Loading...</span>
      ) : (
        `${parseFloat(reward || '0').toFixed(4)} ZYLO`
      )}
    </>
  );
};

// Component to calculate Current Self Power Up Reward
// Formula: selfPowerUpReward - (-index7Value) = selfPowerUpReward + index7Value
interface CurrentSelfPowerUpRewardDisplayProps {
  address: string;
  unitIndex: number;
  cardIndex: number;
  walletClient: unknown;
}

const CurrentSelfPowerUpRewardDisplay: React.FC<CurrentSelfPowerUpRewardDisplayProps> = ({ address, unitIndex, cardIndex, walletClient }) => {
  const [calculatedValue, setCalculatedValue] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndCalculate = async () => {
      if (!address || !walletClient) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const provider = new BrowserProvider(walletClient as never);

        // Step 1: Call getSelfPowerUpReward
        const rewardResult = await getSelfPowerUpReward(provider, address, unitIndex, cardIndex);
        let selfPowerUpReward = 0;
        if (rewardResult.success && rewardResult.data) {
          selfPowerUpReward = parseFloat(rewardResult.data || '0');
        }

        // Step 2: Call userPowerUpDetails and get index 7 value
        const contract = new Contract(ZyloPowerUp_ADDRESS, ZyloPowerUp_ABI, provider);
        const rawDetails = await contract.userPowerUpDetails(address, unitIndex, cardIndex);

        // Access index 7 (unPowerUp)
        let index7Value = 0;
        let index7RawValue: unknown = null;

        if (Array.isArray(rawDetails) && rawDetails.length > 7) {
          index7RawValue = rawDetails[7];
        } else if (rawDetails && typeof rawDetails === 'object') {
          if (rawDetails[7] !== undefined) {
            index7RawValue = rawDetails[7];
          } else if (rawDetails.unPowerUp !== undefined) {
            index7RawValue = rawDetails.unPowerUp;
          } else if ('length' in rawDetails && rawDetails.length > 7) {
            index7RawValue = rawDetails[7];
          }
        }

        // Process index 7 value (without negating)
        if (index7RawValue !== null && index7RawValue !== undefined) {
          if (typeof index7RawValue === 'boolean') {
            index7Value = index7RawValue ? 1 : 0;
          } else {
            try {
              const bigIntValue = typeof index7RawValue === 'bigint' ? index7RawValue : BigInt(index7RawValue.toString());
              const formattedValue = formatEther(bigIntValue);
              index7Value = parseFloat(formattedValue);
            } catch {
              index7Value = typeof index7RawValue === 'number' ? index7RawValue : Number(index7RawValue.toString());
            }
          }
        }

        // Step 3: Calculate: selfPowerUpReward - index7Value (direct subtraction, no negation)
        const result = selfPowerUpReward - index7Value;
        setCalculatedValue(result.toFixed(4));
      } catch (error) {
        console.error(`Error calculating current reward for unit ${unitIndex}, card ${cardIndex}:`, error);
        setCalculatedValue('0.00');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCalculate();
  }, [address, unitIndex, cardIndex, walletClient]);

  return (
    <>
      {isLoading ? (
        <span style={{ fontSize: '12px', opacity: 0.7 }}>Loading...</span>
      ) : (
        `${parseFloat(calculatedValue || '0').toFixed(4)} ZYLO`
      )}
    </>
  );
};

interface PowerUpData {
  powerUpToken: string;
  powerUpTime: string;
  powerUpMonth: string;
  powerUpBlock: string;
  powerUpRemainingBlock: string;
  assetsNo: number;
  unitAssetX?: string;
  unPowerUp: boolean;
  reward?: string;
  isLoadingReward?: boolean;
  index7Value?: string; // Negated value from index 7
  isLoadingIndex7?: boolean;
}

interface UnitCard {
  unitIndex: number;
  name: string;
  powerUps: PowerUpData[];
  isLoading: boolean;
}

interface PowerUpUnitCardsProps {
  onZoneCardClick?: (_unitIndex: number) => void;
  onPowerUpClick?: (_unitIndex: number) => void; // Navigate to Power UP section
  onUnitsClick?: (_unitIndex: number) => void; // Navigate to Units section
  showZoneCards?: boolean;
  selectedZoneUnit?: number | null;
}

const PowerUpUnitCards: React.FC<PowerUpUnitCardsProps> = ({
  onZoneCardClick,
  onPowerUpClick,
  onUnitsClick,
  showZoneCards: externalShowZoneCards,
  selectedZoneUnit: externalSelectedZoneUnit
}) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const router = useRouter();
  const [claimingPowerUp, setClaimingPowerUp] = useState<{ unitIndex: number, powerUpIndex: number } | null>(null);
  const [claimMessage, setClaimMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [internalShowZoneCards, setInternalShowZoneCards] = useState(true); // Show zone cards initially
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null); // No unit selected initially
  const [isMounted, setIsMounted] = useState(false);

  // State for claim history table
  const [selfClaimHistory, setSelfClaimHistory] = useState<Array<{ amount: string; timestamp: string; formattedTime: string }>>([]);
  const [isLoadingSelfHistory, setIsLoadingSelfHistory] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(selfClaimHistory.length / itemsPerPage);

  // Reset to page 1 when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selfClaimHistory.length]);

  // Use external props if provided, otherwise use internal state
  const showZoneCards = externalShowZoneCards !== undefined ? externalShowZoneCards : internalShowZoneCards;
  // Use external selectedZoneUnit if provided, otherwise use internal selectedUnit
  const selectedZoneUnit = externalSelectedZoneUnit !== undefined ? externalSelectedZoneUnit : selectedUnit;
  const [units, setUnits] = useState<UnitCard[]>([
    { unitIndex: 0, name: 'SPARK UP', powerUps: [], isLoading: false },
    { unitIndex: 1, name: 'FLICKER ROAR', powerUps: [], isLoading: false },
    { unitIndex: 2, name: 'AI OVERRIDER', powerUps: [], isLoading: false },
    { unitIndex: 3, name: 'ZYLO APEX', powerUps: [], isLoading: false },
    { unitIndex: 4, name: 'ZYLO UNIVERSE', powerUps: [], isLoading: false },
  ]);

  // Zone cards data
  const zoneCards = [
    {
      unitIndex: 0,
      name: 'Spark Up',
      image: '/Unit/spark-up.png',
      reward: '1X Reward',
      rewardColor: '#FEE739',
      borderColor: '#FEE739',
      titleColor: '#FEE739',
      quote: 'The first spark that lights your Zylo fire.',
      requirement: '1 active unit',
      tokenRange: '1 → 10,000',
      energyPercentage: 100, // This will be dynamic based on actual data
    },
    {
      unitIndex: 1,
      name: 'Flicker Roar',
      image: '/Unit/FLICKER ROAR.png',
      reward: '2X Reward',
      rewardColor: '#00d6a3',
      borderColor: '#00d6a3',
      titleColor: '#00d6a3',
      quote: 'You didn\'t just earn — you duplicated success.',
      requirement: '2 units (1 Spark + 1 Flicker)',
      tokenRange: '10,001 → 50,000',
      energyPercentage: 100,
    },
    {
      unitIndex: 2,
      name: 'AI Overrider',
      image: '/Unit/ai-overrider.png',
      reward: '2.5X Reward',
      rewardColor: '#FEE739',
      borderColor: '#FEE739',
      titleColor: '#FEE739',
      quote: 'Action-takers only — vision applied, results proven.',
      requirement: '3 units',
      tokenRange: '50,001 → 100,000',
      energyPercentage: 100,
    },
    {
      unitIndex: 3,
      name: 'Zylo Apex',
      image: '/Unit/zylo-apex.png',
      reward: '3X Reward',
      rewardColor: '#00d6a3',
      borderColor: '#00d6a3',
      titleColor: '#00d6a3',
      quote: 'Leadership isn\'t a title — it\'s performance.',
      requirement: '4 units',
      tokenRange: '100,001+',
      energyPercentage: 100,
    },
    {
      unitIndex: 4,
      name: 'Zylo Universe',
      image: '/Unit/zylo-universe.png',
      reward: '',
      rewardColor: '#FEE739',
      borderColor: '#FEE739',
      titleColor: '#FEE739',
      quote: 'The ultimate expansion awaits.',
      requirement: 'Coming Soon',
      isComingSoon: true,
      tokenRange: '250,000+',
      energyPercentage: 0,
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoadUnitPowerUps = useCallback(async (unitIndex: number) => {
    if (!isConnected || !address || !walletClient) {
      console.log('Wallet not connected');
      return;
    }

    // Update loading state for this unit
    setUnits(prev => prev.map(unit =>
      unit.unitIndex === unitIndex
        ? { ...unit, isLoading: true, powerUps: [] }
        : unit
    ));

    try {
      const provider = new BrowserProvider(walletClient as never);

      // Step 1: Get power up length for this unit
      const lengthResult = await getPowerUpLength(provider, address, unitIndex);

      if (!lengthResult.success) {
        console.error('Error getting power up length:', lengthResult.error);
        setUnits(prev => prev.map(unit =>
          unit.unitIndex === unitIndex
            ? { ...unit, isLoading: false }
            : unit
        ));
        return;
      }

      const length = Number(lengthResult.data);
      console.log(`Unit ${unitIndex} power up length:`, length);

      if (length === 0) {
        setUnits(prev => prev.map(unit =>
          unit.unitIndex === unitIndex
            ? { ...unit, isLoading: false, powerUps: [] }
            : unit
        ));
        return;
      }

      // Step 2: Loop through and get all power up details
      const powerUpsData: PowerUpData[] = [];

      for (let i = 0; i < length; i++) {
        const detailsResult = await userPowerUpDetails(provider, address, unitIndex, i);

        if (detailsResult.success && detailsResult.data) {
          const powerUpData: PowerUpData = {
            ...detailsResult.data,
            reward: '',
            isLoadingReward: true,
            index7Value: '',
            isLoadingIndex7: true,
          };
          powerUpsData.push(powerUpData);
        } else {
          console.error(`Error getting power up details for unit ${unitIndex}, index ${i}:`, detailsResult.error);
        }
      }

      // Update state with fetched data first
      setUnits(prev => prev.map(unit =>
        unit.unitIndex === unitIndex
          ? { ...unit, isLoading: false, powerUps: powerUpsData }
          : unit
      ));

      // Step 3: Calculate rewards from userPowerUpDetails (using index 7 value, negated)
      // Call contract directly to get raw array and access index 7
      const contract = new Contract(ZyloPowerUp_ADDRESS, ZyloPowerUp_ABI, provider);

      for (let i = 0; i < powerUpsData.length; i++) {
        try {
          let rewardValue = '0.00';
          let index7NegatedValue = '0.00';

          // Call contract directly to get raw array response from userPowerUpDetails
          const rawDetails = await contract.userPowerUpDetails(address, unitIndex, i);

          // Access index 7 from the raw response
          // Structure: [powerUpToken, powerUpTime, powerUpMonth, powerUpBlock, powerUpRemainingBlock, assetsNo, unitAssetX, unPowerUp]
          let index7Value: unknown = null;

          // Ethers.js returns tuples as objects with both array access and named properties
          // Try to access index 7 (unPowerUp) from raw contract response
          if (Array.isArray(rawDetails) && rawDetails.length > 7) {
            index7Value = rawDetails[7];
          } else if (rawDetails && typeof rawDetails === 'object') {
            // Try array index access first
            if (rawDetails[7] !== undefined) {
              index7Value = rawDetails[7];
            }
            // Then try named property
            else if (rawDetails.unPowerUp !== undefined) {
              index7Value = rawDetails.unPowerUp;
            }
            // Also try accessing as tuple with index
            else if ('length' in rawDetails && rawDetails.length > 7) {
              index7Value = rawDetails[7];
            }
          }

          // Process the index 7 value and negate it
          if (index7Value !== null && index7Value !== undefined) {
            // If it's a boolean (unPowerUp), convert to number and negate
            if (typeof index7Value === 'boolean') {
              const numValue = index7Value ? 1 : 0;
              index7NegatedValue = (-numValue).toFixed(4);
            } else {
              // If it's a BigInt or number, format from wei and negate
              try {
                const bigIntValue = typeof index7Value === 'bigint' ? index7Value : BigInt(index7Value.toString());
                const formattedValue = formatEther(bigIntValue);
                index7NegatedValue = (-parseFloat(formattedValue)).toFixed(4);
              } catch {
                // If formatting fails, use as number
                const numValue = typeof index7Value === 'number' ? index7Value : Number(index7Value.toString());
                index7NegatedValue = (-numValue).toFixed(4);
              }
            }
          } else {
            // Fallback: use unitAssetX from powerUpData (index 6) if index 7 not available
            const powerUp = powerUpsData[i];
            if (powerUp.unitAssetX) {
              try {
                const value = BigInt(powerUp.unitAssetX);
                const formattedValue = formatEther(value);
                index7NegatedValue = (-parseFloat(formattedValue)).toFixed(4);
              } catch {
                index7NegatedValue = (-parseFloat(powerUp.unitAssetX || '0')).toFixed(4);
              }
            }
          }

          // Get reward from getSelfPowerUpReward for the reward field
          try {
            const rewardResult = await getSelfPowerUpReward(provider, address, unitIndex, i);
            if (rewardResult.success && rewardResult.data) {
              rewardValue = rewardResult.data || '0.00';
            }
          } catch (rewardError) {
            console.error(`Error fetching reward for unit ${unitIndex}, index ${i}:`, rewardError);
          }

          // Update the specific power up's reward and index7Value
          setUnits(prev => prev.map(unit => {
            if (unit.unitIndex === unitIndex) {
              const updatedPowerUps = [...unit.powerUps];
              if (updatedPowerUps[i]) {
                updatedPowerUps[i] = {
                  ...updatedPowerUps[i],
                  reward: rewardValue,
                  isLoadingReward: false,
                  index7Value: index7NegatedValue,
                  isLoadingIndex7: false,
                };
              }
              return { ...unit, powerUps: updatedPowerUps };
            }
            return unit;
          }));
        } catch (error) {
          console.error(`Error calculating reward for unit ${unitIndex}, index ${i}:`, error);
          // Set reward and index7Value to 0 on error
          setUnits(prev => prev.map(unit => {
            if (unit.unitIndex === unitIndex) {
              const updatedPowerUps = [...unit.powerUps];
              if (updatedPowerUps[i]) {
                updatedPowerUps[i] = {
                  ...updatedPowerUps[i],
                  reward: '0.00',
                  isLoadingReward: false,
                  index7Value: '0.00',
                  isLoadingIndex7: false,
                };
              }
              return { ...unit, powerUps: updatedPowerUps };
            }
            return unit;
          }));
        }
      }

    } catch (error) {
      console.error('Error fetching unit power ups:', error);
      setUnits(prev => prev.map(unit =>
        unit.unitIndex === unitIndex
          ? { ...unit, isLoading: false }
          : unit
      ));
    }
  }, [isConnected, address, walletClient]);

  // Load power ups when unit is selected
  useEffect(() => {
    if (selectedUnit !== null && isConnected && address && walletClient) {
      handleLoadUnitPowerUps(selectedUnit);
    }
  }, [selectedUnit, handleLoadUnitPowerUps, isConnected, address, walletClient]);

  // Handle zone card click
  const handleZoneCardClick = (unitIndex: number) => {
    if (unitIndex === 4) {
      // Zylo Universe - show coming soon
      alert('Coming Soon!');
      return;
    }

    // Navigate to powerup section with unit index
    router.push(`/staking?section=powerup&unit=${unitIndex}`);

    // If external handler is provided, use it
    if (onZoneCardClick) {
      onZoneCardClick(unitIndex);
    } else {
      // Otherwise use internal state
      setInternalShowZoneCards(false);
      setSelectedUnit(unitIndex);
    }
  };

  // Handle back to zone cards
  const handleBackToZones = () => {
    if (onZoneCardClick) {
      // If external handler exists, we can't control it from here
      // The parent component should handle this
      return;
    }
    setInternalShowZoneCards(true);
    setSelectedUnit(null);
  };

  // Unit mapping: Spark=0, Flicker Roar=1, AI Override=3, Zylo Apex=4, Zylo Universe=5
  const getUnitIndex = (unit: number): number => {
    // Map unit indices: 0→0, 1→1, 2→3, 3→4, 4→5
    if (unit === 0) return 0; // Spark
    if (unit === 1) return 1; // Flicker Roar
    if (unit === 2) return 3; // AI Override
    if (unit === 3) return 4; // Zylo Apex
    if (unit === 4) return 5; // Zylo Universe
    return unit;
  };

  const handleClaimPowerUp = async (unitIndex: number, powerUpIndex: number) => {
    if (!isConnected || !address || !walletClient) {
      setClaimMessage({ type: 'error', text: 'Please connect your wallet' });
      setTimeout(() => setClaimMessage(null), 3000);
      return;
    }

    setClaimingPowerUp({ unitIndex, powerUpIndex });
    setClaimMessage(null);

    let shouldShowErrorTimeout = false;

    try {
      const mappedUnitIndex = getUnitIndex(unitIndex);
      const result = await claimSelfPowerUnit(walletClient, address, mappedUnitIndex, powerUpIndex);

      if (result.success) {
        setClaimMessage({ type: 'success', text: 'Rewards claimed successfully!' });
        // Refresh the power up data
        setTimeout(() => {
          handleLoadUnitPowerUps(unitIndex);
        }, 1000);
      } else {
        // Check if error is due to user rejection - handle silently
        const errorMessage = result.error || '';
        const isUserRejection =
          errorMessage.toLowerCase().includes('rejected') ||
          errorMessage.toLowerCase().includes('denied') ||
          errorMessage.toLowerCase().includes('user rejected') ||
          errorMessage.toLowerCase().includes('user denied');

        if (isUserRejection) {
          // Silently handle user rejection - don't show error message
          setClaimMessage(null);
        } else {
          setClaimMessage({ type: 'error', text: errorMessage || 'Failed to claim rewards' });
          shouldShowErrorTimeout = true;
        }
      }
    } catch (error: unknown) {
      // Check if error is due to user rejection
      const errorObj = error as { message?: string; code?: string | number; info?: { error?: { code?: number } } };
      const errorMessage = errorObj?.message || '';
      const errorCode = errorObj?.code || '';
      const errorInfo = errorObj?.info || {};

      const isUserRejection =
        errorMessage.toLowerCase().includes('user rejected') ||
        errorMessage.toLowerCase().includes('user denied') ||
        errorMessage.toLowerCase().includes('rejected') ||
        errorCode === 'ACTION_REJECTED' ||
        errorCode === 4001 ||
        (errorInfo.error && errorInfo.error.code === 4001);

      if (isUserRejection) {
        // Silently handle user rejection - don't show error message
        setClaimMessage(null);
      } else {
        setClaimMessage({ type: 'error', text: errorMessage || 'Unknown error occurred' });
        shouldShowErrorTimeout = true;
      }
    } finally {
      setClaimingPowerUp(null);
      // Only set timeout for error messages, not for silent rejections
      if (shouldShowErrorTimeout) {
        setTimeout(() => setClaimMessage(null), 5000);
      }
    }
  };

  // Sync selected unit with external prop
  useEffect(() => {
    if (externalSelectedZoneUnit !== undefined) {
      if (externalSelectedZoneUnit !== null) {
        setSelectedUnit(externalSelectedZoneUnit);
      } else {
        setSelectedUnit(null);
      }
    }
  }, [externalSelectedZoneUnit]);

  // Use selectedZoneUnit (from prop or internal state) for filtering
  const effectiveSelectedUnit = externalSelectedZoneUnit !== undefined ? externalSelectedZoneUnit : selectedUnit;

  // Load units based on selected unit
  useEffect(() => {
    if (!showZoneCards && isConnected && address && walletClient) {
      if (effectiveSelectedUnit !== null) {
        // Load only selected unit's power ups
        handleLoadUnitPowerUps(effectiveSelectedUnit);
      } else {
        // Load all units' power ups when no unit is selected
        [0, 1, 2, 3].forEach((unitIndex) => { // Skip Zylo Universe (4)
          handleLoadUnitPowerUps(unitIndex);
        });
      }
    }
  }, [showZoneCards, effectiveSelectedUnit, isConnected, address, walletClient, handleLoadUnitPowerUps]);

  const currentUnit = effectiveSelectedUnit !== null ? units.find(u => u.unitIndex === effectiveSelectedUnit) : null;

  // Show zone cards view
  if (showZoneCards) {
    return (
      <div className="container mt-5">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Power Up  Boosters Units
          </h2>
        </div>

        <div className="power-up-cards-carousel" style={{ overflow: 'visible', padding: '0 50px' }}>
          <Slider
            dots={true}
            infinite={false}
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }
            ]}
            arrows={true}
            className="power-up-slider"
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {zoneCards.map((zone) => (
              <SlideWrapper key={zone.unitIndex} style={{ padding: '0 12px' }}>
                <div
                  onClick={() => !zone.isComingSoon && handleZoneCardClick(zone.unitIndex)}
                  style={{
                    background: 'linear-gradient(145deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
                    borderRadius: '24px',
                    padding: '1.5rem',
                    border: `2px solid ${zone.borderColor}`,
                    transition: 'all 0.3s ease',
                    cursor: zone.isComingSoon ? 'not-allowed' : 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    height: 'auto',
                    minHeight: '380px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    opacity: zone.isComingSoon ? 0.7 : 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                  onMouseEnter={(e) => {
                    if (!zone.isComingSoon) {
                      e.currentTarget.style.borderColor = zone.borderColor;
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = `0 15px 40px ${zone.borderColor}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = zone.borderColor;
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  {/* Unit Number Badge - Top Left */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: zone.borderColor,
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      border: `2px solid ${zone.borderColor}`,
                      zIndex: 10,
                      boxShadow: `0 4px 12px ${zone.borderColor}40`,
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Unit {zone.unitIndex + 1}
                  </div>

                  {/* Reward Badge or Lock Icon - Top Right */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: zone.isComingSoon ? 'rgba(254, 231, 57, 0.2)' : 'rgba(0, 0, 0, 0.8)',
                      color: zone.rewardColor,
                      padding: zone.isComingSoon ? '10px' : '8px 16px',
                      borderRadius: zone.isComingSoon ? '50%' : '12px',
                      fontSize: zone.isComingSoon ? '1.2rem' : '0.85rem',
                      fontWeight: '700',
                      border: `2px solid ${zone.rewardColor}`,
                      zIndex: 10,
                      boxShadow: `0 4px 12px ${zone.rewardColor}40`,
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: zone.isComingSoon ? '40px' : 'auto',
                      minHeight: zone.isComingSoon ? '40px' : 'auto',
                    }}
                  >
                    {zone.isComingSoon ? (
                      <FaLock style={{ fontSize: '1.2rem' }} />
                    ) : (
                      zone.reward
                    )}
                  </div>

                  {/* Profile Icon Section - Centered */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2rem',
                      marginBottom: '0',
                    }}
                  >
                    {/* Profile Image - Circular */}
                    <div
                      style={{
                        width: '200px',
                        height: '200px',
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: `4px solid ${zone.borderColor}`,
                        background: 'transparent',
                        boxShadow: `0 0 30px ${zone.borderColor}60`,
                        marginBottom: '0.5rem',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!zone.isComingSoon) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = `0 0 40px ${zone.borderColor}80`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 0 30px ${zone.borderColor}60`;
                      }}
                    >
                      <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                      }}>
                        <Image
                          src={zone.image}
                          alt={zone.name}
                          fill
                          sizes="180px"
                          style={{
                            objectFit: 'contain',
                            padding: '5px',
                            borderRadius: '50%',
                            transform: 'scale(1.1)',
                          }}
                          priority={zone.unitIndex < 2}
                        />
                      </div>
                    </div>

                    {/* Name Below Image */}
                    <h3
                      style={{
                        color: zone.titleColor,
                        fontSize: '1.6rem',
                        fontWeight: '700',
                        textAlign: 'center',
                        marginTop: '0',
                        marginBottom: '0.5rem',
                        textShadow: `0 2px 8px ${zone.titleColor}40, 0 0 20px ${zone.titleColor}20`,
                        letterSpacing: '1px',
                      }}
                    >
                      {zone.name}
                    </h3>

                    {/* Token Range */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(10px)',
                      color: zone.titleColor,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      border: `1px solid ${zone.borderColor}40`,
                      textAlign: 'center',
                    }}>
                      {zone.tokenRange}
                    </div>

                    {/* Energy Percentage */}
                    <div style={{
                      width: '100%',
                      maxWidth: '280px',
                      marginBottom: '0.75rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '4px',
                      }}>
                        <span style={{
                          fontSize: '0.7rem',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}>
                          Energy
                        </span>
                        <span style={{
                          fontSize: '0.85rem',
                          color: zone.titleColor,
                          fontWeight: '700',
                        }}>
                          {zone.energyPercentage}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: `1px solid ${zone.borderColor}30`,
                      }}>
                        <div style={{
                          width: `${zone.energyPercentage}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${zone.borderColor} 0%, ${zone.rewardColor} 100%)`,
                          borderRadius: '10px',
                          transition: 'width 0.3s ease',
                          boxShadow: `0 0 10px ${zone.borderColor}60`,
                        }} />
                      </div>
                    </div>

                    {/* Buttons Container - Slim Badge Style */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      width: '100%',
                      maxWidth: '320px',
                      justifyContent: 'center',
                    }}>
                      {/* Power UP Button - Slim Badge */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!zone.isComingSoon) {
                            if (onPowerUpClick) {
                              onPowerUpClick(zone.unitIndex);
                            } else {
                              handleZoneCardClick(zone.unitIndex);
                            }
                          }
                        }}
                        disabled={zone.isComingSoon}
                        style={{
                          background: zone.isComingSoon
                            ? 'rgba(128, 128, 128, 0.2)'
                            : 'rgba(0, 0, 0, 0.6)',
                          border: `2px solid ${zone.borderColor}`,
                          color: zone.titleColor,
                          padding: '6px 14px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.8px',
                          cursor: zone.isComingSoon ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 12px ${zone.borderColor}40`,
                          backdropFilter: 'blur(10px)',
                          opacity: zone.isComingSoon ? 0.5 : 1,
                          flex: 1,
                        }}
                        onMouseEnter={(e) => {
                          if (!zone.isComingSoon) {
                            e.currentTarget.style.background = `rgba(0, 0, 0, 0.8)`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 6px 16px ${zone.borderColor}60`;
                            e.currentTarget.style.borderColor = zone.borderColor;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!zone.isComingSoon) {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = `0 4px 12px ${zone.borderColor}40`;
                          }
                        }}
                      >
                        Power UP
                      </button>

                      {/* Units Button - Slim Badge */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!zone.isComingSoon && onUnitsClick) {
                            onUnitsClick(zone.unitIndex);
                          }
                        }}
                        disabled={zone.isComingSoon}
                        style={{
                          background: zone.isComingSoon
                            ? 'rgba(128, 128, 128, 0.2)'
                            : 'rgba(0, 0, 0, 0.6)',
                          border: `2px solid ${zone.rewardColor}`,
                          color: zone.rewardColor,
                          padding: '6px 14px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.8px',
                          cursor: zone.isComingSoon ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 12px ${zone.rewardColor}40`,
                          backdropFilter: 'blur(10px)',
                          opacity: zone.isComingSoon ? 0.5 : 1,
                          flex: 1,
                        }}
                        onMouseEnter={(e) => {
                          if (!zone.isComingSoon) {
                            e.currentTarget.style.background = `rgba(0, 0, 0, 0.8)`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 6px 16px ${zone.rewardColor}60`;
                            e.currentTarget.style.borderColor = zone.rewardColor;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!zone.isComingSoon) {
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = `0 4px 12px ${zone.rewardColor}40`;
                          }
                        }}
                      >
                        Units
                      </button>
                    </div>
                  </div>
                </div>
              </SlideWrapper>
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  // Show power up details view
  return (
    <div className="container mt-5">
      {/* Back Button - Only show if not controlled externally */}
      {!onZoneCardClick && (
        <button
          onClick={handleBackToZones}
          style={{
            background: 'rgba(0, 214, 163, 0.1)',
            border: '2px solid rgba(0, 214, 163, 0.3)',
            color: '#00d6a3',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 214, 163, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 214, 163, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.3)';
          }}
        >
          ← Back to Power Up
        </button>
      )}

      {/* Claim Message Alert */}
      {claimMessage && (
        <div className={`alert alert-${claimMessage.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert" style={{ marginBottom: '1rem' }}>
          {claimMessage.text}
          <button type="button" className="btn-close" onClick={() => setClaimMessage(null)} aria-label="Close"></button>
        </div>
      )}

      {/* Power Up Details Cards */}
      <div className="power-up-details-section">
        {!currentUnit && effectiveSelectedUnit === null ? (
          // Show all units' power-ups when no specific unit is selected
          <div className="power-up-cards-carousel" style={{ overflow: 'visible' }}>
            {isMounted ? (
              <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1600,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                  }
                ]}
                arrows={units.reduce((total, unit) => total + unit.powerUps.length, 0) > 4}
                className="power-up-slider"
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
              >
                {units.map((unit) =>
                  unit.powerUps.map((powerUp, index) => (
                    <SlideWrapper key={`${unit.unitIndex}-${index}`} style={{ padding: '0 15px 20px' }}>
                      <div style={{ position: 'relative' }}>
                        <div
                          className="power-up-detail-card"
                          style={{
                            background: 'linear-gradient(145deg, #0a0a1a 0%, #0f0f23 50%, #1a1a2e 100%)',
                            borderRadius: '24px',
                            padding: '0',
                            border: '2px solid rgba(0, 214, 163, 0.3)',
                            transition: 'all 0.3s ease',
                            minHeight: '650px',
                            height: 'auto',
                            width: '100%',
                            maxWidth: '320px',
                            position: 'relative',
                            overflow: 'visible',
                            margin: '0 auto',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.6)';
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 214, 163, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.3)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                          }}
                        >
                          {/* Top Section - SVG Area (Like Zone Cards) */}
                          <div style={{
                            height: '260px',
                            background: 'linear-gradient(135deg, #0a1a0f 0%, #1a2d1f 100%)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '22px 22px 0 0',
                            overflow: 'hidden',
                            borderBottom: '2px solid rgba(0, 214, 163, 0.2)'
                          }}>
                            {/* SVG Display - Centered and Large */}
                            <div
                              className="asset-svg-container"
                              style={{
                                width: '190px',
                                height: '190px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                borderRadius: '50%',
                                border: '4px solid rgba(0, 214, 163, 0.5)',
                                boxShadow: '0 0 40px rgba(0, 214, 163, 0.4), inset 0 0 30px rgba(0, 214, 163, 0.2)',
                                position: 'relative',
                                animation: 'pulse-glow 2s ease-in-out infinite',
                                zIndex: 1,
                              }}
                            >
                              {/* Animated ripple rings */}
                              <div
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '50%',
                                  border: '2px solid rgba(0, 214, 163, 0.3)',
                                  animation: 'ripple 2s ease-out infinite',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '50%',
                                  border: '2px solid rgba(0, 214, 163, 0.2)',
                                  animation: 'ripple 2s ease-out infinite 0.5s',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: '50%',
                                  border: '2px solid rgba(0, 214, 163, 0.1)',
                                  animation: 'ripple 2s ease-out infinite 1s',
                                }}
                              />
                              <div style={{ position: 'relative', zIndex: 2, transform: 'scale(1.05)' }}>
                                <AssetRenderer
                                  unitCategory={getUnitCategory(unit.unitIndex)}
                                  assetNumber={Number(powerUp.assetsNo)}
                                  className="asset-svg"
                                />
                              </div>
                            </div>

                            {/* Active Badge - Top Right (Simple Style) */}
                            {!powerUp.unPowerUp && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '16px',
                                  right: '16px',
                                  background: 'rgba(0, 0, 0, 0.7)',
                                  backdropFilter: 'blur(10px)',
                                  color: '#ffffff',
                                  padding: '6px 14px',
                                  borderRadius: '12px',
                                  fontSize: '0.75rem',
                                  fontWeight: '700',
                                  textTransform: 'uppercase',
                                  letterSpacing: '1px',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                  zIndex: 2
                                }}
                              >
                                Active
                              </div>
                            )}
                          </div>
                          {/* Bottom Section - Data Area (Like Zone Cards) */}
                          <div style={{
                            background: 'linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 100%)',
                            padding: '1.5rem 1.75rem 1.75rem',
                            paddingBottom: '1.75rem',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            borderRadius: '0 0 22px 22px',
                            minHeight: 'auto'
                          }}>
                            {/* Asset Name - Title */}
                            <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                              <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: '#00d6a3',
                                margin: '0',
                                paddingTop: '6px',
                                paddingBottom: '10px',
                                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 214, 163, 0.4)',
                                letterSpacing: '0.5px',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                              }}>
                                {getAssetName(getUnitCategory(unit.unitIndex), Number(powerUp.assetsNo))}
                              </h3>
                            </div>

                            {/* Power Up Amount and Time - Simple Text in 2 Lines */}
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              marginBottom: '10px',
                              alignItems: 'center',
                            }}>
                              {/* Power Up Amount - Line 1 */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: 'center',
                              }}>
                                <FaBolt style={{ color: '#00d6a3', fontSize: '16px' }} />
                                <div style={{
                                  fontSize: '14px',
                                  fontWeight: '400',
                                  color: '#FEE739',
                                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                                  textAlign: 'center',
                                }}>
                                  <span style={{ fontWeight: '700' }}>{parseFloat(powerUp.powerUpToken || '0').toFixed(2)}</span> <span style={{ fontSize: '13px', fontWeight: '400' }}>ZYLO</span>
                                </div>
                              </div>

                              {/* Time - Line 2 */}
                              {powerUp.powerUpTime && (
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  justifyContent: 'center',
                                }}>
                                  <FaClock style={{ color: '#00d6a3', fontSize: '16px' }} />
                                  <div
                                    style={{
                                      fontSize: '14px',
                                      fontWeight: '400',
                                      color: '#FEE739',
                                      fontStyle: 'normal',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {(() => {
                                      try {
                                        const timestamp = Number(powerUp.powerUpTime);
                                        if (timestamp > 0) {
                                          const date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
                                          if (!isNaN(date.getTime())) {
                                            return date.toLocaleString('en-US', {
                                              month: 'short',
                                              day: 'numeric',
                                              hour: '2-digit',
                                              minute: '2-digit',
                                              hour12: true
                                            });
                                          }
                                        }
                                        return 'N/A';
                                      } catch {
                                        return 'N/A';
                                      }
                                    })()}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Reward Box - Button Style */}
                            <div style={{
                              background: 'rgba(254, 231, 57, 0.15)',
                              padding: '18px',
                              paddingBottom: '20px',
                              borderRadius: '12px',
                              border: '2px solid rgba(254, 231, 57, 0.4)',
                              backdropFilter: 'blur(5px)',
                              boxShadow: '0 4px 12px rgba(254, 231, 57, 0.2)',
                              marginTop: '12px',
                              marginBottom: '8px',
                              overflow: 'visible',
                            }}>
                              <div style={{
                                fontSize: '12px',
                                color: 'rgba(254, 231, 57, 0.9)',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                textAlign: 'center',
                                marginBottom: '8px',
                              }}>
                                Total Self Power Up
                              </div>
                              <div style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: '#FEE739',
                                textAlign: 'center',
                                textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                                marginBottom: '10px',
                              }}>
                                {address && walletClient ? (
                                  <SelfPowerUpRewardDisplay
                                    address={address}
                                    unitIndex={unit.unitIndex}
                                    cardIndex={index}
                                    walletClient={walletClient}
                                  />
                                ) : (
                                  <span style={{ fontSize: '12px', opacity: 0.7 }}>Connect Wallet</span>
                                )}
                              </div>
                              <div style={{
                                fontSize: '12px',
                                color: 'rgba(254, 231, 57, 0.9)',
                                fontWeight: '600',
                                letterSpacing: '0.5px',
                                textAlign: 'center',
                                marginBottom: '8px',
                              }}>
                                Current Self Power Up
                              </div>
                              <div style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                color: '#FEE739',
                                textAlign: 'center',
                                textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                                marginBottom: '12px',
                              }}>
                                {address && walletClient ? (
                                  <CurrentSelfPowerUpRewardDisplay
                                    address={address}
                                    unitIndex={unit.unitIndex}
                                    cardIndex={index}
                                    walletClient={walletClient}
                                  />
                                ) : (
                                  <span style={{ fontSize: '12px', opacity: 0.7 }}>Connect Wallet</span>
                                )}
                              </div>
                              <button
                                type="button"
                                className="btn w-100"
                                onClick={() => handleClaimPowerUp(unit.unitIndex, index)}
                                disabled={(claimingPowerUp?.unitIndex === unit.unitIndex && claimingPowerUp?.powerUpIndex === index) || !isConnected}
                                style={{
                                  background: (claimingPowerUp?.unitIndex === unit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 'rgba(254, 231, 57, 0.3)' : 'linear-gradient(135deg, #FEE739 0%, #FDD835 100%)',
                                  color: '#000',
                                  border: 'none',
                                  borderRadius: '10px',
                                  padding: '0.85rem 1rem',
                                  fontWeight: '700',
                                  fontSize: '1rem',
                                  cursor: (claimingPowerUp?.unitIndex === unit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 'not-allowed' : 'pointer',
                                  transition: 'all 0.3s ease',
                                  opacity: (claimingPowerUp?.unitIndex === unit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 0.6 : 1,
                                  marginTop: '4px',
                                  boxShadow: '0 4px 15px rgba(254, 231, 57, 0.3)',
                                  minHeight: '48px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onMouseEnter={(e) => {
                                  if (!(claimingPowerUp?.unitIndex === unit.unitIndex && claimingPowerUp?.powerUpIndex === index)) {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(254, 231, 57, 0.5)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(254, 231, 57, 0.3)';
                                }}
                              >
                                {(claimingPowerUp?.unitIndex === unit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 'Claiming...' : 'Claim'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SlideWrapper>
                  ))
                )}
              </Slider>
            ) : (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        ) : !currentUnit ? null : currentUnit.isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-white-50 mt-3">Loading Power Ups...</p>
          </div>
        ) : currentUnit.powerUps.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-white-50 mb-0" style={{ fontSize: '1.1rem' }}>
              No Power Ups found
            </p>
          </div>
        ) : (
          <div className="power-up-cards-carousel" style={{ overflow: 'visible' }}>
            {isMounted ? (
              <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1600,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                  }
                ]}
                arrows={currentUnit.powerUps.length > 4}
                className="power-up-slider"
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
              >
                {currentUnit.powerUps.map((powerUp, index) => (
                  <SlideWrapper key={index} style={{ padding: '0 15px 20px' }}>
                    <div style={{ position: 'relative' }}>
                      <div
                        className="power-up-detail-card"
                        style={{
                          background: 'linear-gradient(145deg, #0a0a1a 0%, #0f0f23 50%, #1a1a2e 100%)',
                          borderRadius: '24px',
                          padding: '0',
                          border: '2px solid rgba(0, 214, 163, 0.3)',
                          transition: 'all 0.3s ease',
                          minHeight: '650px',
                          height: 'auto',
                          width: '100%',
                          maxWidth: '320px',
                          position: 'relative',
                          overflow: 'visible',
                          margin: '0 auto',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                          marginBottom: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.6)';
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 214, 163, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.3)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        {/* Top Section - SVG Area (Like Zone Cards) */}
                        <div style={{
                          height: '260px',
                          background: 'linear-gradient(135deg, #0a1a0f 0%, #1a2d1f 100%)',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '22px 22px 0 0',
                          overflow: 'hidden',
                          borderBottom: '2px solid rgba(0, 214, 163, 0.2)'
                        }}>
                          {/* SVG Display - Centered and Large */}
                          <div
                            className="asset-svg-container"
                            style={{
                              width: '190px',
                              height: '190px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'transparent',
                              borderRadius: '50%',
                              border: '4px solid rgba(0, 214, 163, 0.5)',
                              boxShadow: '0 0 40px rgba(0, 214, 163, 0.4), inset 0 0 30px rgba(0, 214, 163, 0.2)',
                              position: 'relative',
                              animation: 'pulse-glow 2s ease-in-out infinite',
                              zIndex: 1,
                            }}
                          >
                            {/* Animated ripple rings */}
                            <div
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: '2px solid rgba(0, 214, 163, 0.3)',
                                animation: 'ripple 2s ease-out infinite',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: '2px solid rgba(0, 214, 163, 0.2)',
                                animation: 'ripple 2s ease-out infinite 0.5s',
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: '2px solid rgba(0, 214, 163, 0.1)',
                                animation: 'ripple 2s ease-out infinite 1s',
                              }}
                            />
                            <div style={{ position: 'relative', zIndex: 2, transform: 'scale(1.05)' }}>
                              <AssetRenderer
                                unitCategory={getUnitCategory(currentUnit.unitIndex)}
                                assetNumber={Number(powerUp.assetsNo)}
                                className="asset-svg"
                              />
                            </div>
                          </div>

                          {/* Active Badge - Top Right (Simple Style) */}
                          {!powerUp.unPowerUp && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'rgba(0, 0, 0, 0.7)',
                                backdropFilter: 'blur(10px)',
                                color: '#ffffff',
                                padding: '6px 14px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                zIndex: 2
                              }}
                            >
                              Active
                            </div>
                          )}
                        </div>

                        {/* Bottom Section - Data Area (Like Zone Cards) */}
                        <div style={{
                          background: 'linear-gradient(145deg, #0f0f1a 0%, #1a1a2e 100%)',
                          padding: '1.5rem 1.75rem 1.75rem',
                          paddingBottom: '1.75rem',
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          borderRadius: '0 0 22px 22px',
                          minHeight: 'auto'
                        }}>
                          {/* Asset Name - Title */}
                          <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                            <h3 style={{
                              fontSize: '1.5rem',
                              fontWeight: '800',
                              color: '#00d6a3',
                              margin: '0',
                              paddingTop: '6px',
                              paddingBottom: '10px',
                              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 12px rgba(0, 214, 163, 0.4)',
                              letterSpacing: '0.5px',
                              textAlign: 'center',
                              textTransform: 'uppercase',
                            }}>
                              {getAssetName(getUnitCategory(currentUnit.unitIndex), Number(powerUp.assetsNo))}
                            </h3>
                          </div>

                          {/* Power Up Amount and Time - Simple Text in 2 Lines */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            marginBottom: '10px',
                            alignItems: 'center',
                          }}>
                            {/* Power Up Amount - Line 1 */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              justifyContent: 'center',
                            }}>
                              <FaBolt style={{ color: '#00d6a3', fontSize: '16px' }} />
                              <div style={{
                                fontSize: '14px',
                                fontWeight: '400',
                                color: '#FEE739',
                                textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                                textAlign: 'center',
                              }}>
                                <span style={{ fontWeight: '700' }}>{parseFloat(powerUp.powerUpToken || '0').toFixed(2)}</span> <span style={{ fontSize: '13px', fontWeight: '400' }}>ZYLO</span>
                              </div>
                            </div>

                            {/* Time - Line 2 */}
                            {powerUp.powerUpTime && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                justifyContent: 'center',
                              }}>
                                <FaClock style={{ color: '#00d6a3', fontSize: '16px' }} />
                                <div
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    color: '#FEE739',
                                    fontStyle: 'normal',
                                    textAlign: 'center',
                                  }}
                                >
                                  {(() => {
                                    try {
                                      const timestamp = Number(powerUp.powerUpTime);
                                      if (timestamp > 0) {
                                        const date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
                                        if (!isNaN(date.getTime())) {
                                          return date.toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                          });
                                        }
                                      }
                                      return 'N/A';
                                    } catch {
                                      return 'N/A';
                                    }
                                  })()}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Reward Box - Button Style */}
                          <div style={{
                            background: 'rgba(254, 231, 57, 0.15)',
                            padding: '18px',
                            borderRadius: '12px',
                            border: '2px solid rgba(254, 231, 57, 0.4)',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 4px 12px rgba(254, 231, 57, 0.2)',
                            marginTop: '12px',
                            overflow: 'hidden',
                          }}>
                            <div style={{
                              fontSize: '12px',
                              color: 'rgba(254, 231, 57, 0.9)',
                              fontWeight: '600',
                              letterSpacing: '0.5px',
                              textAlign: 'center',
                              marginBottom: '8px',
                            }}>
                              Total Self Power Up
                            </div>
                            <div style={{
                              fontSize: '20px',
                              fontWeight: '700',
                              color: '#FEE739',
                              textAlign: 'center',
                              textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                              marginBottom: '10px',
                            }}>
                              {address && walletClient ? (
                                <SelfPowerUpRewardDisplay
                                  address={address}
                                  unitIndex={currentUnit.unitIndex}
                                  cardIndex={index}
                                  walletClient={walletClient}
                                />
                              ) : (
                                <span style={{ fontSize: '12px', opacity: 0.7 }}>Connect Wallet</span>
                              )}
                            </div>
                            <div style={{
                              fontSize: '12px',
                              color: 'rgba(254, 231, 57, 0.9)',
                              fontWeight: '600',
                              letterSpacing: '0.5px',
                              textAlign: 'center',
                              marginBottom: '8px',
                            }}>
                              Current Self Power Up
                            </div>
                            <div style={{
                              fontSize: '20px',
                              fontWeight: '700',
                              color: '#FEE739',
                              textAlign: 'center',
                              textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                              marginBottom: '12px',
                            }}>
                              {address && walletClient ? (
                                <CurrentSelfPowerUpRewardDisplay
                                  address={address}
                                  unitIndex={currentUnit.unitIndex}
                                  cardIndex={index}
                                  walletClient={walletClient}
                                />
                              ) : (
                                <span style={{ fontSize: '12px', opacity: 0.7 }}>Connect Wallet</span>
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn w-100"
                              onClick={() => handleClaimPowerUp(currentUnit.unitIndex, index)}
                              disabled={(claimingPowerUp?.unitIndex === currentUnit.unitIndex && claimingPowerUp?.powerUpIndex === index) || !isConnected}
                              style={{
                                background: (claimingPowerUp?.unitIndex === currentUnit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 'rgba(254, 231, 57, 0.3)' : 'linear-gradient(135deg, #FEE739 0%, #FDD835 100%)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '0.85rem 1rem',
                                fontWeight: '700',
                                fontSize: '1rem',
                                cursor: (claimingPowerUp?.unitIndex === currentUnit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: (claimingPowerUp?.unitIndex === currentUnit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 0.6 : 1,
                                marginTop: '4px',
                                boxShadow: '0 4px 15px rgba(254, 231, 57, 0.3)',
                                minHeight: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onMouseEnter={(e) => {
                                if (!(claimingPowerUp?.unitIndex === currentUnit.unitIndex && claimingPowerUp?.powerUpIndex === index)) {
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(254, 231, 57, 0.5)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(254, 231, 57, 0.3)';
                              }}
                            >
                              {(claimingPowerUp?.unitIndex === currentUnit.unitIndex && claimingPowerUp?.powerUpIndex === index) ? 'Claiming...' : 'Claim Power Up'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SlideWrapper>
                ))}
              </Slider>
            ) : (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Self Claim History Table - Show directly when a unit is selected */}
        {!showZoneCards && selectedZoneUnit !== null && (
          <div style={{ marginTop: '3rem' }}>
            {/* Load self claim history automatically */}
            {(() => {
              // Auto-load self claim history when unit is selected
              React.useEffect(() => {
                const loadSelfClaimHistory = async () => {
                  if (!isConnected || !address || !walletClient || selectedZoneUnit === null) {
                    return;
                  }

                  setIsLoadingSelfHistory(true);
                  try {
                    const provider = new BrowserProvider(walletClient as never);

                    // Get length
                    const lengthResult = await getUserClaimSelfDetailsLength(provider, address, selectedZoneUnit);
                    if (!lengthResult.success || !lengthResult.length) {
                      setSelfClaimHistory([]);
                      setIsLoadingSelfHistory(false);
                      return;
                    }

                    const length = lengthResult.length;
                    const records: Array<{ amount: string; timestamp: string; formattedTime: string }> = [];

                    // Loop through length
                    for (let i = 0; i < length; i++) {
                      try {
                        const detailsResult = await getUserClaimSelfDetails(provider, address, selectedZoneUnit, i);
                        if (detailsResult.success && detailsResult.amount && detailsResult.timestamp) {
                          const timestamp = parseInt(detailsResult.timestamp);
                          const date = new Date(timestamp * 1000);
                          const formattedTime = date.toLocaleString('en-US', {
                            timeZone: 'UTC',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false
                          }) + ' UTC';

                          records.push({
                            amount: detailsResult.amount,
                            timestamp: detailsResult.timestamp,
                            formattedTime: formattedTime
                          });
                        }
                      } catch (err) {
                        console.error(`Error fetching self claim details at index ${i}:`, err);
                      }
                    }

                    // Reverse to show latest first
                    records.reverse();
                    setSelfClaimHistory(records);
                  } catch (error) {
                    console.error('Error loading self claim history:', error);
                    setSelfClaimHistory([]);
                  } finally {
                    setIsLoadingSelfHistory(false);
                  }
                };

                loadSelfClaimHistory();
              }, [selectedZoneUnit, isConnected, address, walletClient]);

              return null;
            })()}

            {/* Self Claim History Table - Always shown */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{
                background: 'linear-gradient(145deg, #0a0a1a 0%, #0f0f23 50%, #1a1a2e 100%)',
                borderRadius: '20px',
                padding: '2rem',
                border: '2px solid rgba(254, 231, 57, 0.3)',
                boxShadow: '0 8px 32px rgba(254, 231, 57, 0.2)',
              }}>
                <h3 style={{ color: '#FEE739', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '700' }}>
                  Claim History
                </h3>

                {isLoadingSelfHistory ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-white-50 mt-2">Loading history...</p>
                  </div>
                ) : selfClaimHistory.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-white-50">No claim history found for this unit.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-dark table-striped" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                      <thead style={{ background: 'rgba(254, 231, 57, 0.1)' }}>
                        <tr>
                          <th style={{ color: '#FEE739', border: 'none', padding: '1rem', fontWeight: '600', width: '80px' }}>#</th>
                          <th style={{ color: '#FEE739', border: 'none', padding: '1rem', fontWeight: '600' }}>Amount</th>
                          <th style={{ color: '#FEE739', border: 'none', padding: '1rem', fontWeight: '600' }}>Date & Time (UTC)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selfClaimHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((record, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid rgba(254, 231, 57, 0.1)' }}>
                            <td style={{ color: '#FEE739', padding: '1rem', border: 'none', fontWeight: '600' }}>
                              {index + 1}
                            </td>
                            <td style={{ color: '#fff', padding: '1rem', border: 'none' }}>
                              {parseFloat(record.amount).toFixed(4)} ZILLOW
                            </td>
                            <td style={{ color: '#fff', padding: '1rem', border: 'none' }}>
                              {record.formattedTime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {selfClaimHistory.length > itemsPerPage && (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          style={{
                            background: currentPage === 1 ? 'rgba(254, 231, 57, 0.2)' : 'rgba(254, 231, 57, 0.1)',
                            border: '2px solid #FEE739',
                            color: currentPage === 1 ? 'rgba(254, 231, 57, 0.5)' : '#FEE739',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (currentPage !== 1) {
                              e.currentTarget.style.background = 'rgba(254, 231, 57, 0.2)';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== 1) {
                              e.currentTarget.style.background = 'rgba(254, 231, 57, 0.1)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          Previous
                        </button>

                        <span style={{
                          color: '#FEE739',
                          fontWeight: '600',
                          fontSize: '1rem',
                          padding: '0.5rem 1rem',
                          background: 'rgba(254, 231, 57, 0.1)',
                          borderRadius: '8px',
                          border: '2px solid rgba(254, 231, 57, 0.3)',
                        }}>
                          Page {currentPage} of {totalPages}
                        </span>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          style={{
                            background: currentPage === totalPages ? 'rgba(254, 231, 57, 0.2)' : 'rgba(254, 231, 57, 0.1)',
                            border: '2px solid #FEE739',
                            color: currentPage === totalPages ? 'rgba(254, 231, 57, 0.5)' : '#FEE739',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (currentPage !== totalPages) {
                              e.currentTarget.style.background = 'rgba(254, 231, 57, 0.2)';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== totalPages) {
                              e.currentTarget.style.background = 'rgba(254, 231, 57, 0.1)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default PowerUpUnitCards;




