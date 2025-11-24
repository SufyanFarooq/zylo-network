'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getPowerUpLength, userPowerUpDetails, getSelfPowerUpReward } from '@/blockchain/instances/ZyloPowerUp';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FaLock } from 'react-icons/fa';
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

interface PowerUpData {
  powerUpToken: string;
  powerUpTime: string;
  powerUpMonth: string;
  powerUpBlock: string;
  powerUpRemainingBlock: string;
  assetsNo: number;
  unPowerUp: boolean;
  reward?: string;
  isLoadingReward?: boolean;
}

interface UnitCard {
  unitIndex: number;
  name: string;
  powerUps: PowerUpData[];
  isLoading: boolean;
}

interface PowerUpUnitCardsProps {
  onZoneCardClick?: (_unitIndex: number) => void;
  showZoneCards?: boolean;
  selectedZoneUnit?: number | null;
}

const PowerUpUnitCards: React.FC<PowerUpUnitCardsProps> = ({
  onZoneCardClick,
  showZoneCards: externalShowZoneCards,
  selectedZoneUnit: externalSelectedZoneUnit
}) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [internalShowZoneCards, setInternalShowZoneCards] = useState(true); // Show zone cards initially
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null); // No unit selected initially
  const [isMounted, setIsMounted] = useState(false);

  // Use external props if provided, otherwise use internal state
  const showZoneCards = externalShowZoneCards !== undefined ? externalShowZoneCards : internalShowZoneCards;
  // Note: selectedZoneUnit is used via externalSelectedZoneUnit prop directly
  // const selectedZoneUnit = externalSelectedZoneUnit !== undefined ? externalSelectedZoneUnit : null;
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
      const provider = new BrowserProvider(walletClient);

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

      // Step 3: Fetch rewards for all power ups
      for (let i = 0; i < powerUpsData.length; i++) {
        try {
          const rewardResult = await getSelfPowerUpReward(provider, address, unitIndex, i);

          if (rewardResult.success && rewardResult.data) {
            // Update the specific power up's reward
            setUnits(prev => prev.map(unit => {
              if (unit.unitIndex === unitIndex) {
                const updatedPowerUps = [...unit.powerUps];
                if (updatedPowerUps[i]) {
                  updatedPowerUps[i] = {
                    ...updatedPowerUps[i],
                    reward: rewardResult.data || '0.00',
                    isLoadingReward: false,
                  };
                }
                return { ...unit, powerUps: updatedPowerUps };
              }
              return unit;
            }));
          } else {
            // Set reward to 0 on error
            setUnits(prev => prev.map(unit => {
              if (unit.unitIndex === unitIndex) {
                const updatedPowerUps = [...unit.powerUps];
                if (updatedPowerUps[i]) {
                  updatedPowerUps[i] = {
                    ...updatedPowerUps[i],
                    reward: '0.00',
                    isLoadingReward: false,
                  };
                }
                return { ...unit, powerUps: updatedPowerUps };
              }
              return unit;
            }));
          }
        } catch (error) {
          console.error(`Error fetching reward for unit ${unitIndex}, index ${i}:`, error);
          // Set reward to 0 on error
          setUnits(prev => prev.map(unit => {
            if (unit.unitIndex === unitIndex) {
              const updatedPowerUps = [...unit.powerUps];
              if (updatedPowerUps[i]) {
                updatedPowerUps[i] = {
                  ...updatedPowerUps[i],
                  reward: '0.00',
                  isLoadingReward: false,
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


  const currentUnit = selectedUnit !== null ? units.find(u => u.unitIndex === selectedUnit) : null;

  // Show zone cards view
  if (showZoneCards) {
    return (
      <div className="container mt-5">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Power Up Vortex Zones
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
            prevArrow={
              <div className="slick-arrow-custom slick-prev-custom">
                <span className="slick-arrow-icon">←</span>
              </div>
            }
            nextArrow={
              <div className="slick-arrow-custom slick-next-custom">
                <span className="slick-arrow-icon">→</span>
              </div>
            }
          >
            {zoneCards.map((zone) => (
              <div key={zone.unitIndex} style={{ padding: '0 12px' }}>
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
                  {/* Reward Badge or Lock Icon - Top Left */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: zone.isComingSoon ? 'rgba(254, 231, 57, 0.2)' : 'rgba(0, 0, 0, 0.8)',
                      color: zone.rewardColor,
                      padding: zone.isComingSoon ? '10px' : '8px 16px',
                      borderRadius: '12px',
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
                        marginBottom: '0.75rem',
                        textShadow: `0 2px 8px ${zone.titleColor}40, 0 0 20px ${zone.titleColor}20`,
                        letterSpacing: '1px',
                      }}
                    >
                      {zone.name}
                    </h3>

                    {/* Power UP Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!zone.isComingSoon) {
                          handleZoneCardClick(zone.unitIndex);
                        }
                      }}
                      disabled={zone.isComingSoon}
                      style={{
                        background: zone.isComingSoon 
                          ? 'rgba(128, 128, 128, 0.2)' 
                          : `linear-gradient(135deg, ${zone.borderColor}20 0%, ${zone.borderColor}10 100%)`,
                        border: `2px solid ${zone.borderColor}`,
                        color: zone.titleColor,
                        padding: '0.6rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: zone.isComingSoon ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: `0 4px 12px ${zone.borderColor}30`,
                        opacity: zone.isComingSoon ? 0.5 : 1,
                        width: '100%',
                        maxWidth: '160px',
                      }}
                      onMouseEnter={(e) => {
                        if (!zone.isComingSoon) {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${zone.borderColor}40 0%, ${zone.borderColor}20 100%)`;
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = `0 6px 16px ${zone.borderColor}50`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!zone.isComingSoon) {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${zone.borderColor}20 0%, ${zone.borderColor}10 100%)`;
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = `0 4px 12px ${zone.borderColor}30`;
                        }
                      }}
                    >
                      Power UP
                    </button>
                  </div>
                </div>
              </div>
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
          ← Back to Zones
        </button>
      )}


      {/* Power Up Details Cards */}
      <div className="power-up-details-section">
        {!currentUnit ? (
          <div className="text-center py-5">
            <p className="text-white-50 mb-0" style={{ fontSize: '1.1rem' }}>
              Please select a unit
            </p>
          </div>
        ) : currentUnit.isLoading ? (
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
                slidesToShow={5}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 4,
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
                arrows={currentUnit.powerUps.length > 4}
                className="power-up-slider"
                prevArrow={
                  <div className="slick-arrow-custom slick-prev-custom">
                    <span className="slick-arrow-icon">←</span>
                  </div>
                }
                nextArrow={
                  <div className="slick-arrow-custom slick-next-custom">
                    <span className="slick-arrow-icon">→</span>
                  </div>
                }
              >
                {currentUnit.powerUps.map((powerUp, index) => (
                  <div key={index} style={{ padding: '0 12px' }}>
                    <div style={{ position: 'relative' }}>
                      <div
                        className="power-up-detail-card"
                        style={{
                          background: 'linear-gradient(145deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
                          borderRadius: '24px',
                          padding: '1.5rem 1rem',
                          border: '2px solid rgba(0, 214, 163, 0.3)',
                          transition: 'all 0.3s ease',
                          minHeight: '320px',
                          position: 'relative',
                          overflow: 'visible',
                          margin: '0 auto',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                          marginBottom: '1rem',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.6)';
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 214, 163, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 214, 163, 0.3)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                        }}
                      >
                        {/* Status Badge - Top Right */}
                        <div
                          className="status-badge-tag"
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: powerUp.unPowerUp ? '#dc3545' : '#0080ff',
                            color: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            boxShadow: powerUp.unPowerUp
                              ? '0 2px 8px rgba(220, 53, 69, 0.4)'
                              : '0 2px 8px rgba(0, 128, 255, 0.4)',
                            zIndex: 10,
                          }}
                        >
                          {powerUp.unPowerUp ? 'Unpowered' : 'Active'}
                        </div>

                        {/* Asset Display - Large and Prominent */}
                        <div className="text-center mb-3" style={{ marginTop: '0.25rem' }}>
                          <div className="asset-svg-container" style={{
                            width: '100px',
                            height: '100px',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, rgba(0, 214, 163, 0.15) 0%, rgba(0, 214, 163, 0.05) 100%)',
                            borderRadius: '50%',
                            border: '3px solid rgba(0, 214, 163, 0.4)',
                            boxShadow: '0 0 30px rgba(0, 214, 163, 0.2), inset 0 0 20px rgba(0, 214, 163, 0.1)',
                          }}>
                            <AssetRenderer
                              unitCategory={getUnitCategory(currentUnit.unitIndex)}
                              assetNumber={Number(powerUp.assetsNo)}
                              className="asset-svg"
                            />
                          </div>
                          <div
                            className="text-white mt-2"
                            style={{
                              fontSize: '1.1rem',
                              fontWeight: '700',
                              letterSpacing: '0.5px',
                              textShadow: '0 2px 10px rgba(0, 214, 163, 0.3)',
                            }}
                          >
                            {getAssetName(getUnitCategory(currentUnit.unitIndex), Number(powerUp.assetsNo))}
                          </div>
                        </div>

                        {/* Token Quantity - Prominent Display */}
                        <div className="power-up-details" style={{ marginTop: '1.25rem' }}>
                          <div
                            className="text-center"
                            style={{
                              background: 'rgba(0, 214, 163, 0.08)',
                              borderRadius: '12px',
                              padding: '0.75rem',
                              border: '1px solid rgba(0, 214, 163, 0.2)',
                            }}
                          >
                            <div className="text-white-50 mb-1" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                              Power Up Amount
                            </div>
                            <div
                              className="fw-bold"
                              style={{
                                color: '#FEE739',
                                fontSize: '1.1rem',
                                textShadow: '0 2px 8px rgba(254, 231, 57, 0.3)',
                              }}
                            >
                              {parseFloat(powerUp.powerUpToken || '0').toFixed(2)} ZYLO
                            </div>
                            {/* Time Display */}
                            {powerUp.powerUpTime && (
                              <div
                                className="text-white-50 mt-2"
                                style={{
                                  fontSize: '0.75rem',
                                  fontStyle: 'italic',
                                }}
                              >
                                {(() => {
                                  try {
                                    const timestamp = Number(powerUp.powerUpTime);
                                    if (timestamp > 0) {
                                      // Convert timestamp to date (check if it's in seconds or milliseconds)
                                      const date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
                                      if (!isNaN(date.getTime())) {
                                        return date.toLocaleString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        });
                                      }
                                    }
                                    return 'N/A';
                                  } catch {
                                    return 'N/A';
                                  }
                                })()}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Reward Display - Always shown below token amount */}
                        <div
                          style={{
                            marginTop: '0.75rem',
                            background: 'linear-gradient(145deg, rgba(254, 231, 57, 0.15) 0%, rgba(254, 231, 57, 0.05) 100%)',
                            borderRadius: '16px',
                            padding: '1rem',
                            border: '2px solid rgba(254, 231, 57, 0.4)',
                            boxShadow: '0 8px 30px rgba(254, 231, 57, 0.2)',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {/* Decorative glow effect */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '-50%',
                              left: '-50%',
                              width: '200%',
                              height: '200%',
                              background: 'radial-gradient(circle, rgba(254, 231, 57, 0.1) 0%, transparent 70%)',
                              animation: 'pulse 2s ease-in-out infinite',
                            }}
                          />

                          <div style={{ position: 'relative', zIndex: 1 }}>
                            <div
                              className="text-center mb-2"
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: '#FEE739',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                textShadow: '0 2px 10px rgba(254, 231, 57, 0.3)',
                              }}
                            >
                              Self Power Up Reward
                            </div>

                            {powerUp.isLoadingReward ? (
                              <div className="text-center">
                                <div className="spinner-border text-warning" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-white-50 mt-2 mb-0" style={{ fontSize: '0.75rem' }}>Loading...</p>
                              </div>
                            ) : (
                              <div
                                className="text-center"
                                style={{
                                  background: 'rgba(0, 0, 0, 0.3)',
                                  borderRadius: '10px',
                                  padding: '0.75rem',
                                  border: '1px solid rgba(254, 231, 57, 0.3)',
                                }}
                              >
                                <div
                                  className="fw-bold"
                                  style={{
                                    color: '#FEE739',
                                    fontSize: '1.2rem',
                                    textShadow: '0 2px 15px rgba(254, 231, 57, 0.5)',
                                    lineHeight: '1.2',
                                  }}
                                >
                                  {parseFloat(powerUp.reward || '0').toFixed(4)} <span style={{ fontSize: '0.9rem' }}>ZYLO</span>
                                </div>
                                <div
                                  className="text-white-50 mt-1"
                                  style={{
                                    fontSize: '0.7rem',
                                    fontStyle: 'italic',
                                  }}
                                >
                                  Available reward
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      </div>
    </div>
  );
};

export default PowerUpUnitCards;

