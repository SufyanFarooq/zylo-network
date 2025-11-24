/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { BrowserProvider, formatUnits } from 'ethers';
import { getUserDetails } from '@/blockchain/instances/ZyloPowerUp';

interface AnimatedCharactersProps {
  compactMode?: boolean; // If true, show only character without controls/badges
}

const AnimatedCharacters: React.FC<AnimatedCharactersProps> = ({ compactMode = false }) => {
  // Blockchain integration
  const { address, isConnected } = useAccount();
  const [blockchainCategory, setBlockchainCategory] = useState<number>(0);
  const [blockchainPercentage, setBlockchainPercentage] = useState<number>(0);
  const [_blockchainCharacterNo, setBlockchainCharacterNo] = useState<number>(0);
  const [selectedCharacterName, setSelectedCharacterName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Map categories: 1=Spark Up, 2=Flicker Roar, 3=AI Override, 4=Zylo Apex
  const categoryNames = useMemo(() => ({
    1: 'sparklings',
    2: 'beastlings',
    3: 'techlings',
    4: 'cosmlings'
  }), []);

  // All characters by category for random selection
  const charactersByCategory = useMemo(() => ({
    sparklings: ['ember', 'spark', 'flicker', 'glow', 'flame', 'bubble', 'prism', 'pebble', 'crystal', 'leaf', 'cloud', 'bolt', 'raindrop', 'ice', 'sunbeam'],
    beastlings: ['tiger', 'wolf', 'eagle', 'panther', 'dragon', 'goat', 'fox', 'owl', 'rat', 'dog', 'cat', 'bear', 'rhino', 'snake', 'lion', 'monkey'],
    techlings: ['robot', 'drone', 'aiCore', 'nanoBot', 'holoChip', 'cyberLion', 'cyberTiger', 'mechaDragon', 'neuralOrb', 'laser', 'hologram', 'techFox', 'aiWolf', 'circuitBot', 'cyberPanther'],
    cosmlings: ['star', 'planet', 'blackHole', 'nebula', 'comet', 'supernova', 'void', 'galaxy', 'alien', 'phoenix', 'cosmicDragon', 'meteor', 'aurora', 'quantumStar', 'celestialOrb']
  }), []);
  
  // Original character fill states - Start at 100, will unfill according to blockchain percentage
  const [emberFill, setEmberFill] = useState(100);
  const [sparkFill, setSparkFill] = useState(100);
  const [flickerFill, setFlickerFill] = useState(100);
  const [glowFill, setGlowFill] = useState(100);
  const [flameFill, setFlameFill] = useState(100);
  const [bubbleFill, setBubbleFill] = useState(100);
  const [prismFill, setPrismFill] = useState(100);
  const [pebbleFill, setPebbleFill] = useState(100);
  const [crystalFill, setCrystalFill] = useState(100);
  const [leafFill, setLeafFill] = useState(100);
  const [cloudFill, setCloudFill] = useState(100);
  const [boltFill, setBoltFill] = useState(100);
  const [raindropFill, setRaindropFill] = useState(100);
  const [iceFill, setIceFill] = useState(100);
  const [sunbeamFill, setSunbeamFill] = useState(100);
  const [tigerFill, setTigerFill] = useState(100);
  const [wolfFill, setWolfFill] = useState(100);
  const [eagleFill, setEagleFill] = useState(100);
  const [pantherFill, setPantherFill] = useState(100);
  const [dragonFill, setDragonFill] = useState(100);
  const [goatFill, setGoatFill] = useState(100);
  const [foxFill, setFoxFill] = useState(100);
  const [owlFill, setOwlFill] = useState(100);
  const [ratFill, setRatFill] = useState(100);
  const [dogFill, setDogFill] = useState(100);
  const [catFill, setCatFill] = useState(100);
  const [bearFill, setBearFill] = useState(100);
  const [rhinoFill, setRhinoFill] = useState(100);
  const [snakeFill, setSnakeFill] = useState(100);
  const [lionFill, setLionFill] = useState(100);
  const [_monkeyFill, setMonkeyFill] = useState(100);
  const [robotFill, setRobotFill] = useState(100);
  const [droneFill, setDroneFill] = useState(100);
  const [aiCoreFill, setAiCoreFill] = useState(100);
  const [nanoBotFill, setNanoBotFill] = useState(100);
  const [holoChipFill, setHoloChipFill] = useState(100);
  const [cyberLionFill, setCyberLionFill] = useState(100);
  const [cyberTigerFill, setCyberTigerFill] = useState(100);
  const [mechaDragonFill, setMechaDragonFill] = useState(100);
  const [neuralOrbFill, setNeuralOrbFill] = useState(100);
  const [laserFill, setLaserFill] = useState(100);
  const [hologramFill, setHologramFill] = useState(100);
  const [techFoxFill, setTechFoxFill] = useState(100);
  const [aiWolfFill, setAiWolfFill] = useState(100);
  const [circuitBotFill, setCircuitBotFill] = useState(100);
  const [cyberPantherFill, setCyberPantherFill] = useState(100);
  const [starFill, setStarFill] = useState(100);
  const [planetFill, setPlanetFill] = useState(100);
  const [blackHoleFill, setBlackHoleFill] = useState(100);
  const [nebulaFill, setNebulaFill] = useState(100);
  const [cometFill, setCometFill] = useState(100);
  const [supernovaFill, setSupernovaFill] = useState(100);
  const [voidFill, setVoidFill] = useState(100);
  const [galaxyFill, setGalaxyFill] = useState(100);
  const [alienFill, setAlienFill] = useState(100);
  const [phoenixFill, setPhoenixFill] = useState(100);
  const [cosmicDragonFill, setCosmicDragonFill] = useState(100);
  const [meteorFill, setMeteorFill] = useState(100);
  const [auroraFill, setAuroraFill] = useState(100);
  const [quantumStarFill, setQuantumStarFill] = useState(100);
  const [celestialOrbFill, setCelestialOrbFill] = useState(100);
  
  // Interactive states
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [clickedCharacter, setClickedCharacter] = useState<string | null>(null);
  const [theme, setTheme] = useState<'day' | 'night'>('day');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('cosmlings');
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [lastCharacterIndex, setLastCharacterIndex] = useState<number | null>(null);

  // Reset all character fills to 100%
  const resetAllFills = () => {
    setEmberFill(100);
    setSparkFill(100);
    setFlickerFill(100);
    setGlowFill(100);
    setFlameFill(100);
    setBubbleFill(100);
    setPrismFill(100);
    setPebbleFill(100);
    setCrystalFill(100);
    setLeafFill(100);
    setCloudFill(100);
    setBoltFill(100);
    setRaindropFill(100);
    setIceFill(100);
    setSunbeamFill(100);
    setTigerFill(100);
    setWolfFill(100);
    setEagleFill(100);
    setPantherFill(100);
    setDragonFill(100);
    setGoatFill(100);
    setFoxFill(100);
    setOwlFill(100);
    setRatFill(100);
    setDogFill(100);
    setCatFill(100);
    setBearFill(100);
    setRhinoFill(100);
    setSnakeFill(100);
    setLionFill(100);
    setMonkeyFill(100);
    setRobotFill(100);
    setDroneFill(100);
    setAiCoreFill(100);
    setNanoBotFill(100);
    setHoloChipFill(100);
    setCyberLionFill(100);
    setCyberTigerFill(100);
    setMechaDragonFill(100);
    setNeuralOrbFill(100);
    setLaserFill(100);
    setHologramFill(100);
    setTechFoxFill(100);
    setAiWolfFill(100);
    setCircuitBotFill(100);
    setCyberPantherFill(100);
    setStarFill(100);
    setPlanetFill(100);
    setBlackHoleFill(100);
    setNebulaFill(100);
    setCometFill(100);
    setSupernovaFill(100);
    setVoidFill(100);
    setGalaxyFill(100);
    setAlienFill(100);
    setPhoenixFill(100);
    setCosmicDragonFill(100);
    setMeteorFill(100);
    setAuroraFill(100);
    setQuantumStarFill(100);
    setCelestialOrbFill(100);
  };

  // Animation loop - Characters start at 100% and unfill down to on-chain percentage, then reset
  useEffect(() => {
    const lowerBound = Math.max(0, Math.min(100, blockchainPercentage || 0));
    console.log('Animation lowerBound:', lowerBound, 'current visual % state');
    const tick = (prev: number, dec: number) => {
      if (lowerBound >= 100) {
        return 100; // stay full if on-chain says 100%
      }
      const next = prev - dec;
      return next <= lowerBound ? 100 : next;
    };
    const interval = setInterval(() => {
      setEmberFill(prev => tick(prev, 0.5));
      setSparkFill(prev => tick(prev, 0.7));
      setFlickerFill(prev => tick(prev, 0.4));
      setGlowFill(prev => tick(prev, 0.3));
      setFlameFill(prev => tick(prev, 0.6));
      setBubbleFill(prev => tick(prev, 0.2));
      setPrismFill(prev => tick(prev, 0.4));
      setPebbleFill(prev => tick(prev, 0.25));
      setCrystalFill(prev => tick(prev, 0.5));
      setLeafFill(prev => tick(prev, 0.35));
      setCloudFill(prev => tick(prev, 0.15));
      setBoltFill(prev => tick(prev, 0.8));
      setRaindropFill(prev => tick(prev, 0.3));
      setIceFill(prev => tick(prev, 0.25));
      setSunbeamFill(prev => tick(prev, 0.4));
      setTigerFill(prev => tick(prev, 0.35));
      setWolfFill(prev => tick(prev, 0.3));
      setEagleFill(prev => tick(prev, 0.45));
      setPantherFill(prev => tick(prev, 0.4));
      setDragonFill(prev => tick(prev, 0.5));
      setGoatFill(prev => tick(prev, 0.25));
      setFoxFill(prev => tick(prev, 0.4));
      setOwlFill(prev => tick(prev, 0.3));
      setRatFill(prev => tick(prev, 0.6));
      setDogFill(prev => tick(prev, 0.3));
      setCatFill(prev => tick(prev, 0.35));
      setBearFill(prev => tick(prev, 0.25));
      setRhinoFill(prev => tick(prev, 0.2));
      setSnakeFill(prev => tick(prev, 0.4));
      setLionFill(prev => tick(prev, 0.3));
      setMonkeyFill(prev => tick(prev, 0.6));
      setRobotFill(prev => tick(prev, 0.6));
      setDroneFill(prev => tick(prev, 0.8));
      setAiCoreFill(prev => tick(prev, 0.7));
      setNanoBotFill(prev => tick(prev, 0.9));
      setHoloChipFill(prev => tick(prev, 0.75));
      setCyberLionFill(prev => tick(prev, 0.55));
      setCyberTigerFill(prev => tick(prev, 0.65));
      setMechaDragonFill(prev => tick(prev, 0.45));
      setNeuralOrbFill(prev => tick(prev, 0.85));
      setLaserFill(prev => tick(prev, 0.95));
      setHologramFill(prev => tick(prev, 0.8));
      setTechFoxFill(prev => tick(prev, 0.6));
      setAiWolfFill(prev => tick(prev, 0.5));
      setCircuitBotFill(prev => tick(prev, 0.7));
      setCyberPantherFill(prev => tick(prev, 0.55));
      setStarFill(prev => tick(prev, 0.7));
      setPlanetFill(prev => tick(prev, 0.5));
      setBlackHoleFill(prev => tick(prev, 0.4));
      setNebulaFill(prev => tick(prev, 0.6));
      setCometFill(prev => tick(prev, 0.9));
      setSupernovaFill(prev => tick(prev, 0.8));
      setVoidFill(prev => tick(prev, 0.35));
      setGalaxyFill(prev => tick(prev, 0.45));
      setAlienFill(prev => tick(prev, 0.65));
      setPhoenixFill(prev => tick(prev, 0.75));
      setCosmicDragonFill(prev => tick(prev, 0.55));
      setMeteorFill(prev => tick(prev, 0.95));
      setAuroraFill(prev => tick(prev, 0.5));
      setQuantumStarFill(prev => tick(prev, 0.7));
      setCelestialOrbFill(prev => tick(prev, 0.6));
    }, 100);
    return () => clearInterval(interval);
  }, [blockchainPercentage]);

  // Fetch user data from blockchain
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new BrowserProvider(window.ethereum as any);
          const result = await getUserDetails(provider, address);
          
          if (result.success && result.data) {
            const userDetails = result.data;
            
            // Extract category, categoryPercentage, categoryCharacterNo (indices 8, 9, 10)
            const categoryRaw = userDetails[8];
            const percentageRaw = userDetails[9];
            const characterNoRaw = userDetails[10];
            
            console.log('Raw Category:', categoryRaw.toString());
            console.log('Raw Percentage:', percentageRaw.toString());
            
            // Convert from wei if needed
            // Convert using precise 18-decimal units to avoid precision loss
            let userCategory = (() => {
              try { return Math.floor(parseFloat(formatUnits(categoryRaw, 18))); } catch { return Number(categoryRaw); }
            })();
            let userPercentage = (() => {
              try { return parseFloat(formatUnits(percentageRaw, 18)); } catch { return Number(percentageRaw); }
            })();
            let characterNo = (() => {
              try { return Math.floor(parseFloat(formatUnits(characterNoRaw ?? 0, 18))); } catch { return Number(characterNoRaw ?? 0); }
            })();
            
            // Clamp values into expected ranges
            if (!Number.isFinite(userCategory)) userCategory = 0;
            if (!Number.isFinite(userPercentage)) userPercentage = 0;
            if (!Number.isFinite(characterNo)) characterNo = 0;
            
            // Ensure percentage is between 0-100
            userPercentage = Math.min(100, Math.max(0, userPercentage));
            
            console.log('Converted Category:', userCategory);
            console.log('Converted Percentage (0-100):', userPercentage);
            
            // FALLBACK: If category invalid, assign based on staked amount
            if (userCategory === 0 || userCategory > 4) {
              const stakedAmount = Number(userDetails[6]) / 1e18;
              console.log('Invalid category. Staked amount:', stakedAmount);
              
              if (stakedAmount > 0) {
                if (stakedAmount < 100) {
                  userCategory = 1; // Spark Up
                } else if (stakedAmount < 500) {
                  userCategory = 2; // Flicker Roar
                } else if (stakedAmount < 1000) {
                  userCategory = 3; // AI Override
                } else {
                  userCategory = 4; // Zylo Apex
                }
                console.log('Assigned category:', userCategory);
              }
            }
            
            // Set category, percentage and character no
            setBlockchainCategory(userCategory);
            // Use a visual floor below 100 to ensure visible unfill loop even when on-chain is 100
            const visualPercentage = Math.max(0, Math.min(99.5, userPercentage));
            console.log('Setting blockchainPercentage (visualized):', visualPercentage);
            setBlockchainPercentage(visualPercentage);
            setBlockchainCharacterNo(characterNo);
            
            // If valid category, select character by on-chain index and set active category
            if (userCategory > 0 && userCategory <= 4) {
              const categoryName = categoryNames[userCategory as keyof typeof categoryNames];
              const characters = charactersByCategory[categoryName as keyof typeof charactersByCategory];
              const safeIndex = characters.length > 0 ? (characterNo % characters.length + characters.length) % characters.length : 0;
              const chosenChar = characters[safeIndex] || characters[0];
              
              console.log('Category:', categoryName);
              console.log('CharacterNo (raw -> used index):', characterNo, '->', safeIndex);
              console.log('Selected character:', chosenChar);
              
              if (lastCharacterIndex === null || lastCharacterIndex !== safeIndex || !selectedCharacterName) {
                setSelectedCharacterName(chosenChar);
                setLastCharacterIndex(safeIndex);
              }
              setActiveCategory(categoryName);
            }
          } else {
            console.log('User not registered');
            setBlockchainCategory(0);
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setBlockchainCategory(0);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected, categoryNames, charactersByCategory, refreshKey]);

  // Listen for staking completion to refresh character immediately without page reload
  useEffect(() => {
    const onStakingCompleted = () => {
      setRefreshKey(prev => prev + 1);
      resetAllFills();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('stakingCompleted', onStakingCompleted as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('stakingCompleted', onStakingCompleted as EventListener);
      }
    };
  }, []);

  // Whenever the on-chain percentage changes, restart the unfill from 100%
  useEffect(() => {
    resetAllFills();
  }, [blockchainPercentage]);

  // Note: Blockchain percentage tracking kept for display, but doesn't control character animation anymore
  // Characters now use continuous loop animation like in the original design

  // Sound effects
  const playSound = (soundType: string) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const sounds: { [key: string]: () => void } = {
        apple: () => {
          const duration = 0.3;
          const now = audioContext.currentTime;
          const crunch = audioContext.createOscillator();
          const crunchGain = audioContext.createGain();
          crunch.type = 'sawtooth';
          crunch.frequency.setValueAtTime(150, now);
          crunch.frequency.exponentialRampToValueAtTime(80, now + duration);
          crunchGain.gain.setValueAtTime(0.3, now);
          crunchGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          crunch.connect(crunchGain);
          crunchGain.connect(audioContext.destination);
          crunch.start(now);
          crunch.stop(now + duration);
          console.log('🍎 Crunch!');
        },
        rabbit: () => {
          const duration = 0.4;
          const now = audioContext.currentTime;
          const squeak = audioContext.createOscillator();
          const squeakGain = audioContext.createGain();
          squeak.type = 'sine';
          squeak.frequency.setValueAtTime(1200, now);
          squeak.frequency.exponentialRampToValueAtTime(800, now + duration);
          squeakGain.gain.setValueAtTime(0.2, now);
          squeakGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          squeak.connect(squeakGain);
          squeakGain.connect(audioContext.destination);
          squeak.start(now);
          squeak.stop(now + duration);
          console.log('🐰 Squeak!');
        },
        hen: () => {
          const duration = 0.5;
          const now = audioContext.currentTime;
          const cluck = audioContext.createOscillator();
          const cluckGain = audioContext.createGain();
          cluck.type = 'sawtooth';
          cluck.frequency.setValueAtTime(200, now);
          cluck.frequency.exponentialRampToValueAtTime(100, now + duration);
          cluckGain.gain.setValueAtTime(0.4, now);
          cluckGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          cluck.connect(cluckGain);
          cluckGain.connect(audioContext.destination);
          cluck.start(now);
          cluck.stop(now + duration);
          console.log('🐔 Cluck!');
        },
        lion: () => {
          const duration = 0.8;
          const now = audioContext.currentTime;
          const roar = audioContext.createOscillator();
          const roarGain = audioContext.createGain();
          roar.type = 'sawtooth';
          roar.frequency.setValueAtTime(80, now);
          roar.frequency.exponentialRampToValueAtTime(40, now + duration);
          roarGain.gain.setValueAtTime(0.5, now);
          roarGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          roar.connect(roarGain);
          roarGain.connect(audioContext.destination);
          roar.start(now);
          roar.stop(now + duration);
          console.log('🦁 Roar!');
        },
        monkey: () => {
          const duration = 0.4;
          const now = audioContext.currentTime;
          const chitter = audioContext.createOscillator();
          const chitterGain = audioContext.createGain();
          chitter.type = 'sawtooth';
          chitter.frequency.setValueAtTime(600, now);
          chitter.frequency.exponentialRampToValueAtTime(300, now + duration);
          chitterGain.gain.setValueAtTime(0.3, now);
          chitterGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          chitter.connect(chitterGain);
          chitterGain.connect(audioContext.destination);
          chitter.start(now);
          chitter.stop(now + duration);
          console.log('🐒 Chitter!');
        },
        ember: () => {
          const duration = 0.6;
          const now = audioContext.currentTime;
          const flame = audioContext.createOscillator();
          const flameGain = audioContext.createGain();
          flame.type = 'triangle';
          flame.frequency.setValueAtTime(400, now);
          flame.frequency.exponentialRampToValueAtTime(200, now + duration);
          flameGain.gain.setValueAtTime(0.4, now);
          flameGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          flame.connect(flameGain);
          flameGain.connect(audioContext.destination);
          flame.start(now);
          flame.stop(now + duration);
          console.log('🔥 Whoosh!');
        },
        spark: () => {
          const duration = 0.2;
          const now = audioContext.currentTime;
          const zap = audioContext.createOscillator();
          const zapGain = audioContext.createGain();
          zap.type = 'square';
          zap.frequency.setValueAtTime(1500, now);
          zap.frequency.exponentialRampToValueAtTime(800, now + duration);
          zapGain.gain.setValueAtTime(0.3, now);
          zapGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          zap.connect(zapGain);
          zapGain.connect(audioContext.destination);
          zap.start(now);
          zap.stop(now + duration);
          console.log('⚡ Zap!');
        },
        flicker: () => {
          const duration = 0.3;
          const now = audioContext.currentTime;
          const buzz = audioContext.createOscillator();
          const buzzGain = audioContext.createGain();
          buzz.type = 'sawtooth';
          buzz.frequency.setValueAtTime(500, now);
          buzz.frequency.exponentialRampToValueAtTime(250, now + duration);
          buzzGain.gain.setValueAtTime(0.25, now);
          buzzGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          buzz.connect(buzzGain);
          buzzGain.connect(audioContext.destination);
          buzz.start(now);
          buzz.stop(now + duration);
          console.log('✨ Flicker!');
        },
        glow: () => {
          const duration = 0.5;
          const now = audioContext.currentTime;
          const shimmer = audioContext.createOscillator();
          const shimmerGain = audioContext.createGain();
          shimmer.type = 'sine';
          shimmer.frequency.setValueAtTime(800, now);
          shimmer.frequency.exponentialRampToValueAtTime(400, now + duration);
          shimmerGain.gain.setValueAtTime(0.2, now);
          shimmerGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          shimmer.connect(shimmerGain);
          shimmerGain.connect(audioContext.destination);
          shimmer.start(now);
          shimmer.stop(now + duration);
          console.log('💫 Glow!');
        },
        flame: () => {
          const duration = 0.7;
          const now = audioContext.currentTime;
          const burn = audioContext.createOscillator();
          const burnGain = audioContext.createGain();
          burn.type = 'triangle';
          burn.frequency.setValueAtTime(350, now);
          burn.frequency.exponentialRampToValueAtTime(150, now + duration);
          burnGain.gain.setValueAtTime(0.35, now);
          burnGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          burn.connect(burnGain);
          burnGain.connect(audioContext.destination);
          burn.start(now);
          burn.stop(now + duration);
          console.log('🔥 Flame!');
        },
        bubble: () => {
          const duration = 0.4;
          const now = audioContext.currentTime;
          const pop = audioContext.createOscillator();
          const popGain = audioContext.createGain();
          pop.type = 'sine';
          pop.frequency.setValueAtTime(900, now);
          pop.frequency.exponentialRampToValueAtTime(400, now + duration);
          popGain.gain.setValueAtTime(0.3, now);
          popGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          pop.connect(popGain);
          popGain.connect(audioContext.destination);
          pop.start(now);
          pop.stop(now + duration);
          console.log('🫧 Pop!');
        },
        prism: () => {
          const duration = 0.5;
          const now = audioContext.currentTime;
          const refract = audioContext.createOscillator();
          const refractGain = audioContext.createGain();
          refract.type = 'sine';
          refract.frequency.setValueAtTime(1000, now);
          refract.frequency.exponentialRampToValueAtTime(2000, now + duration/2);
          refract.frequency.exponentialRampToValueAtTime(500, now + duration);
          refractGain.gain.setValueAtTime(0.25, now);
          refractGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          refract.connect(refractGain);
          refractGain.connect(audioContext.destination);
          refract.start(now);
          refract.stop(now + duration);
          console.log('🌈 Refract!');
        },
        pebble: () => {
          const duration = 0.3;
          const now = audioContext.currentTime;
          const clunk = audioContext.createOscillator();
          const clunkGain = audioContext.createGain();
          clunk.type = 'triangle';
          clunk.frequency.setValueAtTime(200, now);
          clunk.frequency.exponentialRampToValueAtTime(100, now + duration);
          clunkGain.gain.setValueAtTime(0.35, now);
          clunkGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          clunk.connect(clunkGain);
          clunkGain.connect(audioContext.destination);
          clunk.start(now);
          clunk.stop(now + duration);
          console.log('🪨 Clunk!');
        },
        crystal: () => {
          const duration = 0.6;
          const now = audioContext.currentTime;
          const chime = audioContext.createOscillator();
          const chimeGain = audioContext.createGain();
          chime.type = 'sine';
          chime.frequency.setValueAtTime(1500, now);
          chime.frequency.exponentialRampToValueAtTime(800, now + duration);
          chimeGain.gain.setValueAtTime(0.3, now);
          chimeGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          chime.connect(chimeGain);
          chimeGain.connect(audioContext.destination);
          chime.start(now);
          chime.stop(now + duration);
          console.log('💎 Chime!');
        },
        leaf: () => {
          const duration = 0.4;
          const now = audioContext.currentTime;
          const rustle = audioContext.createOscillator();
          const rustleGain = audioContext.createGain();
          rustle.type = 'sawtooth';
          rustle.frequency.setValueAtTime(400, now);
          rustle.frequency.exponentialRampToValueAtTime(200, now + duration);
          rustleGain.gain.setValueAtTime(0.2, now);
          rustleGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          rustle.connect(rustleGain);
          rustleGain.connect(audioContext.destination);
          rustle.start(now);
          rustle.stop(now + duration);
          console.log('🍃 Rustle!');
        },
        cloud: () => {
          const duration = 0.5;
          const now = audioContext.currentTime;
          const whoosh = audioContext.createOscillator();
          const whooshGain = audioContext.createGain();
          whoosh.type = 'sine';
          whoosh.frequency.setValueAtTime(300, now);
          whoosh.frequency.exponentialRampToValueAtTime(150, now + duration);
          whooshGain.gain.setValueAtTime(0.25, now);
          whooshGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          whoosh.connect(whooshGain);
          whooshGain.connect(audioContext.destination);
          whoosh.start(now);
          whoosh.stop(now + duration);
          console.log('☁️ Whoosh!');
        },
        bolt: () => {
          const duration = 0.15;
          const now = audioContext.currentTime;
          const strike = audioContext.createOscillator();
          const strikeGain = audioContext.createGain();
          strike.type = 'square';
          strike.frequency.setValueAtTime(2000, now);
          strike.frequency.exponentialRampToValueAtTime(100, now + duration);
          strikeGain.gain.setValueAtTime(0.4, now);
          strikeGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          strike.connect(strikeGain);
          strikeGain.connect(audioContext.destination);
          strike.start(now);
          strike.stop(now + duration);
          console.log('⚡ Strike!');
        },
        raindrop: () => {
          const duration = 0.3;
          const now = audioContext.currentTime;
          const drip = audioContext.createOscillator();
          const dripGain = audioContext.createGain();
          drip.type = 'sine';
          drip.frequency.setValueAtTime(1200, now);
          drip.frequency.exponentialRampToValueAtTime(400, now + duration);
          dripGain.gain.setValueAtTime(0.25, now);
          dripGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          drip.connect(dripGain);
          dripGain.connect(audioContext.destination);
          drip.start(now);
          drip.stop(now + duration);
          console.log('💧 Drip!');
        },
        ice: () => {
          const duration = 0.5;
          const now = audioContext.currentTime;
          const freeze = audioContext.createOscillator();
          const freezeGain = audioContext.createGain();
          freeze.type = 'sine';
          freeze.frequency.setValueAtTime(1800, now);
          freeze.frequency.exponentialRampToValueAtTime(600, now + duration);
          freezeGain.gain.setValueAtTime(0.2, now);
          freezeGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          freeze.connect(freezeGain);
          freezeGain.connect(audioContext.destination);
          freeze.start(now);
          freeze.stop(now + duration);
          console.log('❄️ Freeze!');
        },
        sunbeam: () => {
          const duration = 0.6;
          const now = audioContext.currentTime;
          const shine = audioContext.createOscillator();
          const shineGain = audioContext.createGain();
          shine.type = 'sine';
          shine.frequency.setValueAtTime(600, now);
          shine.frequency.exponentialRampToValueAtTime(1200, now + duration/2);
          shine.frequency.exponentialRampToValueAtTime(400, now + duration);
          shineGain.gain.setValueAtTime(0.3, now);
          shineGain.gain.exponentialRampToValueAtTime(0.01, now + duration);
          shine.connect(shineGain);
          shineGain.connect(audioContext.destination);
          shine.start(now);
          shine.stop(now + duration);
          console.log('☀️ Shine!');
        },
        tiger: () => console.log('🐅 Roar!'),
        wolf: () => console.log('🐺 Howl!'),
        eagle: () => console.log('🦅 Screech!'),
        panther: () => console.log('🐆 Growl!'),
        dragon: () => console.log('🐉 Roar!'),
        goat: () => console.log('🐐 Bleat!'),
        fox: () => console.log('🦊 Yip!'),
        owl: () => console.log('🦉 Hoot!'),
        rat: () => console.log('🐀 Squeak!'),
        dog: () => console.log('🐕 Bark!'),
        cat: () => console.log('🐈 Meow!'),
        bear: () => console.log('🐻 Grr!'),
        rhino: () => console.log('🦏 Snort!'),
        snake: () => console.log('🐍 Hiss!'),
        robot: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          console.log('🤖 Beep boop!');
        },
        drone: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.05);
          oscillator.frequency.setValueAtTime(450, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.15);
          console.log('🚁 Whirrrr!');
        },
        aiCore: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
          oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          console.log('🧠 Processing...');
        },
        nanoBot: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
          oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.15);
          console.log('🔬 Bzzt!');
        },
        holoChip: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 0.08);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          console.log('💾 Shimmer!');
        },
        cyberLion: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(180, audioContext.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.35);
          console.log('🦁⚡ Cyber Roar!');
        },
        cyberTiger: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 0.12);
          oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.25);
          gainNode.gain.setValueAtTime(0.28, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          console.log('🐯⚡ Tech Growl!');
        },
        mechaDragon: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.35, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          console.log('🐉🤖 ROAR!!!');
        },
        neuralOrb: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1400, audioContext.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.25);
          gainNode.gain.setValueAtTime(0.22, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
          console.log('🔮 Mind link!');
        },
        laser: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.12);
          console.log('⚡🔴 PEW PEW!');
        },
        hologram: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1300, audioContext.currentTime + 0.1);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.18, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.25);
          console.log('👤✨ Projecting!');
        },
        techFox: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.08);
          oscillator.frequency.exponentialRampToValueAtTime(650, audioContext.currentTime + 0.15);
          gainNode.gain.setValueAtTime(0.24, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          console.log('🦊⚡ Yip!');
        },
        aiWolf: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(250, audioContext.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.26, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.35);
          console.log('🐺🤖 AWOOOO!');
        },
        circuitBot: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.22, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.18);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.18);
          console.log('🔌🤖 Buzz buzz!');
        },
        cyberPanther: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(160, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(320, audioContext.currentTime + 0.13);
          oscillator.frequency.exponentialRampToValueAtTime(190, audioContext.currentTime + 0.28);
          gainNode.gain.setValueAtTime(0.29, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.32);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.32);
          console.log('🐆⚡ Growwwl!');
        },
        star: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
          oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.25);
          console.log('⭐ Twinkle!');
        },
        planet: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.35);
          console.log('🪐 Orbit!');
        },
        blackHole: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          console.log('🕳️ Woooom!');
        },
        nebula: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(700, audioContext.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.18, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.35);
          console.log('☁️✨ Mystic!');
        },
        comet: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.15);
          gainNode.gain.setValueAtTime(0.22, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.18);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.18);
          console.log('☄️ Whoosh!');
        },
        supernova: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.1);
          oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.35);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.4);
          console.log('💥 BOOM!');
        },
        void: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.5);
          gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.6);
          console.log('⚫ Silence...');
        },
        galaxy: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(450, audioContext.currentTime + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(250, audioContext.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.45);
          console.log('🌌 Spiral!');
        },
        alien: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.08);
          oscillator.frequency.exponentialRampToValueAtTime(550, audioContext.currentTime + 0.16);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.24);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.28);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.28);
          console.log('👽 Beep boop!');
        },
        phoenix: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.23, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.35);
          console.log('🔥🦅 Rise!');
        },
        cosmicDragon: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.27, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.45);
          console.log('🐉🌌 ROAR!');
        },
        meteor: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(1400, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.12);
          gainNode.gain.setValueAtTime(0.24, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.15);
          console.log('💫 CRASH!');
        },
        aurora: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
          oscillator.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.18, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.45);
          console.log('🌈 Shimmer!');
        },
        quantumStar: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
          oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.15);
          oscillator.frequency.exponentialRampToValueAtTime(700, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.25);
          console.log('⚛️✨ Quantum!');
        },
        celestialOrb: () => {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.25);
          oscillator.frequency.exponentialRampToValueAtTime(450, audioContext.currentTime + 0.5);
          gainNode.gain.setValueAtTime(0.21, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.55);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.55);
          console.log('🔮✨ Celestial!');
        }
      };
      
      sounds[soundType]?.();
    } catch (error) {
      console.log('Audio not supported:', error);
    }
  };

  // Particle effects
  const createParticles = (character: string) => {
    if (!particlesEnabled) return;
    
    const particleConfigs: { [key: string]: { symbols: string[], count: number, colors: string[] } } = {
      apple: { symbols: ['✨', '⭐', '💫'], count: 5, colors: ['#ff6b6b', '#ffd93d', '#ff8a8a'] },
      rabbit: { symbols: ['💖', '💕', '💝'], count: 4, colors: ['#ff69b4', '#ff1493', '#ffc0cb'] },
      hen: { symbols: ['🪶', '✨', '💫'], count: 6, colors: ['#ffd93d', '#ffb347', '#ff8c00'] },
      lion: { symbols: ['👑', '🔥', '⚡'], count: 5, colors: ['#ff8c00', '#ffd700', '#ff4500'] },
      monkey: { symbols: ['🍌', '🐒', '🌿'], count: 4, colors: ['#8b4513', '#ffd700', '#32cd32'] },
      ember: { symbols: ['🔥', '💥', '✨'], count: 6, colors: ['#ff4500', '#ff6347', '#ffd700'] },
      spark: { symbols: ['⚡', '✨', '💥'], count: 7, colors: ['#ffff00', '#ffd700', '#ff8c00'] },
      flicker: { symbols: ['✨', '💫', '⭐'], count: 5, colors: ['#ffd700', '#ffb347', '#ff6347'] },
      glow: { symbols: ['💫', '✨', '🌟'], count: 6, colors: ['#00ffff', '#87ceeb', '#4169e1'] },
      flame: { symbols: ['🔥', '💥', '🌟'], count: 6, colors: ['#ff4500', '#ff8c00', '#ffd700'] },
      bubble: { symbols: ['🫧', '💧', '✨'], count: 5, colors: ['#87ceeb', '#add8e6', '#b0e0e6'] },
      prism: { symbols: ['🌈', '✨', '💎'], count: 7, colors: ['#ff00ff', '#00ffff', '#ffff00'] },
      pebble: { symbols: ['🪨', '💫', '✨'], count: 4, colors: ['#8b7355', '#a0826d', '#696969'] },
      crystal: { symbols: ['💎', '✨', '🌟'], count: 6, colors: ['#e0ffff', '#b0e0e6', '#add8e6'] },
      leaf: { symbols: ['🍃', '🌿', '✨'], count: 5, colors: ['#32cd32', '#90ee90', '#98fb98'] },
      cloud: { symbols: ['☁️', '💨', '✨'], count: 6, colors: ['#f0f8ff', '#e0e0e0', '#d3d3d3'] },
      bolt: { symbols: ['⚡', '💥', '✨'], count: 8, colors: ['#ffff00', '#ffd700', '#ff8c00'] },
      raindrop: { symbols: ['💧', '💦', '✨'], count: 5, colors: ['#87ceeb', '#4682b4', '#1e90ff'] },
      ice: { symbols: ['❄️', '💎', '✨'], count: 6, colors: ['#e0ffff', '#b0e0e6', '#87ceeb'] },
      sunbeam: { symbols: ['☀️', '🌟', '✨'], count: 7, colors: ['#ffd700', '#ffb347', '#ff8c00'] },
      tiger: { symbols: ['🐅', '💥', '✨'], count: 5, colors: ['#ff8c00', '#ffa500', '#ff4500'] },
      wolf: { symbols: ['🐺', '🌙', '✨'], count: 5, colors: ['#808080', '#a9a9a9', '#696969'] },
      eagle: { symbols: ['🦅', '💨', '✨'], count: 6, colors: ['#8b4513', '#d2691e', '#daa520'] },
      panther: { symbols: ['🐆', '💫', '✨'], count: 5, colors: ['#000000', '#2f4f4f', '#696969'] },
      dragon: { symbols: ['🐉', '🔥', '💥'], count: 7, colors: ['#ff4500', '#ff6347', '#ffd700'] },
      goat: { symbols: ['🐐', '🌿', '✨'], count: 4, colors: ['#f5deb3', '#daa520', '#cd853f'] },
      fox: { symbols: ['🦊', '🍂', '✨'], count: 5, colors: ['#ff8c00', '#ff7f50', '#ff6347'] },
      owl: { symbols: ['🦉', '🌙', '✨'], count: 5, colors: ['#8b7355', '#a0826d', '#696969'] },
      rat: { symbols: ['🐀', '💨', '✨'], count: 4, colors: ['#808080', '#a9a9a9', '#696969'] },
      dog: { symbols: ['🐕', '💖', '✨'], count: 5, colors: ['#d2691e', '#daa520', '#cd853f'] },
      cat: { symbols: ['🐈', '💕', '✨'], count: 5, colors: ['#ff69b4', '#ffa500', '#696969'] },
      bear: { symbols: ['🐻', '🍯', '✨'], count: 5, colors: ['#8b4513', '#a0522d', '#d2691e'] },
      rhino: { symbols: ['🦏', '💨', '✨'], count: 4, colors: ['#808080', '#696969', '#778899'] },
      snake: { symbols: ['🐍', '💚', '✨'], count: 5, colors: ['#32cd32', '#228b22', '#556b2f'] },
      robot: { symbols: ['🤖', '⚙️', '💫'], count: 6, colors: ['#00bfff', '#4169e1', '#1e90ff'] },
      drone: { symbols: ['🚁', '✨', '💨'], count: 7, colors: ['#87ceeb', '#4682b4', '#5f9ea0'] },
      aiCore: { symbols: ['🧠', '💡', '⚡'], count: 8, colors: ['#00ffff', '#00bfff', '#ff00ff'] },
      nanoBot: { symbols: ['🔬', '⚛️', '✨'], count: 9, colors: ['#00ffff', '#00ff00', '#ff00ff'] },
      holoChip: { symbols: ['💾', '💿', '✨'], count: 7, colors: ['#7fffd4', '#40e0d0', '#48d1cc'] },
      cyberLion: { symbols: ['🦁', '⚡', '💥'], count: 6, colors: ['#ffd700', '#00bfff', '#ff00ff'] },
      cyberTiger: { symbols: ['🐯', '⚡', '🔥'], count: 6, colors: ['#ff8c00', '#00ffff', '#ff00ff'] },
      mechaDragon: { symbols: ['🐉', '⚙️', '🔥'], count: 8, colors: ['#ff4500', '#00ffff', '#ffd700'] },
      neuralOrb: { symbols: ['🔮', '🧠', '✨'], count: 10, colors: ['#9370db', '#00ffff', '#ff00ff'] },
      laser: { symbols: ['⚡', '🔴', '💥'], count: 12, colors: ['#ff0000', '#ff4500', '#ffff00'] },
      hologram: { symbols: ['👤', '✨', '💫'], count: 8, colors: ['#00ffff', '#87ceeb', '#add8e6'] },
      techFox: { symbols: ['🦊', '⚡', '🔥'], count: 7, colors: ['#ff8c00', '#00ffff', '#ffd700'] },
      aiWolf: { symbols: ['🐺', '🤖', '⚡'], count: 7, colors: ['#4169e1', '#00ffff', '#c0c0c0'] },
      circuitBot: { symbols: ['🔌', '⚙️', '💡'], count: 8, colors: ['#32cd32', '#00ff00', '#ffff00'] },
      cyberPanther: { symbols: ['🐆', '⚡', '💜'], count: 6, colors: ['#9400d3', '#00ffff', '#ff00ff'] },
      star: { symbols: ['⭐', '✨', '💫'], count: 10, colors: ['#ffff00', '#ffd700', '#ffffe0'] },
      planet: { symbols: ['🪐', '🌍', '🌙'], count: 8, colors: ['#4169e1', '#32cd32', '#ff8c00'] },
      blackHole: { symbols: ['🕳️', '⚫', '💫'], count: 12, colors: ['#000000', '#4b0082', '#8b00ff'] },
      nebula: { symbols: ['☁️', '✨', '🌌'], count: 15, colors: ['#9370db', '#ff1493', '#00ffff'] },
      comet: { symbols: ['☄️', '✨', '💫'], count: 14, colors: ['#ff4500', '#ffd700', '#ffffff'] },
      supernova: { symbols: ['💥', '✨', '🔥'], count: 20, colors: ['#ff4500', '#ffff00', '#ffffff'] },
      void: { symbols: ['⚫', '💫', '🌀'], count: 10, colors: ['#000000', '#4b0082', '#2f2f2f'] },
      galaxy: { symbols: ['🌌', '⭐', '✨'], count: 16, colors: ['#9370db', '#4169e1', '#ff1493'] },
      alien: { symbols: ['👽', '🛸', '✨'], count: 10, colors: ['#00ff00', '#39ff14', '#7fff00'] },
      phoenix: { symbols: ['🔥', '🦅', '✨'], count: 18, colors: ['#ff4500', '#ffd700', '#ff8c00'] },
      cosmicDragon: { symbols: ['🐉', '✨', '🌌'], count: 14, colors: ['#9370db', '#4169e1', '#00ffff'] },
      meteor: { symbols: ['💫', '🔥', '✨'], count: 16, colors: ['#ff4500', '#ff8c00', '#ffd700'] },
      aurora: { symbols: ['🌈', '✨', '💫'], count: 20, colors: ['#00ffff', '#00ff00', '#ff00ff'] },
      quantumStar: { symbols: ['⚛️', '✨', '💫'], count: 15, colors: ['#00ffff', '#ff00ff', '#ffff00'] },
      celestialOrb: { symbols: ['🔮', '✨', '💎'], count: 12, colors: ['#9370db', '#87ceeb', '#ffffff'] }
    };
    
    const config = particleConfigs[character];
    if (!config) return;
    
    console.log(`${config.symbols[0]} Particles!`);
    
    // Add CSS animations if not exists
    if (!document.getElementById('particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes particleFloat1 {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-120px) translateX(30px) scale(0.3) rotate(360deg); }
        }
        @keyframes particleFloat2 {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-100px) translateX(-40px) scale(0.4) rotate(-360deg); }
        }
        @keyframes particleFloat3 {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-80px) translateX(20px) scale(0.5) rotate(180deg); }
        }
        @keyframes particleFloat4 {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-90px) translateX(-20px) scale(0.3) rotate(-180deg); }
        }
        @keyframes particleFloat5 {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-110px) translateX(10px) scale(0.4) rotate(270deg); }
        }
        @keyframes particleFloat6 {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-95px) translateX(-30px) scale(0.3) rotate(-270deg); }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Create multiple particles
    for (let i = 0; i < config.count; i++) {
      const particleElement = document.createElement('div');
      particleElement.textContent = config.symbols[i % config.symbols.length];
      particleElement.style.position = 'absolute';
      particleElement.style.fontSize = `${20 + Math.random() * 10}px`;
      particleElement.style.color = config.colors[i % config.colors.length];
      particleElement.style.pointerEvents = 'none';
      particleElement.style.zIndex = '1000';
      particleElement.style.animation = `particleFloat${(i % 6) + 1} ${1.5 + Math.random() * 1}s ease-out forwards`;
      
      // Position particle near the character
      const characterElement = document.querySelector(`[data-character="${character}"]`);
      if (characterElement) {
        const rect = characterElement.getBoundingClientRect();
        const randomX = (Math.random() - 0.5) * 60;
        const randomY = (Math.random() - 0.5) * 20;
        particleElement.style.left = `${rect.left + rect.width / 2 + randomX}px`;
        particleElement.style.top = `${rect.top + rect.height / 2 + randomY}px`;
      } else {
        particleElement.style.left = '50%';
        particleElement.style.top = '50%';
      }
      
      document.body.appendChild(particleElement);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particleElement.parentNode) {
          particleElement.parentNode.removeChild(particleElement);
        }
      }, 3000);
    }
  };

  const handleCharacterClick = (character: string) => {
    setClickedCharacter(character);
    
    if (soundEnabled) {
      if (typeof window !== 'undefined') {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
      }
      playSound(character);
    }
    
    createParticles(character);
    
    setTimeout(() => setClickedCharacter(null), 1000);
  };

  const handleCharacterHover = (character: string | null) => {
    setHoveredCharacter(character);
  };

  // Helper function to check if character should be displayed
  const shouldShowCharacter = (characterName: string): boolean => {
    // If no character selected from blockchain, show all (original behavior)
    if (!selectedCharacterName) return true;
    // Otherwise, only show the selected character
    return characterName.toLowerCase() === selectedCharacterName.toLowerCase();
  };

  // If not connected, show message
  if (!isConnected) {
    return (
      <div className="w-full py-16 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-xl mx-auto">
          <div className="text-6xl mb-4">👋</div>
          <p className="text-white text-2xl font-bold mb-3">Connect Your Wallet</p>
          <p className="text-gray-400">
            Please connect your wallet to view your animated character and Power Up details.
          </p>
        </div>
      </div>
    );
  }

  // If loading, show simple loading text
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center" style={{ minHeight: '100px' }}>
        <p className="text-white" style={{ fontSize: '16px', opacity: 0.7 }}>Loading...</p>
      </div>
    );
  }

  // If no character assigned, show message
  if (blockchainCategory === 0 || !selectedCharacterName) {
    return (
      <div className="w-full py-16 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-xl mx-auto">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-white text-2xl font-bold mb-3">No Character Assigned</p>
          <p className="text-gray-400 mb-4">
            You haven't quick incept now in the Community contract yet or don't have a character category assigned.
          </p>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-left">
            <p className="text-blue-300 text-sm mb-2">📝 <strong>To get a character:</strong></p>
            <ul className="text-gray-400 text-sm space-y-1 list-disc list-inside">
              <li>Quick Incept Now in the Community contract</li>
              <li>Power Up tokens to get assigned a category (1-4)</li>
              <li>Your character will appear automatically!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Control Panel - Hidden in compact mode */}
      {!compactMode && (
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <button
            onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}
            className={`px-4 py-2 rounded ${theme === 'day' ? 'bg-yellow-400' : 'bg-gray-800 text-white'}`}
          >
            {theme === 'day' ? '🌞 Day' : '🌙 Night'}
          </button>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-4 py-2 rounded ${soundEnabled ? 'bg-green-400' : 'bg-gray-400'}`}
          >
            {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
          </button>
          
          <button
            onClick={() => setParticlesEnabled(!particlesEnabled)}
            className={`px-4 py-2 rounded ${particlesEnabled ? 'bg-purple-400' : 'bg-gray-400'}`}
          >
            {particlesEnabled ? '✨ Particles On' : '✨ Particles Off'}
          </button>
        </div>
      </div>
      )}

      {/* Category Display - Shows user's assigned category from blockchain - Hidden in compact mode */}
      {!compactMode && blockchainCategory > 0 && (
      <div className="mb-8 px-4">
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <div className={`px-6 py-3 rounded-lg font-semibold shadow-lg ${
            blockchainCategory === 1
              ? 'bg-gradient-to-r from-pink-400 to-yellow-400 text-white'
              : blockchainCategory === 2
              ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
              : blockchainCategory === 3
              ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white'
              : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
          }`}>
            {blockchainCategory === 1 && '✨ Spark Up'}
            {blockchainCategory === 2 && '🐯 Flicker Roar'}
            {blockchainCategory === 3 && '🤖 AI Override'}
            {blockchainCategory === 4 && '🌌 Zylo Apex'}
            <span className="ml-3 px-3 py-1 bg-white/30 rounded-full text-sm font-bold">
              {Math.round(blockchainPercentage)}% Reward Progress
            </span>
          </div>
        </div>
      </div>
      )}

      {/* Categories Section */}
      <div className="space-y-12 px-8">
       

        {/* Spark Up Category */}
        {activeCategory === 'sparklings' && (
        <div>
          {!compactMode && (
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            ✨ Spark Up
          </h2>
          )}
          <div className="flex flex-wrap items-center justify-center gap-8 py-8">

        {/* Ember Character with Interactive Features */}
        {shouldShowCharacter('ember') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="ember"
          onClick={() => handleCharacterClick('ember')}
          onMouseEnter={() => handleCharacterHover('ember')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'ember' ? [1, 1.2, 1] : [1, 1.1, 1],
              y: clickedCharacter === 'ember' ? [0, -5, 0] : 0,
            }}
            transition={{
              duration: hoveredCharacter === 'ember' ? 0.3 : 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.15,
              filter: "brightness(1.2) drop-shadow(0 0 10px rgba(255,69,0,0.6))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className={`${hoveredCharacter === 'ember' ? 'drop-shadow-2xl' : ''} ${
              clickedCharacter === 'ember' ? 'animate-pulse' : ''
            }`}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="emberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="30%" stopColor="#ff8c00" />
                  <stop offset="70%" stopColor="#ff4500" />
                  <stop offset="100%" stopColor="#dc143c" />
                </linearGradient>
                <radialGradient id="ember3D" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffff00" />
                  <stop offset="30%" stopColor="#ffd700" />
                  <stop offset="60%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ff4500" />
                </radialGradient>
                <radialGradient id="emberCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="20%" stopColor="#ffff00" />
                  <stop offset="50%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ff4500" />
                </radialGradient>
                <filter id="emberGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="emberShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#ff4500" floodOpacity="0.4"/>
                </filter>
                <mask id="emberFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (emberFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Ember Base - Flame Shape */}
              <path
                d="M64 20 Q75 25, 80 35 Q85 50, 82 65 Q80 80, 75 90 Q70 100, 64 105 Q58 100, 53 90 Q48 80, 46 65 Q43 50, 48 35 Q53 25, 64 20 Z"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                filter="url(#emberShadow)"
              />
              {/* Ember Outline - Always Visible */}
              <path
                d="M64 20 Q75 25, 80 35 Q85 50, 82 65 Q80 80, 75 90 Q70 100, 64 105 Q58 100, 53 90 Q48 80, 46 65 Q43 50, 48 35 Q53 25, 64 20 Z"
                fill="none"
                stroke="#ff4500"
                strokeWidth="2"
              />
              
              {/* Inner Flame - Brighter Core */}
              <path
                d="M64 30 Q70 33, 73 42 Q75 55, 73 65 Q70 75, 64 80 Q58 75, 55 65 Q53 55, 55 42 Q58 33, 64 30 Z"
                fill="url(#emberCore)"
                mask="url(#emberFillMask)"
                filter="url(#emberGlow)"
              />
              {/* Inner Flame Outline */}
              <path
                d="M64 30 Q70 33, 73 42 Q75 55, 73 65 Q70 75, 64 80 Q58 75, 55 65 Q53 55, 55 42 Q58 33, 64 30 Z"
                fill="none"
                stroke="#ffd700"
                strokeWidth="1"
              />
              
              {/* Flame Flicker Left */}
              <path
                d="M48 40 Q45 35, 42 45 Q40 55, 45 60 Q48 58, 48 50 Q48 45, 48 40"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                opacity="0.8"
              />
              
              {/* Flame Flicker Right */}
              <path
                d="M80 40 Q83 35, 86 45 Q88 55, 83 60 Q80 58, 80 50 Q80 45, 80 40"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                opacity="0.8"
              />
              
              {/* Top Flame Point */}
              <path
                d="M64 15 Q67 18, 68 25 Q67 30, 64 28 Q61 30, 60 25 Q61 18, 64 15"
                fill="url(#emberCore)"
                mask="url(#emberFillMask)"
                filter="url(#emberGlow)"
              />
              
              {/* Ember Eyes - Glowing */}
              <ellipse cx="57" cy="50" rx="4" ry="6" fill="#ffff00" />
              <ellipse cx="71" cy="50" rx="4" ry="6" fill="#ffff00" />
              <ellipse cx="57" cy="50" rx="2" ry="4" fill="#ff8c00" />
              <ellipse cx="71" cy="50" rx="2" ry="4" fill="#ff8c00" />
              <circle cx="57" cy="48" r="1" fill="#ffffff" opacity="0.8" />
              <circle cx="71" cy="48" r="1" fill="#ffffff" opacity="0.8" />
              
              {/* Ember Smile - Fiery */}
              <path
                d="M58 62 Q64 67, 70 62"
                fill="none"
                stroke="#ffd700"
                strokeWidth="2"
                mask="url(#emberFillMask)"
              />
              
              {/* Flame Swirls - Decorative */}
              <path
                d="M50 55 Q48 60, 52 63"
                fill="none"
                stroke="#ffd700"
                strokeWidth="1.5"
                mask="url(#emberFillMask)"
                opacity="0.6"
              />
              <path
                d="M78 55 Q80 60, 76 63"
                fill="none"
                stroke="#ffd700"
                strokeWidth="1.5"
                mask="url(#emberFillMask)"
                opacity="0.6"
              />
              
              {/* Ember Arms - Flame Tendrils */}
              <path
                d="M48 65 Q35 68, 30 75 Q28 80, 32 82 Q38 78, 45 72"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                opacity="0.7"
              />
              <path
                d="M80 65 Q93 68, 98 75 Q100 80, 96 82 Q90 78, 83 72"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                opacity="0.7"
              />
              
              {/* Ember Arms Outline */}
              <path
                d="M48 65 Q35 68, 30 75 Q28 80, 32 82 Q38 78, 45 72"
                fill="none"
                stroke="#ff8c00"
                strokeWidth="1"
              />
              <path
                d="M80 65 Q93 68, 98 75 Q100 80, 96 82 Q90 78, 83 72"
                fill="none"
                stroke="#ff8c00"
                strokeWidth="1"
              />
              
              {/* Hot Spots - White Highlights */}
              <circle cx="64" cy="40" r="2" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.6" />
              <circle cx="60" cy="55" r="1.5" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.5" />
              <circle cx="68" cy="58" r="1.5" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.5" />
              <circle cx="64" cy="70" r="2" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.4" />
              
              {/* Ember Sparks - Floating */}
              <circle cx="40" cy="45" r="1" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.8" />
              <circle cx="88" cy="50" r="1.2" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.7" />
              <circle cx="35" cy="60" r="0.8" fill="#ff8c00" mask="url(#emberFillMask)" opacity="0.6" />
              <circle cx="92" cy="65" r="0.9" fill="#ff8c00" mask="url(#emberFillMask)" opacity="0.6" />
              
              {/* Flame Wisps - Bottom */}
              <path
                d="M55 95 Q50 100, 48 105 Q50 108, 52 105 Q55 100, 55 95"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                opacity="0.5"
              />
              <path
                d="M64 100 Q62 105, 60 110 Q62 113, 64 110 Q66 105, 64 100"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                opacity="0.5"
              />
              <path
                d="M73 95 Q78 100, 80 105 Q78 108, 76 105 Q73 100, 73 95"
                fill="url(#ember3D)"
                mask="url(#emberFillMask)"
                opacity="0.5"
              />
              
              {/* Ember Cheeks - Glow */}
              <ellipse cx="52" cy="56" rx="3" ry="2" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.4" />
              <ellipse cx="76" cy="56" rx="3" ry="2" fill="#ffd700" mask="url(#emberFillMask)" opacity="0.4" />
              
              {/* Core Pulse Effect */}
              <circle cx="64" cy="55" r="3" fill="#ffffff" mask="url(#emberFillMask)" opacity="0.3" />
              
              {/* Flame Details - Texture */}
              <path
                d="M58 75 Q60 72, 62 75"
                fill="none"
                stroke="#ff8c00"
                strokeWidth="1"
                mask="url(#emberFillMask)"
                opacity="0.5"
              />
              <path
                d="M66 75 Q68 72, 70 75"
                fill="none"
                stroke="#ff8c00"
                strokeWidth="1"
                mask="url(#emberFillMask)"
                opacity="0.5"
              />
              
              {/* Bottom Glow Base */}
              <ellipse cx="64" cy="105" rx="20" ry="8" fill="#ff4500" mask="url(#emberFillMask)" opacity="0.3" />
              <ellipse cx="64" cy="105" rx="15" ry="6" fill="#ff8c00" mask="url(#emberFillMask)" opacity="0.2" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            🔥 Ember
          </div>
          
          {/* Fill Value Display */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-500">
            {Math.round(emberFill)}%
          </div>
        </div>
        )}

        {/* Spark Character with Interactive Features */}
        {shouldShowCharacter('spark') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="spark"
          onClick={() => handleCharacterClick('spark')}
          onMouseEnter={() => handleCharacterHover('spark')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'spark' ? [1, 1.3, 1] : [1, 1.15, 1],
              rotate: clickedCharacter === 'spark' ? [0, 360] : [0, 0],
            }}
            transition={{
              duration: hoveredCharacter === 'spark' ? 0.2 : 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.2,
              filter: "brightness(1.3) drop-shadow(0 0 15px rgba(255,255,0,0.8))",
              transition: { duration: 0.15 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            className={`${hoveredCharacter === 'spark' ? 'drop-shadow-2xl' : ''} ${
              clickedCharacter === 'spark' ? 'animate-spin' : ''
            }`}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <radialGradient id="spark3D" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#ffff00" />
                  <stop offset="70%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#ff8c00" />
                </radialGradient>
                <filter id="sparkGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="sparkFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (sparkFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Spark Core */}
              <circle cx="64" cy="64" r="15" fill="url(#spark3D)" mask="url(#sparkFillMask)" filter="url(#sparkGlow)" />
              <circle cx="64" cy="64" r="15" fill="none" stroke="#ffd700" strokeWidth="2" />
              
              {/* Main Lightning Bolts */}
              <path d="M64 25 L68 50 L75 45 L64 75" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
              <path d="M64 103 L60 78 L53 83 L64 53" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
              <path d="M25 64 L50 60 L45 53 L75 64" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
              <path d="M103 64 L78 68 L83 75 L53 64" fill="#ffff00" mask="url(#sparkFillMask)" stroke="#ffd700" strokeWidth="2" />
              
              {/* Diagonal Lightning Bolts */}
              <path d="M35 35 L55 50 L50 55 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
              <path d="M93 93 L73 78 L78 73 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
              <path d="M93 35 L73 50 L78 55 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
              <path d="M35 93 L55 78 L50 73 L64 64" fill="#ffd700" mask="url(#sparkFillMask)" opacity="0.8" />
              
              {/* Electric Arcs */}
              <path d="M64 30 Q80 40, 85 50" fill="none" stroke="#ffff00" strokeWidth="2" mask="url(#sparkFillMask)" opacity="0.6" />
              <path d="M64 98 Q48 88, 43 78" fill="none" stroke="#ffff00" strokeWidth="2" mask="url(#sparkFillMask)" opacity="0.6" />
              
              {/* Inner Core Details */}
              <circle cx="64" cy="64" r="8" fill="#ffffff" mask="url(#sparkFillMask)" opacity="0.8" />
              <circle cx="64" cy="64" r="4" fill="#ffff00" mask="url(#sparkFillMask)" />
              
              {/* Spark Eyes */}
              <circle cx="60" cy="62" r="2" fill="#333" />
              <circle cx="68" cy="62" r="2" fill="#333" />
              <circle cx="60.5" cy="61" r="0.8" fill="#fff" />
              <circle cx="68.5" cy="61" r="0.8" fill="#fff" />
              
              {/* Energy Rings */}
              <circle cx="64" cy="64" r="20" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.4" mask="url(#sparkFillMask)" />
              <circle cx="64" cy="64" r="25" fill="none" stroke="#ff8c00" strokeWidth="1" opacity="0.3" mask="url(#sparkFillMask)" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            ⚡ Spark
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-500">
            {Math.round(sparkFill)}%
          </div>
        </div>
        )}
        {/* Flicker Character with Interactive Features */}
        {shouldShowCharacter('flicker') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="flicker"
          onClick={() => handleCharacterClick('flicker')}
          onMouseEnter={() => handleCharacterHover('flicker')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'flicker' ? [1, 1.15, 1] : [1, 1.05, 1],
              opacity: hoveredCharacter === 'flicker' ? [1, 0.7, 1] : [1, 0.9, 1],
            }}
            transition={{
              duration: hoveredCharacter === 'flicker' ? 0.2 : 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.15,
              filter: "brightness(1.3)",
              transition: { duration: 0.15 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className={`${hoveredCharacter === 'flicker' ? 'drop-shadow-xl' : ''}`}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <radialGradient id="flicker3D" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#ffd700" />
                  <stop offset="80%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ff6347" />
                </radialGradient>
                <filter id="flickerGlow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="flickerFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (flickerFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Flicker Body - Star Shape */}
              <path
                d="M64 20 L70 50 L95 45 L75 65 L85 95 L64 80 L43 95 L53 65 L33 45 L58 50 Z"
                fill="url(#flicker3D)"
                mask="url(#flickerFillMask)"
                filter="url(#flickerGlow)"
                stroke="#ffd700"
                strokeWidth="2"
              />
              
              {/* Inner Star */}
              <path
                d="M64 35 L68 55 L82 52 L72 64 L78 80 L64 70 L50 80 L56 64 L46 52 L60 55 Z"
                fill="#ffffff"
                mask="url(#flickerFillMask)"
                opacity="0.6"
              />
              
              {/* Flicker Eyes */}
              <circle cx="60" cy="58" r="3" fill="#333" />
              <circle cx="68" cy="58" r="3" fill="#333" />
              <circle cx="61" cy="57" r="1" fill="#fff" />
              <circle cx="69" cy="57" r="1" fill="#fff" />
              
              {/* Flicker Smile */}
              <path d="M58 66 Q64 70, 70 66" fill="none" stroke="#ff8c00" strokeWidth="2" mask="url(#flickerFillMask)" />
              
              {/* Sparkle Points */}
              <circle cx="30" cy="50" r="2" fill="#ffd700" mask="url(#flickerFillMask)" opacity="0.8" />
              <circle cx="98" cy="50" r="2" fill="#ffd700" mask="url(#flickerFillMask)" opacity="0.8" />
              <circle cx="64" cy="15" r="2.5" fill="#ffffff" mask="url(#flickerFillMask)" />
              <circle cx="50" cy="100" r="2" fill="#ff8c00" mask="url(#flickerFillMask)" opacity="0.7" />
              <circle cx="78" cy="100" r="2" fill="#ff8c00" mask="url(#flickerFillMask)" opacity="0.7" />
              
              {/* Glow Rings */}
              <circle cx="64" cy="64" r="30" fill="none" stroke="#ffd700" strokeWidth="1" opacity="0.3" mask="url(#flickerFillMask)" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            ✨ Flicker
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-500">
            {Math.round(flickerFill)}%
          </div>
        </div>
        )}
        {/* Glow Character with Interactive Features */}
        {shouldShowCharacter('glow') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="glow"
          onClick={() => handleCharacterClick('glow')}
          onMouseEnter={() => handleCharacterHover('glow')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'glow' ? [1, 1.2, 1] : [1, 1.1, 1],
              filter: hoveredCharacter === 'glow' 
                ? ['brightness(1.2)', 'brightness(1.5)', 'brightness(1.2)']
                : ['brightness(1)', 'brightness(1.1)', 'brightness(1)'],
            }}
            transition={{
              duration: hoveredCharacter === 'glow' ? 0.6 : 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.2,
              filter: "brightness(1.4) drop-shadow(0 0 20px rgba(0,255,255,0.7))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <radialGradient id="glow3D" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e0ffff" />
                  <stop offset="60%" stopColor="#87ceeb" />
                  <stop offset="100%" stopColor="#4169e1" />
                </radialGradient>
                <filter id="glowEffect" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="glowFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (glowFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Glow Body - Orb */}
              <circle cx="64" cy="64" r="35" fill="url(#glow3D)" mask="url(#glowFillMask)" filter="url(#glowEffect)" />
              <circle cx="64" cy="64" r="35" fill="none" stroke="#87ceeb" strokeWidth="2" />
              
              {/* Inner Orb Layers */}
              <circle cx="64" cy="64" r="25" fill="#e0ffff" mask="url(#glowFillMask)" opacity="0.5" />
              <circle cx="64" cy="64" r="15" fill="#ffffff" mask="url(#glowFillMask)" opacity="0.7" />
              
              {/* Glow Eyes */}
              <ellipse cx="58" cy="60" rx="4" ry="5" fill="#4169e1" />
              <ellipse cx="70" cy="60" rx="4" ry="5" fill="#4169e1" />
              <circle cx="59" cy="59" r="1.5" fill="#fff" />
              <circle cx="71" cy="59" r="1.5" fill="#fff" />
              
              {/* Glow Smile */}
              <path d="M58 72 Q64 78, 70 72" fill="none" stroke="#87ceeb" strokeWidth="2.5" mask="url(#glowFillMask)" />
              
              {/* Aura Rings */}
              <circle cx="64" cy="64" r="40" fill="none" stroke="#87ceeb" strokeWidth="2" opacity="0.4" mask="url(#glowFillMask)" />
              <circle cx="64" cy="64" r="45" fill="none" stroke="#4169e1" strokeWidth="1.5" opacity="0.3" mask="url(#glowFillMask)" />
              <circle cx="64" cy="64" r="50" fill="none" stroke="#00ffff" strokeWidth="1" opacity="0.2" mask="url(#glowFillMask)" />
              
              {/* Light Rays */}
              <line x1="64" y1="20" x2="64" y2="30" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
              <line x1="64" y1="98" x2="64" y2="108" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
              <line x1="20" y1="64" x2="30" y2="64" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
              <line x1="98" y1="64" x2="108" y2="64" stroke="#e0ffff" strokeWidth="2" mask="url(#glowFillMask)" opacity="0.6" />
              
              {/* Sparkle Details */}
              <circle cx="50" cy="50" r="2" fill="#ffffff" mask="url(#glowFillMask)" opacity="0.8" />
              <circle cx="78" cy="50" r="2" fill="#ffffff" mask="url(#glowFillMask)" opacity="0.8" />
              <circle cx="64" cy="85" r="2.5" fill="#e0ffff" mask="url(#glowFillMask)" opacity="0.7" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            💫 Glow
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-500">
            {Math.round(glowFill)}%
          </div>
        </div>
        )}
        {/* Flame Character with Interactive Features */}
        {shouldShowCharacter('flame') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="flame"
          onClick={() => handleCharacterClick('flame')}
          onMouseEnter={() => handleCharacterHover('flame')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'flame' ? [1, 1.15, 1] : [1, 1.08, 1],
              y: clickedCharacter === 'flame' ? [0, -8, 0] : [0, -3, 0],
            }}
            transition={{
              duration: hoveredCharacter === 'flame' ? 0.4 : 0.9,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.18,
              filter: "brightness(1.3) drop-shadow(0 0 15px rgba(255,69,0,0.8))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            className={`${hoveredCharacter === 'flame' ? 'drop-shadow-2xl' : ''}`}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffff00" />
                  <stop offset="30%" stopColor="#ffd700" />
                  <stop offset="60%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ff4500" />
                </linearGradient>
                <radialGradient id="flame3D" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="20%" stopColor="#ffff00" />
                  <stop offset="50%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ff4500" />
                </radialGradient>
                <filter id="flameShadow">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#ff4500" floodOpacity="0.5"/>
                </filter>
                <mask id="flameFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (flameFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Large Flame Body */}
              <path
                d="M64 15 Q80 25, 90 45 Q95 65, 88 85 Q80 100, 64 110 Q48 100, 40 85 Q33 65, 38 45 Q48 25, 64 15 Z"
                fill="url(#flame3D)"
                mask="url(#flameFillMask)"
                filter="url(#flameShadow)"
                stroke="#ff8c00"
                strokeWidth="2"
              />
              
              {/* Middle Flame Layer */}
              <path
                d="M64 25 Q75 32, 80 48 Q83 63, 78 78 Q72 90, 64 95 Q56 90, 50 78 Q45 63, 48 48 Q53 32, 64 25 Z"
                fill="url(#flameGradient)"
                mask="url(#flameFillMask)"
                opacity="0.8"
              />
              
              {/* Inner Hot Core */}
              <path
                d="M64 35 Q70 40, 72 50 Q74 60, 70 68 Q66 75, 64 78 Q62 75, 58 68 Q54 60, 56 50 Q58 40, 64 35 Z"
                fill="#ffffff"
                mask="url(#flameFillMask)"
                opacity="0.7"
              />
              
              {/* Flame Eyes */}
              <ellipse cx="58" cy="55" rx="3" ry="4" fill="#333" />
              <ellipse cx="70" cy="55" rx="3" ry="4" fill="#333" />
              <circle cx="59" cy="54" r="1" fill="#fff" />
              <circle cx="71" cy="54" r="1" fill="#fff" />
              
              {/* Flame Smile */}
              <path d="M58 65 Q64 69, 70 65" fill="none" stroke="#ff4500" strokeWidth="2" mask="url(#flameFillMask)" />
              
              {/* Flame Wisps - Top */}
              <path d="M58 20 Q55 10, 60 8 Q62 12, 60 18" fill="#ffff00" mask="url(#flameFillMask)" opacity="0.7" />
              <path d="M70 20 Q73 10, 68 8 Q66 12, 68 18" fill="#ffff00" mask="url(#flameFillMask)" opacity="0.7" />
              <path d="M64 12 Q66 5, 64 3 Q62 5, 64 12" fill="#ffffff" mask="url(#flameFillMask)" opacity="0.8" />
              
              {/* Side Flames */}
              <path d="M40 55 Q33 50, 30 55 Q33 60, 38 58" fill="#ff8c00" mask="url(#flameFillMask)" opacity="0.6" />
              <path d="M88 55 Q95 50, 98 55 Q95 60, 90 58" fill="#ff8c00" mask="url(#flameFillMask)" opacity="0.6" />
              
              {/* Base Glow */}
              <ellipse cx="64" cy="110" rx="25" ry="10" fill="#ff4500" mask="url(#flameFillMask)" opacity="0.4" />
              <ellipse cx="64" cy="108" rx="18" ry="7" fill="#ff8c00" mask="url(#flameFillMask)" opacity="0.3" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            🔥 Flame
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">
            {Math.round(flameFill)}%
          </div>
        </div>
        )}
        {/* Bubble Character with Interactive Features */}
        {shouldShowCharacter('bubble') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="bubble"
          onClick={() => handleCharacterClick('bubble')}
          onMouseEnter={() => handleCharacterHover('bubble')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'bubble' ? [1, 1.1, 1] : [1, 1.05, 1],
              y: clickedCharacter === 'bubble' ? [0, -10, 0] : [0, -2, 0],
            }}
            transition={{
              duration: hoveredCharacter === 'bubble' ? 0.8 : 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.15,
              filter: "brightness(1.2)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            className={`${hoveredCharacter === 'bubble' ? 'drop-shadow-xl' : ''}`}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <radialGradient id="bubble3D" cx="35%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e0ffff" />
                  <stop offset="70%" stopColor="#add8e6" />
                  <stop offset="100%" stopColor="#87ceeb" />
                </radialGradient>
                <radialGradient id="bubbleShine" cx="30%" cy="30%" r="40%">
                  <stop offset="0%" stopColor="#ffffff" opacity="0.9" />
                  <stop offset="70%" stopColor="#ffffff" opacity="0.3" />
                  <stop offset="100%" stopColor="#ffffff" opacity="0" />
                </radialGradient>
                <filter id="bubbleShadow">
                  <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
                </filter>
                <mask id="bubbleFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (bubbleFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Main Bubble Body */}
              <circle cx="64" cy="64" r="38" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" filter="url(#bubbleShadow)" />
              <circle cx="64" cy="64" r="38" fill="none" stroke="#87ceeb" strokeWidth="2.5" />
              
              {/* Bubble Shine Effect */}
              <ellipse cx="48" cy="45" rx="18" ry="22" fill="url(#bubbleShine)" mask="url(#bubbleFillMask)" />
              
              {/* Secondary Shine */}
              <ellipse cx="45" cy="42" rx="8" ry="12" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.6" />
              <ellipse cx="42" cy="38" rx="4" ry="6" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.8" />
              
              {/* Bubble Eyes */}
              <circle cx="58" cy="60" r="4" fill="#4169e1" />
              <circle cx="70" cy="60" r="4" fill="#4169e1" />
              <circle cx="59" cy="59" r="1.5" fill="#fff" />
              <circle cx="71" cy="59" r="1.5" fill="#fff" />
              
              {/* Bubble Smile */}
              <path d="M56 72 Q64 78, 72 72" fill="none" stroke="#87ceeb" strokeWidth="2.5" mask="url(#bubbleFillMask)" />
              
              {/* Small Bubbles Around */}
              <circle cx="30" cy="40" r="6" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.8" stroke="#87ceeb" strokeWidth="1.5" />
              <circle cx="98" cy="50" r="8" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.7" stroke="#87ceeb" strokeWidth="1.5" />
              <circle cx="25" cy="75" r="5" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.8" stroke="#87ceeb" strokeWidth="1.5" />
              <circle cx="95" cy="85" r="7" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.7" stroke="#87ceeb" strokeWidth="1.5" />
              <circle cx="64" cy="20" r="4" fill="url(#bubble3D)" mask="url(#bubbleFillMask)" opacity="0.9" stroke="#87ceeb" strokeWidth="1" />
              
              {/* Tiny Shine Spots on Small Bubbles */}
              <circle cx="28" cy="38" r="2" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
              <circle cx="96" cy="48" r="2.5" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
              <circle cx="23" cy="73" r="1.5" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
              <circle cx="93" cy="83" r="2" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.7" />
              
              {/* Reflection Details */}
              <path d="M75 55 Q80 50, 85 55" fill="none" stroke="#ffffff" strokeWidth="1.5" mask="url(#bubbleFillMask)" opacity="0.4" />
              <ellipse cx="78" cy="70" rx="3" ry="5" fill="#ffffff" mask="url(#bubbleFillMask)" opacity="0.3" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            🫧 Bubble
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-400">
            {Math.round(bubbleFill)}%
          </div>
        </div>
        )}
        {/* Prism Character with Interactive Features */}
        {shouldShowCharacter('prism') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="prism"
          onClick={() => handleCharacterClick('prism')}
          onMouseEnter={() => handleCharacterHover('prism')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'prism' ? [1, 1.15, 1] : [1, 1.08, 1],
              rotate: clickedCharacter === 'prism' ? [0, 180, 360] : [0, 5, 0],
            }}
            transition={{
              duration: hoveredCharacter === 'prism' ? 0.5 : 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.2,
              filter: "brightness(1.3) drop-shadow(0 0 15px rgba(255,0,255,0.6))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="prismGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff0000" />
                  <stop offset="20%" stopColor="#ff7f00" />
                  <stop offset="40%" stopColor="#ffff00" />
                  <stop offset="60%" stopColor="#00ff00" />
                  <stop offset="80%" stopColor="#0000ff" />
                  <stop offset="100%" stopColor="#8b00ff" />
                </linearGradient>
                <linearGradient id="prismGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff00ff" />
                  <stop offset="33%" stopColor="#00ffff" />
                  <stop offset="66%" stopColor="#ffff00" />
                  <stop offset="100%" stopColor="#ff00ff" />
                </linearGradient>
                <filter id="prismGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="prismFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (prismFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Prism Triangle Body */}
              <path
                d="M64 20 L100 100 L28 100 Z"
                fill="url(#prismGradient1)"
                mask="url(#prismFillMask)"
                filter="url(#prismGlow)"
                stroke="#ff00ff"
                strokeWidth="2"
              />
              
              {/* Inner Triangle */}
              <path
                d="M64 35 L88 85 L40 85 Z"
                fill="url(#prismGradient2)"
                mask="url(#prismFillMask)"
                opacity="0.7"
              />
              
              {/* Light Refraction Beams */}
              <line x1="64" y1="30" x2="75" y2="10" stroke="#ff0000" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
              <line x1="64" y1="30" x2="80" y2="15" stroke="#ffff00" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
              <line x1="64" y1="30" x2="48" y2="15" stroke="#00ffff" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
              <line x1="64" y1="30" x2="53" y2="10" stroke="#ff00ff" strokeWidth="2" mask="url(#prismFillMask)" opacity="0.6" />
              
              {/* Prism Eyes */}
              <circle cx="58" cy="55" r="4" fill="#fff" />
              <circle cx="70" cy="55" r="4" fill="#fff" />
              <circle cx="58" cy="55" r="2.5" fill="#333" />
              <circle cx="70" cy="55" r="2.5" fill="#333" />
              <circle cx="59" cy="54" r="1" fill="#fff" />
              <circle cx="71" cy="54" r="1" fill="#fff" />
              
              {/* Prism Smile */}
              <path d="M56 68 Q64 74, 72 68" fill="none" stroke="#ff00ff" strokeWidth="2" mask="url(#prismFillMask)" />
              
              {/* Rainbow Sparkles */}
              <circle cx="45" cy="50" r="2" fill="#ff0000" mask="url(#prismFillMask)" opacity="0.8" />
              <circle cx="83" cy="50" r="2" fill="#0000ff" mask="url(#prismFillMask)" opacity="0.8" />
              <circle cx="64" cy="90" r="2.5" fill="#ffff00" mask="url(#prismFillMask)" opacity="0.7" />
              
              {/* Facet Lines */}
              <line x1="64" y1="35" x2="64" y2="85" stroke="#ffffff" strokeWidth="1" mask="url(#prismFillMask)" opacity="0.4" />
              <line x1="50" y1="65" x2="78" y2="65" stroke="#ffffff" strokeWidth="1" mask="url(#prismFillMask)" opacity="0.4" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            🌈 Prism
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">
            {Math.round(prismFill)}%
          </div>
        </div>
        )}
        {/* Pebble Character with Interactive Features */}
        {shouldShowCharacter('pebble') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="pebble"
          onClick={() => handleCharacterClick('pebble')}
          onMouseEnter={() => handleCharacterHover('pebble')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'pebble' ? [1, 1.08, 1] : [1, 1.03, 1],
              y: clickedCharacter === 'pebble' ? [0, -5, 0] : 0,
            }}
            transition={{
              duration: hoveredCharacter === 'pebble' ? 0.8 : 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.12,
              filter: "brightness(1.2)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <radialGradient id="pebble3D" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#c4a57b" />
                  <stop offset="50%" stopColor="#a0826d" />
                  <stop offset="100%" stopColor="#8b7355" />
                </radialGradient>
                <filter id="pebbleShadow">
                  <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
                </filter>
                <mask id="pebbleFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (pebbleFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Pebble Body - Irregular Stone Shape */}
              <ellipse cx="64" cy="70" rx="35" ry="32" fill="url(#pebble3D)" mask="url(#pebbleFillMask)" filter="url(#pebbleShadow)" />
              <ellipse cx="64" cy="70" rx="35" ry="32" fill="none" stroke="#8b7355" strokeWidth="2" />
              
              {/* Stone Texture Spots */}
              <circle cx="50" cy="60" r="3" fill="rgba(0,0,0,0.15)" mask="url(#pebbleFillMask)" />
              <circle cx="75" cy="65" r="2.5" fill="rgba(0,0,0,0.12)" mask="url(#pebbleFillMask)" />
              <circle cx="58" cy="80" r="2" fill="rgba(0,0,0,0.1)" mask="url(#pebbleFillMask)" />
              <circle cx="70" cy="75" r="2.2" fill="rgba(0,0,0,0.13)" mask="url(#pebbleFillMask)" />
              <circle cx="45" cy="72" r="1.8" fill="rgba(0,0,0,0.11)" mask="url(#pebbleFillMask)" />
              
              {/* Highlight Shine */}
              <ellipse cx="50" cy="55" rx="12" ry="8" fill="rgba(255,255,255,0.3)" mask="url(#pebbleFillMask)" />
              <ellipse cx="48" cy="52" rx="6" ry="4" fill="rgba(255,255,255,0.4)" mask="url(#pebbleFillMask)" />
              
              {/* Pebble Eyes */}
              <circle cx="58" cy="65" r="4" fill="#3d3d3d" />
              <circle cx="70" cy="65" r="4" fill="#3d3d3d" />
              <circle cx="59" cy="64" r="1.5" fill="#fff" />
              <circle cx="71" cy="64" r="1.5" fill="#fff" />
              
              {/* Pebble Smile */}
              <path d="M56 78 Q64 83, 72 78" fill="none" stroke="#6b5d4f" strokeWidth="2" mask="url(#pebbleFillMask)" />
              
              {/* Stone Cracks */}
              <path d="M40 65 Q45 67, 48 65" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" mask="url(#pebbleFillMask)" />
              <path d="M82 72 Q85 75, 88 73" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" mask="url(#pebbleFillMask)" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            🪨 Pebble
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-stone-600">
            {Math.round(pebbleFill)}%
          </div>
        </div>
        )}
        {/* Crystal Character with Interactive Features */}
        {shouldShowCharacter('crystal') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="crystal"
          onClick={() => handleCharacterClick('crystal')}
          onMouseEnter={() => handleCharacterHover('crystal')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'crystal' ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: hoveredCharacter === 'crystal' ? [0, 10, -10, 0] : [0, 3, -3, 0],
            }}
            transition={{
              duration: hoveredCharacter === 'crystal' ? 0.6 : 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.25,
              filter: "brightness(1.4) drop-shadow(0 0 20px rgba(173,216,230,0.8))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e0ffff" />
                  <stop offset="50%" stopColor="#b0e0e6" />
                  <stop offset="100%" stopColor="#87ceeb" />
                </linearGradient>
                <radialGradient id="crystal3D" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#e0ffff" />
                  <stop offset="100%" stopColor="#87ceeb" />
                </radialGradient>
                <filter id="crystalGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="crystalFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (crystalFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Crystal Main Body - Hexagonal */}
              <path
                d="M64 20 L85 40 L85 75 L64 95 L43 75 L43 40 Z"
                fill="url(#crystal3D)"
                mask="url(#crystalFillMask)"
                filter="url(#crystalGlow)"
                stroke="#87ceeb"
                strokeWidth="2"
              />
              
              {/* Crystal Facets */}
              <path d="M64 20 L64 95" stroke="#ffffff" strokeWidth="1.5" mask="url(#crystalFillMask)" opacity="0.4" />
              <path d="M43 40 L85 75" stroke="#ffffff" strokeWidth="1.5" mask="url(#crystalFillMask)" opacity="0.3" />
              <path d="M85 40 L43 75" stroke="#ffffff" strokeWidth="1.5" mask="url(#crystalFillMask)" opacity="0.3" />
              <path d="M43 40 L64 57.5 L85 40" stroke="#b0e0e6" strokeWidth="1" mask="url(#crystalFillMask)" opacity="0.5" />
              <path d="M43 75 L64 57.5 L85 75" stroke="#b0e0e6" strokeWidth="1" mask="url(#crystalFillMask)" opacity="0.5" />
              
              {/* Inner Glow */}
              <ellipse cx="64" cy="57" rx="15" ry="20" fill="#ffffff" mask="url(#crystalFillMask)" opacity="0.5" />
              
              {/* Crystal Eyes */}
              <circle cx="58" cy="55" r="3" fill="#4682b4" />
              <circle cx="70" cy="55" r="3" fill="#4682b4" />
              <circle cx="59" cy="54" r="1" fill="#fff" />
              <circle cx="71" cy="54" r="1" fill="#fff" />
              
              {/* Crystal Smile */}
              <path d="M58 66 Q64 70, 70 66" fill="none" stroke="#87ceeb" strokeWidth="2" mask="url(#crystalFillMask)" />
              
              {/* Sparkle Points */}
              <circle cx="50" cy="35" r="2" fill="#ffffff" mask="url(#crystalFillMask)" opacity="0.9" />
              <circle cx="78" cy="35" r="2" fill="#ffffff" mask="url(#crystalFillMask)" opacity="0.9" />
              <circle cx="38" cy="57" r="1.5" fill="#e0ffff" mask="url(#crystalFillMask)" opacity="0.8" />
              <circle cx="90" cy="57" r="1.5" fill="#e0ffff" mask="url(#crystalFillMask)" opacity="0.8" />
              <circle cx="64" cy="100" r="2.5" fill="#b0e0e6" mask="url(#crystalFillMask)" opacity="0.7" />
              
              {/* Light Refraction */}
              <path d="M64 20 L60 10" stroke="#e0ffff" strokeWidth="2" mask="url(#crystalFillMask)" opacity="0.6" />
              <path d="M64 20 L68 10" stroke="#87ceeb" strokeWidth="2" mask="url(#crystalFillMask)" opacity="0.6" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            💎 Crystal
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-cyan-600">
            {Math.round(crystalFill)}%
          </div>
        </div>
        )}
        {/* Leaf Character with Interactive Features */}
        {shouldShowCharacter('leaf') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="leaf"
          onClick={() => handleCharacterClick('leaf')}
          onMouseEnter={() => handleCharacterHover('leaf')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'leaf' ? [1, 1.1, 1] : [1, 1.05, 1],
              rotate: hoveredCharacter === 'leaf' ? [0, 5, -5, 0] : [0, 2, -2, 0],
              y: clickedCharacter === 'leaf' ? [0, -8, 0] : 0,
            }}
            transition={{
              duration: hoveredCharacter === 'leaf' ? 0.7 : 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.15,
              filter: "brightness(1.2)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#98fb98" />
                  <stop offset="50%" stopColor="#32cd32" />
                  <stop offset="100%" stopColor="#228b22" />
                </linearGradient>
                <radialGradient id="leaf3D" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#adff2f" />
                  <stop offset="50%" stopColor="#32cd32" />
                  <stop offset="100%" stopColor="#228b22" />
                </radialGradient>
                <filter id="leafShadow">
                  <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.2"/>
                </filter>
                <mask id="leafFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (leafFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Leaf Body */}
              <path
                d="M64 20 Q80 30, 90 50 Q95 70, 85 85 Q75 95, 64 100 Q53 95, 43 85 Q33 70, 38 50 Q48 30, 64 20 Z"
                fill="url(#leaf3D)"
                mask="url(#leafFillMask)"
                filter="url(#leafShadow)"
                stroke="#228b22"
                strokeWidth="2"
              />
              
              {/* Central Vein */}
              <path d="M64 20 Q64 40, 64 100" stroke="#90ee90" strokeWidth="2.5" mask="url(#leafFillMask)" />
              
              {/* Side Veins */}
              <path d="M64 35 Q55 45, 48 50" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              <path d="M64 35 Q73 45, 80 50" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              <path d="M64 50 Q55 58, 48 65" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              <path d="M64 50 Q73 58, 80 65" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              <path d="M64 65 Q55 72, 50 78" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              <path d="M64 65 Q73 72, 78 78" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              <path d="M64 80 Q58 88, 55 92" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              <path d="M64 80 Q70 88, 73 92" stroke="#90ee90" strokeWidth="1.5" mask="url(#leafFillMask)" opacity="0.7" />
              
              {/* Leaf Eyes */}
              <circle cx="58" cy="55" r="4" fill="#1a5c1a" />
              <circle cx="70" cy="55" r="4" fill="#1a5c1a" />
              <circle cx="59" cy="54" r="1.5" fill="#fff" />
              <circle cx="71" cy="54" r="1.5" fill="#fff" />
              
              {/* Leaf Smile */}
              <path d="M56 68 Q64 74, 72 68" fill="none" stroke="#228b22" strokeWidth="2" mask="url(#leafFillMask)" />
              
              {/* Dew Drops */}
              <circle cx="75" cy="40" r="2.5" fill="rgba(255,255,255,0.6)" mask="url(#leafFillMask)" stroke="#e0ffff" strokeWidth="1" />
              <circle cx="52" cy="45" r="2" fill="rgba(255,255,255,0.5)" mask="url(#leafFillMask)" stroke="#e0ffff" strokeWidth="1" />
              <circle cx="78" cy="75" r="1.8" fill="rgba(255,255,255,0.5)" mask="url(#leafFillMask)" stroke="#e0ffff" strokeWidth="1" />
              
              {/* Shine Spots */}
              <ellipse cx="55" cy="38" rx="6" ry="8" fill="rgba(255,255,255,0.25)" mask="url(#leafFillMask)" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            🍃 Leaf
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-green-600">
            {Math.round(leafFill)}%
          </div>
        </div>
        )}
        {/* Cloud Character with Interactive Features */}
        {shouldShowCharacter('cloud') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="cloud"
          onClick={() => handleCharacterClick('cloud')}
          onMouseEnter={() => handleCharacterHover('cloud')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'cloud' ? [1, 1.12, 1] : [1, 1.06, 1],
              x: hoveredCharacter === 'cloud' ? [0, 3, -3, 0] : [0, 2, -2, 0],
              y: clickedCharacter === 'cloud' ? [0, -6, 0] : 0,
            }}
            transition={{
              duration: hoveredCharacter === 'cloud' ? 1.2 : 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.15,
              filter: "brightness(1.2)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <radialGradient id="cloud3D" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#f0f8ff" />
                  <stop offset="100%" stopColor="#e0e0e0" />
                </radialGradient>
                <filter id="cloudShadow">
                  <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15"/>
                </filter>
                <mask id="cloudFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (cloudFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Cloud Puffs - Main Body */}
              <circle cx="50" cy="65" r="22" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
              <circle cx="78" cy="65" r="22" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
              <circle cx="64" cy="50" r="25" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
              <circle cx="38" cy="75" r="18" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
              <circle cx="90" cy="75" r="18" fill="url(#cloud3D)" mask="url(#cloudFillMask)" filter="url(#cloudShadow)" />
              
              {/* Cloud Outlines */}
              <circle cx="50" cy="65" r="22" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
              <circle cx="78" cy="65" r="22" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
              <circle cx="64" cy="50" r="25" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
              <circle cx="38" cy="75" r="18" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
              <circle cx="90" cy="75" r="18" fill="none" stroke="#d3d3d3" strokeWidth="1.5" />
              
              {/* Cloud Eyes */}
              <circle cx="58" cy="58" r="4" fill="#87ceeb" />
              <circle cx="70" cy="58" r="4" fill="#87ceeb" />
              <circle cx="59" cy="57" r="1.5" fill="#fff" />
              <circle cx="71" cy="57" r="1.5" fill="#fff" />
              
              {/* Cloud Smile */}
              <path d="M56 70 Q64 76, 72 70" fill="none" stroke="#b0c4de" strokeWidth="2.5" mask="url(#cloudFillMask)" />
              
              {/* Fluffy Details */}
              <ellipse cx="48" cy="45" rx="8" ry="10" fill="rgba(255,255,255,0.6)" mask="url(#cloudFillMask)" />
              <ellipse cx="75" cy="42" rx="7" ry="9" fill="rgba(255,255,255,0.5)" mask="url(#cloudFillMask)" />
              
              {/* Wind Lines */}
              <path d="M100 55 L115 55" stroke="#d3d3d3" strokeWidth="2" opacity="0.5" mask="url(#cloudFillMask)" />
              <path d="M102 65 L120 65" stroke="#d3d3d3" strokeWidth="2" opacity="0.4" mask="url(#cloudFillMask)" />
              <path d="M98 75 L112 75" stroke="#d3d3d3" strokeWidth="2" opacity="0.3" mask="url(#cloudFillMask)" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            ☁️ Cloud
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-500">
            {Math.round(cloudFill)}%
          </div>
        </div>
        )}
        {/* Bolt Character with Interactive Features */}
        {shouldShowCharacter('bolt') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="bolt"
          onClick={() => handleCharacterClick('bolt')}
          onMouseEnter={() => handleCharacterHover('bolt')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'bolt' ? [1, 1.25, 1] : [1, 1.12, 1],
              rotate: clickedCharacter === 'bolt' ? [0, 20, -20, 0] : 0,
            }}
            transition={{
              duration: hoveredCharacter === 'bolt' ? 0.15 : 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.3,
              filter: "brightness(1.5) drop-shadow(0 0 20px rgba(255,255,0,0.9))",
              transition: { duration: 0.1 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.05 }
            }}
            className={`${hoveredCharacter === 'bolt' ? 'drop-shadow-2xl' : ''}`}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="boltGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffff00" />
                  <stop offset="50%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#ff8c00" />
                </linearGradient>
                <radialGradient id="bolt3D" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#ffff00" />
                  <stop offset="100%" stopColor="#ff8c00" />
                </radialGradient>
                <filter id="boltGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="boltFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (boltFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Bolt Main Shape */}
              <path
                d="M70 10 L45 60 L60 60 L50 110 L95 50 L75 50 L85 10 Z"
                fill="url(#bolt3D)"
                mask="url(#boltFillMask)"
                filter="url(#boltGlow)"
                stroke="#ffd700"
                strokeWidth="3"
              />
              
              {/* Inner Lightning Core */}
              <path
                d="M70 20 L52 60 L62 60 L58 90 L85 50 L73 50 L78 20 Z"
                fill="#ffffff"
                mask="url(#boltFillMask)"
                opacity="0.7"
              />
              
              {/* Bolt Eyes */}
              <circle cx="62" cy="45" r="3" fill="#333" />
              <circle cx="73" cy="45" r="3" fill="#333" />
              <circle cx="63" cy="44" r="1" fill="#fff" />
              <circle cx="74" cy="44" r="1" fill="#fff" />
              
              {/* Bolt Smile */}
              <path d="M60 55 Q67.5 60, 75 55" fill="none" stroke="#ff8c00" strokeWidth="2" mask="url(#boltFillMask)" />
              
              {/* Electric Sparks */}
              <circle cx="40" cy="55" r="2.5" fill="#ffff00" mask="url(#boltFillMask)" opacity="0.8" />
              <circle cx="95" cy="45" r="2" fill="#ffd700" mask="url(#boltFillMask)" opacity="0.8" />
              <circle cx="48" cy="105" r="2.2" fill="#ff8c00" mask="url(#boltFillMask)" opacity="0.7" />
              
              {/* Energy Lines */}
              <line x1="35" y1="50" x2="25" y2="45" stroke="#ffff00" strokeWidth="2" mask="url(#boltFillMask)" opacity="0.6" />
              <line x1="100" y1="48" x2="110" y2="43" stroke="#ffd700" strokeWidth="2" mask="url(#boltFillMask)" opacity="0.6" />
              <line x1="45" y1="100" x2="35" y2="105" stroke="#ff8c00" strokeWidth="2" mask="url(#boltFillMask)" opacity="0.5" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            ⚡ Bolt
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-500">
            {Math.round(boltFill)}%
          </div>
        </div>
        )}
        {/* Raindrop Character with Interactive Features */}
        {shouldShowCharacter('raindrop') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="raindrop"
          onClick={() => handleCharacterClick('raindrop')}
          onMouseEnter={() => handleCharacterHover('raindrop')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'raindrop' ? [1, 1.1, 1] : [1, 1.05, 1],
              y: clickedCharacter === 'raindrop' ? [0, -10, 0] : [0, -2, 0, 2, 0],
            }}
            transition={{
              duration: hoveredCharacter === 'raindrop' ? 0.6 : 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.15,
              filter: "brightness(1.2)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="raindropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#add8e6" />
                  <stop offset="50%" stopColor="#4682b4" />
                  <stop offset="100%" stopColor="#1e90ff" />
                </linearGradient>
                <radialGradient id="raindrop3D" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#e0ffff" />
                  <stop offset="50%" stopColor="#87ceeb" />
                  <stop offset="100%" stopColor="#4682b4" />
                </radialGradient>
                <filter id="raindropShadow">
                  <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.2"/>
                </filter>
                <mask id="raindropFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (raindropFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Raindrop Body - Teardrop Shape */}
              <path
                d="M64 20 Q50 35, 45 55 Q40 75, 45 85 Q50 95, 64 100 Q78 95, 83 85 Q88 75, 83 55 Q78 35, 64 20 Z"
                fill="url(#raindrop3D)"
                mask="url(#raindropFillMask)"
                filter="url(#raindropShadow)"
                stroke="#4682b4"
                strokeWidth="2"
              />
              
              {/* Shine Highlight */}
              <ellipse cx="55" cy="40" rx="10" ry="15" fill="rgba(255,255,255,0.6)" mask="url(#raindropFillMask)" />
              <ellipse cx="52" cy="35" rx="5" ry="8" fill="rgba(255,255,255,0.8)" mask="url(#raindropFillMask)" />
              
              {/* Raindrop Eyes */}
              <circle cx="58" cy="58" r="4" fill="#1e90ff" />
              <circle cx="70" cy="58" r="4" fill="#1e90ff" />
              <circle cx="59" cy="57" r="1.5" fill="#fff" />
              <circle cx="71" cy="57" r="1.5" fill="#fff" />
              
              {/* Raindrop Smile */}
              <path d="M56 70 Q64 76, 72 70" fill="none" stroke="#4682b4" strokeWidth="2" mask="url(#raindropFillMask)" />
              
              {/* Water Ripple Effect */}
              <ellipse cx="64" cy="60" rx="15" ry="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" mask="url(#raindropFillMask)" />
              
              {/* Small Droplets */}
              <circle cx="45" cy="50" r="2" fill="rgba(173,216,230,0.6)" mask="url(#raindropFillMask)" stroke="#87ceeb" strokeWidth="1" />
              <circle cx="83" cy="55" r="1.8" fill="rgba(173,216,230,0.6)" mask="url(#raindropFillMask)" stroke="#87ceeb" strokeWidth="1" />
              
              {/* Inner Reflection */}
              <path d="M70 45 Q75 50, 78 55" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" mask="url(#raindropFillMask)" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            💧 Raindrop
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-500">
            {Math.round(raindropFill)}%
          </div>
        </div>
        )}
        {/* Ice Character with Interactive Features */}
        {shouldShowCharacter('ice') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="ice"
          onClick={() => handleCharacterClick('ice')}
          onMouseEnter={() => handleCharacterHover('ice')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'ice' ? [1, 1.15, 1] : [1, 1.08, 1],
              rotate: hoveredCharacter === 'ice' ? [0, 5, -5, 0] : [0, 2, -2, 0],
            }}
            transition={{
              duration: hoveredCharacter === 'ice' ? 0.8 : 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{ 
              scale: 1.2,
              filter: "brightness(1.3) drop-shadow(0 0 15px rgba(173,216,230,0.8))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <linearGradient id="iceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f0ffff" />
                  <stop offset="50%" stopColor="#b0e0e6" />
                  <stop offset="100%" stopColor="#87ceeb" />
                </linearGradient>
                <radialGradient id="ice3D" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#e0ffff" />
                  <stop offset="100%" stopColor="#add8e6" />
                </radialGradient>
                <filter id="iceGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="iceFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (iceFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Ice Crystal - Snowflake Shape */}
              {/* Center Hexagon */}
              <path
                d="M64 45 L75 51 L75 63 L64 69 L53 63 L53 51 Z"
                fill="url(#ice3D)"
                mask="url(#iceFillMask)"
                filter="url(#iceGlow)"
                stroke="#87ceeb"
                strokeWidth="2"
              />
              
              {/* Snowflake Arms */}
              <line x1="64" y1="20" x2="64" y2="45" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
              <line x1="64" y1="69" x2="64" y2="100" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
              <line x1="35" y1="35" x2="53" y2="51" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
              <line x1="75" y1="63" x2="93" y2="85" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
              <line x1="93" y1="35" x2="75" y2="51" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
              <line x1="53" y1="63" x2="35" y2="85" stroke="url(#iceGradient)" strokeWidth="3" mask="url(#iceFillMask)" />
              
              {/* Ice Crystals at Tips */}
              <circle cx="64" cy="20" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
              <circle cx="64" cy="100" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
              <circle cx="35" cy="35" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
              <circle cx="93" cy="85" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
              <circle cx="93" cy="35" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
              <circle cx="35" cy="85" r="4" fill="#ffffff" mask="url(#iceFillMask)" stroke="#b0e0e6" strokeWidth="1.5" />
              
              {/* Ice Eyes */}
              <circle cx="60" cy="56" r="3" fill="#4682b4" />
              <circle cx="68" cy="56" r="3" fill="#4682b4" />
              <circle cx="61" cy="55" r="1" fill="#fff" />
              <circle cx="69" cy="55" r="1" fill="#fff" />
              
              {/* Ice Smile */}
              <path d="M58 62 Q64 65, 70 62" fill="none" stroke="#87ceeb" strokeWidth="2" mask="url(#iceFillMask)" />
              
              {/* Frost Details */}
              <circle cx="50" cy="45" r="1.5" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.8" />
              <circle cx="78" cy="50" r="1.5" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.8" />
              <circle cx="60" cy="75" r="1.2" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.7" />
              <circle cx="72" cy="70" r="1.3" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.7" />
              
              {/* Inner Sparkles */}
              <path d="M64 30 L65 35 L64 40 L63 35 Z" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.6" />
              <path d="M45 45 L50 46 L45 47 L40 46 Z" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.6" />
              <path d="M83 75 L88 76 L83 77 L78 76 Z" fill="#ffffff" mask="url(#iceFillMask)" opacity="0.6" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            ❄️ Ice
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-cyan-500">
            {Math.round(iceFill)}%
          </div>
        </div>
        )}
        {/* Sunbeam Character with Interactive Features */}
        {shouldShowCharacter('sunbeam') && (
        <div 
          className="relative w-32 h-32 cursor-pointer"
          data-character="sunbeam"
          onClick={() => handleCharacterClick('sunbeam')}
          onMouseEnter={() => handleCharacterHover('sunbeam')}
          onMouseLeave={() => handleCharacterHover(null)}
        >
          <motion.div
            animate={{
              scale: hoveredCharacter === 'sunbeam' ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: hoveredCharacter === 'sunbeam' ? [0, 360] : [0, 180],
            }}
            transition={{
              duration: hoveredCharacter === 'sunbeam' ? 2 : 4,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ 
              scale: 1.25,
              filter: "brightness(1.4) drop-shadow(0 0 25px rgba(255,215,0,0.8))",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
          >
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              className="w-32 h-32"
            >
              <defs>
                <radialGradient id="sunbeam3D" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#ffd700" />
                  <stop offset="70%" stopColor="#ff8c00" />
                  <stop offset="100%" stopColor="#ff6347" />
                </radialGradient>
                <radialGradient id="sunbeamCore" cx="50%" cy="50%" r="40%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#ffff00" />
                  <stop offset="100%" stopColor="#ffd700" />
                </radialGradient>
                <filter id="sunbeamGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <mask id="sunbeamFillMask">
                  <rect 
                    x="0" 
                    y="0" 
                    width="128" 
                    height="128" 
                    fill="white"
                    transform={`translate(0, ${128 - (sunbeamFill * 1.28)})`}
                  />
                </mask>
              </defs>
              
              {/* Sun Rays - Long */}
              <line x1="64" y1="10" x2="64" y2="30" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
              <line x1="64" y1="98" x2="64" y2="118" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
              <line x1="10" y1="64" x2="30" y2="64" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
              <line x1="98" y1="64" x2="118" y2="64" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.8" />
              
              {/* Sun Rays - Diagonal */}
              <line x1="25" y1="25" x2="38" y2="38" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
              <line x1="103" y1="103" x2="90" y2="90" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
              <line x1="103" y1="25" x2="90" y2="38" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
              <line x1="25" y1="103" x2="38" y2="90" stroke="#ffd700" strokeWidth="4" mask="url(#sunbeamFillMask)" opacity="0.7" />
              
              {/* Sun Core Body */}
              <circle cx="64" cy="64" r="28" fill="url(#sunbeam3D)" mask="url(#sunbeamFillMask)" filter="url(#sunbeamGlow)" />
              <circle cx="64" cy="64" r="28" fill="none" stroke="#ff8c00" strokeWidth="2" />
              
              {/* Inner Core */}
              <circle cx="64" cy="64" r="18" fill="url(#sunbeamCore)" mask="url(#sunbeamFillMask)" opacity="0.8" />
              
              {/* Sun Eyes */}
              <circle cx="58" cy="60" r="4" fill="#ff8c00" />
              <circle cx="70" cy="60" r="4" fill="#ff8c00" />
              <circle cx="59" cy="59" r="1.5" fill="#fff" />
              <circle cx="71" cy="59" r="1.5" fill="#fff" />
              
              {/* Sun Smile */}
              <path d="M56 70 Q64 76, 72 70" fill="none" stroke="#ff8c00" strokeWidth="2.5" mask="url(#sunbeamFillMask)" />
              
              {/* Sparkles */}
              <circle cx="48" cy="50" r="2" fill="#ffffff" mask="url(#sunbeamFillMask)" opacity="0.9" />
              <circle cx="80" cy="52" r="2" fill="#ffffff" mask="url(#sunbeamFillMask)" opacity="0.9" />
              <circle cx="60" cy="80" r="1.8" fill="#ffffff" mask="url(#sunbeamFillMask)" opacity="0.8" />
              
              {/* Ray Tips - Small Stars */}
              <path d="M64 8 L65 12 L64 16 L63 12 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
              <path d="M64 112 L65 116 L64 120 L63 116 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
              <path d="M8 64 L12 65 L16 64 L12 63 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
              <path d="M112 64 L116 65 L120 64 L116 63 Z" fill="#ffff00" mask="url(#sunbeamFillMask)" opacity="0.8" />
            </svg>
          </motion.div>
          
          {/* Character Name */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded">
            ☀️ Sunbeam
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-600">
            {Math.round(sunbeamFill)}%
          </div>
        </div>
        )}
          </div>
        </div>
        )}

        {/* Flicker Roar Category */}
        {activeCategory === 'beastlings' && (
        <div>
          {!compactMode && (
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            🦁 Flicker Roar
          </h2>
          )}
          <div className="flex flex-wrap items-center justify-center gap-8 py-8">
            
            {/* Tiger */}
            {shouldShowCharacter('tiger') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="tiger" onClick={() => handleCharacterClick('tiger')} onMouseEnter={() => handleCharacterHover('tiger')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'tiger' ? [1, 1.2, 1] : [1, 1.1, 1], rotate: clickedCharacter === 'tiger' ? [0, 10, -10, 0] : 0 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.2) drop-shadow(0 0 15px rgba(255,140,0,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'tiger' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="tigerBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffa500" />
                      <stop offset="50%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ff7700" />
                    </linearGradient>
                    <filter id="tigerGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="tigerFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (tigerFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="85" rx="32" ry="35" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" filter="url(#tigerGlow)" />
                  <ellipse cx="64" cy="85" rx="32" ry="35" fill="none" stroke="#ff6347" strokeWidth="2" />
                  {/* Head */}
                  <ellipse cx="64" cy="45" rx="28" ry="30" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" />
                  <ellipse cx="64" cy="45" rx="28" ry="30" fill="none" stroke="#ff6347" strokeWidth="2" />
                  {/* Ears */}
                  <ellipse cx="42" cy="25" rx="10" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" transform="rotate(-15 42 25)" />
                  <ellipse cx="86" cy="25" rx="10" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" transform="rotate(15 86 25)" />
                  <ellipse cx="42" cy="27" rx="5" ry="8" fill="#ffb366" mask="url(#tigerFillMask)" transform="rotate(-15 42 27)" />
                  <ellipse cx="86" cy="27" rx="5" ry="8" fill="#ffb366" mask="url(#tigerFillMask)" transform="rotate(15 86 27)" />
                  {/* Tiger Stripes - Black */}
                  <path d="M50 35 L48 40" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
                  <path d="M78 35 L80 40" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
                  <path d="M45 45 L43 50" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
                  <path d="M83 45 L85 50" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
                  <path d="M50 90 L48 95" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
                  <path d="M78 90 L80 95" stroke="#000" strokeWidth="2.5" mask="url(#tigerFillMask)" opacity="0.8" />
                  <path d="M55 85 L53 92" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
                  <path d="M73 85 L75 92" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" opacity="0.7" />
                  {/* Snout area */}
                  <ellipse cx="64" cy="55" rx="18" ry="15" fill="#ffcc99" mask="url(#tigerFillMask)" opacity="0.9" />
                  {/* Eyes */}
                  <ellipse cx="54" cy="45" rx="5" ry="7" fill="#fff" mask="url(#tigerFillMask)" />
                  <ellipse cx="74" cy="45" rx="5" ry="7" fill="#fff" mask="url(#tigerFillMask)" />
                  <ellipse cx="54" cy="46" rx="3" ry="5" fill="#000" mask="url(#tigerFillMask)" />
                  <ellipse cx="74" cy="46" rx="3" ry="5" fill="#000" mask="url(#tigerFillMask)" />
                  <circle cx="54.5" cy="44" r="1.5" fill="#fff" mask="url(#tigerFillMask)" opacity="0.9" />
                  <circle cx="74.5" cy="44" r="1.5" fill="#fff" mask="url(#tigerFillMask)" opacity="0.9" />
                  {/* Nose */}
                  <path d="M64 60 L60 64 L64 66 L68 64 Z" fill="#000" mask="url(#tigerFillMask)" />
                  {/* Mouth */}
                  <path d="M64 66 L64 70" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" />
                  <path d="M64 70 Q58 72, 54 70" fill="none" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" />
                  <path d="M64 70 Q70 72, 74 70" fill="none" stroke="#000" strokeWidth="2" mask="url(#tigerFillMask)" />
                  {/* Whiskers */}
                  <line x1="45" y1="55" x2="30" y2="53" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
                  <line x1="45" y1="60" x2="30" y2="60" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
                  <line x1="83" y1="55" x2="98" y2="53" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
                  <line x1="83" y1="60" x2="98" y2="60" stroke="#333" strokeWidth="1.5" mask="url(#tigerFillMask)" />
                  {/* Legs */}
                  <ellipse cx="50" cy="110" rx="8" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" />
                  <ellipse cx="78" cy="110" rx="8" ry="14" fill="url(#tigerBodyGrad)" mask="url(#tigerFillMask)" />
                  {/* Paws */}
                  <ellipse cx="50" cy="118" rx="7" ry="4" fill="#ff8c00" mask="url(#tigerFillMask)" />
                  <ellipse cx="78" cy="118" rx="7" ry="4" fill="#ff8c00" mask="url(#tigerFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐅 Tiger</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(tigerFill)}%</div>
            </div>
            )}
            {/* Wolf */}
            {shouldShowCharacter('wolf') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="wolf" onClick={() => handleCharacterClick('wolf')} onMouseEnter={() => handleCharacterHover('wolf')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'wolf' ? [1, 1.18, 1] : [1, 1.08, 1] }} transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.3) drop-shadow(0 0 15px rgba(128,128,128,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'wolf' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="wolfBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a9a9a9" />
                      <stop offset="50%" stopColor="#808080" />
                      <stop offset="100%" stopColor="#696969" />
                    </linearGradient>
                    <filter id="wolfGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="wolfFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (wolfFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="85" rx="30" ry="36" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" filter="url(#wolfGlow)" />
                  <ellipse cx="64" cy="85" rx="30" ry="36" fill="none" stroke="#696969" strokeWidth="2" />
                  {/* Head - more elongated for wolf snout */}
                  <ellipse cx="64" cy="42" rx="26" ry="28" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
                  <ellipse cx="64" cy="42" rx="26" ry="28" fill="none" stroke="#696969" strokeWidth="2" />
                  {/* Pointed Ears */}
                  <path d="M42 18 L38 8 L45 22 Z" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
                  <path d="M42 18 L38 8 L45 22 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
                  <path d="M86 18 L90 8 L83 22 Z" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
                  <path d="M86 18 L90 8 L83 22 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
                  {/* Inner ears */}
                  <path d="M42 18 L40 12 L43 20 Z" fill="#999" mask="url(#wolfFillMask)" />
                  <path d="M86 18 L88 12 L85 20 Z" fill="#999" mask="url(#wolfFillMask)" />
                  {/* Snout - elongated */}
                  <ellipse cx="64" cy="55" rx="16" ry="18" fill="#d3d3d3" mask="url(#wolfFillMask)" opacity="0.9" />
                  {/* Eyes - wolf-like yellow */}
                  <ellipse cx="54" cy="40" rx="5" ry="7" fill="#ffcc00" mask="url(#wolfFillMask)" />
                  <ellipse cx="74" cy="40" rx="5" ry="7" fill="#ffcc00" mask="url(#wolfFillMask)" />
                  <ellipse cx="54" cy="40" rx="2.5" ry="5" fill="#000" mask="url(#wolfFillMask)" />
                  <ellipse cx="74" cy="40" rx="2.5" ry="5" fill="#000" mask="url(#wolfFillMask)" />
                  <circle cx="54.5" cy="38" r="1" fill="#fff" mask="url(#wolfFillMask)" opacity="0.9" />
                  <circle cx="74.5" cy="38" r="1" fill="#fff" mask="url(#wolfFillMask)" opacity="0.9" />
                  {/* Nose */}
                  <ellipse cx="64" cy="62" rx="4" ry="5" fill="#000" mask="url(#wolfFillMask)" />
                  {/* Mouth */}
                  <path d="M64 67 L64 72" stroke="#000" strokeWidth="2" mask="url(#wolfFillMask)" />
                  <path d="M64 72 Q58 75, 54 73" fill="none" stroke="#000" strokeWidth="2" mask="url(#wolfFillMask)" />
                  <path d="M64 72 Q70 75, 74 73" fill="none" stroke="#000" strokeWidth="2" mask="url(#wolfFillMask)" />
                  {/* Chest fur */}
                  <ellipse cx="64" cy="75" rx="18" ry="22" fill="#d3d3d3" mask="url(#wolfFillMask)" opacity="0.6" />
                  {/* Legs */}
                  <ellipse cx="50" cy="108" rx="7" ry="13" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
                  <ellipse cx="78" cy="108" rx="7" ry="13" fill="url(#wolfBodyGrad)" mask="url(#wolfFillMask)" />
                  {/* Paws */}
                  <ellipse cx="50" cy="116" rx="6" ry="4" fill="#696969" mask="url(#wolfFillMask)" />
                  <ellipse cx="78" cy="116" rx="6" ry="4" fill="#696969" mask="url(#wolfFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐺 Wolf</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600">{Math.round(wolfFill)}%</div>
            </div>
            )}
            {/* Eagle */}
            {shouldShowCharacter('eagle') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="eagle" onClick={() => handleCharacterClick('eagle')} onMouseEnter={() => handleCharacterHover('eagle')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'eagle' ? [1, 1.2, 1] : [1, 1.08, 1], y: hoveredCharacter === 'eagle' ? [0, -8, 0] : [0, -3, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.2) drop-shadow(0 0 15px rgba(184,134,11,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'eagle' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="eagleBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#daa520" />
                      <stop offset="50%" stopColor="#b8860b" />
                      <stop offset="100%" stopColor="#8b6914" />
                    </linearGradient>
                    <filter id="eagleGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="eagleFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (eagleFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Wings - spread out */}
                  <ellipse cx="35" cy="70" rx="22" ry="35" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" transform="rotate(-20 35 70)" filter="url(#eagleGlow)" />
                  <ellipse cx="35" cy="70" rx="22" ry="35" fill="none" stroke="#8b6914" strokeWidth="2" transform="rotate(-20 35 70)" />
                  <ellipse cx="93" cy="70" rx="22" ry="35" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" transform="rotate(20 93 70)" filter="url(#eagleGlow)" />
                  <ellipse cx="93" cy="70" rx="22" ry="35" fill="none" stroke="#8b6914" strokeWidth="2" transform="rotate(20 93 70)" />
                  {/* Wing feathers */}
                  <path d="M20 75 L15 80 L20 85" fill="none" stroke="#8b6914" strokeWidth="2" mask="url(#eagleFillMask)" />
                  <path d="M108 75 L113 80 L108 85" fill="none" stroke="#8b6914" strokeWidth="2" mask="url(#eagleFillMask)" />
                  {/* Body */}
                  <ellipse cx="64" cy="75" rx="24" ry="32" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" filter="url(#eagleGlow)" />
                  <ellipse cx="64" cy="75" rx="24" ry="32" fill="none" stroke="#8b6914" strokeWidth="2" />
                  {/* Head */}
                  <circle cx="64" cy="42" r="20" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
                  <circle cx="64" cy="42" r="20" fill="none" stroke="#8b6914" strokeWidth="2" />
                  {/* White head feathers */}
                  <ellipse cx="64" cy="35" rx="18" ry="15" fill="#fff" mask="url(#eagleFillMask)" opacity="0.9" />
                  {/* Eyes - fierce */}
                  <ellipse cx="56" cy="40" rx="4" ry="5" fill="#fff" mask="url(#eagleFillMask)" />
                  <ellipse cx="72" cy="40" rx="4" ry="5" fill="#fff" mask="url(#eagleFillMask)" />
                  <circle cx="56" cy="40" r="3" fill="#000" mask="url(#eagleFillMask)" />
                  <circle cx="72" cy="40" r="3" fill="#000" mask="url(#eagleFillMask)" />
                  <circle cx="56.5" cy="39" r="1" fill="#fff" mask="url(#eagleFillMask)" />
                  <circle cx="72.5" cy="39" r="1" fill="#fff" mask="url(#eagleFillMask)" />
                  {/* Hooked Beak */}
                  <path d="M64 48 L58 54 L62 56 L64 58 L66 56 L70 54 Z" fill="#ffa500" mask="url(#eagleFillMask)" />
                  <path d="M64 48 L58 54 L62 56 L64 58" fill="none" stroke="#ff8c00" strokeWidth="1.5" />
                  {/* Tail feathers */}
                  <path d="M54 100 L50 115 L54 108 Z" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
                  <path d="M64 102 L64 118 L64 110 Z" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
                  <path d="M74 100 L78 115 L74 108 Z" fill="url(#eagleBodyGrad)" mask="url(#eagleFillMask)" />
                  {/* Talons */}
                  <path d="M56 100 L54 110 L52 108" fill="none" stroke="#333" strokeWidth="2" mask="url(#eagleFillMask)" />
                  <path d="M72 100 L74 110 L76 108" fill="none" stroke="#333" strokeWidth="2" mask="url(#eagleFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🦅 Eagle</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-700">{Math.round(eagleFill)}%</div>
            </div>
            )}
            {/* Panther */}
            {shouldShowCharacter('panther') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="panther" onClick={() => handleCharacterClick('panther')} onMouseEnter={() => handleCharacterHover('panther')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'panther' ? [1, 1.18, 1] : [1, 1.08, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.4) drop-shadow(0 0 20px rgba(100,100,100,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'panther' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="pantherBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4a4a4a" />
                      <stop offset="50%" stopColor="#2f2f2f" />
                      <stop offset="100%" stopColor="#1a1a1a" />
                    </linearGradient>
                    <filter id="pantherGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="pantherFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (pantherFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Sleek body */}
                  <ellipse cx="64" cy="82" rx="30" ry="36" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" filter="url(#pantherGlow)" />
                  <ellipse cx="64" cy="82" rx="30" ry="36" fill="none" stroke="#555" strokeWidth="2" />
                  {/* Head - cat-like */}
                  <ellipse cx="64" cy="42" rx="24" ry="26" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
                  <ellipse cx="64" cy="42" rx="24" ry="26" fill="none" stroke="#555" strokeWidth="2" />
                  {/* Pointed cat ears */}
                  <path d="M46 20 L42 10 L48 24 Z" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
                  <path d="M46 20 L42 10 L48 24 Z" fill="none" stroke="#555" strokeWidth="1.5" />
                  <path d="M82 20 L86 10 L80 24 Z" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
                  <path d="M82 20 L86 10 L80 24 Z" fill="none" stroke="#555" strokeWidth="1.5" />
                  {/* Inner ears */}
                  <path d="M46 20 L44 14 L47 22 Z" fill="#333" mask="url(#pantherFillMask)" />
                  <path d="M82 20 L84 14 L81 22 Z" fill="#333" mask="url(#pantherFillMask)" />
                  {/* Sleek snout */}
                  <ellipse cx="64" cy="52" rx="16" ry="14" fill="#2a2a2a" mask="url(#pantherFillMask)" opacity="0.8" />
                  {/* Cat-like green glowing eyes */}
                  <ellipse cx="54" cy="42" rx="6" ry="9" fill="#32cd32" mask="url(#pantherFillMask)" />
                  <ellipse cx="74" cy="42" rx="6" ry="9" fill="#32cd32" mask="url(#pantherFillMask)" />
                  <ellipse cx="54" cy="42" rx="2.5" ry="7" fill="#000" mask="url(#pantherFillMask)" />
                  <ellipse cx="74" cy="42" rx="2.5" ry="7" fill="#000" mask="url(#pantherFillMask)" />
                  <circle cx="54.5" cy="40" r="1.5" fill="#fff" mask="url(#pantherFillMask)" opacity="0.9" />
                  <circle cx="74.5" cy="40" r="1.5" fill="#fff" mask="url(#pantherFillMask)" opacity="0.9" />
                  {/* Small pink nose */}
                  <ellipse cx="64" cy="56" rx="3" ry="4" fill="#ff69b4" mask="url(#pantherFillMask)" opacity="0.8" />
                  {/* Mouth */}
                  <path d="M64 60 L64 64" stroke="#111" strokeWidth="2" mask="url(#pantherFillMask)" />
                  <path d="M64 64 Q58 66, 54 64" fill="none" stroke="#111" strokeWidth="2" mask="url(#pantherFillMask)" />
                  <path d="M64 64 Q70 66, 74 64" fill="none" stroke="#111" strokeWidth="2" mask="url(#pantherFillMask)" />
                  {/* Whiskers */}
                  <line x1="45" y1="52" x2="28" y2="50" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
                  <line x1="45" y1="56" x2="28" y2="56" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
                  <line x1="83" y1="52" x2="100" y2="50" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
                  <line x1="83" y1="56" x2="100" y2="56" stroke="#999" strokeWidth="1.5" mask="url(#pantherFillMask)" opacity="0.7" />
                  {/* Legs - sleek */}
                  <ellipse cx="50" cy="106" rx="7" ry="12" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
                  <ellipse cx="78" cy="106" rx="7" ry="12" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
                  {/* Paws */}
                  <ellipse cx="50" cy="114" rx="6" ry="4" fill="#1a1a1a" mask="url(#pantherFillMask)" />
                  <ellipse cx="78" cy="114" rx="6" ry="4" fill="#1a1a1a" mask="url(#pantherFillMask)" />
                  {/* Long tail */}
                  <path d="M88 90 Q100 100, 105 110 Q102 115, 95 108" fill="url(#pantherBodyGrad)" mask="url(#pantherFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐆 Panther</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-900">{Math.round(pantherFill)}%</div>
            </div>
            )}
            {/* Dragon */}
            {shouldShowCharacter('dragon') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="dragon" onClick={() => handleCharacterClick('dragon')} onMouseEnter={() => handleCharacterHover('dragon')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'dragon' ? [1, 1.25, 1] : [1, 1.12, 1], rotate: hoveredCharacter === 'dragon' ? [0, 8, -8, 0] : [0, 2, -2, 0] }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.3, filter: "brightness(1.3) drop-shadow(0 0 25px rgba(255,69,0,0.9))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'dragon' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="dragonBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4500" />
                      <stop offset="50%" stopColor="#ff6347" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                    <filter id="dragonGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="dragonFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (dragonFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Dragon Wings */}
                  <path d="M35 65 Q20 55, 15 70 Q12 85, 25 80 L35 75 Z" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" opacity="0.9" filter="url(#dragonGlow)" />
                  <path d="M35 65 Q20 55, 15 70 Q12 85, 25 80 L35 75 Z" fill="none" stroke="#ff4500" strokeWidth="2" />
                  <path d="M93 65 Q108 55, 113 70 Q116 85, 103 80 L93 75 Z" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" opacity="0.9" filter="url(#dragonGlow)" />
                  <path d="M93 65 Q108 55, 113 70 Q116 85, 103 80 L93 75 Z" fill="none" stroke="#ff4500" strokeWidth="2" />
                  {/* Body */}
                  <ellipse cx="64" cy="75" rx="32" ry="38" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" filter="url(#dragonGlow)" />
                  <ellipse cx="64" cy="75" rx="32" ry="38" fill="none" stroke="#ff4500" strokeWidth="3" />
                  {/* Neck */}
                  <ellipse cx="64" cy="55" rx="22" ry="25" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="38" rx="24" ry="26" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" />
                  <ellipse cx="64" cy="38" rx="24" ry="26" fill="none" stroke="#ff4500" strokeWidth="2" />
                  {/* Horns */}
                  <path d="M48 22 L42 10 L46 26 Z" fill="#ffd700" mask="url(#dragonFillMask)" />
                  <path d="M48 22 L42 10 L46 26 Z" fill="none" stroke="#ff8c00" strokeWidth="1.5" />
                  <path d="M80 22 L86 10 L82 26 Z" fill="#ffd700" mask="url(#dragonFillMask)" />
                  <path d="M80 22 L86 10 L82 26 Z" fill="none" stroke="#ff8c00" strokeWidth="1.5" />
                  {/* Back spikes */}
                  <path d="M64 50 L60 40 L64 50 L68 40 L64 50" fill="#ffd700" mask="url(#dragonFillMask)" opacity="0.9" />
                  <path d="M64 65 L60 55 L64 65 L68 55 L64 65" fill="#ffd700" mask="url(#dragonFillMask)" opacity="0.9" />
                  <path d="M64 80 L60 70 L64 80 L68 70 L64 80" fill="#ffd700" mask="url(#dragonFillMask)" opacity="0.9" />
                  {/* Dragon scales */}
                  <circle cx="55" cy="70" r="3" fill="#ff8c00" mask="url(#dragonFillMask)" opacity="0.7" />
                  <circle cx="73" cy="72" r="3" fill="#ff8c00" mask="url(#dragonFillMask)" opacity="0.7" />
                  <circle cx="64" cy="85" r="3" fill="#ff8c00" mask="url(#dragonFillMask)" opacity="0.7" />
                  {/* Fierce eyes */}
                  <ellipse cx="54" cy="36" rx="6" ry="8" fill="#ffff00" mask="url(#dragonFillMask)" />
                  <ellipse cx="74" cy="36" rx="6" ry="8" fill="#ffff00" mask="url(#dragonFillMask)" />
                  <ellipse cx="54" cy="36" rx="2.5" ry="6" fill="#ff0000" mask="url(#dragonFillMask)" />
                  <ellipse cx="74" cy="36" rx="2.5" ry="6" fill="#ff0000" mask="url(#dragonFillMask)" />
                  <circle cx="54.5" cy="34" r="1.5" fill="#fff" mask="url(#dragonFillMask)" opacity="0.9" />
                  <circle cx="74.5" cy="34" r="1.5" fill="#fff" mask="url(#dragonFillMask)" opacity="0.9" />
                  {/* Snout with nostrils */}
                  <ellipse cx="64" cy="48" rx="14" ry="12" fill="#ff6347" mask="url(#dragonFillMask)" opacity="0.9" />
                  <ellipse cx="60" cy="50" rx="2" ry="3" fill="#000" mask="url(#dragonFillMask)" />
                  <ellipse cx="68" cy="50" rx="2" ry="3" fill="#000" mask="url(#dragonFillMask)" />
                  {/* Mouth with fire */}
                  <path d="M64 54 Q58 58, 54 56" fill="none" stroke="#ff0000" strokeWidth="2" mask="url(#dragonFillMask)" />
                  <path d="M64 54 Q70 58, 74 56" fill="none" stroke="#ff0000" strokeWidth="2" mask="url(#dragonFillMask)" />
                  {/* Long tail with spikes */}
                  <path d="M88 90 Q100 100, 108 110 Q110 115, 105 118" fill="url(#dragonBodyGrad)" mask="url(#dragonFillMask)" />
                  <path d="M100 100 L98 95 L100 100 L102 95" fill="#ffd700" mask="url(#dragonFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐉 Dragon</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-red-600">{Math.round(dragonFill)}%</div>
            </div>
            )}
            {/* Goat */}
            {shouldShowCharacter('goat') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="goat" onClick={() => handleCharacterClick('goat')} onMouseEnter={() => handleCharacterHover('goat')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'goat' ? [1, 1.12, 1] : [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.2, filter: "brightness(1.2)" }} whileTap={{ scale: 0.9 }}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="goatBodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f5deb3" />
                      <stop offset="50%" stopColor="#daa520" />
                      <stop offset="100%" stopColor="#cd853f" />
                    </radialGradient>
                    <linearGradient id="goatHornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b7355" />
                      <stop offset="100%" stopColor="#654321" />
                    </linearGradient>
                    <filter id="goatGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="goatFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (goatFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="78" rx="28" ry="36" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" filter="url(#goatGlow)" />
                  <ellipse cx="64" cy="78" rx="28" ry="36" fill="none" stroke="#cd853f" strokeWidth="2" />
                  {/* Neck */}
                  <ellipse cx="64" cy="52" rx="18" ry="22" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="38" rx="22" ry="20" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" />
                  <ellipse cx="64" cy="38" rx="22" ry="20" fill="none" stroke="#cd853f" strokeWidth="2" />
                  {/* Ears */}
                  <ellipse cx="48" cy="32" rx="6" ry="12" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" transform="rotate(-25 48 32)" />
                  <ellipse cx="48" cy="32" rx="3" ry="8" fill="#daa520" mask="url(#goatFillMask)" transform="rotate(-25 48 32)" opacity="0.7" />
                  <ellipse cx="80" cy="32" rx="6" ry="12" fill="url(#goatBodyGrad)" mask="url(#goatFillMask)" transform="rotate(25 80 32)" />
                  <ellipse cx="80" cy="32" rx="3" ry="8" fill="#daa520" mask="url(#goatFillMask)" transform="rotate(25 80 32)" opacity="0.7" />
                  {/* Curved horns */}
                  <path d="M48 26 Q42 18, 38 12 Q36 8, 38 10 Q40 14, 44 20 Q46 24, 48 28" fill="url(#goatHornGrad)" mask="url(#goatFillMask)" />
                  <path d="M48 26 Q42 18, 38 12" fill="none" stroke="#654321" strokeWidth="2" />
                  <path d="M80 26 Q86 18, 90 12 Q92 8, 90 10 Q88 14, 84 20 Q82 24, 80 28" fill="url(#goatHornGrad)" mask="url(#goatFillMask)" />
                  <path d="M80 26 Q86 18, 90 12" fill="none" stroke="#654321" strokeWidth="2" />
                  {/* Horn ridges */}
                  <line x1="40" y1="16" x2="42" y2="18" stroke="#000" strokeWidth="1" opacity="0.3" />
                  <line x1="42" y1="20" x2="44" y2="22" stroke="#000" strokeWidth="1" opacity="0.3" />
                  <line x1="88" y1="16" x2="86" y2="18" stroke="#000" strokeWidth="1" opacity="0.3" />
                  <line x1="86" y1="20" x2="84" y2="22" stroke="#000" strokeWidth="1" opacity="0.3" />
                  {/* Goat eyes with horizontal pupils */}
                  <ellipse cx="56" cy="38" rx="6" ry="7" fill="#ffffe0" mask="url(#goatFillMask)" />
                  <ellipse cx="72" cy="38" rx="6" ry="7" fill="#ffffe0" mask="url(#goatFillMask)" />
                  <rect x="54" y="37" width="4" height="2" rx="0.5" fill="#000" mask="url(#goatFillMask)" />
                  <rect x="70" y="37" width="4" height="2" rx="0.5" fill="#000" mask="url(#goatFillMask)" />
                  <circle cx="55" cy="37" r="1" fill="#fff" mask="url(#goatFillMask)" opacity="0.9" />
                  <circle cx="71" cy="37" r="1" fill="#fff" mask="url(#goatFillMask)" opacity="0.9" />
                  {/* Snout */}
                  <ellipse cx="64" cy="48" rx="10" ry="9" fill="#daa520" mask="url(#goatFillMask)" opacity="0.9" />
                  <ellipse cx="61" cy="50" rx="2" ry="2.5" fill="#000" mask="url(#goatFillMask)" />
                  <ellipse cx="67" cy="50" rx="2" ry="2.5" fill="#000" mask="url(#goatFillMask)" />
                  <path d="M64 52 L64 55" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" />
                  <path d="M64 55 Q60 57, 58 56" fill="none" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" />
                  <path d="M64 55 Q68 57, 70 56" fill="none" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" />
                  {/* Goat beard */}
                  <path d="M64 56 L62 64 L60 68 M64 56 L64 70 M64 56 L66 64 L68 68" stroke="#8b7355" strokeWidth="2" mask="url(#goatFillMask)" opacity="0.8" />
                  {/* Fur texture */}
                  <circle cx="52" cy="75" r="2" fill="#cd853f" mask="url(#goatFillMask)" opacity="0.5" />
                  <circle cx="76" cy="78" r="2" fill="#cd853f" mask="url(#goatFillMask)" opacity="0.5" />
                  <circle cx="64" cy="88" r="2" fill="#cd853f" mask="url(#goatFillMask)" opacity="0.5" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐐 Goat</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-700">{Math.round(goatFill)}%</div>
            </div>
            )}
            {/* Fox */}
            {shouldShowCharacter('fox') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="fox" onClick={() => handleCharacterClick('fox')} onMouseEnter={() => handleCharacterHover('fox')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'fox' ? [1, 1.18, 1] : [1, 1.08, 1] }} transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.2) drop-shadow(0 0 15px rgba(255,140,0,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'fox' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="foxBodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff8c00" />
                      <stop offset="50%" stopColor="#ff7f50" />
                      <stop offset="100%" stopColor="#ff6347" />
                    </radialGradient>
                    <linearGradient id="foxTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff8c00" />
                      <stop offset="70%" stopColor="#ff6347" />
                      <stop offset="100%" stopColor="#fff" />
                    </linearGradient>
                    <filter id="foxGlow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="foxFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (foxFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Bushy tail */}
                  <ellipse cx="90" cy="88" rx="20" ry="28" fill="url(#foxTailGrad)" mask="url(#foxFillMask)" filter="url(#foxGlow)" transform="rotate(35 90 88)" />
                  <ellipse cx="88" cy="92" rx="12" ry="16" fill="#fff" mask="url(#foxFillMask)" opacity="0.8" transform="rotate(35 88 92)" />
                  {/* Body */}
                  <ellipse cx="62" cy="75" rx="28" ry="34" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" filter="url(#foxGlow)" />
                  <ellipse cx="62" cy="75" rx="28" ry="34" fill="none" stroke="#ff6347" strokeWidth="2" />
                  {/* White chest */}
                  <ellipse cx="62" cy="78" rx="18" ry="24" fill="#fff" mask="url(#foxFillMask)" opacity="0.85" />
                  {/* Neck */}
                  <ellipse cx="60" cy="52" rx="20" ry="24" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
                  {/* Head */}
                  <ellipse cx="58" cy="38" rx="22" ry="20" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
                  <ellipse cx="58" cy="38" rx="22" ry="20" fill="none" stroke="#ff6347" strokeWidth="2" />
                  {/* Pointy ears */}
                  <path d="M46 28 L42 12 L50 26 Z" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
                  <path d="M46 28 L42 12 L50 26 Z" fill="none" stroke="#ff6347" strokeWidth="2" />
                  <path d="M46 24 L43 16 L48 24 Z" fill="#fff" mask="url(#foxFillMask)" opacity="0.7" />
                  <path d="M70 28 L74 12 L62 26 Z" fill="url(#foxBodyGrad)" mask="url(#foxFillMask)" />
                  <path d="M70 28 L74 12 L62 26 Z" fill="none" stroke="#ff6347" strokeWidth="2" />
                  <path d="M68 24 L71 16 L64 24 Z" fill="#fff" mask="url(#foxFillMask)" opacity="0.7" />
                  {/* White face markings */}
                  <ellipse cx="48" cy="42" rx="8" ry="10" fill="#fff" mask="url(#foxFillMask)" opacity="0.85" />
                  <ellipse cx="68" cy="42" rx="8" ry="10" fill="#fff" mask="url(#foxFillMask)" opacity="0.85" />
                  {/* Clever eyes */}
                  <ellipse cx="50" cy="40" rx="4" ry="6" fill="#333" mask="url(#foxFillMask)" />
                  <ellipse cx="66" cy="40" rx="4" ry="6" fill="#333" mask="url(#foxFillMask)" />
                  <circle cx="51" cy="39" r="1.5" fill="#fff" mask="url(#foxFillMask)" />
                  <circle cx="67" cy="39" r="1.5" fill="#fff" mask="url(#foxFillMask)" />
                  {/* Snout */}
                  <ellipse cx="58" cy="50" rx="12" ry="10" fill="#ff8c00" mask="url(#foxFillMask)" opacity="0.9" />
                  <ellipse cx="58" cy="48" rx="8" ry="6" fill="#fff" mask="url(#foxFillMask)" opacity="0.8" />
                  {/* Black nose */}
                  <ellipse cx="58" cy="52" rx="4" ry="3" fill="#000" mask="url(#foxFillMask)" />
                  <path d="M58 54 L58 58" stroke="#000" strokeWidth="1.5" mask="url(#foxFillMask)" />
                  {/* Smile */}
                  <path d="M58 58 Q54 60, 50 58" fill="none" stroke="#000" strokeWidth="2" mask="url(#foxFillMask)" />
                  <path d="M58 58 Q62 60, 66 58" fill="none" stroke="#000" strokeWidth="2" mask="url(#foxFillMask)" />
                  {/* Whisker dots */}
                  <circle cx="42" cy="48" r="1.5" fill="#000" mask="url(#foxFillMask)" />
                  <circle cx="74" cy="48" r="1.5" fill="#000" mask="url(#foxFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🦊 Fox</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(foxFill)}%</div>
            </div>
            )}
            {/* Owl */}
            {shouldShowCharacter('owl') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="owl" onClick={() => handleCharacterClick('owl')} onMouseEnter={() => handleCharacterHover('owl')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'owl' ? [1, 1.14, 1] : [1, 1.06, 1], rotate: hoveredCharacter === 'owl' ? [0, 4, -4, 0] : [0, 1, -1, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.22, filter: "brightness(1.2)" }} whileTap={{ scale: 0.9 }}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="owlBodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a0826d" />
                      <stop offset="50%" stopColor="#8b7355" />
                      <stop offset="100%" stopColor="#696969" />
                    </radialGradient>
                    <radialGradient id="owlChestGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f5deb3" />
                      <stop offset="100%" stopColor="#d2b48c" />
                    </radialGradient>
                    <filter id="owlGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="owlFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (owlFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body - oval shape */}
                  <ellipse cx="64" cy="78" rx="32" ry="40" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" filter="url(#owlGlow)" />
                  <ellipse cx="64" cy="78" rx="32" ry="40" fill="none" stroke="#696969" strokeWidth="2" />
                  {/* Chest markings */}
                  <ellipse cx="64" cy="82" rx="20" ry="28" fill="url(#owlChestGrad)" mask="url(#owlFillMask)" opacity="0.9" />
                  {/* Feather patterns on chest */}
                  <path d="M56 70 Q56 75, 56 80" stroke="#8b7355" strokeWidth="1" mask="url(#owlFillMask)" opacity="0.6" />
                  <path d="M64 72 Q64 77, 64 82" stroke="#8b7355" strokeWidth="1" mask="url(#owlFillMask)" opacity="0.6" />
                  <path d="M72 70 Q72 75, 72 80" stroke="#8b7355" strokeWidth="1" mask="url(#owlFillMask)" opacity="0.6" />
                  {/* Head - large and round */}
                  <ellipse cx="64" cy="48" rx="36" ry="32" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" />
                  <ellipse cx="64" cy="48" rx="36" ry="32" fill="none" stroke="#696969" strokeWidth="2" />
                  {/* Ear tufts */}
                  <path d="M36 28 L32 14 L38 26 Z" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" />
                  <path d="M36 28 L32 14 L38 26 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
                  <path d="M92 28 L96 14 L90 26 Z" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" />
                  <path d="M92 28 L96 14 L90 26 Z" fill="none" stroke="#696969" strokeWidth="1.5" />
                  {/* Facial disk */}
                  <ellipse cx="46" cy="48" rx="18" ry="20" fill="#8b7355" mask="url(#owlFillMask)" opacity="0.3" />
                  <ellipse cx="82" cy="48" rx="18" ry="20" fill="#8b7355" mask="url(#owlFillMask)" opacity="0.3" />
                  {/* Huge round eyes */}
                  <circle cx="48" cy="48" r="14" fill="#fff" mask="url(#owlFillMask)" />
                  <circle cx="48" cy="48" r="14" fill="none" stroke="#696969" strokeWidth="2" />
                  <circle cx="80" cy="48" r="14" fill="#fff" mask="url(#owlFillMask)" />
                  <circle cx="80" cy="48" r="14" fill="none" stroke="#696969" strokeWidth="2" />
                  {/* Pupils */}
                  <circle cx="48" cy="48" r="10" fill="#000" mask="url(#owlFillMask)" />
                  <circle cx="80" cy="48" r="10" fill="#000" mask="url(#owlFillMask)" />
                  {/* Eye highlights */}
                  <circle cx="50" cy="45" r="4" fill="#fff" mask="url(#owlFillMask)" opacity="0.9" />
                  <circle cx="82" cy="45" r="4" fill="#fff" mask="url(#owlFillMask)" opacity="0.9" />
                  <circle cx="46" cy="51" r="2" fill="#fff" mask="url(#owlFillMask)" opacity="0.6" />
                  <circle cx="78" cy="51" r="2" fill="#fff" mask="url(#owlFillMask)" opacity="0.6" />
                  {/* Hooked beak */}
                  <path d="M64 56 L60 62 L64 66 L68 62 Z" fill="#ffa500" mask="url(#owlFillMask)" />
                  <path d="M64 56 L60 62 L64 66 L68 62 Z" fill="none" stroke="#ff8c00" strokeWidth="2" />
                  <ellipse cx="64" cy="64" rx="3" ry="4" fill="#ff8c00" mask="url(#owlFillMask)" />
                  {/* Eyebrows */}
                  <path d="M36 38 Q42 34, 48 36" fill="none" stroke="#696969" strokeWidth="2" mask="url(#owlFillMask)" opacity="0.7" />
                  <path d="M92 38 Q86 34, 80 36" fill="none" stroke="#696969" strokeWidth="2" mask="url(#owlFillMask)" opacity="0.7" />
                  {/* Wing details */}
                  <ellipse cx="40" cy="85" rx="8" ry="20" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" opacity="0.8" transform="rotate(-20 40 85)" />
                  <ellipse cx="88" cy="85" rx="8" ry="20" fill="url(#owlBodyGrad)" mask="url(#owlFillMask)" opacity="0.8" transform="rotate(20 88 85)" />
                  {/* Feather texture */}
                  <circle cx="50" cy="90" r="2" fill="#696969" mask="url(#owlFillMask)" opacity="0.4" />
                  <circle cx="78" cy="92" r="2" fill="#696969" mask="url(#owlFillMask)" opacity="0.4" />
                  <circle cx="64" cy="100" r="2" fill="#696969" mask="url(#owlFillMask)" opacity="0.4" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🦉 Owl</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-800">{Math.round(owlFill)}%</div>
            </div>
            )}
            {/* Rat */}
            {shouldShowCharacter('rat') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="rat" onClick={() => handleCharacterClick('rat')} onMouseEnter={() => handleCharacterHover('rat')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'rat' ? [1, 1.18, 1] : [1, 1.12, 1] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.24, filter: "brightness(1.2)" }} whileTap={{ scale: 0.9 }}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="ratGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a9a9a9" />
                      <stop offset="50%" stopColor="#808080" />
                      <stop offset="100%" stopColor="#696969" />
                    </radialGradient>
                    <filter id="ratGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="ratFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (ratFill * 1.28)})`} /></mask>
                  </defs>
                  <ellipse cx="64" cy="75" rx="28" ry="35" fill="url(#ratGradient)" mask="url(#ratFillMask)" filter="url(#ratGlow)" />
                  <ellipse cx="64" cy="75" rx="28" ry="35" fill="none" stroke="#696969" strokeWidth="2" />
                  <circle cx="42" cy="40" r="14" fill="url(#ratGradient)" mask="url(#ratFillMask)" />
                  <circle cx="86" cy="40" r="14" fill="url(#ratGradient)" mask="url(#ratFillMask)" />
                  <ellipse cx="64" cy="52" rx="24" ry="28" fill="url(#ratGradient)" mask="url(#ratFillMask)" />
                  <circle cx="42" cy="35" r="10" fill="#f5f5f5" mask="url(#ratFillMask)" opacity="0.4" />
                  <circle cx="86" cy="35" r="10" fill="#f5f5f5" mask="url(#ratFillMask)" opacity="0.4" />
                  <ellipse cx="54" cy="60" rx="3" ry="5" fill="#000" mask="url(#ratFillMask)" />
                  <ellipse cx="74" cy="60" rx="3" ry="5" fill="#000" mask="url(#ratFillMask)" />
                  <circle cx="55" cy="59" r="1" fill="#fff" mask="url(#ratFillMask)" />
                  <circle cx="75" cy="59" r="1" fill="#fff" mask="url(#ratFillMask)" />
                  <ellipse cx="64" cy="70" rx="3" ry="4" fill="#ff69b4" mask="url(#ratFillMask)" />
                  <path d="M64 74 L60 78 L58 76" fill="none" stroke="#696969" strokeWidth="1.5" mask="url(#ratFillMask)" />
                  <path d="M64 74 L68 78 L70 76" fill="none" stroke="#696969" strokeWidth="1.5" mask="url(#ratFillMask)" />
                  <path d="M52 72 Q46 73, 42 72" stroke="#808080" strokeWidth="1" opacity="0.6" mask="url(#ratFillMask)" />
                  <path d="M76 72 Q82 73, 86 72" stroke="#808080" strokeWidth="1" opacity="0.6" mask="url(#ratFillMask)" />
                  <path d="M90 70 Q100 65, 105 68" fill="none" stroke="#808080" strokeWidth="2" mask="url(#ratFillMask)" opacity="0.7" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐀 Rat</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600">{Math.round(ratFill)}%</div>
            </div>
            )}
            {/* Dog */}
            {shouldShowCharacter('dog') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="dog" onClick={() => handleCharacterClick('dog')} onMouseEnter={() => handleCharacterHover('dog')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'dog' ? [1, 1.18, 1] : [1, 1.08, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.24, filter: "brightness(1.2) drop-shadow(0 0 12px rgba(218,165,32,0.7))" }} whileTap={{ scale: 0.9 }}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="dogBodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#daa520" />
                      <stop offset="50%" stopColor="#cd853f" />
                      <stop offset="100%" stopColor="#8b4513" />
                    </radialGradient>
                    <filter id="dogGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="dogFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (dogFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Wagging tail */}
                  <ellipse cx="88" cy="88" rx="12" ry="22" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" opacity="0.9" transform="rotate(25 88 88)" />
                  {/* Body */}
                  <ellipse cx="62" cy="78" rx="30" ry="36" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" filter="url(#dogGlow)" />
                  <ellipse cx="62" cy="78" rx="30" ry="36" fill="none" stroke="#8b4513" strokeWidth="2" />
                  {/* Neck */}
                  <ellipse cx="60" cy="52" rx="22" ry="26" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" />
                  {/* Head */}
                  <ellipse cx="58" cy="38" rx="24" ry="22" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" />
                  <ellipse cx="58" cy="38" rx="24" ry="22" fill="none" stroke="#8b4513" strokeWidth="2" />
                  {/* Floppy ears */}
                  <ellipse cx="42" cy="38" rx="10" ry="18" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" transform="rotate(-15 42 38)" />
                  <ellipse cx="42" cy="38" rx="10" ry="18" fill="none" stroke="#8b4513" strokeWidth="1.5" transform="rotate(-15 42 38)" />
                  <ellipse cx="42" cy="40" rx="6" ry="12" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.5" transform="rotate(-15 42 40)" />
                  <ellipse cx="74" cy="38" rx="10" ry="18" fill="url(#dogBodyGrad)" mask="url(#dogFillMask)" transform="rotate(15 74 38)" />
                  <ellipse cx="74" cy="38" rx="10" ry="18" fill="none" stroke="#8b4513" strokeWidth="1.5" transform="rotate(15 74 38)" />
                  <ellipse cx="74" cy="40" rx="6" ry="12" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.5" transform="rotate(15 74 40)" />
                  {/* Friendly eyes */}
                  <ellipse cx="52" cy="38" rx="5" ry="6" fill="#333" mask="url(#dogFillMask)" />
                  <ellipse cx="64" cy="38" rx="5" ry="6" fill="#333" mask="url(#dogFillMask)" />
                  <circle cx="53" cy="37" r="2" fill="#fff" mask="url(#dogFillMask)" opacity="0.9" />
                  <circle cx="65" cy="37" r="2" fill="#fff" mask="url(#dogFillMask)" opacity="0.9" />
                  {/* Snout */}
                  <ellipse cx="58" cy="48" rx="14" ry="12" fill="#cd853f" mask="url(#dogFillMask)" opacity="0.95" />
                  <ellipse cx="58" cy="46" rx="10" ry="8" fill="#daa520" mask="url(#dogFillMask)" opacity="0.8" />
                  {/* Big black nose */}
                  <ellipse cx="58" cy="50" rx="5" ry="4" fill="#000" mask="url(#dogFillMask)" />
                  <path d="M58 53 L58 56" stroke="#000" strokeWidth="2" mask="url(#dogFillMask)" />
                  {/* Happy smile */}
                  <path d="M58 56 Q54 59, 50 57" fill="none" stroke="#000" strokeWidth="2" mask="url(#dogFillMask)" />
                  <path d="M58 56 Q62 59, 66 57" fill="none" stroke="#000" strokeWidth="2" mask="url(#dogFillMask)" />
                  {/* Panting tongue */}
                  <ellipse cx="58" cy="60" rx="4" ry="6" fill="#ff69b4" mask="url(#dogFillMask)" opacity="0.9" />
                  {/* Spots */}
                  <circle cx="48" cy="75" r="4" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.6" />
                  <circle cx="72" cy="80" r="3" fill="#8b4513" mask="url(#dogFillMask)" opacity="0.6" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐕 Dog</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-700">{Math.round(dogFill)}%</div>
            </div>
            )}
            {/* Cat */}
            {shouldShowCharacter('cat') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="cat" onClick={() => handleCharacterClick('cat')} onMouseEnter={() => handleCharacterHover('cat')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'cat' ? [1, 1.16, 1] : [1, 1.08, 1] }} transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.24, filter: "brightness(1.2) drop-shadow(0 0 12px rgba(255,140,0,0.7))" }} whileTap={{ scale: 0.9 }}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="catBodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffa500" />
                      <stop offset="50%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ff7f50" />
                    </radialGradient>
                    <filter id="catGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="catFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (catFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Curled tail */}
                  <path d="M88 85 Q95 75, 98 65 Q100 55, 95 50" fill="none" stroke="url(#catBodyGrad)" strokeWidth="10" mask="url(#catFillMask)" strokeLinecap="round" />
                  {/* Body */}
                  <ellipse cx="62" cy="75" rx="28" ry="34" fill="url(#catBodyGrad)" mask="url(#catFillMask)" filter="url(#catGlow)" />
                  <ellipse cx="62" cy="75" rx="28" ry="34" fill="none" stroke="#ff7f50" strokeWidth="2" />
                  {/* Neck */}
                  <ellipse cx="60" cy="52" rx="20" ry="24" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
                  {/* Head - rounder */}
                  <ellipse cx="58" cy="38" rx="24" ry="22" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
                  <ellipse cx="58" cy="38" rx="24" ry="22" fill="none" stroke="#ff7f50" strokeWidth="2" />
                  {/* Pointy triangular ears */}
                  <path d="M42 28 L36 12 L48 24 Z" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
                  <path d="M42 28 L36 12 L48 24 Z" fill="none" stroke="#ff7f50" strokeWidth="2" />
                  <path d="M42 24 L38 16 L46 22 Z" fill="#ff69b4" mask="url(#catFillMask)" opacity="0.7" />
                  <path d="M74 28 L80 12 L68 24 Z" fill="url(#catBodyGrad)" mask="url(#catFillMask)" />
                  <path d="M74 28 L80 12 L68 24 Z" fill="none" stroke="#ff7f50" strokeWidth="2" />
                  <path d="M72 24 L76 16 L68 22 Z" fill="#ff69b4" mask="url(#catFillMask)" opacity="0.7" />
                  {/* Cat eyes - slanted and mysterious */}
                  <ellipse cx="50" cy="40" rx="6" ry="9" fill="#32cd32" mask="url(#catFillMask)" transform="rotate(-10 50 40)" />
                  <ellipse cx="66" cy="40" rx="6" ry="9" fill="#32cd32" mask="url(#catFillMask)" transform="rotate(10 66 40)" />
                  <ellipse cx="50" cy="40" rx="2" ry="7" fill="#000" mask="url(#catFillMask)" transform="rotate(-10 50 40)" />
                  <ellipse cx="66" cy="40" rx="2" ry="7" fill="#000" mask="url(#catFillMask)" transform="rotate(10 66 40)" />
                  <circle cx="50" cy="38" r="1.5" fill="#fff" mask="url(#catFillMask)" opacity="0.9" />
                  <circle cx="66" cy="38" r="1.5" fill="#fff" mask="url(#catFillMask)" opacity="0.9" />
                  {/* Pink nose */}
                  <path d="M58 48 L55 50 L58 52 L61 50 Z" fill="#ff69b4" mask="url(#catFillMask)" />
                  <path d="M58 52 L58 54" stroke="#ff69b4" strokeWidth="1.5" mask="url(#catFillMask)" />
                  {/* Whiskers */}
                  <line x1="40" y1="46" x2="28" y2="44" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  <line x1="40" y1="50" x2="28" y2="50" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  <line x1="40" y1="54" x2="28" y2="56" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  <line x1="76" y1="46" x2="88" y2="44" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  <line x1="76" y1="50" x2="88" y2="50" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  <line x1="76" y1="54" x2="88" y2="56" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  {/* Mouth - W shape */}
                  <path d="M58 54 Q54 56, 50 54" fill="none" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  <path d="M58 54 Q62 56, 66 54" fill="none" stroke="#333" strokeWidth="1.5" mask="url(#catFillMask)" />
                  {/* Stripes */}
                  <path d="M46 72 Q44 74, 46 76" stroke="#ff6347" strokeWidth="2" mask="url(#catFillMask)" opacity="0.6" />
                  <path d="M70 74 Q72 76, 70 78" stroke="#ff6347" strokeWidth="2" mask="url(#catFillMask)" opacity="0.6" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐈 Cat</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(catFill)}%</div>
            </div>
            )}
            {/* Bear */}
            {shouldShowCharacter('bear') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="bear" onClick={() => handleCharacterClick('bear')} onMouseEnter={() => handleCharacterHover('bear')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'bear' ? [1, 1.14, 1] : [1, 1.06, 1] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.22, filter: "brightness(1.2) drop-shadow(0 0 12px rgba(139,69,19,0.7))" }} whileTap={{ scale: 0.9 }}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="bearBodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a0522d" />
                      <stop offset="50%" stopColor="#8b4513" />
                      <stop offset="100%" stopColor="#654321" />
                    </radialGradient>
                    <filter id="bearGlow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="bearFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (bearFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body - large and round */}
                  <ellipse cx="64" cy="80" rx="34" ry="40" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" filter="url(#bearGlow)" />
                  <ellipse cx="64" cy="80" rx="34" ry="40" fill="none" stroke="#654321" strokeWidth="2" />
                  {/* Neck */}
                  <ellipse cx="64" cy="54" rx="28" ry="26" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="42" rx="30" ry="28" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
                  <ellipse cx="64" cy="42" rx="30" ry="28" fill="none" stroke="#654321" strokeWidth="2" />
                  {/* Round ears */}
                  <circle cx="44" cy="26" r="12" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
                  <circle cx="44" cy="26" r="12" fill="none" stroke="#654321" strokeWidth="2" />
                  <circle cx="44" cy="28" r="7" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.7" />
                  <circle cx="84" cy="26" r="12" fill="url(#bearBodyGrad)" mask="url(#bearFillMask)" />
                  <circle cx="84" cy="26" r="12" fill="none" stroke="#654321" strokeWidth="2" />
                  <circle cx="84" cy="28" r="7" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.7" />
                  {/* Light belly patch */}
                  <ellipse cx="64" cy="85" rx="24" ry="30" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.6" />
                  {/* Small eyes */}
                  <ellipse cx="54" cy="42" rx="4" ry="6" fill="#333" mask="url(#bearFillMask)" />
                  <ellipse cx="74" cy="42" rx="4" ry="6" fill="#333" mask="url(#bearFillMask)" />
                  <circle cx="55" cy="41" r="1.5" fill="#fff" mask="url(#bearFillMask)" opacity="0.9" />
                  <circle cx="75" cy="41" r="1.5" fill="#fff" mask="url(#bearFillMask)" opacity="0.9" />
                  {/* Large snout area */}
                  <ellipse cx="64" cy="52" rx="16" ry="14" fill="#d2691e" mask="url(#bearFillMask)" opacity="0.9" />
                  <ellipse cx="64" cy="50" rx="12" ry="10" fill="#cd853f" mask="url(#bearFillMask)" opacity="0.8" />
                  {/* Big black nose */}
                  <ellipse cx="64" cy="54" rx="6" ry="5" fill="#000" mask="url(#bearFillMask)" />
                  <path d="M64 58 L64 62" stroke="#000" strokeWidth="2.5" mask="url(#bearFillMask)" />
                  {/* Mouth */}
                  <path d="M64 62 Q58 65, 54 63" fill="none" stroke="#000" strokeWidth="2" mask="url(#bearFillMask)" />
                  <path d="M64 62 Q70 65, 74 63" fill="none" stroke="#000" strokeWidth="2" mask="url(#bearFillMask)" />
                  {/* Claws hint */}
                  <circle cx="46" cy="105" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
                  <circle cx="52" cy="108" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
                  <circle cx="76" cy="108" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
                  <circle cx="82" cy="105" r="3" fill="#000" mask="url(#bearFillMask)" opacity="0.5" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐻 Bear</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-800">{Math.round(bearFill)}%</div>
            </div>
            )}
            {/* Rhino */}
            {shouldShowCharacter('rhino') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="rhino" onClick={() => handleCharacterClick('rhino')} onMouseEnter={() => handleCharacterHover('rhino')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'rhino' ? [1, 1.12, 1] : [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.2, filter: "brightness(1.2)" }} whileTap={{ scale: 0.9 }}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="rhinoBodyGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#808080" />
                      <stop offset="50%" stopColor="#696969" />
                      <stop offset="100%" stopColor="#4a4a4a" />
                    </radialGradient>
                    <linearGradient id="rhinoHornGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#d3d3d3" />
                      <stop offset="100%" stopColor="#696969" />
                    </linearGradient>
                    <filter id="rhinoGlow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="rhinoFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (rhinoFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body - massive */}
                  <ellipse cx="64" cy="82" rx="36" ry="40" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" filter="url(#rhinoGlow)" />
                  <ellipse cx="64" cy="82" rx="36" ry="40" fill="none" stroke="#4a4a4a" strokeWidth="2" />
                  {/* Thick neck */}
                  <ellipse cx="62" cy="54" rx="28" ry="30" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" />
                  {/* Large head */}
                  <ellipse cx="60" cy="38" rx="26" ry="24" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" />
                  <ellipse cx="60" cy="38" rx="26" ry="24" fill="none" stroke="#4a4a4a" strokeWidth="2" />
                  {/* Prominent horn */}
                  <path d="M60 32 L58 12 L54 18 L56 30 Z" fill="url(#rhinoHornGrad)" mask="url(#rhinoFillMask)" />
                  <path d="M60 32 L58 12 L56 30 Z" fill="none" stroke="#555" strokeWidth="2" />
                  {/* Smaller second horn */}
                  <path d="M60 36 L59 24 L57 28 L58 35 Z" fill="url(#rhinoHornGrad)" mask="url(#rhinoFillMask)" opacity="0.9" />
                  {/* Small ears */}
                  <ellipse cx="44" cy="30" rx="6" ry="10" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" transform="rotate(-20 44 30)" />
                  <ellipse cx="76" cy="30" rx="6" ry="10" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" transform="rotate(20 76 30)" />
                  {/* Small eyes */}
                  <ellipse cx="52" cy="36" rx="3" ry="5" fill="#333" mask="url(#rhinoFillMask)" />
                  <ellipse cx="68" cy="36" rx="3" ry="5" fill="#333" mask="url(#rhinoFillMask)" />
                  <circle cx="53" cy="35" r="1" fill="#fff" mask="url(#rhinoFillMask)" opacity="0.8" />
                  <circle cx="69" cy="35" r="1" fill="#fff" mask="url(#rhinoFillMask)" opacity="0.8" />
                  {/* Long snout */}
                  <ellipse cx="60" cy="50" rx="20" ry="16" fill="#696969" mask="url(#rhinoFillMask)" opacity="0.95" />
                  <ellipse cx="60" cy="48" rx="16" ry="12" fill="#808080" mask="url(#rhinoFillMask)" opacity="0.8" />
                  {/* Nostrils */}
                  <ellipse cx="56" cy="54" rx="3" ry="4" fill="#000" mask="url(#rhinoFillMask)" />
                  <ellipse cx="64" cy="54" rx="3" ry="4" fill="#000" mask="url(#rhinoFillMask)" />
                  {/* Mouth line */}
                  <path d="M50 58 Q55 60, 60 60 Q65 60, 70 58" fill="none" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" />
                  {/* Thick skin folds */}
                  <path d="M40 62 Q38 64, 40 66" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" opacity="0.5" />
                  <path d="M36 75 Q34 77, 36 79" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" opacity="0.5" />
                  <path d="M84 75 Q86 77, 84 79" stroke="#4a4a4a" strokeWidth="2" mask="url(#rhinoFillMask)" opacity="0.5" />
                  {/* Stubby legs hint */}
                  <ellipse cx="50" cy="110" rx="8" ry="12" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" opacity="0.8" />
                  <ellipse cx="74" cy="110" rx="8" ry="12" fill="url(#rhinoBodyGrad)" mask="url(#rhinoFillMask)" opacity="0.8" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🦏 Rhino</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-700">{Math.round(rhinoFill)}%</div>
            </div>
            )}
            {/* Snake */}
            {shouldShowCharacter('snake') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="snake" onClick={() => handleCharacterClick('snake')} onMouseEnter={() => handleCharacterHover('snake')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'snake' ? [1, 1.18, 1] : [1, 1.1, 1], rotate: hoveredCharacter === 'snake' ? [0, 3, -3, 0] : 0 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.2) drop-shadow(0 0 15px rgba(34,139,34,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'snake' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="snakeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#32cd32" />
                      <stop offset="50%" stopColor="#228b22" />
                      <stop offset="100%" stopColor="#006400" />
                    </linearGradient>
                    <radialGradient id="snakeScaleGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3cb371" />
                      <stop offset="100%" stopColor="#228b22" />
                    </radialGradient>
                    <filter id="snakeGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="snakeFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (snakeFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Coiled snake body - S-shaped */}
                  <path d="M30 100 Q25 85, 32 70 Q40 55, 52 48 Q64 42, 76 48 Q88 55, 96 70 Q103 85, 98 100" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" filter="url(#snakeGlow)" stroke="#006400" strokeWidth="3" />
                  {/* Body segments with width variation */}
                  <ellipse cx="32" cy="70" rx="14" ry="16" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" transform="rotate(-30 32 70)" />
                  <ellipse cx="52" cy="52" rx="16" ry="18" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" />
                  <ellipse cx="76" cy="52" rx="16" ry="18" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" />
                  <ellipse cx="96" cy="70" rx="14" ry="16" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" transform="rotate(30 96 70)" />
                  {/* Belly scales - lighter */}
                  <ellipse cx="52" cy="54" rx="10" ry="12" fill="#90ee90" mask="url(#snakeFillMask)" opacity="0.5" />
                  <ellipse cx="76" cy="54" rx="10" ry="12" fill="#90ee90" mask="url(#snakeFillMask)" opacity="0.5" />
                  {/* Head - triangular shape */}
                  <path d="M48 38 L64 28 L80 38 L76 48 L52 48 Z" fill="url(#snakeBodyGrad)" mask="url(#snakeFillMask)" />
                  <path d="M48 38 L64 28 L80 38" fill="none" stroke="#006400" strokeWidth="2" />
                  {/* Snake eyes - slitted pupils */}
                  <ellipse cx="56" cy="38" rx="6" ry="7" fill="#ffff00" mask="url(#snakeFillMask)" />
                  <ellipse cx="72" cy="38" rx="6" ry="7" fill="#ffff00" mask="url(#snakeFillMask)" />
                  <rect x="55" y="36" width="2" height="4" fill="#000" mask="url(#snakeFillMask)" />
                  <rect x="71" y="36" width="2" height="4" fill="#000" mask="url(#snakeFillMask)" />
                  <circle cx="56" cy="37" r="1" fill="#fff" mask="url(#snakeFillMask)" opacity="0.9" />
                  <circle cx="72" cy="37" r="1" fill="#fff" mask="url(#snakeFillMask)" opacity="0.9" />
                  {/* Forked tongue */}
                  <path d="M64 44 L64 52" stroke="#ff0000" strokeWidth="2" mask="url(#snakeFillMask)" />
                  <path d="M64 52 L60 56 M64 52 L68 56" stroke="#ff0000" strokeWidth="2" mask="url(#snakeFillMask)" />
                  {/* Scale pattern */}
                  <circle cx="42" cy="60" r="4" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
                  <circle cx="52" cy="65" r="3.5" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
                  <circle cx="64" cy="58" r="4" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
                  <circle cx="76" cy="65" r="3.5" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
                  <circle cx="86" cy="60" r="4" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
                  <circle cx="38" cy="80" r="3" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
                  <circle cx="90" cy="80" r="3" fill="url(#snakeScaleGrad)" mask="url(#snakeFillMask)" opacity="0.7" />
                  {/* Diamond patterns on back */}
                  <path d="M64 46 L60 50 L64 54 L68 50 Z" fill="#006400" mask="url(#snakeFillMask)" opacity="0.6" />
                  <path d="M40 68 L36 72 L40 76 L44 72 Z" fill="#006400" mask="url(#snakeFillMask)" opacity="0.6" />
                  <path d="M88 68 L84 72 L88 76 L92 72 Z" fill="#006400" mask="url(#snakeFillMask)" opacity="0.6" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐍 Snake</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-green-700">{Math.round(snakeFill)}%</div>
            </div>
            )}
            {/* Lion */}
            {shouldShowCharacter('lion') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="lion" onClick={() => handleCharacterClick('lion')} onMouseEnter={() => handleCharacterHover('lion')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'lion' ? [1, 1.2, 1] : [1, 1.1, 1], rotate: clickedCharacter === 'lion' ? [0, 3, -3, 0] : 0 }} transition={{ duration: hoveredCharacter === 'lion' ? 0.4 : 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} whileHover={{ scale: 1.15, filter: "brightness(1.1)", transition: { duration: 0.2 } }} whileTap={{ scale: 0.95, transition: { duration: 0.1 } }} className={`${hoveredCharacter === 'lion' ? 'drop-shadow-lg' : ''} ${clickedCharacter === 'lion' ? 'animate-pulse' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="lionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="30%" stopColor="#ff8c00" />
                      <stop offset="70%" stopColor="#ff7f00" />
                      <stop offset="100%" stopColor="#ff4500" />
                    </linearGradient>
                    <radialGradient id="lion3D" cx="40%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffed4e" />
                      <stop offset="50%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ff4500" />
                    </radialGradient>
                    <filter id="lionShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
                    </filter>
                    <mask id="lionFillMask">
                      <rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (lionFill * 1.28)})`} />
                    </mask>
                  </defs>
                  <ellipse cx="64" cy="85" rx="30" ry="35" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
                  <ellipse cx="64" cy="85" rx="30" ry="35" fill="none" stroke="#ff4500" strokeWidth="2" />
                  <circle cx="64" cy="50" r="28" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
                  <circle cx="64" cy="50" r="28" fill="none" stroke="#ff4500" strokeWidth="2" />
                  <path d="M36 35 Q25 20, 40 15 Q55 10, 64 15 Q73 10, 88 15 Q103 20, 92 35 Q88 45, 78 40 Q68 35, 64 40 Q60 35, 50 40 Q40 45, 36 35" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
                  <path d="M36 35 Q25 20, 40 15 Q55 10, 64 15 Q73 10, 88 15 Q103 20, 92 35 Q88 45, 78 40 Q68 35, 64 40 Q60 35, 50 40 Q40 45, 36 35" fill="none" stroke="#ff4500" strokeWidth="2" />
                  <path d="M94 85 Q110 80, 115 90 Q113 100, 105 105 Q100 110, 94 100 Q92 90, 94 85" fill="url(#lion3D)" mask="url(#lionFillMask)" filter="url(#lionShadow)" />
                  <path d="M94 85 Q110 80, 115 90 Q113 100, 105 105 Q100 110, 94 100 Q92 90, 94 85" fill="none" stroke="#ff4500" strokeWidth="2" />
                  <ellipse cx="50" cy="110" rx="8" ry="15" fill="url(#lion3D)" mask="url(#lionFillMask)" />
                  <ellipse cx="78" cy="110" rx="8" ry="15" fill="url(#lion3D)" mask="url(#lionFillMask)" />
                  <ellipse cx="50" cy="110" rx="8" ry="15" fill="none" stroke="#ff4500" strokeWidth="2" />
                  <ellipse cx="78" cy="110" rx="8" ry="15" fill="none" stroke="#ff4500" strokeWidth="2" />
                  <ellipse cx="50" cy="120" rx="6" ry="4" fill="url(#lion3D)" mask="url(#lionFillMask)" />
                  <ellipse cx="78" cy="120" rx="6" ry="4" fill="url(#lion3D)" mask="url(#lionFillMask)" />
                  <ellipse cx="50" cy="120" rx="6" ry="4" fill="none" stroke="#ff4500" strokeWidth="1" />
                  <ellipse cx="78" cy="120" rx="6" ry="4" fill="none" stroke="#ff4500" strokeWidth="1" />
                  <ellipse cx="55" cy="40" rx="6" ry="8" fill="#fff" mask="url(#lionFillMask)" />
                  <ellipse cx="73" cy="40" rx="6" ry="8" fill="#fff" mask="url(#lionFillMask)" />
                  <ellipse cx="55" cy="40" rx="4" ry="6" fill="#333" mask="url(#lionFillMask)" />
                  <ellipse cx="73" cy="40" rx="4" ry="6" fill="#333" mask="url(#lionFillMask)" />
                  <circle cx="56" cy="38" r="1.5" fill="#fff" mask="url(#lionFillMask)" />
                  <circle cx="74" cy="38" r="1.5" fill="#fff" mask="url(#lionFillMask)" />
                  <ellipse cx="64" cy="55" rx="4" ry="3" fill="#ff4500" mask="url(#lionFillMask)" />
                  <ellipse cx="64" cy="55" rx="2" ry="1.5" fill="#ff8c00" mask="url(#lionFillMask)" />
                  <path d="M64 60 Q60 65, 55 60" fill="none" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <path d="M64 60 Q68 65, 73 60" fill="none" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <line x1="40" y1="50" x2="25" y2="48" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <line x1="40" y1="55" x2="25" y2="55" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <line x1="40" y1="60" x2="25" y2="62" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <line x1="88" y1="50" x2="103" y2="48" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <line x1="88" y1="55" x2="103" y2="55" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <line x1="88" y1="60" x2="103" y2="62" stroke="#ff4500" strokeWidth="2" mask="url(#lionFillMask)" />
                  <ellipse cx="45" cy="25" rx="8" ry="12" fill="url(#lion3D)" mask="url(#lionFillMask)" transform="rotate(-20 45 25)" />
                  <ellipse cx="83" cy="25" rx="8" ry="12" fill="url(#lion3D)" mask="url(#lionFillMask)" transform="rotate(20 83 25)" />
                  <ellipse cx="45" cy="25" rx="8" ry="12" fill="none" stroke="#ff4500" strokeWidth="2" transform="rotate(-20 45 25)" />
                  <ellipse cx="83" cy="25" rx="8" ry="12" fill="none" stroke="#ff4500" strokeWidth="2" transform="rotate(20 83 25)" />
                  <ellipse cx="45" cy="25" rx="4" ry="8" fill="#ff8c00" mask="url(#lionFillMask)" transform="rotate(-20 45 25)" />
                  <ellipse cx="83" cy="25" rx="4" ry="8" fill="#ff8c00" mask="url(#lionFillMask)" transform="rotate(20 83 25)" />
                  <circle cx="50" cy="30" r="2" fill="rgba(255,255,255,0.3)" mask="url(#lionFillMask)" />
                  <circle cx="75" cy="25" r="1.5" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
                  <circle cx="40" cy="40" r="1.8" fill="rgba(255,255,255,0.25)" mask="url(#lionFillMask)" />
                  <circle cx="85" cy="35" r="1.2" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
                  <path d="M45 15 Q50 5, 55 10 Q60 0, 64 5 Q68 0, 73 10 Q78 5, 83 15 Q80 20, 75 18 Q70 25, 64 20 Q58 25, 53 18 Q48 20, 45 15" fill="url(#lion3D)" mask="url(#lionFillMask)" opacity="0.8" />
                  <circle cx="55" cy="85" r="2" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
                  <circle cx="75" cy="90" r="1.5" fill="rgba(255,255,255,0.15)" mask="url(#lionFillMask)" />
                  <circle cx="45" cy="95" r="1.8" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
                  <circle cx="80" cy="100" r="1.2" fill="rgba(255,255,255,0.15)" mask="url(#lionFillMask)" />
                  <ellipse cx="64" cy="55" rx="1" ry="0.5" fill="rgba(255,255,255,0.4)" mask="url(#lionFillMask)" />
                  <circle cx="55" cy="40" r="1" fill="rgba(255,255,255,0.6)" mask="url(#lionFillMask)" />
                  <circle cx="73" cy="40" r="1" fill="rgba(255,255,255,0.6)" mask="url(#lionFillMask)" />
                  <path d="M35 20 Q30 15, 25 20 Q30 25, 35 20" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
                  <path d="M93 20 Q98 15, 103 20 Q98 25, 93 20" fill="rgba(255,255,255,0.2)" mask="url(#lionFillMask)" />
                  <ellipse cx="55" cy="95" rx="15" ry="10" fill="rgba(0,0,0,0.1)" mask="url(#lionFillMask)" />
                  <circle cx="115" cy="90" r="3" fill="url(#lion3D)" mask="url(#lionFillMask)" />
                  <circle cx="115" cy="90" r="3" fill="none" stroke="#ff4500" strokeWidth="1" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🦁 Lion</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(lionFill)}%</div>
            </div>
            )}
          </div>
        </div>
        )}

        {/* AI Override Category */}
        {activeCategory === 'techlings' && (
        <div>
          {!compactMode && (
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🤖 AI Override
          </h2>
          )}
          <div className="flex flex-wrap items-center justify-center gap-8 py-8">
            
            {/* Robot */}
            {shouldShowCharacter('robot') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="robot" onClick={() => handleCharacterClick('robot')} onMouseEnter={() => handleCharacterHover('robot')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'robot' ? [1, 1.15, 1] : [1, 1.05, 1], y: hoveredCharacter === 'robot' ? [0, -5, 0] : [0, -2, 0] }} transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.3) drop-shadow(0 0 20px rgba(0,191,255,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'robot' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00bfff" />
                      <stop offset="50%" stopColor="#1e90ff" />
                      <stop offset="100%" stopColor="#4169e1" />
                    </linearGradient>
                    <filter id="robotGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="robotFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (robotFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body - enhanced with segments */}
                  <rect x="38" y="65" width="52" height="50" rx="6" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" filter="url(#robotGlow)" />
                  <rect x="38" y="65" width="52" height="50" rx="6" fill="none" stroke="#00bfff" strokeWidth="3" />
                  {/* Body segments */}
                  <line x1="40" y1="85" x2="88" y2="85" stroke="#1e90ff" strokeWidth="2" mask="url(#robotFillMask)" opacity="0.6" />
                  <line x1="40" y1="100" x2="88" y2="100" stroke="#1e90ff" strokeWidth="2" mask="url(#robotFillMask)" opacity="0.6" />
                  {/* Chest panel with more detail */}
                  <rect x="46" y="72" width="36" height="20" rx="3" fill="#1e90ff" mask="url(#robotFillMask)" opacity="0.6" />
                  <rect x="50" y="76" width="28" height="12" rx="2" fill="#00bfff" mask="url(#robotFillMask)" opacity="0.4" />
                  {/* LED indicators */}
                  <circle cx="52" cy="82" r="2.5" fill="#00ffff" mask="url(#robotFillMask)" />
                  <circle cx="60" cy="82" r="2.5" fill="#00ff00" mask="url(#robotFillMask)" />
                  <circle cx="68" cy="82" r="2.5" fill="#ffff00" mask="url(#robotFillMask)" />
                  <circle cx="76" cy="82" r="2.5" fill="#ff9900" mask="url(#robotFillMask)" />
                  {/* Core power display */}
                  <rect x="56" y="98" width="16" height="12" rx="2" fill="#4169e1" mask="url(#robotFillMask)" opacity="0.7" />
                  <circle cx="64" cy="104" r="4" fill="#00ffff" mask="url(#robotFillMask)" />
                  <circle cx="64" cy="104" r="2" fill="#ffffff" mask="url(#robotFillMask)" />
                  {/* Head - enhanced box */}
                  <rect x="44" y="28" width="40" height="36" rx="4" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" />
                  <rect x="44" y="28" width="40" height="36" rx="4" fill="none" stroke="#00bfff" strokeWidth="3" />
                  {/* Head top panel */}
                  <rect x="48" y="30" width="32" height="8" rx="2" fill="#1e90ff" mask="url(#robotFillMask)" opacity="0.6" />
                  {/* Antenna with segments */}
                  <rect x="62" y="22" width="4" height="6" rx="1" fill="#00bfff" mask="url(#robotFillMask)" />
                  <line x1="64" y1="22" x2="64" y2="15" stroke="#00bfff" strokeWidth="2.5" mask="url(#robotFillMask)" />
                  <circle cx="64" cy="12" r="4" fill="#ff0000" mask="url(#robotFillMask)" />
                  <circle cx="64" cy="12" r="6" fill="none" stroke="#ff0000" strokeWidth="1.5" mask="url(#robotFillMask)" opacity="0.5" />
                  {/* Eyes - enhanced digital displays */}
                  <rect x="50" y="40" width="11" height="12" rx="2" fill="#00ffff" mask="url(#robotFillMask)" />
                  <rect x="67" y="40" width="11" height="12" rx="2" fill="#00ffff" mask="url(#robotFillMask)" />
                  <rect x="51" y="41" width="9" height="10" fill="#000" mask="url(#robotFillMask)" />
                  <rect x="68" y="41" width="9" height="10" fill="#000" mask="url(#robotFillMask)" />
                  {/* Pupil glow */}
                  <rect x="53" y="43" width="5" height="6" fill="#00ffff" mask="url(#robotFillMask)" opacity="0.8" />
                  <rect x="70" y="43" width="5" height="6" fill="#00ffff" mask="url(#robotFillMask)" opacity="0.8" />
                  <rect x="54" y="44" width="2" height="4" fill="#ffffff" mask="url(#robotFillMask)" />
                  <rect x="71" y="44" width="2" height="4" fill="#ffffff" mask="url(#robotFillMask)" />
                  {/* Mouth - enhanced grille */}
                  <rect x="52" y="56" width="24" height="6" rx="1" fill="#1e90ff" mask="url(#robotFillMask)" opacity="0.5" />
                  <line x1="54" y1="57" x2="54" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
                  <line x1="58" y1="57" x2="58" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
                  <line x1="62" y1="57" x2="62" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
                  <line x1="66" y1="57" x2="66" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
                  <line x1="70" y1="57" x2="70" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
                  <line x1="74" y1="57" x2="74" y2="61" stroke="#00ffff" strokeWidth="1" mask="url(#robotFillMask)" opacity="0.7" />
                  {/* Arms with joints */}
                  <circle cx="38" cy="70" r="4" fill="#4169e1" mask="url(#robotFillMask)" />
                  <circle cx="90" cy="70" r="4" fill="#4169e1" mask="url(#robotFillMask)" />
                  <rect x="26" y="72" width="9" height="26" rx="2" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" />
                  <rect x="26" y="72" width="9" height="26" rx="2" fill="none" stroke="#00bfff" strokeWidth="2" />
                  <rect x="93" y="72" width="9" height="26" rx="2" fill="url(#robotBodyGrad)" mask="url(#robotFillMask)" />
                  <rect x="93" y="72" width="9" height="26" rx="2" fill="none" stroke="#00bfff" strokeWidth="2" />
                  {/* Elbow joints */}
                  <circle cx="30" cy="87" r="3" fill="#1e90ff" mask="url(#robotFillMask)" />
                  <circle cx="98" cy="87" r="3" fill="#1e90ff" mask="url(#robotFillMask)" />
                  {/* Hands - enhanced claws */}
                  <ellipse cx="30" cy="102" rx="5" ry="6" fill="#4169e1" mask="url(#robotFillMask)" />
                  <ellipse cx="98" cy="102" rx="5" ry="6" fill="#4169e1" mask="url(#robotFillMask)" />
                  <line x1="28" y1="107" x2="28" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
                  <line x1="30" y1="107" x2="30" y2="114" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
                  <line x1="32" y1="107" x2="32" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
                  <line x1="96" y1="107" x2="96" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
                  <line x1="98" y1="107" x2="98" y2="114" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
                  <line x1="100" y1="107" x2="100" y2="112" stroke="#4169e1" strokeWidth="2" mask="url(#robotFillMask)" />
                  {/* Bolts and screws */}
                  <circle cx="47" cy="32" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
                  <circle cx="81" cy="32" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
                  <circle cx="47" cy="60" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
                  <circle cx="81" cy="60" r="2" fill="#87ceeb" mask="url(#robotFillMask)" />
                  <circle cx="42" cy="70" r="1.5" fill="#87ceeb" mask="url(#robotFillMask)" />
                  <circle cx="86" cy="70" r="1.5" fill="#87ceeb" mask="url(#robotFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🤖 Robot</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-600">{Math.round(robotFill)}%</div>
            </div>
            )}
            {/* Drone */}
            {shouldShowCharacter('drone') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="drone" onClick={() => handleCharacterClick('drone')} onMouseEnter={() => handleCharacterHover('drone')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'drone' ? [1, 1.18, 1] : [1, 1.08, 1], rotate: hoveredCharacter === 'drone' ? [0, 5, -5, 0] : [0, 2, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.3, filter: "brightness(1.3) drop-shadow(0 0 20px rgba(135,206,235,0.8))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'drone' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="droneBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#87ceeb" />
                      <stop offset="50%" stopColor="#4682b4" />
                      <stop offset="100%" stopColor="#5f9ea0" />
                    </linearGradient>
                    <radialGradient id="dronePropGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#b0e0e6" />
                      <stop offset="100%" stopColor="#4682b4" />
                    </radialGradient>
                    <linearGradient id="droneArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#708090" />
                      <stop offset="100%" stopColor="#4682b4" />
                    </linearGradient>
                    <filter id="droneGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="droneFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (droneFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Propeller arms - thicker and more detailed */}
                  <path d="M38 52 L15 25" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
                  <path d="M90 52 L113 25" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
                  <path d="M38 76 L15 103" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
                  <path d="M90 76 L113 103" stroke="url(#droneArmGrad)" strokeWidth="5" mask="url(#droneFillMask)" strokeLinecap="round" />
                  {/* Arm details - power wires */}
                  <path d="M38 52 L15 25" stroke="#1e90ff" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
                  <path d="M90 52 L113 25" stroke="#ff0000" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
                  <path d="M38 76 L15 103" stroke="#ffff00" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
                  <path d="M90 76 L113 103" stroke="#00ff00" strokeWidth="1.5" mask="url(#droneFillMask)" strokeLinecap="round" opacity="0.6" />
                  {/* Propellers - spinning blades */}
                  <ellipse cx="15" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(30 15 25)" />
                  <ellipse cx="15" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-30 15 25)" />
                  <ellipse cx="113" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(45 113 25)" />
                  <ellipse cx="113" cy="25" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-45 113 25)" />
                  <ellipse cx="15" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(60 15 103)" />
                  <ellipse cx="15" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-60 15 103)" />
                  <ellipse cx="113" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(75 113 103)" />
                  <ellipse cx="113" cy="103" rx="14" ry="4" fill="url(#dronePropGrad)" mask="url(#droneFillMask)" opacity="0.6" transform="rotate(-75 113 103)" />
                  {/* Motor housings - more detailed */}
                  <circle cx="15" cy="25" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
                  <circle cx="15" cy="25" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
                  <circle cx="15" cy="25" r="3" fill="#708090" mask="url(#droneFillMask)" />
                  <circle cx="113" cy="25" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
                  <circle cx="113" cy="25" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
                  <circle cx="113" cy="25" r="3" fill="#708090" mask="url(#droneFillMask)" />
                  <circle cx="15" cy="103" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
                  <circle cx="15" cy="103" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
                  <circle cx="15" cy="103" r="3" fill="#708090" mask="url(#droneFillMask)" />
                  <circle cx="113" cy="103" r="7" fill="#2f4f4f" mask="url(#droneFillMask)" />
                  <circle cx="113" cy="103" r="7" fill="none" stroke="#4682b4" strokeWidth="1.5" />
                  <circle cx="113" cy="103" r="3" fill="#708090" mask="url(#droneFillMask)" />
                  {/* Central body - more detailed */}
                  <rect x="40" y="50" width="48" height="28" rx="4" fill="url(#droneBodyGrad)" mask="url(#droneFillMask)" filter="url(#droneGlow)" />
                  <rect x="40" y="50" width="48" height="28" rx="4" fill="none" stroke="#4682b4" strokeWidth="3" />
                  {/* Battery indicator */}
                  <rect x="45" y="55" width="38" height="8" rx="2" fill="#2f4f4f" mask="url(#droneFillMask)" opacity="0.7" />
                  <rect x="47" y="57" width="10" height="4" rx="1" fill="#00ff00" mask="url(#droneFillMask)" />
                  <rect x="59" y="57" width="10" height="4" rx="1" fill="#00ff00" mask="url(#droneFillMask)" />
                  <rect x="71" y="57" width="10" height="4" rx="1" fill="#ffff00" mask="url(#droneFillMask)" />
                  {/* LED status lights */}
                  <circle cx="46" cy="70" r="2.5" fill="#00ff00" mask="url(#droneFillMask)" />
                  <circle cx="82" cy="70" r="2.5" fill="#ff0000" mask="url(#droneFillMask)" />
                  {/* Camera gimbal assembly */}
                  <rect x="58" y="78" width="12" height="6" rx="1" fill="#708090" mask="url(#droneFillMask)" />
                  <rect x="60" y="84" width="8" height="10" rx="2" fill="#2f4f4f" mask="url(#droneFillMask)" />
                  {/* Camera lens */}
                  <circle cx="64" cy="88" r="6" fill="#000" mask="url(#droneFillMask)" />
                  <circle cx="64" cy="88" r="5" fill="#1e90ff" mask="url(#droneFillMask)" opacity="0.8" />
                  <circle cx="64" cy="88" r="3" fill="#000" mask="url(#droneFillMask)" />
                  <circle cx="65" cy="87" r="1.5" fill="#87ceeb" mask="url(#droneFillMask)" opacity="0.9" />
                  {/* Sensors */}
                  <circle cx="52" cy="64" r="3" fill="#ff6347" mask="url(#droneFillMask)" opacity="0.8" />
                  <circle cx="76" cy="64" r="3" fill="#ff6347" mask="url(#droneFillMask)" opacity="0.8" />
                  {/* Landing gear - more realistic */}
                  <line x1="48" y1="78" x2="46" y2="96" stroke="#708090" strokeWidth="3" mask="url(#droneFillMask)" strokeLinecap="round" />
                  <line x1="80" y1="78" x2="82" y2="96" stroke="#708090" strokeWidth="3" mask="url(#droneFillMask)" strokeLinecap="round" />
                  <path d="M44 96 L48 96 L48 100 L44 100 Z" fill="#5f9ea0" mask="url(#droneFillMask)" />
                  <path d="M80 96 L84 96 L84 100 L80 100 Z" fill="#5f9ea0" mask="url(#droneFillMask)" />
                  {/* Antenna */}
                  <line x1="64" y1="50" x2="64" y2="42" stroke="#4682b4" strokeWidth="2" mask="url(#droneFillMask)" />
                  <circle cx="64" cy="40" r="2" fill="#ff0000" mask="url(#droneFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🚁 Drone</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-cyan-600">{Math.round(droneFill)}%</div>
            </div>
            )}
            {/* AI Core */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="aiCore" onClick={() => handleCharacterClick('aiCore')} onMouseEnter={() => handleCharacterHover('aiCore')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'aiCore' ? [1, 1.2, 1] : [1, 1.08, 1], rotate: hoveredCharacter === 'aiCore' ? [0, 360] : [0, 180] }} transition={{ duration: hoveredCharacter === 'aiCore' ? 2 : 4, repeat: Infinity, ease: "linear" }} whileHover={{ scale: 1.3, filter: "brightness(1.4) drop-shadow(0 0 25px rgba(0,255,255,0.9))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'aiCore' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="aiCoreGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00ffff" />
                      <stop offset="50%" stopColor="#00bfff" />
                      <stop offset="100%" stopColor="#ff00ff" />
                    </radialGradient>
                    <linearGradient id="aiNeuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ffff" />
                      <stop offset="50%" stopColor="#ff00ff" />
                      <stop offset="100%" stopColor="#00ffff" />
                    </linearGradient>
                    <filter id="aiCoreGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="aiCoreFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (aiCoreFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Outer ring */}
                  <circle cx="64" cy="64" r="50" fill="none" stroke="url(#aiNeuralGrad)" strokeWidth="3" mask="url(#aiCoreFillMask)" opacity="0.7" />
                  <circle cx="64" cy="64" r="42" fill="none" stroke="url(#aiNeuralGrad)" strokeWidth="2" mask="url(#aiCoreFillMask)" opacity="0.5" />
                  {/* Neural network nodes */}
                  <circle cx="64" cy="20" r="5" fill="#00ffff" mask="url(#aiCoreFillMask)" />
                  <circle cx="100" cy="50" r="5" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
                  <circle cx="100" cy="78" r="5" fill="#00ffff" mask="url(#aiCoreFillMask)" />
                  <circle cx="64" cy="108" r="5" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
                  <circle cx="28" cy="78" r="5" fill="#00ffff" mask="url(#aiCoreFillMask)" />
                  <circle cx="28" cy="50" r="5" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
                  {/* Connection lines */}
                  <line x1="64" y1="20" x2="64" y2="40" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
                  <line x1="100" y1="50" x2="82" y2="55" stroke="#ff00ff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
                  <line x1="100" y1="78" x2="82" y2="73" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
                  <line x1="64" y1="108" x2="64" y2="88" stroke="#ff00ff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
                  <line x1="28" y1="78" x2="46" y2="73" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
                  <line x1="28" y1="50" x2="46" y2="55" stroke="#ff00ff" strokeWidth="1.5" mask="url(#aiCoreFillMask)" opacity="0.6" />
                  {/* Core sphere */}
                  <circle cx="64" cy="64" r="28" fill="url(#aiCoreGrad)" mask="url(#aiCoreFillMask)" filter="url(#aiCoreGlow)" />
                  <circle cx="64" cy="64" r="28" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Brain pattern inside */}
                  <path d="M50 60 Q55 55, 60 60 Q62 58, 64 60 Q66 58, 68 60 Q73 55, 78 60" fill="none" stroke="#ff00ff" strokeWidth="2" mask="url(#aiCoreFillMask)" opacity="0.8" />
                  <path d="M50 68 Q55 73, 60 68 Q62 70, 64 68 Q66 70, 68 68 Q73 73, 78 68" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#aiCoreFillMask)" opacity="0.8" />
                  {/* Center glow */}
                  <circle cx="64" cy="64" r="8" fill="#ffffff" mask="url(#aiCoreFillMask)" opacity="0.9" />
                  <circle cx="64" cy="64" r="4" fill="#00ffff" mask="url(#aiCoreFillMask)" />
                  {/* Data particles */}
                  <circle cx="64" cy="50" r="2" fill="#00ffff" mask="url(#aiCoreFillMask)" />
                  <circle cx="75" cy="64" r="2" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
                  <circle cx="64" cy="78" r="2" fill="#00ffff" mask="url(#aiCoreFillMask)" />
                  <circle cx="53" cy="64" r="2" fill="#ff00ff" mask="url(#aiCoreFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🧠 AI Core</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(aiCoreFill)}%</div>
            </div>
            {/* NanoBot */}
            {shouldShowCharacter('nanobot') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="nanoBot" onClick={() => handleCharacterClick('nanoBot')} onMouseEnter={() => handleCharacterHover('nanoBot')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'nanoBot' ? [1, 1.25, 1] : [1, 1.1, 1], y: hoveredCharacter === 'nanoBot' ? [0, -8, 0] : [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.35, filter: "brightness(1.5) drop-shadow(0 0 20px rgba(0,255,255,0.9))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'nanoBot' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="nanoBotGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00ffff" />
                      <stop offset="50%" stopColor="#00ff00" />
                      <stop offset="100%" stopColor="#00bfff" />
                    </radialGradient>
                    <filter id="nanoBotGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="nanoBotFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (nanoBotFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Central sphere */}
                  <circle cx="64" cy="64" r="18" fill="url(#nanoBotGrad)" mask="url(#nanoBotFillMask)" filter="url(#nanoBotGlow)" />
                  <circle cx="64" cy="64" r="18" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Inner core */}
                  <circle cx="64" cy="64" r="10" fill="#00ff00" mask="url(#nanoBotFillMask)" opacity="0.8" />
                  <circle cx="64" cy="64" r="5" fill="#ffffff" mask="url(#nanoBotFillMask)" />
                  {/* Orbiting particles */}
                  <circle cx="84" cy="64" r="4" fill="#00ffff" mask="url(#nanoBotFillMask)" />
                  <circle cx="44" cy="64" r="4" fill="#00ff00" mask="url(#nanoBotFillMask)" />
                  <circle cx="64" cy="44" r="4" fill="#ff00ff" mask="url(#nanoBotFillMask)" />
                  <circle cx="64" cy="84" r="4" fill="#00bfff" mask="url(#nanoBotFillMask)" />
                  <circle cx="76" cy="52" r="3" fill="#00ffff" mask="url(#nanoBotFillMask)" opacity="0.7" />
                  <circle cx="52" cy="76" r="3" fill="#00ff00" mask="url(#nanoBotFillMask)" opacity="0.7" />
                  <circle cx="76" cy="76" r="3" fill="#ff00ff" mask="url(#nanoBotFillMask)" opacity="0.7" />
                  <circle cx="52" cy="52" r="3" fill="#00bfff" mask="url(#nanoBotFillMask)" opacity="0.7" />
                  {/* Orbit lines */}
                  <circle cx="64" cy="64" r="24" fill="none" stroke="#00ffff" strokeWidth="1" mask="url(#nanoBotFillMask)" opacity="0.3" />
                  <circle cx="64" cy="64" r="30" fill="none" stroke="#00ff00" strokeWidth="1" mask="url(#nanoBotFillMask)" opacity="0.3" />
                  <circle cx="64" cy="64" r="36" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#nanoBotFillMask)" opacity="0.3" />
                  {/* Molecular bonds */}
                  <line x1="64" y1="64" x2="84" y2="64" stroke="#00ffff" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
                  <line x1="64" y1="64" x2="44" y2="64" stroke="#00ff00" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
                  <line x1="64" y1="64" x2="64" y2="44" stroke="#ff00ff" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
                  <line x1="64" y1="64" x2="64" y2="84" stroke="#00bfff" strokeWidth="1.5" mask="url(#nanoBotFillMask)" opacity="0.5" />
                  {/* Nano appendages */}
                  <path d="M82 64 L100 54 L102 56 L100 58" stroke="#00ffff" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
                  <path d="M46 64 L28 54 L26 56 L28 58" stroke="#00ff00" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
                  <path d="M64 46 L74 28 L76 30 L74 32" stroke="#ff00ff" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
                  <path d="M64 82 L74 100 L76 98 L74 96" stroke="#00bfff" strokeWidth="2" mask="url(#nanoBotFillMask)" fill="none" />
                  {/* Micro details */}
                  <circle cx="64" cy="64" r="2" fill="#ffffff" mask="url(#nanoBotFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🔬 NanoBot</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-cyan-600">{Math.round(nanoBotFill)}%</div>
            </div>
            )}
            {/* Holo Chip */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="holoChip" onClick={() => handleCharacterClick('holoChip')} onMouseEnter={() => handleCharacterHover('holoChip')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'holoChip' ? [1, 1.15, 1] : [1, 1.05, 1], y: hoveredCharacter === 'holoChip' ? [0, -5, 0] : [0, -2, 0] }} transition={{ duration: hoveredCharacter === 'holoChip' ? 1.5 : 2.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.4) drop-shadow(0 0 20px rgba(127,255,212,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'holoChip' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="holoChipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7fffd4" />
                      <stop offset="50%" stopColor="#40e0d0" />
                      <stop offset="100%" stopColor="#48d1cc" />
                    </linearGradient>
                    <filter id="holoChipGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="holoChipFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (holoChipFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Chip body */}
                  <rect x="36" y="36" width="56" height="56" rx="4" fill="url(#holoChipGrad)" mask="url(#holoChipFillMask)" filter="url(#holoChipGlow)" />
                  <rect x="36" y="36" width="56" height="56" rx="4" fill="none" stroke="#40e0d0" strokeWidth="3" />
                  {/* Circuit patterns */}
                  <path d="M44 44 L54 44 L54 54 L44 54 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
                  <path d="M74 44 L84 44 L84 54 L74 54 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
                  <path d="M44 74 L54 74 L54 84 L44 84 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
                  <path d="M74 74 L84 74 L84 84 L74 84 Z" fill="none" stroke="#00ffff" strokeWidth="2" mask="url(#holoChipFillMask)" />
                  {/* Central processor */}
                  <rect x="56" y="56" width="16" height="16" rx="2" fill="#7fffd4" mask="url(#holoChipFillMask)" />
                  <rect x="56" y="56" width="16" height="16" rx="2" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="64" cy="64" r="4" fill="#ffffff" mask="url(#holoChipFillMask)" />
                  {/* Circuit lines */}
                  <line x1="49" y1="49" x2="56" y2="56" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
                  <line x1="79" y1="49" x2="72" y2="56" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
                  <line x1="49" y1="79" x2="56" y2="72" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
                  <line x1="79" y1="79" x2="72" y2="72" stroke="#00ffff" strokeWidth="1.5" mask="url(#holoChipFillMask)" />
                  {/* Connection pins */}
                  <rect x="28" y="56" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="28" y="64" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="28" y="72" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="92" y="56" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="92" y="64" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="92" y="72" width="8" height="3" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="56" y="28" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="64" y="28" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="72" y="28" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="56" y="92" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="64" y="92" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  <rect x="72" y="92" width="3" height="8" fill="#40e0d0" mask="url(#holoChipFillMask)" />
                  {/* Holographic data streams */}
                  <circle cx="49" cy="49" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
                  <circle cx="79" cy="49" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
                  <circle cx="49" cy="79" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
                  <circle cx="79" cy="79" r="2" fill="#00ffff" mask="url(#holoChipFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">💾 Holo Chip</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-teal-600">{Math.round(holoChipFill)}%</div>
            </div>
            {/* Cyber Lion */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="cyberLion" onClick={() => handleCharacterClick('cyberLion')} onMouseEnter={() => handleCharacterHover('cyberLion')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'cyberLion' ? [1, 1.2, 1] : [1, 1.1, 1], rotate: clickedCharacter === 'cyberLion' ? [0, 5, -5, 0] : 0 }} transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.3) drop-shadow(0 0 20px rgba(255,215,0,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'cyberLion' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="cyberLionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="50%" stopColor="#00bfff" />
                      <stop offset="100%" stopColor="#ff00ff" />
                    </linearGradient>
                    <filter id="cyberLionGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="cyberLionFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (cyberLionFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="82" rx="28" ry="32" fill="url(#cyberLionGrad)" mask="url(#cyberLionFillMask)" filter="url(#cyberLionGlow)" />
                  <ellipse cx="64" cy="82" rx="28" ry="32" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Circuit pattern on body */}
                  <path d="M50 75 L58 75 L58 85 L50 85" fill="none" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" opacity="0.6" />
                  <path d="M70 75 L78 75 L78 85 L70 85" fill="none" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" opacity="0.6" />
                  {/* Head */}
                  <circle cx="64" cy="50" r="24" fill="url(#cyberLionGrad)" mask="url(#cyberLionFillMask)" />
                  <circle cx="64" cy="50" r="24" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Digital mane */}
                  <path d="M40 40 L30 25 L35 28 L40 35 Z" fill="#ffd700" mask="url(#cyberLionFillMask)" opacity="0.8" />
                  <path d="M50 32 L45 18 L48 22 L52 28 Z" fill="#00bfff" mask="url(#cyberLionFillMask)" opacity="0.8" />
                  <path d="M64 28 L64 14 L66 18 L64 24 Z" fill="#ff00ff" mask="url(#cyberLionFillMask)" opacity="0.8" />
                  <path d="M78 32 L83 18 L80 22 L76 28 Z" fill="#ffd700" mask="url(#cyberLionFillMask)" opacity="0.8" />
                  <path d="M88 40 L98 25 L93 28 L88 35 Z" fill="#00bfff" mask="url(#cyberLionFillMask)" opacity="0.8" />
                  {/* Glowing eyes */}
                  <circle cx="54" cy="48" r="6" fill="#00ffff" mask="url(#cyberLionFillMask)" />
                  <circle cx="74" cy="48" r="6" fill="#00ffff" mask="url(#cyberLionFillMask)" />
                  <circle cx="54" cy="48" r="3" fill="#ffffff" mask="url(#cyberLionFillMask)" />
                  <circle cx="74" cy="48" r="3" fill="#ffffff" mask="url(#cyberLionFillMask)" />
                  {/* Tech snout */}
                  <ellipse cx="64" cy="58" rx="8" ry="6" fill="#4169e1" mask="url(#cyberLionFillMask)" />
                  <ellipse cx="64" cy="60" rx="3" ry="2" fill="#000" mask="url(#cyberLionFillMask)" />
                  {/* Energy tail */}
                  <path d="M90 85 Q105 90, 110 100 L108 102 L105 95 Q95 88, 88 87" fill="url(#cyberLionGrad)" mask="url(#cyberLionFillMask)" opacity="0.8" />
                  <circle cx="110" cy="100" r="4" fill="#ffff00" mask="url(#cyberLionFillMask)" />
                  {/* Tech details */}
                  <line x1="44" y1="50" x2="34" y2="50" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" />
                  <line x1="84" y1="50" x2="94" y2="50" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberLionFillMask)" />
                  <circle cx="64" cy="50" r="2" fill="#ff00ff" mask="url(#cyberLionFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🦁⚡ Cyber Lion</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-600">{Math.round(cyberLionFill)}%</div>
            </div>
            {/* Cyber Tiger */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="cyberTiger" onClick={() => handleCharacterClick('cyberTiger')} onMouseEnter={() => handleCharacterHover('cyberTiger')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'cyberTiger' ? [1, 1.22, 1] : [1, 1.1, 1], rotate: clickedCharacter === 'cyberTiger' ? [0, 8, -8, 0] : 0 }} transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.28, filter: "brightness(1.3) drop-shadow(0 0 22px rgba(255,140,0,0.9))" }} whileTap={{ scale: 0.88 }} className={`${hoveredCharacter === 'cyberTiger' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="cyberTigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff8c00" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#ff00ff" />
                    </linearGradient>
                    <filter id="cyberTigerGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="cyberTigerFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (cyberTigerFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="80" rx="30" ry="34" fill="url(#cyberTigerGrad)" mask="url(#cyberTigerFillMask)" filter="url(#cyberTigerGlow)" />
                  <ellipse cx="64" cy="80" rx="30" ry="34" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Tech stripes */}
                  <path d="M48 72 Q52 74, 56 72" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
                  <path d="M72 72 Q76 74, 80 72" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
                  <path d="M45 82 Q50 84, 55 82" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
                  <path d="M73 82 Q78 84, 83 82" stroke="#000" strokeWidth="3" mask="url(#cyberTigerFillMask)" opacity="0.7" />
                  {/* Neon stripes */}
                  <line x1="50" y1="75" x2="54" y2="75" stroke="#00ffff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
                  <line x1="74" y1="75" x2="78" y2="75" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
                  <line x1="47" y1="85" x2="52" y2="85" stroke="#00ffff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
                  <line x1="76" y1="85" x2="81" y2="85" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberTigerFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="48" rx="26" ry="24" fill="url(#cyberTigerGrad)" mask="url(#cyberTigerFillMask)" />
                  <ellipse cx="64" cy="48" rx="26" ry="24" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Mechanical ears */}
                  <path d="M42 32 L36 20 L40 24 L44 30 Z" fill="#ff8c00" mask="url(#cyberTigerFillMask)" />
                  <path d="M42 32 L36 20 L40 24 L44 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  <path d="M86 32 L92 20 L88 24 L84 30 Z" fill="#ff8c00" mask="url(#cyberTigerFillMask)" />
                  <path d="M86 32 L92 20 L88 24 L84 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  {/* Cybernetic eyes */}
                  <ellipse cx="52" cy="46" rx="7" ry="8" fill="#00ffff" mask="url(#cyberTigerFillMask)" />
                  <ellipse cx="76" cy="46" rx="7" ry="8" fill="#00ffff" mask="url(#cyberTigerFillMask)" />
                  <ellipse cx="52" cy="46" rx="3" ry="6" fill="#ff0000" mask="url(#cyberTigerFillMask)" />
                  <ellipse cx="76" cy="46" rx="3" ry="6" fill="#ff0000" mask="url(#cyberTigerFillMask)" />
                  <circle cx="52" cy="44" r="2" fill="#ffffff" mask="url(#cyberTigerFillMask)" />
                  <circle cx="76" cy="44" r="2" fill="#ffffff" mask="url(#cyberTigerFillMask)" />
                  {/* Tech snout */}
                  <ellipse cx="64" cy="56" rx="10" ry="8" fill="#00ffff" mask="url(#cyberTigerFillMask)" opacity="0.5" />
                  <ellipse cx="64" cy="58" rx="4" ry="3" fill="#000" mask="url(#cyberTigerFillMask)" />
                  {/* Energy whiskers */}
                  <line x1="40" y1="50" x2="28" y2="48" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
                  <line x1="40" y1="54" x2="28" y2="54" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
                  <line x1="88" y1="50" x2="100" y2="48" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
                  <line x1="88" y1="54" x2="100" y2="54" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberTigerFillMask)" />
                  {/* Power core */}
                  <circle cx="64" cy="80" r="5" fill="#ffff00" mask="url(#cyberTigerFillMask)" />
                  <circle cx="64" cy="80" r="3" fill="#ffffff" mask="url(#cyberTigerFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐯⚡ Cyber Tiger</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(cyberTigerFill)}%</div>
            </div>
            {/* Mecha Dragon */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="mechaDragon" onClick={() => handleCharacterClick('mechaDragon')} onMouseEnter={() => handleCharacterHover('mechaDragon')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'mechaDragon' ? [1, 1.25, 1] : [1, 1.12, 1], rotate: hoveredCharacter === 'mechaDragon' ? [0, 10, -10, 0] : 0 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.3, filter: "brightness(1.4) drop-shadow(0 0 25px rgba(255,69,0,0.9))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'mechaDragon' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="mechaDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4500" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                    <filter id="mechaDragonGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="mechaDragonFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (mechaDragonFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="75" rx="32" ry="38" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" filter="url(#mechaDragonGlow)" />
                  <ellipse cx="64" cy="75" rx="32" ry="38" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Mechanical plates */}
                  <path d="M50 65 L58 65 L58 70 L50 70 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" opacity="0.8" />
                  <path d="M70 65 L78 65 L78 70 L70 70 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" opacity="0.8" />
                  <path d="M48 78 L56 78 L56 85 L48 85 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" opacity="0.8" />
                  <path d="M72 78 L80 78 L80 85 L72 85 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" opacity="0.8" />
                  {/* Tech details */}
                  <circle cx="54" cy="67" r="2" fill="#00ffff" mask="url(#mechaDragonFillMask)" />
                  <circle cx="74" cy="67" r="2" fill="#00ffff" mask="url(#mechaDragonFillMask)" />
                  <line x1="52" y1="81" x2="58" y2="81" stroke="#00ffff" strokeWidth="2" mask="url(#mechaDragonFillMask)" />
                  <line x1="70" y1="81" x2="76" y2="81" stroke="#00ffff" strokeWidth="2" mask="url(#mechaDragonFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="40" rx="22" ry="20" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" />
                  <ellipse cx="64" cy="40" rx="22" ry="20" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Mechanical horns */}
                  <path d="M48 32 L42 20 L44 22 L50 30 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
                  <path d="M48 32 L42 20 L44 22 L50 30 Z" fill="none" stroke="#ffd700" strokeWidth="1.5" />
                  <path d="M80 32 L86 20 L84 22 L78 30 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
                  <path d="M80 32 L86 20 L84 22 L78 30 Z" fill="none" stroke="#ffd700" strokeWidth="1.5" />
                  {/* Cyber eyes */}
                  <ellipse cx="54" cy="38" rx="6" ry="7" fill="#ff0000" mask="url(#mechaDragonFillMask)" />
                  <ellipse cx="74" cy="38" rx="6" ry="7" fill="#ff0000" mask="url(#mechaDragonFillMask)" />
                  <circle cx="54" cy="37" r="3" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
                  <circle cx="74" cy="37" r="3" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
                  <circle cx="54" cy="36" r="1" fill="#ffffff" mask="url(#mechaDragonFillMask)" />
                  <circle cx="74" cy="36" r="1" fill="#ffffff" mask="url(#mechaDragonFillMask)" />
                  {/* Snout with exhaust */}
                  <path d="M64 45 Q70 48, 72 52 Q70 50, 64 48 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" />
                  <path d="M64 45 Q58 48, 56 52 Q58 50, 64 48 Z" fill="#ffd700" mask="url(#mechaDragonFillMask)" />
                  <circle cx="68" cy="50" r="2" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
                  <circle cx="60" cy="50" r="2" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
                  {/* Mechanical wings */}
                  <path d="M36 65 L20 50 L22 52 L24 60 L30 68 Z" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" opacity="0.7" />
                  <path d="M36 65 L20 50 L22 52 L24 60 L30 68 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  <path d="M92 65 L108 50 L106 52 L104 60 L98 68 Z" fill="url(#mechaDragonGrad)" mask="url(#mechaDragonFillMask)" opacity="0.7" />
                  <path d="M92 65 L108 50 L106 52 L104 60 L98 68 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  {/* Wing details */}
                  <line x1="25" y1="55" x2="32" y2="66" stroke="#ffd700" strokeWidth="1.5" mask="url(#mechaDragonFillMask)" opacity="0.7" />
                  <line x1="103" y1="55" x2="96" y2="66" stroke="#ffd700" strokeWidth="1.5" mask="url(#mechaDragonFillMask)" opacity="0.7" />
                  {/* Energy tail */}
                  <path d="M64 110 L60 120 L64 118 L68 120 Z" fill="#ff4500" mask="url(#mechaDragonFillMask)" />
                  <path d="M64 110 L60 120 L64 118 L68 120 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  <circle cx="64" cy="115" r="3" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
                  {/* Power core */}
                  <circle cx="64" cy="75" r="6" fill="#ff4500" mask="url(#mechaDragonFillMask)" opacity="0.8" />
                  <circle cx="64" cy="75" r="4" fill="#ffff00" mask="url(#mechaDragonFillMask)" />
                  <circle cx="64" cy="75" r="2" fill="#ffffff" mask="url(#mechaDragonFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐉🤖 Mecha Dragon</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-red-600">{Math.round(mechaDragonFill)}%</div>
            </div>
            {/* Neural Orb */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="neuralOrb" onClick={() => handleCharacterClick('neuralOrb')} onMouseEnter={() => handleCharacterHover('neuralOrb')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'neuralOrb' ? [1, 1.3, 1] : [1, 1.15, 1], rotate: [0, 360] }} transition={{ duration: hoveredCharacter === 'neuralOrb' ? 4 : 8, repeat: Infinity, ease: "linear" }} whileHover={{ scale: 1.35, filter: "brightness(1.5) drop-shadow(0 0 30px rgba(147,112,219,0.9))" }} whileTap={{ scale: 0.8 }} className={`${hoveredCharacter === 'neuralOrb' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="neuralOrbGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff00ff" />
                      <stop offset="40%" stopColor="#9370db" />
                      <stop offset="70%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#4169e1" />
                    </radialGradient>
                    <filter id="neuralOrbGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="neuralOrbFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (neuralOrbFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Main orb */}
                  <circle cx="64" cy="64" r="30" fill="url(#neuralOrbGrad)" mask="url(#neuralOrbFillMask)" filter="url(#neuralOrbGlow)" />
                  <circle cx="64" cy="64" r="30" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Inner neural network */}
                  <circle cx="64" cy="64" r="22" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.6" />
                  <circle cx="64" cy="64" r="15" fill="none" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.6" />
                  <circle cx="64" cy="64" r="8" fill="none" stroke="#00ffff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.6" />
                  {/* Neural nodes */}
                  <circle cx="64" cy="42" r="3" fill="#ff00ff" mask="url(#neuralOrbFillMask)" />
                  <circle cx="64" cy="86" r="3" fill="#ff00ff" mask="url(#neuralOrbFillMask)" />
                  <circle cx="42" cy="64" r="3" fill="#00ffff" mask="url(#neuralOrbFillMask)" />
                  <circle cx="86" cy="64" r="3" fill="#00ffff" mask="url(#neuralOrbFillMask)" />
                  <circle cx="52" cy="52" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
                  <circle cx="76" cy="52" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
                  <circle cx="52" cy="76" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
                  <circle cx="76" cy="76" r="2" fill="#9370db" mask="url(#neuralOrbFillMask)" />
                  {/* Neural connections */}
                  <line x1="64" y1="42" x2="64" y2="64" stroke="#ff00ff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  <line x1="64" y1="86" x2="64" y2="64" stroke="#ff00ff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  <line x1="42" y1="64" x2="64" y2="64" stroke="#00ffff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  <line x1="86" y1="64" x2="64" y2="64" stroke="#00ffff" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  <line x1="52" y1="52" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  <line x1="76" y1="52" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  <line x1="52" y1="76" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  <line x1="76" y1="76" x2="64" y2="64" stroke="#9370db" strokeWidth="1" mask="url(#neuralOrbFillMask)" opacity="0.5" />
                  {/* Core */}
                  <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#neuralOrbFillMask)" opacity="0.9" />
                  <circle cx="64" cy="64" r="4" fill="#ff00ff" mask="url(#neuralOrbFillMask)" />
                  <circle cx="64" cy="64" r="2" fill="#00ffff" mask="url(#neuralOrbFillMask)" />
                  {/* Outer energy rings */}
                  <circle cx="64" cy="64" r="38" fill="none" stroke="#ff00ff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" opacity="0.4" />
                  <circle cx="64" cy="64" r="44" fill="none" stroke="#00ffff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" opacity="0.3" />
                  {/* Data streams */}
                  <path d="M64 24 Q80 30, 88 40" stroke="#ff00ff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
                  <path d="M64 104 Q48 98, 40 88" stroke="#00ffff" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
                  <path d="M24 64 Q30 48, 40 40" stroke="#9370db" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
                  <path d="M104 64 Q98 80, 88 88" stroke="#9370db" strokeWidth="1.5" mask="url(#neuralOrbFillMask)" fill="none" opacity="0.5" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🔮 Neural Orb</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(neuralOrbFill)}%</div>
            </div>
            {/* Laser */}
            {shouldShowCharacter('laser') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="laser" onClick={() => handleCharacterClick('laser')} onMouseEnter={() => handleCharacterHover('laser')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'laser' ? [1, 1.2, 1] : [1, 1.1, 1], y: hoveredCharacter === 'laser' ? [0, -10, 0] : [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.3, filter: "brightness(1.6) drop-shadow(0 0 25px rgba(255,0,0,0.9))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'laser' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff0000" />
                      <stop offset="50%" stopColor="#ff4500" />
                      <stop offset="100%" stopColor="#ffff00" />
                    </linearGradient>
                    <filter id="laserGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="laserFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (laserFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Laser cannon base */}
                  <rect x="48" y="85" width="32" height="20" rx="3" fill="#696969" mask="url(#laserFillMask)" />
                  <rect x="48" y="85" width="32" height="20" rx="3" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Barrel */}
                  <rect x="54" y="45" width="20" height="40" rx="2" fill="url(#laserGrad)" mask="url(#laserFillMask)" filter="url(#laserGlow)" />
                  <rect x="54" y="45" width="20" height="40" rx="2" fill="none" stroke="#ff0000" strokeWidth="2" />
                  {/* Barrel details */}
                  <line x1="54" y1="55" x2="74" y2="55" stroke="#ffff00" strokeWidth="1.5" mask="url(#laserFillMask)" />
                  <line x1="54" y1="65" x2="74" y2="65" stroke="#ffff00" strokeWidth="1.5" mask="url(#laserFillMask)" />
                  <line x1="54" y1="75" x2="74" y2="75" stroke="#ffff00" strokeWidth="1.5" mask="url(#laserFillMask)" />
                  {/* Energy vents */}
                  <rect x="50" y="50" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
                  <rect x="76" y="50" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
                  <rect x="50" y="62" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
                  <rect x="76" y="62" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
                  <rect x="50" y="74" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
                  <rect x="76" y="74" width="2" height="8" fill="#ff4500" mask="url(#laserFillMask)" />
                  {/* Laser beam exit */}
                  <ellipse cx="64" cy="45" rx="10" ry="8" fill="#ff0000" mask="url(#laserFillMask)" opacity="0.8" />
                  <ellipse cx="64" cy="45" rx="7" ry="5" fill="#ff4500" mask="url(#laserFillMask)" />
                  <ellipse cx="64" cy="45" rx="4" ry="3" fill="#ffff00" mask="url(#laserFillMask)" />
                  <circle cx="64" cy="45" r="2" fill="#ffffff" mask="url(#laserFillMask)" />
                  {/* Laser beam */}
                  <rect x="60" y="15" width="8" height="30" fill="#ff0000" mask="url(#laserFillMask)" opacity="0.7" />
                  <rect x="61" y="15" width="6" height="30" fill="#ff4500" mask="url(#laserFillMask)" opacity="0.6" />
                  <rect x="62" y="15" width="4" height="30" fill="#ffff00" mask="url(#laserFillMask)" opacity="0.5" />
                  <rect x="63" y="15" width="2" height="30" fill="#ffffff" mask="url(#laserFillMask)" opacity="0.4" />
                  {/* Energy core */}
                  <circle cx="64" cy="95" r="6" fill="#ff0000" mask="url(#laserFillMask)" />
                  <circle cx="64" cy="95" r="4" fill="#ffff00" mask="url(#laserFillMask)" />
                  <circle cx="64" cy="95" r="2" fill="#ffffff" mask="url(#laserFillMask)" />
                  {/* Tech panels */}
                  <rect x="52" y="88" width="3" height="12" fill="#00ffff" mask="url(#laserFillMask)" opacity="0.6" />
                  <rect x="73" y="88" width="3" height="12" fill="#00ffff" mask="url(#laserFillMask)" opacity="0.6" />
                  {/* Status lights */}
                  <circle cx="58" cy="92" r="1.5" fill="#00ff00" mask="url(#laserFillMask)" />
                  <circle cx="70" cy="92" r="1.5" fill="#00ff00" mask="url(#laserFillMask)" />
                  {/* Cooling fins */}
                  <path d="M45 70 L42 68 L42 72 Z" fill="#696969" mask="url(#laserFillMask)" />
                  <path d="M83 70 L86 68 L86 72 Z" fill="#696969" mask="url(#laserFillMask)" />
                  <path d="M45 60 L42 58 L42 62 Z" fill="#696969" mask="url(#laserFillMask)" />
                  <path d="M83 60 L86 58 L86 62 Z" fill="#696969" mask="url(#laserFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">⚡🔴 Laser</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-red-600">{Math.round(laserFill)}%</div>
            </div>
            )}
            {/* Hologram */}
            {shouldShowCharacter('hologram') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="hologram" onClick={() => handleCharacterClick('hologram')} onMouseEnter={() => handleCharacterHover('hologram')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'hologram' ? [1, 1.2, 1] : [1, 1.08, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: hoveredCharacter === 'hologram' ? 2 : 3, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.25, opacity: 1, filter: "brightness(1.5) drop-shadow(0 0 25px rgba(0,255,255,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'hologram' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="hologramGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00ffff" />
                      <stop offset="25%" stopColor="#00ffaa" />
                      <stop offset="50%" stopColor="#00ccff" />
                      <stop offset="75%" stopColor="#66ffff" />
                      <stop offset="100%" stopColor="#ccffff" />
                    </linearGradient>
                    <radialGradient id="hologramRadial" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" opacity="0.8" />
                      <stop offset="30%" stopColor="#00ffff" opacity="0.6" />
                      <stop offset="70%" stopColor="#00ffaa" opacity="0.4" />
                      <stop offset="100%" stopColor="#00ccff" opacity="0.2" />
                    </radialGradient>
                    <filter id="hologramGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="hologramFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (hologramFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Outer glow aura */}
                  <circle cx="64" cy="64" r="55" fill="url(#hologramRadial)" mask="url(#hologramFillMask)" opacity="0.15" />
                  {/* Head with enhanced glow */}
                  <circle cx="64" cy="45" r="18" fill="url(#hologramGrad)" mask="url(#hologramFillMask)" filter="url(#hologramGlow)" opacity="0.85" />
                  <circle cx="64" cy="45" r="18" fill="none" stroke="#00ffff" strokeWidth="2.5" opacity="0.9" />
                  <circle cx="64" cy="45" r="20" fill="none" stroke="#00ffaa" strokeWidth="1" mask="url(#hologramFillMask)" opacity="0.4" />
                  {/* Eyes - brighter */}
                  <circle cx="58" cy="43" r="3" fill="#00ffff" mask="url(#hologramFillMask)" />
                  <circle cx="70" cy="43" r="3" fill="#00ffff" mask="url(#hologramFillMask)" />
                  <circle cx="58" cy="42" r="1.5" fill="#ffffff" mask="url(#hologramFillMask)" />
                  <circle cx="70" cy="42" r="1.5" fill="#ffffff" mask="url(#hologramFillMask)" />
                  {/* Mouth line - glowing */}
                  <line x1="58" y1="50" x2="70" y2="50" stroke="#00ffff" strokeWidth="2" mask="url(#hologramFillMask)" opacity="0.9" />
                  {/* Body with gradient */}
                  <path d="M50 63 L64 58 L78 63 L74 90 L54 90 Z" fill="url(#hologramGrad)" mask="url(#hologramFillMask)" filter="url(#hologramGlow)" opacity="0.75" />
                  <path d="M50 63 L64 58 L78 63 L74 90 L54 90 Z" fill="none" stroke="#00ffff" strokeWidth="2.5" opacity="0.9" />
                  <path d="M50 63 L64 58 L78 63 L74 90 L54 90 Z" fill="none" stroke="#00ffaa" strokeWidth="1" mask="url(#hologramFillMask)" opacity="0.5" />
                  {/* Chest core */}
                  <circle cx="64" cy="75" r="4" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.8" />
                  <circle cx="64" cy="75" r="6" fill="none" stroke="#00ffaa" strokeWidth="1" mask="url(#hologramFillMask)" opacity="0.5" />
                  <circle cx="64" cy="75" r="2" fill="#ffffff" mask="url(#hologramFillMask)" />
                  {/* Arms - glowing */}
                  <line x1="50" y1="65" x2="38" y2="75" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
                  <line x1="78" y1="65" x2="90" y2="75" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
                  <line x1="50" y1="65" x2="38" y2="75" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
                  <line x1="78" y1="65" x2="90" y2="75" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
                  {/* Hands glow */}
                  <circle cx="38" cy="75" r="3" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
                  <circle cx="90" cy="75" r="3" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
                  {/* Legs - glowing */}
                  <line x1="58" y1="90" x2="56" y2="110" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
                  <line x1="70" y1="90" x2="72" y2="110" stroke="#00ffff" strokeWidth="3.5" mask="url(#hologramFillMask)" opacity="0.8" />
                  <line x1="58" y1="90" x2="56" y2="110" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
                  <line x1="70" y1="90" x2="72" y2="110" stroke="#00ffaa" strokeWidth="1.5" mask="url(#hologramFillMask)" opacity="0.5" />
                  {/* Feet glow */}
                  <circle cx="56" cy="110" r="2.5" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
                  <circle cx="72" cy="110" r="2.5" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.7" />
                  {/* Enhanced scan lines with alternating colors */}
                  <line x1="40" y1="40" x2="88" y2="40" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
                  <line x1="40" y1="48" x2="88" y2="48" stroke="#00ffaa" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
                  <line x1="40" y1="56" x2="88" y2="56" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
                  <line x1="40" y1="64" x2="88" y2="64" stroke="#00ccff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
                  <line x1="40" y1="72" x2="88" y2="72" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
                  <line x1="40" y1="80" x2="88" y2="80" stroke="#00ffaa" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
                  <line x1="40" y1="88" x2="88" y2="88" stroke="#00ffff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.5" />
                  <line x1="40" y1="96" x2="88" y2="96" stroke="#00ccff" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
                  <line x1="40" y1="104" x2="88" y2="104" stroke="#00ffaa" strokeWidth="0.8" mask="url(#hologramFillMask)" opacity="0.4" />
                  {/* Enhanced data particles with multiple colors */}
                  <circle cx="45" cy="55" r="2" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.8" />
                  <circle cx="83" cy="68" r="2" fill="#00ffaa" mask="url(#hologramFillMask)" opacity="0.8" />
                  <circle cx="50" cy="85" r="2" fill="#00ccff" mask="url(#hologramFillMask)" opacity="0.8" />
                  <circle cx="78" cy="78" r="2" fill="#66ffff" mask="url(#hologramFillMask)" opacity="0.8" />
                  <circle cx="42" cy="70" r="1.5" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.6" />
                  <circle cx="86" cy="92" r="1.5" fill="#00ffaa" mask="url(#hologramFillMask)" opacity="0.6" />
                  {/* Pixel glitches for hologram effect */}
                  <rect x="48" y="47" width="2" height="1" fill="#ffffff" mask="url(#hologramFillMask)" opacity="0.7" />
                  <rect x="75" y="52" width="1" height="2" fill="#ffffff" mask="url(#hologramFillMask)" opacity="0.7" />
                  <rect x="52" y="78" width="2" height="1" fill="#00ffff" mask="url(#hologramFillMask)" opacity="0.6" />
                  <rect x="73" y="83" width="1" height="2" fill="#00ffaa" mask="url(#hologramFillMask)" opacity="0.6" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">👤✨ Hologram</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-cyan-600">{Math.round(hologramFill)}%</div>
            </div>
            )}
            {/* Tech Fox */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="techFox" onClick={() => handleCharacterClick('techFox')} onMouseEnter={() => handleCharacterHover('techFox')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'techFox' ? [1, 1.18, 1] : [1, 1.08, 1], rotate: clickedCharacter === 'techFox' ? [0, 6, -6, 0] : 0 }} transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.3) drop-shadow(0 0 20px rgba(255,140,0,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'techFox' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="techFoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff8c00" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#ffd700" />
                    </linearGradient>
                    <filter id="techFoxGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="techFoxFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (techFoxFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="80" rx="28" ry="32" fill="url(#techFoxGrad)" mask="url(#techFoxFillMask)" filter="url(#techFoxGlow)" />
                  <ellipse cx="64" cy="80" rx="28" ry="32" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Tech belly panel */}
                  <rect x="56" y="75" width="16" height="12" rx="2" fill="#00ffff" mask="url(#techFoxFillMask)" opacity="0.4" />
                  <circle cx="58" cy="78" r="1" fill="#ffd700" mask="url(#techFoxFillMask)" />
                  <circle cx="64" cy="78" r="1" fill="#ffd700" mask="url(#techFoxFillMask)" />
                  <circle cx="70" cy="78" r="1" fill="#ffd700" mask="url(#techFoxFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="48" rx="20" ry="18" fill="url(#techFoxGrad)" mask="url(#techFoxFillMask)" />
                  <ellipse cx="64" cy="48" rx="20" ry="18" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Tech ears */}
                  <path d="M50 35 L44 20 L48 24 L54 32 Z" fill="#ff8c00" mask="url(#techFoxFillMask)" />
                  <path d="M50 35 L44 20 L48 24 L54 32 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  <circle cx="48" cy="26" r="2" fill="#ffd700" mask="url(#techFoxFillMask)" />
                  <path d="M78 35 L84 20 L80 24 L74 32 Z" fill="#ff8c00" mask="url(#techFoxFillMask)" />
                  <path d="M78 35 L84 20 L80 24 L74 32 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  <circle cx="80" cy="26" r="2" fill="#ffd700" mask="url(#techFoxFillMask)" />
                  {/* Cyber eyes */}
                  <ellipse cx="56" cy="46" rx="5" ry="6" fill="#00ffff" mask="url(#techFoxFillMask)" />
                  <ellipse cx="72" cy="46" rx="5" ry="6" fill="#00ffff" mask="url(#techFoxFillMask)" />
                  <circle cx="56" cy="45" r="2" fill="#ffffff" mask="url(#techFoxFillMask)" />
                  <circle cx="72" cy="45" r="2" fill="#ffffff" mask="url(#techFoxFillMask)" />
                  {/* Snout */}
                  <path d="M64 52 Q68 56, 70 58 L64 56 L58 58 Q60 56, 64 52 Z" fill="#ffd700" mask="url(#techFoxFillMask)" />
                  <circle cx="64" cy="56" r="2" fill="#000" mask="url(#techFoxFillMask)" />
                  {/* Energy tail */}
                  <path d="M90 85 Q105 88, 115 95 Q110 90, 105 88 Q100 85, 92 86 Z" fill="url(#techFoxGrad)" mask="url(#techFoxFillMask)" opacity="0.8" />
                  <path d="M90 85 Q105 88, 115 95" stroke="#00ffff" strokeWidth="2" mask="url(#techFoxFillMask)" fill="none" />
                  <circle cx="115" cy="95" r="3" fill="#ffd700" mask="url(#techFoxFillMask)" />
                  {/* Circuit lines */}
                  <line x1="60" y1="70" x2="60" y2="75" stroke="#00ffff" strokeWidth="1" mask="url(#techFoxFillMask)" opacity="0.5" />
                  <line x1="68" y1="70" x2="68" y2="75" stroke="#00ffff" strokeWidth="1" mask="url(#techFoxFillMask)" opacity="0.5" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🦊⚡ Tech Fox</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(techFoxFill)}%</div>
            </div>
            {/* AI Wolf */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="aiWolf" onClick={() => handleCharacterClick('aiWolf')} onMouseEnter={() => handleCharacterHover('aiWolf')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'aiWolf' ? [1, 1.2, 1] : [1, 1.1, 1], rotate: clickedCharacter === 'aiWolf' ? [0, 7, -7, 0] : 0 }} transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.26, filter: "brightness(1.3) drop-shadow(0 0 22px rgba(65,105,225,0.9))" }} whileTap={{ scale: 0.88 }} className={`${hoveredCharacter === 'aiWolf' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="aiWolfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4169e1" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#c0c0c0" />
                    </linearGradient>
                    <filter id="aiWolfGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="aiWolfFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (aiWolfFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="78" rx="30" ry="34" fill="url(#aiWolfGrad)" mask="url(#aiWolfFillMask)" filter="url(#aiWolfGlow)" />
                  <ellipse cx="64" cy="78" rx="30" ry="34" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Fur tech pattern */}
                  <path d="M50 70 Q54 72, 58 70" stroke="#c0c0c0" strokeWidth="2" mask="url(#aiWolfFillMask)" fill="none" />
                  <path d="M70 70 Q74 72, 78 70" stroke="#c0c0c0" strokeWidth="2" mask="url(#aiWolfFillMask)" fill="none" />
                  <line x1="60" y1="82" x2="64" y2="82" stroke="#00ffff" strokeWidth="2" mask="url(#aiWolfFillMask)" />
                  <line x1="64" y1="82" x2="68" y2="82" stroke="#00ffff" strokeWidth="2" mask="url(#aiWolfFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="46" rx="24" ry="22" fill="url(#aiWolfGrad)" mask="url(#aiWolfFillMask)" />
                  <ellipse cx="64" cy="46" rx="24" ry="22" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Tech ears */}
                  <path d="M46 32 L40 18 L44 22 L50 30 Z" fill="#4169e1" mask="url(#aiWolfFillMask)" />
                  <path d="M46 32 L40 18 L44 22 L50 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  <line x1="43" y1="25" x2="47" y2="28" stroke="#c0c0c0" strokeWidth="1" mask="url(#aiWolfFillMask)" />
                  <path d="M82 32 L88 18 L84 22 L78 30 Z" fill="#4169e1" mask="url(#aiWolfFillMask)" />
                  <path d="M82 32 L88 18 L84 22 L78 30 Z" fill="none" stroke="#00ffff" strokeWidth="1.5" />
                  <line x1="85" y1="25" x2="81" y2="28" stroke="#c0c0c0" strokeWidth="1" mask="url(#aiWolfFillMask)" />
                  {/* AI eyes */}
                  <ellipse cx="54" cy="44" rx="6" ry="7" fill="#00ffff" mask="url(#aiWolfFillMask)" />
                  <ellipse cx="74" cy="44" rx="6" ry="7" fill="#00ffff" mask="url(#aiWolfFillMask)" />
                  <circle cx="54" cy="43" r="3" fill="#4169e1" mask="url(#aiWolfFillMask)" />
                  <circle cx="74" cy="43" r="3" fill="#4169e1" mask="url(#aiWolfFillMask)" />
                  <circle cx="54" cy="42" r="1" fill="#ffffff" mask="url(#aiWolfFillMask)" />
                  <circle cx="74" cy="42" r="1" fill="#ffffff" mask="url(#aiWolfFillMask)" />
                  {/* Snout with tech detail */}
                  <ellipse cx="64" cy="54" rx="10" ry="8" fill="#c0c0c0" mask="url(#aiWolfFillMask)" opacity="0.6" />
                  <ellipse cx="64" cy="56" rx="4" ry="3" fill="#000" mask="url(#aiWolfFillMask)" />
                  <line x1="64" y1="56" x2="64" y2="60" stroke="#00ffff" strokeWidth="1" mask="url(#aiWolfFillMask)" />
                  {/* Energy aura lines */}
                  <line x1="40" y1="46" x2="32" y2="46" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiWolfFillMask)" opacity="0.6" />
                  <line x1="88" y1="46" x2="96" y2="46" stroke="#00ffff" strokeWidth="1.5" mask="url(#aiWolfFillMask)" opacity="0.6" />
                  {/* Power core */}
                  <circle cx="64" cy="78" r="5" fill="#4169e1" mask="url(#aiWolfFillMask)" opacity="0.8" />
                  <circle cx="64" cy="78" r="3" fill="#00ffff" mask="url(#aiWolfFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐺🤖 AI Wolf</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-600">{Math.round(aiWolfFill)}%</div>
            </div>
            {/* Circuit Bot */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="circuitBot" onClick={() => handleCharacterClick('circuitBot')} onMouseEnter={() => handleCharacterHover('circuitBot')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'circuitBot' ? [1, 1.16, 1] : [1, 1.06, 1], y: hoveredCharacter === 'circuitBot' ? [0, -6, 0] : [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.24, filter: "brightness(1.4) drop-shadow(0 0 20px rgba(50,205,50,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'circuitBot' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="circuitBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#32cd32" />
                      <stop offset="50%" stopColor="#00ff00" />
                      <stop offset="100%" stopColor="#ffff00" />
                    </linearGradient>
                    <filter id="circuitBotGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="circuitBotFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (circuitBotFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <rect x="44" y="60" width="40" height="44" rx="4" fill="url(#circuitBotGrad)" mask="url(#circuitBotFillMask)" filter="url(#circuitBotGlow)" />
                  <rect x="44" y="60" width="40" height="44" rx="4" fill="none" stroke="#00ff00" strokeWidth="2" />
                  {/* Circuit board patterns */}
                  <path d="M52 68 L60 68 L60 76 L52 76 Z" fill="none" stroke="#ffff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
                  <path d="M68 68 L76 68 L76 76 L68 76 Z" fill="none" stroke="#ffff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
                  <line x1="56" y1="72" x2="64" y2="72" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
                  <line x1="64" y1="72" x2="72" y2="72" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
                  <circle cx="56" cy="72" r="2" fill="#ffff00" mask="url(#circuitBotFillMask)" />
                  <circle cx="72" cy="72" r="2" fill="#ffff00" mask="url(#circuitBotFillMask)" />
                  {/* Power core */}
                  <rect x="58" y="84" width="12" height="12" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
                  <circle cx="64" cy="90" r="4" fill="#ffff00" mask="url(#circuitBotFillMask)" />
                  <circle cx="64" cy="90" r="2" fill="#ffffff" mask="url(#circuitBotFillMask)" />
                  {/* Head */}
                  <rect x="50" y="36" width="28" height="24" rx="3" fill="url(#circuitBotGrad)" mask="url(#circuitBotFillMask)" />
                  <rect x="50" y="36" width="28" height="24" rx="3" fill="none" stroke="#00ff00" strokeWidth="2" />
                  {/* LED eyes */}
                  <rect x="56" y="44" width="6" height="8" rx="1" fill="#00ff00" mask="url(#circuitBotFillMask)" />
                  <rect x="66" y="44" width="6" height="8" rx="1" fill="#00ff00" mask="url(#circuitBotFillMask)" />
                  <rect x="57" y="46" width="4" height="4" fill="#ffff00" mask="url(#circuitBotFillMask)" />
                  <rect x="67" y="46" width="4" height="4" fill="#ffff00" mask="url(#circuitBotFillMask)" />
                  {/* Antenna */}
                  <line x1="64" y1="36" x2="64" y2="26" stroke="#32cd32" strokeWidth="2" mask="url(#circuitBotFillMask)" />
                  <circle cx="64" cy="26" r="3" fill="#ffff00" mask="url(#circuitBotFillMask)" />
                  <circle cx="64" cy="26" r="5" fill="none" stroke="#00ff00" strokeWidth="1" mask="url(#circuitBotFillMask)" opacity="0.5" />
                  {/* Arms */}
                  <rect x="36" y="68" width="8" height="16" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
                  <rect x="84" y="68" width="8" height="16" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
                  <circle cx="40" cy="84" r="3" fill="#00ff00" mask="url(#circuitBotFillMask)" />
                  <circle cx="88" cy="84" r="3" fill="#00ff00" mask="url(#circuitBotFillMask)" />
                  {/* Legs */}
                  <rect x="52" y="104" width="8" height="12" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
                  <rect x="68" y="104" width="8" height="12" rx="2" fill="#32cd32" mask="url(#circuitBotFillMask)" />
                  {/* Circuit connectors */}
                  <line x1="50" y1="70" x2="44" y2="70" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
                  <line x1="78" y1="70" x2="84" y2="70" stroke="#00ff00" strokeWidth="1.5" mask="url(#circuitBotFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🔌🤖 Circuit Bot</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-green-600">{Math.round(circuitBotFill)}%</div>
            </div>
            {/* Cyber Panther */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="cyberPanther" onClick={() => handleCharacterClick('cyberPanther')} onMouseEnter={() => handleCharacterHover('cyberPanther')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'cyberPanther' ? [1, 1.22, 1] : [1, 1.12, 1], rotate: clickedCharacter === 'cyberPanther' ? [0, 9, -9, 0] : 0 }} transition={{ duration: 1.3, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.28, filter: "brightness(1.35) drop-shadow(0 0 22px rgba(148,0,211,0.9))" }} whileTap={{ scale: 0.87 }} className={`${hoveredCharacter === 'cyberPanther' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="cyberPantherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9400d3" />
                      <stop offset="50%" stopColor="#00ffff" />
                      <stop offset="100%" stopColor="#ff00ff" />
                    </linearGradient>
                    <filter id="cyberPantherGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="cyberPantherFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (cyberPantherFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Body */}
                  <ellipse cx="64" cy="80" rx="32" ry="36" fill="url(#cyberPantherGrad)" mask="url(#cyberPantherFillMask)" filter="url(#cyberPantherGlow)" />
                  <ellipse cx="64" cy="80" rx="32" ry="36" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Tech spots */}
                  <circle cx="52" cy="75" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
                  <circle cx="76" cy="75" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
                  <circle cx="58" cy="88" r="3" fill="#00ffff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
                  <circle cx="70" cy="88" r="3" fill="#00ffff" mask="url(#cyberPantherFillMask)" opacity="0.7" />
                  {/* Neon lines */}
                  <line x1="48" y1="80" x2="54" y2="80" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberPantherFillMask)" />
                  <line x1="74" y1="80" x2="80" y2="80" stroke="#ff00ff" strokeWidth="2" mask="url(#cyberPantherFillMask)" />
                  {/* Head */}
                  <ellipse cx="64" cy="46" rx="26" ry="24" fill="url(#cyberPantherGrad)" mask="url(#cyberPantherFillMask)" />
                  <ellipse cx="64" cy="46" rx="26" ry="24" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Mechanical ears */}
                  <path d="M42 30 L36 18 L40 22 L46 28 Z" fill="#9400d3" mask="url(#cyberPantherFillMask)" />
                  <path d="M42 30 L36 18 L40 22 L46 28 Z" fill="none" stroke="#ff00ff" strokeWidth="1.5" />
                  <circle cx="40" cy="23" r="2" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
                  <path d="M86 30 L92 18 L88 22 L82 28 Z" fill="#9400d3" mask="url(#cyberPantherFillMask)" />
                  <path d="M86 30 L92 18 L88 22 L82 28 Z" fill="none" stroke="#ff00ff" strokeWidth="1.5" />
                  <circle cx="88" cy="23" r="2" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
                  {/* Glowing eyes */}
                  <ellipse cx="52" cy="44" rx="7" ry="8" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
                  <ellipse cx="76" cy="44" rx="7" ry="8" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
                  <ellipse cx="52" cy="44" rx="4" ry="6" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
                  <ellipse cx="76" cy="44" rx="4" ry="6" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
                  <circle cx="52" cy="42" r="2" fill="#ffffff" mask="url(#cyberPantherFillMask)" />
                  <circle cx="76" cy="42" r="2" fill="#ffffff" mask="url(#cyberPantherFillMask)" />
                  {/* Tech snout */}
                  <ellipse cx="64" cy="54" rx="9" ry="7" fill="#9400d3" mask="url(#cyberPantherFillMask)" opacity="0.6" />
                  <ellipse cx="64" cy="56" rx="3" ry="2" fill="#000" mask="url(#cyberPantherFillMask)" />
                  {/* Energy whiskers */}
                  <line x1="38" y1="48" x2="26" y2="46" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
                  <line x1="38" y1="52" x2="26" y2="52" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
                  <line x1="90" y1="48" x2="102" y2="46" stroke="#ff00ff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
                  <line x1="90" y1="52" x2="102" y2="52" stroke="#00ffff" strokeWidth="1.5" mask="url(#cyberPantherFillMask)" />
                  {/* Energy tail */}
                  <path d="M92 90 Q105 95, 112 105 L110 103 Q102 93, 90 92 Z" fill="url(#cyberPantherGrad)" mask="url(#cyberPantherFillMask)" opacity="0.8" />
                  <circle cx="112" cy="105" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
                  <circle cx="112" cy="105" r="2" fill="#00ffff" mask="url(#cyberPantherFillMask)" />
                  {/* Power core */}
                  <circle cx="64" cy="80" r="6" fill="#9400d3" mask="url(#cyberPantherFillMask)" opacity="0.8" />
                  <circle cx="64" cy="80" r="4" fill="#ff00ff" mask="url(#cyberPantherFillMask)" />
                  <circle cx="64" cy="80" r="2" fill="#ffffff" mask="url(#cyberPantherFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐆⚡ Cyber Panther</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(cyberPantherFill)}%</div>
            </div>
          </div>
        </div>
        )}

        {/* Zylo Apex Category */}
        {activeCategory === 'cosmlings' && (
        <div>
          {!compactMode && (
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
            🌌 Zylo Apex
          </h2>
          )}
          <div className="flex flex-wrap items-center justify-center gap-8 py-8">
            
            {/* Star */}
            {shouldShowCharacter('star') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="star" onClick={() => handleCharacterClick('star')} onMouseEnter={() => handleCharacterHover('star')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'star' ? [1, 1.3, 1] : [1, 1.15, 1], rotate: [0, 360] }} transition={{ duration: hoveredCharacter === 'star' ? 3 : 6, repeat: Infinity, ease: "linear" }} whileHover={{ scale: 1.4, filter: "brightness(1.6) drop-shadow(0 0 30px rgba(255,255,0,1))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'star' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#ffff00" />
                      <stop offset="70%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#ff8c00" />
                    </radialGradient>
                    <filter id="starGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="starFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (starFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Extended outer glow rays - 8 directions */}
                  <path d="M64 5 L68 56 L64 60 L60 56 Z" fill="#ffff00" mask="url(#starFillMask)" opacity="0.5" filter="url(#starGlow)" />
                  <path d="M64 123 L68 72 L64 68 L60 72 Z" fill="#ffff00" mask="url(#starFillMask)" opacity="0.5" filter="url(#starGlow)" />
                  <path d="M5 64 L56 68 L60 64 L56 60 Z" fill="#ffff00" mask="url(#starFillMask)" opacity="0.5" filter="url(#starGlow)" />
                  <path d="M123 64 L72 68 L68 64 L72 60 Z" fill="#ffff00" mask="url(#starFillMask)" opacity="0.5" filter="url(#starGlow)" />
                  {/* Diagonal rays */}
                  <path d="M20 20 L56 56 L64 64 L56 56 Z" fill="#ffd700" mask="url(#starFillMask)" opacity="0.4" filter="url(#starGlow)" />
                  <path d="M108 20 L72 56 L64 64 L72 56 Z" fill="#ffd700" mask="url(#starFillMask)" opacity="0.4" filter="url(#starGlow)" />
                  <path d="M20 108 L56 72 L64 64 L56 72 Z" fill="#ffd700" mask="url(#starFillMask)" opacity="0.4" filter="url(#starGlow)" />
                  <path d="M108 108 L72 72 L64 64 L72 72 Z" fill="#ffd700" mask="url(#starFillMask)" opacity="0.4" filter="url(#starGlow)" />
                  {/* Main star body - enhanced 5 pointed star */}
                  <path d="M64 18 L73 50 L107 50 L79 69 L89 107 L64 83 L39 107 L49 69 L21 50 L55 50 Z" fill="url(#starGrad)" mask="url(#starFillMask)" filter="url(#starGlow)" />
                  <path d="M64 18 L73 50 L107 50 L79 69 L89 107 L64 83 L39 107 L49 69 L21 50 L55 50 Z" fill="none" stroke="#ffff00" strokeWidth="3" />
                  {/* Star point highlights */}
                  <circle cx="64" cy="25" r="4" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="97" cy="52" r="3.5" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="82" cy="98" r="3.5" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="46" cy="98" r="3.5" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="31" cy="52" r="3.5" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  {/* Inner star core - layered */}
                  <circle cx="64" cy="64" r="18" fill="#ffffff" mask="url(#starFillMask)" opacity="0.7" filter="url(#starGlow)" />
                  <circle cx="64" cy="64" r="14" fill="#ffff00" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="64" cy="64" r="10" fill="#ffffff" mask="url(#starFillMask)" opacity="0.8" />
                  <circle cx="64" cy="64" r="6" fill="#ffff00" mask="url(#starFillMask)" />
                  <circle cx="64" cy="64" r="3" fill="#ffffff" mask="url(#starFillMask)" />
                  {/* Enhanced sparkle details - more spread out */}
                  <circle cx="64" cy="35" r="2.5" fill="#ffffff" mask="url(#starFillMask)" opacity="0.95" />
                  <circle cx="93" cy="55" r="2" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="85" cy="85" r="2.5" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="43" cy="85" r="2.5" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="35" cy="55" r="2" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="75" cy="45" r="1.5" fill="#ffd700" mask="url(#starFillMask)" opacity="0.8" />
                  <circle cx="85" cy="70" r="1.5" fill="#ffd700" mask="url(#starFillMask)" opacity="0.8" />
                  <circle cx="53" cy="45" r="1.5" fill="#ffd700" mask="url(#starFillMask)" opacity="0.8" />
                  <circle cx="43" cy="70" r="1.5" fill="#ffd700" mask="url(#starFillMask)" opacity="0.8" />
                  {/* Twinkling effect circles */}
                  <circle cx="72" cy="32" r="1" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="56" cy="32" r="1" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="95" cy="64" r="1" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                  <circle cx="33" cy="64" r="1" fill="#ffffff" mask="url(#starFillMask)" opacity="0.9" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">⭐ Star</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-yellow-600">{Math.round(starFill)}%</div>
            </div>
            )}
            {/* Planet */}
            {shouldShowCharacter('planet') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="planet" onClick={() => handleCharacterClick('planet')} onMouseEnter={() => handleCharacterHover('planet')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'planet' ? [1, 1.12, 1] : [1, 1.05, 1], rotate: [0, 360] }} transition={{ duration: hoveredCharacter === 'planet' ? 20 : 40, repeat: Infinity, ease: "linear" }} whileHover={{ scale: 1.25, filter: "brightness(1.3) drop-shadow(0 0 20px rgba(65,105,225,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'planet' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="planetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4169e1" />
                      <stop offset="30%" stopColor="#32cd32" />
                      <stop offset="60%" stopColor="#1e90ff" />
                      <stop offset="100%" stopColor="#00bfff" />
                    </linearGradient>
                    <radialGradient id="planetShade" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#87ceeb" />
                      <stop offset="50%" stopColor="#4169e1" />
                      <stop offset="100%" stopColor="#00008b" />
                    </radialGradient>
                    <filter id="planetGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="planetFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (planetFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Planet sphere with ocean */}
                  <circle cx="64" cy="64" r="36" fill="url(#planetShade)" mask="url(#planetFillMask)" filter="url(#planetGlow)" />
                  <circle cx="64" cy="64" r="36" fill="none" stroke="#4169e1" strokeWidth="2.5" />
                  {/* Ocean patterns/texture */}
                  <path d="M35 55 Q45 52, 55 55" stroke="#1e90ff" strokeWidth="0.5" fill="none" mask="url(#planetFillMask)" opacity="0.3" />
                  <path d="M40 70 Q50 67, 60 70" stroke="#1e90ff" strokeWidth="0.5" fill="none" mask="url(#planetFillMask)" opacity="0.3" />
                  <path d="M68 60 Q78 57, 88 60" stroke="#1e90ff" strokeWidth="0.5" fill="none" mask="url(#planetFillMask)" opacity="0.3" />
                  {/* Large continent - North */}
                  <path d="M50 35 Q60 32, 70 35 Q75 40, 72 48 Q65 50, 58 48 Q52 45, 50 35 Z" fill="#32cd32" mask="url(#planetFillMask)" opacity="0.75" />
                  <path d="M52 37 Q58 35, 64 37 Q66 40, 64 44 Q60 45, 56 43 Q53 41, 52 37 Z" fill="#228b22" mask="url(#planetFillMask)" opacity="0.6" />
                  {/* Medium continent - South East */}
                  <ellipse cx="75" cy="72" rx="14" ry="9" fill="#32cd32" mask="url(#planetFillMask)" opacity="0.75" transform="rotate(-15 75 72)" />
                  <ellipse cx="75" cy="72" rx="8" ry="5" fill="#228b22" mask="url(#planetFillMask)" opacity="0.6" />
                  {/* Small islands/continents */}
                  <ellipse cx="46" cy="76" rx="7" ry="11" fill="#228b22" mask="url(#planetFillMask)" opacity="0.65" />
                  <circle cx="85" cy="52" r="5" fill="#32cd32" mask="url(#planetFillMask)" opacity="0.7" />
                  <ellipse cx="38" cy="58" rx="6" ry="4" fill="#228b22" mask="url(#planetFillMask)" opacity="0.6" />
                  {/* Mountain/terrain details */}
                  <circle cx="60" cy="40" r="2" fill="#006400" mask="url(#planetFillMask)" opacity="0.5" />
                  <circle cx="66" cy="42" r="1.5" fill="#006400" mask="url(#planetFillMask)" opacity="0.5" />
                  <circle cx="78" cy="70" r="2" fill="#006400" mask="url(#planetFillMask)" opacity="0.5" />
                  {/* Enhanced cloud system */}
                  <ellipse cx="58" cy="44" rx="9" ry="4" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.6" />
                  <ellipse cx="63" cy="42" rx="7" ry="3" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.5" />
                  <ellipse cx="80" cy="65" rx="7" ry="3.5" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.6" />
                  <ellipse cx="85" cy="63" rx="5" ry="2.5" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.5" />
                  <ellipse cx="45" cy="70" rx="6" ry="3" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.55" />
                  <ellipse cx="70" cy="80" rx="5" ry="2.5" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.5" />
                  {/* Atmosphere glow layers */}
                  <circle cx="64" cy="64" r="39" fill="none" stroke="#87ceeb" strokeWidth="2" mask="url(#planetFillMask)" opacity="0.5" />
                  <circle cx="64" cy="64" r="42" fill="none" stroke="#b0e0e6" strokeWidth="1.5" mask="url(#planetFillMask)" opacity="0.3" />
                  {/* Enhanced ring system */}
                  <ellipse cx="64" cy="64" rx="52" ry="13" fill="none" stroke="#ffd700" strokeWidth="3.5" mask="url(#planetFillMask)" opacity="0.8" />
                  <ellipse cx="64" cy="64" rx="52" ry="13" fill="#ffd700" mask="url(#planetFillMask)" opacity="0.25" />
                  <ellipse cx="64" cy="64" rx="47" ry="11" fill="none" stroke="#ffff00" strokeWidth="2" mask="url(#planetFillMask)" opacity="0.6" />
                  <ellipse cx="64" cy="64" rx="55" ry="14" fill="none" stroke="#ffed4e" strokeWidth="1.5" mask="url(#planetFillMask)" opacity="0.4" />
                  {/* Ring shadow on planet */}
                  <ellipse cx="64" cy="50" rx="25" ry="3" fill="#000000" mask="url(#planetFillMask)" opacity="0.2" />
                  {/* Enhanced highlight - sun reflection */}
                  <ellipse cx="50" cy="50" rx="10" ry="12" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.5" />
                  <circle cx="52" cy="52" r="6" fill="#ffffff" mask="url(#planetFillMask)" opacity="0.6" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🪐 Planet</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-600">{Math.round(planetFill)}%</div>
            </div>
            )}
            {/* Black Hole */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="blackHole" onClick={() => handleCharacterClick('blackHole')} onMouseEnter={() => handleCharacterHover('blackHole')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'blackHole' ? [1, 1.08, 1] : [1, 1.03, 1], rotate: [0, -360] }} transition={{ duration: hoveredCharacter === 'blackHole' ? 8 : 15, repeat: Infinity, ease: "linear" }} whileHover={{ scale: 1.2, filter: "brightness(1.2) drop-shadow(0 0 25px rgba(139,0,255,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'blackHole' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="blackHoleGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="40%" stopColor="#1a001a" />
                      <stop offset="70%" stopColor="#4b0082" />
                      <stop offset="90%" stopColor="#8b00ff" />
                      <stop offset="100%" stopColor="#9370db" />
                    </radialGradient>
                    <filter id="blackHoleGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="blackHoleFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (blackHoleFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Outer gravitational field distortion */}
                  <circle cx="64" cy="64" r="60" fill="none" stroke="#4b0082" strokeWidth="0.5" mask="url(#blackHoleFillMask)" opacity="0.2" strokeDasharray="3 3" />
                  {/* Accretion disk - outermost layer */}
                  <ellipse cx="64" cy="64" rx="58" ry="16" fill="#9370db" mask="url(#blackHoleFillMask)" opacity="0.25" filter="url(#blackHoleGlow)" />
                  <ellipse cx="64" cy="64" rx="58" ry="16" fill="none" stroke="#9370db" strokeWidth="1.5" mask="url(#blackHoleFillMask)" opacity="0.5" />
                  {/* Accretion disk - outer layer */}
                  <ellipse cx="64" cy="64" rx="52" ry="14" fill="#8b00ff" mask="url(#blackHoleFillMask)" opacity="0.35" filter="url(#blackHoleGlow)" />
                  <ellipse cx="64" cy="64" rx="52" ry="14" fill="none" stroke="#9370db" strokeWidth="2" mask="url(#blackHoleFillMask)" opacity="0.65" />
                  {/* Disk detail bands */}
                  <ellipse cx="64" cy="64" rx="50" ry="13" fill="none" stroke="#4b0082" strokeWidth="1" mask="url(#blackHoleFillMask)" opacity="0.4" />
                  {/* Accretion disk - middle layer */}
                  <ellipse cx="64" cy="64" rx="46" ry="12" fill="#4b0082" mask="url(#blackHoleFillMask)" opacity="0.55" filter="url(#blackHoleGlow)" />
                  <ellipse cx="64" cy="64" rx="46" ry="12" fill="none" stroke="#8b00ff" strokeWidth="2.5" mask="url(#blackHoleFillMask)" opacity="0.75" />
                  {/* Inner accretion disk */}
                  <ellipse cx="64" cy="64" rx="38" ry="10" fill="#8b00ff" mask="url(#blackHoleFillMask)" opacity="0.65" filter="url(#blackHoleGlow)" />
                  <ellipse cx="64" cy="64" rx="38" ry="10" fill="none" stroke="#a020f0" strokeWidth="2" mask="url(#blackHoleFillMask)" opacity="0.8" />
                  {/* Hot inner disk */}
                  <ellipse cx="64" cy="64" rx="30" ry="8" fill="#a020f0" mask="url(#blackHoleFillMask)" opacity="0.7" filter="url(#blackHoleGlow)" />
                  {/* Photon sphere */}
                  <circle cx="64" cy="64" r="25" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#blackHoleFillMask)" opacity="0.6" />
                  {/* Event horizon - enhanced */}
                  <circle cx="64" cy="64" r="22" fill="url(#blackHoleGrad)" mask="url(#blackHoleFillMask)" filter="url(#blackHoleGlow)" />
                  <circle cx="64" cy="64" r="22" fill="none" stroke="#4b0082" strokeWidth="2.5" opacity="0.85" />
                  <circle cx="64" cy="64" r="20" fill="#000000" mask="url(#blackHoleFillMask)" opacity="0.9" />
                  {/* Inner event horizon glow */}
                  <circle cx="64" cy="64" r="18" fill="none" stroke="#8b00ff" strokeWidth="0.5" mask="url(#blackHoleFillMask)" opacity="0.7" />
                  {/* Singularity - multi-layered */}
                  <circle cx="64" cy="64" r="14" fill="#000000" mask="url(#blackHoleFillMask)" />
                  <circle cx="64" cy="64" r="10" fill="#000000" mask="url(#blackHoleFillMask)" opacity="0.95" />
                  <circle cx="64" cy="64" r="6" fill="#000000" mask="url(#blackHoleFillMask)" />
                  <circle cx="64" cy="64" r="3" fill="#000000" mask="url(#blackHoleFillMask)" />
                  {/* Gravitational lensing rings - enhanced */}
                  <circle cx="64" cy="64" r="32" fill="none" stroke="#9370db" strokeWidth="1.5" mask="url(#blackHoleFillMask)" opacity="0.55" />
                  <circle cx="64" cy="64" r="35" fill="none" stroke="#8b00ff" strokeWidth="1" mask="url(#blackHoleFillMask)" opacity="0.45" />
                  <circle cx="64" cy="64" r="40" fill="none" stroke="#9370db" strokeWidth="0.5" mask="url(#blackHoleFillMask)" opacity="0.35" />
                  {/* Matter streams - enhanced and more varied */}
                  <path d="M28 48 Q38 53, 48 57" stroke="#8b00ff" strokeWidth="2.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.75" filter="url(#blackHoleGlow)" />
                  <path d="M100 48 Q90 53, 80 57" stroke="#8b00ff" strokeWidth="2.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.75" filter="url(#blackHoleGlow)" />
                  <path d="M28 80 Q38 75, 48 71" stroke="#9370db" strokeWidth="2.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.7" filter="url(#blackHoleGlow)" />
                  <path d="M100 80 Q90 75, 80 71" stroke="#9370db" strokeWidth="2.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.7" filter="url(#blackHoleGlow)" />
                  {/* Diagonal matter streams */}
                  <path d="M35 35 Q45 45, 52 52" stroke="#4b0082" strokeWidth="1.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.6" />
                  <path d="M93 35 Q83 45, 76 52" stroke="#4b0082" strokeWidth="1.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.6" />
                  <path d="M35 93 Q45 83, 52 76" stroke="#4b0082" strokeWidth="1.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.6" />
                  <path d="M93 93 Q83 83, 76 76" stroke="#4b0082" strokeWidth="1.5" mask="url(#blackHoleFillMask)" fill="none" opacity="0.6" />
                  {/* Matter particles being pulled in */}
                  <circle cx="42" cy="52" r="1.5" fill="#a020f0" mask="url(#blackHoleFillMask)" opacity="0.8" />
                  <circle cx="86" cy="52" r="1.5" fill="#a020f0" mask="url(#blackHoleFillMask)" opacity="0.8" />
                  <circle cx="42" cy="76" r="1.5" fill="#8b00ff" mask="url(#blackHoleFillMask)" opacity="0.8" />
                  <circle cx="86" cy="76" r="1.5" fill="#8b00ff" mask="url(#blackHoleFillMask)" opacity="0.8" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🕳️ Black Hole</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(blackHoleFill)}%</div>
            </div>
            {/* Nebula */}
            {shouldShowCharacter('nebula') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="nebula" onClick={() => handleCharacterClick('nebula')} onMouseEnter={() => handleCharacterHover('nebula')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'nebula' ? [1, 1.15, 1] : [1, 1.08, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: hoveredCharacter === 'nebula' ? 4 : 7, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.3, opacity: 1, filter: "brightness(1.4) drop-shadow(0 0 30px rgba(147,112,219,0.9))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'nebula' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="nebulaGrad1" cx="40%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#ff1493" opacity="0.8" />
                      <stop offset="50%" stopColor="#9370db" opacity="0.6" />
                      <stop offset="100%" stopColor="#4b0082" opacity="0.3" />
                    </radialGradient>
                    <radialGradient id="nebulaGrad2" cx="60%" cy="60%" r="50%">
                      <stop offset="0%" stopColor="#00ffff" opacity="0.7" />
                      <stop offset="50%" stopColor="#1e90ff" opacity="0.5" />
                      <stop offset="100%" stopColor="#000080" opacity="0.2" />
                    </radialGradient>
                    <filter id="nebulaGlow"><feGaussianBlur stdDeviation="8" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="nebulaFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (nebulaFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Main nebula cloud layers - enhanced */}
                  <ellipse cx="48" cy="48" rx="38" ry="32" fill="url(#nebulaGrad1)" mask="url(#nebulaFillMask)" filter="url(#nebulaGlow)" opacity="0.9" />
                  <ellipse cx="77" cy="77" rx="33" ry="38" fill="url(#nebulaGrad2)" mask="url(#nebulaFillMask)" filter="url(#nebulaGlow)" opacity="0.85" />
                  <ellipse cx="62" cy="67" rx="42" ry="37" fill="#9370db" mask="url(#nebulaFillMask)" opacity="0.5" filter="url(#nebulaGlow)" />
                  {/* Overlapping gas clouds - more layers */}
                  <circle cx="38" cy="58" r="22" fill="#ff1493" mask="url(#nebulaFillMask)" opacity="0.6" filter="url(#nebulaGlow)" />
                  <circle cx="87" cy="53" r="20" fill="#00ffff" mask="url(#nebulaFillMask)" opacity="0.6" filter="url(#nebulaGlow)" />
                  <circle cx="72" cy="88" r="24" fill="#9370db" mask="url(#nebulaFillMask)" opacity="0.5" filter="url(#nebulaGlow)" />
                  <ellipse cx="55" cy="42" rx="18" ry="15" fill="#ff1493" mask="url(#nebulaFillMask)" opacity="0.5" filter="url(#nebulaGlow)" />
                  <ellipse cx="82" cy="75" rx="16" ry="20" fill="#00ffff" mask="url(#nebulaFillMask)" opacity="0.45" filter="url(#nebulaGlow)" />
                  {/* Dark dust lanes */}
                  <ellipse cx="64" cy="55" rx="25" ry="8" fill="#000000" mask="url(#nebulaFillMask)" opacity="0.3" transform="rotate(-20 64 55)" />
                  <ellipse cx="68" cy="75" rx="20" ry="6" fill="#000000" mask="url(#nebulaFillMask)" opacity="0.25" transform="rotate(15 68 75)" />
                  {/* Filament structures */}
                  <path d="M35 45 Q45 55, 55 50 Q65 45, 75 52" stroke="#ff1493" strokeWidth="2" fill="none" mask="url(#nebulaFillMask)" opacity="0.4" filter="url(#nebulaGlow)" />
                  <path d="M40 70 Q50 75, 60 72 Q70 68, 80 73" stroke="#00ffff" strokeWidth="1.5" fill="none" mask="url(#nebulaFillMask)" opacity="0.4" filter="url(#nebulaGlow)" />
                  <path d="M50 35 Q60 40, 70 38 Q80 36, 90 40" stroke="#9370db" strokeWidth="1.5" fill="none" mask="url(#nebulaFillMask)" opacity="0.35" />
                  {/* Small gas pockets */}
                  <circle cx="45" cy="52" r="8" fill="#9370db" mask="url(#nebulaFillMask)" opacity="0.4" filter="url(#nebulaGlow)" />
                  <circle cx="75" cy="62" r="10" fill="#ff1493" mask="url(#nebulaFillMask)" opacity="0.35" filter="url(#nebulaGlow)" />
                  <circle cx="60" cy="82" r="9" fill="#00ffff" mask="url(#nebulaFillMask)" opacity="0.4" filter="url(#nebulaGlow)" />
                  {/* Enhanced star field */}
                  <circle cx="43" cy="43" r="2.5" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.95" />
                  <circle cx="72" cy="48" r="2" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.9" />
                  <circle cx="53" cy="68" r="2.5" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.95" />
                  <circle cx="82" cy="72" r="2" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.9" />
                  <circle cx="67" cy="88" r="1.5" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.85" />
                  <circle cx="48" cy="78" r="1.5" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.85" />
                  <circle cx="87" cy="58" r="2" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.9" />
                  <circle cx="35" cy="65" r="1.5" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.85" />
                  <circle cx="90" cy="80" r="1.5" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.85" />
                  <circle cx="58" cy="38" r="1" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.8" />
                  <circle cx="78" cy="85" r="1" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.8" />
                  {/* Bright star formation regions - enhanced */}
                  <circle cx="58" cy="58" r="4" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.95" filter="url(#nebulaGlow)" />
                  <circle cx="58" cy="58" r="6" fill="#ffff00" mask="url(#nebulaFillMask)" opacity="0.4" filter="url(#nebulaGlow)" />
                  <circle cx="58" cy="58" r="9" fill="#ff8c00" mask="url(#nebulaFillMask)" opacity="0.2" filter="url(#nebulaGlow)" />
                  <circle cx="75" cy="65" r="3" fill="#ffffff" mask="url(#nebulaFillMask)" opacity="0.9" filter="url(#nebulaGlow)" />
                  <circle cx="75" cy="65" r="5" fill="#00ffff" mask="url(#nebulaFillMask)" opacity="0.35" filter="url(#nebulaGlow)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🌌 Nebula</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(nebulaFill)}%</div>
            </div>
            )}
            {/* Comet */}
            {shouldShowCharacter('comet') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="comet" onClick={() => handleCharacterClick('comet')} onMouseEnter={() => handleCharacterHover('comet')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'comet' ? [1, 1.15, 1] : [1, 1.08, 1], x: hoveredCharacter === 'comet' ? [0, 3, 0] : [0, 1, 0], y: hoveredCharacter === 'comet' ? [0, -3, 0] : [0, -1, 0] }} transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.25, filter: "brightness(1.5) drop-shadow(0 0 25px rgba(255,69,0,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'comet' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="cometTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff4500" opacity="0.8" />
                      <stop offset="40%" stopColor="#ffd700" opacity="0.5" />
                      <stop offset="70%" stopColor="#ffffff" opacity="0.2" />
                      <stop offset="100%" stopColor="#ffffff" opacity="0" />
                    </linearGradient>
                    <radialGradient id="cometHeadGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#ffff00" />
                      <stop offset="70%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ff4500" />
                    </radialGradient>
                    <filter id="cometGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="cometFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (cometFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Main ion tail - long streaming (blue/cyan) */}
                  <path d="M92 36 Q60 55, 25 85 Q40 75, 52 68 Q70 57, 92 38 Z" fill="#87ceeb" mask="url(#cometFillMask)" opacity="0.4" filter="url(#cometGlow)" />
                  <path d="M90 38 Q58 57, 22 88 Q38 78, 50 70 Q68 59, 90 40 Z" fill="#add8e6" mask="url(#cometFillMask)" opacity="0.3" />
                  {/* Main dust tail - golden/orange */}
                  <path d="M93 38 Q55 52, 18 82 Q38 72, 50 66 Q68 56, 93 40 Z" fill="url(#cometTailGrad)" mask="url(#cometFillMask)" filter="url(#cometGlow)" opacity="0.9" />
                  <path d="M90 42 Q52 56, 20 86 Q40 76, 52 70 Q70 60, 90 44 Z" fill="url(#cometTailGrad)" mask="url(#cometFillMask)" opacity="0.7" />
                  <path d="M88 44 Q50 58, 23 89 Q43 79, 55 73 Q72 63, 88 46 Z" fill="url(#cometTailGrad)" mask="url(#cometFillMask)" opacity="0.5" />
                  {/* Secondary/diverging tails */}
                  <path d="M87 40 Q62 62, 38 92 Q52 82, 62 77 Q74 67, 87 42 Z" fill="#ffd700" mask="url(#cometFillMask)" opacity="0.4" filter="url(#cometGlow)" />
                  <path d="M90 35 Q70 48, 50 62 Q60 56, 70 50 Q80 43, 90 37 Z" fill="#ff8c00" mask="url(#cometFillMask)" opacity="0.35" />
                  {/* Tail particles - more distributed */}
                  <circle cx="78" cy="48" r="2.5" fill="#ffff00" mask="url(#cometFillMask)" opacity="0.85" filter="url(#cometGlow)" />
                  <circle cx="68" cy="58" r="2" fill="#ffd700" mask="url(#cometFillMask)" opacity="0.75" />
                  <circle cx="58" cy="68" r="2.5" fill="#ff8c00" mask="url(#cometFillMask)" opacity="0.7" />
                  <circle cx="48" cy="76" r="2" fill="#ff4500" mask="url(#cometFillMask)" opacity="0.6" />
                  <circle cx="38" cy="84" r="1.5" fill="#ffffff" mask="url(#cometFillMask)" opacity="0.55" />
                  <circle cx="73" cy="53" r="1.5" fill="#ffffff" mask="url(#cometFillMask)" opacity="0.85" />
                  <circle cx="63" cy="63" r="1.5" fill="#ffff00" mask="url(#cometFillMask)" opacity="0.75" />
                  <circle cx="53" cy="72" r="1" fill="#ffd700" mask="url(#cometFillMask)" opacity="0.7" />
                  <circle cx="43" cy="80" r="1" fill="#ff8c00" mask="url(#cometFillMask)" opacity="0.6" />
                  <circle cx="75" cy="45" r="1" fill="#add8e6" mask="url(#cometFillMask)" opacity="0.6" />
                  <circle cx="65" cy="55" r="1" fill="#87ceeb" mask="url(#cometFillMask)" opacity="0.5" />
                  {/* Enhanced nucleus with rocky texture */}
                  <ellipse cx="96" cy="32" rx="19" ry="16" fill="url(#cometHeadGrad)" mask="url(#cometFillMask)" filter="url(#cometGlow)" />
                  <ellipse cx="96" cy="32" rx="19" ry="16" fill="none" stroke="#ff8c00" strokeWidth="2.5" />
                  {/* Rocky surface details */}
                  <circle cx="92" cy="28" r="3" fill="#8b4513" mask="url(#cometFillMask)" opacity="0.6" />
                  <circle cx="98" cy="33" r="2.5" fill="#a0522d" mask="url(#cometFillMask)" opacity="0.5" />
                  <circle cx="95" cy="36" r="2" fill="#8b4513" mask="url(#cometFillMask)" opacity="0.55" />
                  <circle cx="100" cy="29" r="1.5" fill="#654321" mask="url(#cometFillMask)" opacity="0.5" />
                  {/* Bright core */}
                  <ellipse cx="93" cy="29" rx="9" ry="7" fill="#ffffff" mask="url(#cometFillMask)" opacity="0.95" />
                  <ellipse cx="93" cy="29" rx="6" ry="4" fill="#ffffff" mask="url(#cometFillMask)" />
                  <circle cx="93" cy="29" r="3" fill="#ffff00" mask="url(#cometFillMask)" />
                  {/* Enhanced coma (gas/dust envelope) - multi-layered */}
                  <ellipse cx="96" cy="32" rx="24" ry="21" fill="#ff8c00" mask="url(#cometFillMask)" opacity="0.35" filter="url(#cometGlow)" />
                  <ellipse cx="96" cy="32" rx="28" ry="25" fill="none" stroke="#ffd700" strokeWidth="2" mask="url(#cometFillMask)" opacity="0.45" />
                  <ellipse cx="96" cy="32" rx="32" ry="28" fill="none" stroke="#ffed4e" strokeWidth="1" mask="url(#cometFillMask)" opacity="0.3" />
                  {/* Outgassing jets */}
                  <path d="M98 28 Q102 24, 106 22" stroke="#ffffff" strokeWidth="1.5" fill="none" mask="url(#cometFillMask)" opacity="0.6" />
                  <path d="M100 34 Q105 36, 110 38" stroke="#ffd700" strokeWidth="1.5" fill="none" mask="url(#cometFillMask)" opacity="0.5" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">☄️ Comet</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(cometFill)}%</div>
            </div>
            )}
            {/* Supernova */}
            {shouldShowCharacter('supernova') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="supernova" onClick={() => handleCharacterClick('supernova')} onMouseEnter={() => handleCharacterHover('supernova')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'supernova' ? [1, 1.5, 1.2, 1.5, 1] : [1, 1.2, 1.1, 1.2, 1], opacity: [1, 0.8, 1, 0.7, 1] }} transition={{ duration: hoveredCharacter === 'supernova' ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.6, filter: "brightness(2) drop-shadow(0 0 40px rgba(255,69,0,1))" }} whileTap={{ scale: 0.8 }} className={`${hoveredCharacter === 'supernova' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="supernovaCore" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="20%" stopColor="#ffff00" />
                      <stop offset="50%" stopColor="#ff8c00" />
                      <stop offset="80%" stopColor="#ff4500" />
                      <stop offset="100%" stopColor="#ff0000" />
                    </radialGradient>
                    <radialGradient id="supernovaExpansion" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff4500" opacity="0.8" />
                      <stop offset="40%" stopColor="#ff8c00" opacity="0.5" />
                      <stop offset="70%" stopColor="#ffd700" opacity="0.3" />
                      <stop offset="100%" stopColor="#ffff00" opacity="0" />
                    </radialGradient>
                    <filter id="supernovaGlow"><feGaussianBlur stdDeviation="8" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="supernovaFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (supernovaFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Outer explosion waves */}
                  <circle cx="64" cy="64" r="55" fill="url(#supernovaExpansion)" mask="url(#supernovaFillMask)" filter="url(#supernovaGlow)" opacity="0.4" />
                  <circle cx="64" cy="64" r="55" fill="none" stroke="#ffd700" strokeWidth="2" mask="url(#supernovaFillMask)" opacity="0.3" />
                  <circle cx="64" cy="64" r="48" fill="url(#supernovaExpansion)" mask="url(#supernovaFillMask)" filter="url(#supernovaGlow)" opacity="0.5" />
                  <circle cx="64" cy="64" r="40" fill="url(#supernovaExpansion)" mask="url(#supernovaFillMask)" filter="url(#supernovaGlow)" opacity="0.6" />
                  {/* Explosion rays */}
                  <path d="M64 20 L68 60 L64 64 L60 60 Z" fill="#ffff00" mask="url(#supernovaFillMask)" opacity="0.7" filter="url(#supernovaGlow)" />
                  <path d="M64 108 L68 68 L64 64 L60 68 Z" fill="#ffff00" mask="url(#supernovaFillMask)" opacity="0.7" filter="url(#supernovaGlow)" />
                  <path d="M20 64 L60 68 L64 64 L60 60 Z" fill="#ffff00" mask="url(#supernovaFillMask)" opacity="0.7" filter="url(#supernovaGlow)" />
                  <path d="M108 64 L68 68 L64 64 L68 60 Z" fill="#ffff00" mask="url(#supernovaFillMask)" opacity="0.7" filter="url(#supernovaGlow)" />
                  {/* Diagonal rays */}
                  <path d="M30 30 L58 58 L64 64 L58 58 Z" fill="#ff8c00" mask="url(#supernovaFillMask)" opacity="0.6" filter="url(#supernovaGlow)" />
                  <path d="M98 30 L70 58 L64 64 L70 58 Z" fill="#ff8c00" mask="url(#supernovaFillMask)" opacity="0.6" filter="url(#supernovaGlow)" />
                  <path d="M30 98 L58 70 L64 64 L58 70 Z" fill="#ff8c00" mask="url(#supernovaFillMask)" opacity="0.6" filter="url(#supernovaGlow)" />
                  <path d="M98 98 L70 70 L64 64 L70 70 Z" fill="#ff8c00" mask="url(#supernovaFillMask)" opacity="0.6" filter="url(#supernovaGlow)" />
                  {/* Core explosion */}
                  <circle cx="64" cy="64" r="25" fill="url(#supernovaCore)" mask="url(#supernovaFillMask)" filter="url(#supernovaGlow)" />
                  <circle cx="64" cy="64" r="25" fill="none" stroke="#ff8c00" strokeWidth="3" />
                  <circle cx="64" cy="64" r="18" fill="#ffff00" mask="url(#supernovaFillMask)" opacity="0.9" />
                  <circle cx="64" cy="64" r="12" fill="#ffffff" mask="url(#supernovaFillMask)" />
                  {/* Debris particles */}
                  <circle cx="85" cy="40" r="3" fill="#ff4500" mask="url(#supernovaFillMask)" opacity="0.8" />
                  <circle cx="43" cy="88" r="2.5" fill="#ff8c00" mask="url(#supernovaFillMask)" opacity="0.7" />
                  <circle cx="88" cy="85" r="2" fill="#ffd700" mask="url(#supernovaFillMask)" opacity="0.8" />
                  <circle cx="40" cy="43" r="2.5" fill="#ffff00" mask="url(#supernovaFillMask)" opacity="0.7" />
                  <circle cx="75" cy="25" r="1.5" fill="#ffffff" mask="url(#supernovaFillMask)" opacity="0.9" />
                  <circle cx="53" cy="103" r="1.5" fill="#ffffff" mask="url(#supernovaFillMask)" opacity="0.9" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">💥 Supernova</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-red-600">{Math.round(supernovaFill)}%</div>
            </div>
            )}
            {/* Void */}
            {shouldShowCharacter('void') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="void" onClick={() => handleCharacterClick('void')} onMouseEnter={() => handleCharacterHover('void')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'void' ? [1, 0.95, 1] : [1, 0.98, 1], opacity: [0.9, 0.6, 0.9] }} transition={{ duration: hoveredCharacter === 'void' ? 3 : 5, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.15, filter: "brightness(0.5) drop-shadow(0 0 30px rgba(75,0,130,0.9))" }} whileTap={{ scale: 0.92 }} className={`${hoveredCharacter === 'void' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="voidGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="60%" stopColor="#0a0a0a" />
                      <stop offset="90%" stopColor="#1a001a" />
                      <stop offset="100%" stopColor="#2f2f2f" />
                    </radialGradient>
                    <filter id="voidGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="voidFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (voidFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Outer distortion rings */}
                  <circle cx="64" cy="64" r="58" fill="none" stroke="#2f2f2f" strokeWidth="1.5" mask="url(#voidFillMask)" opacity="0.3" />
                  <circle cx="64" cy="64" r="52" fill="none" stroke="#4b0082" strokeWidth="1" mask="url(#voidFillMask)" opacity="0.4" />
                  <circle cx="64" cy="64" r="46" fill="none" stroke="#2f2f2f" strokeWidth="1.5" mask="url(#voidFillMask)" opacity="0.5" />
                  {/* Void body */}
                  <circle cx="64" cy="64" r="40" fill="url(#voidGrad)" mask="url(#voidFillMask)" filter="url(#voidGlow)" />
                  <circle cx="64" cy="64" r="40" fill="none" stroke="#4b0082" strokeWidth="2" opacity="0.6" />
                  {/* Inner void */}
                  <circle cx="64" cy="64" r="32" fill="#000000" mask="url(#voidFillMask)" />
                  <circle cx="64" cy="64" r="24" fill="#000000" mask="url(#voidFillMask)" opacity="0.9" />
                  <circle cx="64" cy="64" r="16" fill="#000000" mask="url(#voidFillMask)" />
                  {/* Distortion effects */}
                  <path d="M64 30 Q70 35, 75 30" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
                  <path d="M64 98 Q58 93, 53 98" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
                  <path d="M30 64 Q35 58, 30 53" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
                  <path d="M98 64 Q93 70, 98 75" stroke="#4b0082" strokeWidth="1" fill="none" mask="url(#voidFillMask)" opacity="0.5" />
                  {/* Swirl patterns */}
                  <path d="M64 44 Q70 50, 64 56 Q58 62, 64 68" stroke="#2f2f2f" strokeWidth="2" fill="none" mask="url(#voidFillMask)" opacity="0.4" />
                  <path d="M44 64 Q50 58, 56 64 Q62 70, 68 64" stroke="#2f2f2f" strokeWidth="2" fill="none" mask="url(#voidFillMask)" opacity="0.4" />
                  {/* Gravity well indicators */}
                  <circle cx="64" cy="64" r="10" fill="none" stroke="#4b0082" strokeWidth="1.5" mask="url(#voidFillMask)" opacity="0.6" />
                  <circle cx="64" cy="64" r="5" fill="none" stroke="#8b00ff" strokeWidth="1" mask="url(#voidFillMask)" opacity="0.7" />
                  {/* Faint stars being pulled in */}
                  <circle cx="50" cy="50" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
                  <circle cx="78" cy="50" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
                  <circle cx="50" cy="78" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
                  <circle cx="78" cy="78" r="1" fill="#ffffff" mask="url(#voidFillMask)" opacity="0.3" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">⚫ Void</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-800">{Math.round(voidFill)}%</div>
            </div>
            )}
            {/* Galaxy */}
            {shouldShowCharacter('galaxy') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="galaxy" onClick={() => handleCharacterClick('galaxy')} onMouseEnter={() => handleCharacterHover('galaxy')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'galaxy' ? [1, 1.1, 1] : [1, 1.05, 1], rotate: [0, 360] }} transition={{ duration: hoveredCharacter === 'galaxy' ? 25 : 50, repeat: Infinity, ease: "linear" }} whileHover={{ scale: 1.25, filter: "brightness(1.4) drop-shadow(0 0 25px rgba(147,112,219,0.9))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'galaxy' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#ffff00" />
                      <stop offset="60%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ff1493" />
                    </radialGradient>
                    <linearGradient id="galaxyArm1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9370db" opacity="0.8" />
                      <stop offset="50%" stopColor="#4169e1" opacity="0.5" />
                      <stop offset="100%" stopColor="#9370db" opacity="0.2" />
                    </linearGradient>
                    <filter id="galaxyGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="galaxyFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (galaxyFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Spiral arms */}
                  <path d="M64 64 Q90 50, 105 60 Q115 70, 110 85" stroke="#9370db" strokeWidth="12" fill="none" mask="url(#galaxyFillMask)" opacity="0.6" filter="url(#galaxyGlow)" />
                  <path d="M64 64 Q38 78, 23 68 Q13 58, 18 43" stroke="#4169e1" strokeWidth="12" fill="none" mask="url(#galaxyFillMask)" opacity="0.6" filter="url(#galaxyGlow)" />
                  <path d="M64 64 Q50 38, 40 23 Q30 13, 45 18" stroke="#9370db" strokeWidth="10" fill="none" mask="url(#galaxyFillMask)" opacity="0.5" filter="url(#galaxyGlow)" />
                  <path d="M64 64 Q78 90, 88 105 Q98 115, 83 110" stroke="#4169e1" strokeWidth="10" fill="none" mask="url(#galaxyFillMask)" opacity="0.5" filter="url(#galaxyGlow)" />
                  {/* Additional spiral details */}
                  <path d="M64 64 Q95 55, 108 70" stroke="#ff1493" strokeWidth="6" fill="none" mask="url(#galaxyFillMask)" opacity="0.4" />
                  <path d="M64 64 Q33 73, 20 58" stroke="#ff1493" strokeWidth="6" fill="none" mask="url(#galaxyFillMask)" opacity="0.4" />
                  {/* Stars in arms */}
                  <circle cx="95" cy="55" r="2" fill="#ffffff" mask="url(#galaxyFillMask)" />
                  <circle cx="105" cy="75" r="1.5" fill="#ffff00" mask="url(#galaxyFillMask)" />
                  <circle cx="33" cy="73" r="2" fill="#ffffff" mask="url(#galaxyFillMask)" />
                  <circle cx="23" cy="53" r="1.5" fill="#ffff00" mask="url(#galaxyFillMask)" />
                  <circle cx="45" cy="28" r="1.5" fill="#ffffff" mask="url(#galaxyFillMask)" />
                  <circle cx="83" cy="100" r="2" fill="#ffffff" mask="url(#galaxyFillMask)" />
                  <circle cx="90" cy="65" r="1" fill="#ffffff" mask="url(#galaxyFillMask)" />
                  <circle cx="38" cy="63" r="1" fill="#ffffff" mask="url(#galaxyFillMask)" />
                  <circle cx="55" cy="45" r="1.5" fill="#ffff00" mask="url(#galaxyFillMask)" />
                  <circle cx="73" cy="83" r="1.5" fill="#ffff00" mask="url(#galaxyFillMask)" />
                  {/* Galactic core */}
                  <circle cx="64" cy="64" r="18" fill="url(#galaxyCore)" mask="url(#galaxyFillMask)" filter="url(#galaxyGlow)" />
                  <circle cx="64" cy="64" r="18" fill="none" stroke="#ff8c00" strokeWidth="2" />
                  <circle cx="64" cy="64" r="12" fill="#ffff00" mask="url(#galaxyFillMask)" opacity="0.8" />
                  <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#galaxyFillMask)" />
                  {/* Core glow rings */}
                  <circle cx="64" cy="64" r="22" fill="none" stroke="#ff1493" strokeWidth="1" mask="url(#galaxyFillMask)" opacity="0.4" />
                  <circle cx="64" cy="64" r="26" fill="none" stroke="#9370db" strokeWidth="1" mask="url(#galaxyFillMask)" opacity="0.3" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🌌 Galaxy</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(galaxyFill)}%</div>
            </div>
            )}
            {/* Alien */}
            {shouldShowCharacter('alien') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="alien" onClick={() => handleCharacterClick('alien')} onMouseEnter={() => handleCharacterHover('alien')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'alien' ? [1, 1.15, 1] : [1, 1.08, 1], y: hoveredCharacter === 'alien' ? [0, -5, 0] : [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.3, filter: "brightness(1.5) drop-shadow(0 0 25px rgba(0,255,0,0.9))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'alien' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="alienBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#39ff14" />
                      <stop offset="50%" stopColor="#00ff00" />
                      <stop offset="100%" stopColor="#00cc00" />
                    </linearGradient>
                    <radialGradient id="alienEyeGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#000000" />
                      <stop offset="70%" stopColor="#001a00" />
                      <stop offset="100%" stopColor="#003300" />
                    </radialGradient>
                    <filter id="alienGlow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="alienFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (alienFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Head */}
                  <ellipse cx="64" cy="50" rx="35" ry="42" fill="url(#alienBodyGrad)" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
                  <ellipse cx="64" cy="50" rx="35" ry="42" fill="none" stroke="#00ff00" strokeWidth="2.5" />
                  {/* Large alien eyes */}
                  <ellipse cx="52" cy="48" rx="12" ry="18" fill="url(#alienEyeGrad)" mask="url(#alienFillMask)" />
                  <ellipse cx="76" cy="48" rx="12" ry="18" fill="url(#alienEyeGrad)" mask="url(#alienFillMask)" />
                  <ellipse cx="52" cy="48" rx="12" ry="18" fill="none" stroke="#39ff14" strokeWidth="2" />
                  <ellipse cx="76" cy="48" rx="12" ry="18" fill="none" stroke="#39ff14" strokeWidth="2" />
                  {/* Eye highlights */}
                  <ellipse cx="54" cy="45" rx="4" ry="6" fill="#39ff14" mask="url(#alienFillMask)" opacity="0.6" />
                  <ellipse cx="78" cy="45" rx="4" ry="6" fill="#39ff14" mask="url(#alienFillMask)" opacity="0.6" />
                  <circle cx="55" cy="43" r="2" fill="#7fff00" mask="url(#alienFillMask)" />
                  <circle cx="79" cy="43" r="2" fill="#7fff00" mask="url(#alienFillMask)" />
                  {/* Antenna */}
                  <line x1="50" y1="15" x2="50" y2="25" stroke="#00ff00" strokeWidth="2.5" mask="url(#alienFillMask)" />
                  <circle cx="50" cy="12" r="4" fill="#39ff14" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
                  <circle cx="50" cy="12" r="6" fill="none" stroke="#39ff14" strokeWidth="1.5" mask="url(#alienFillMask)" opacity="0.5" />
                  <line x1="78" y1="15" x2="78" y2="25" stroke="#00ff00" strokeWidth="2.5" mask="url(#alienFillMask)" />
                  <circle cx="78" cy="12" r="4" fill="#39ff14" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
                  <circle cx="78" cy="12" r="6" fill="none" stroke="#39ff14" strokeWidth="1.5" mask="url(#alienFillMask)" opacity="0.5" />
                  {/* Neck */}
                  <rect x="56" y="78" width="16" height="8" rx="2" fill="url(#alienBodyGrad)" mask="url(#alienFillMask)" />
                  <rect x="56" y="78" width="16" height="8" rx="2" fill="none" stroke="#00ff00" strokeWidth="2" />
                  {/* Body */}
                  <ellipse cx="64" cy="100" rx="28" ry="20" fill="url(#alienBodyGrad)" mask="url(#alienFillMask)" filter="url(#alienGlow)" />
                  <ellipse cx="64" cy="100" rx="28" ry="20" fill="none" stroke="#00ff00" strokeWidth="2.5" />
                  {/* Arms */}
                  <path d="M38 95 Q30 95, 25 100" stroke="#00ff00" strokeWidth="5" fill="none" mask="url(#alienFillMask)" strokeLinecap="round" />
                  <circle cx="25" cy="100" r="4" fill="#39ff14" mask="url(#alienFillMask)" />
                  <path d="M90 95 Q98 95, 103 100" stroke="#00ff00" strokeWidth="5" fill="none" mask="url(#alienFillMask)" strokeLinecap="round" />
                  <circle cx="103" cy="100" r="4" fill="#39ff14" mask="url(#alienFillMask)" />
                  {/* Small mouth */}
                  <line x1="58" y1="68" x2="70" y2="68" stroke="#00cc00" strokeWidth="2" mask="url(#alienFillMask)" strokeLinecap="round" />
                  {/* Tech details */}
                  <circle cx="64" cy="100" r="5" fill="#7fff00" mask="url(#alienFillMask)" opacity="0.5" />
                  <circle cx="64" cy="100" r="3" fill="#39ff14" mask="url(#alienFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">👽 Alien</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-green-600">{Math.round(alienFill)}%</div>
            </div>
            )}
            {/* Phoenix */}
            {shouldShowCharacter('phoenix') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="phoenix" onClick={() => handleCharacterClick('phoenix')} onMouseEnter={() => handleCharacterHover('phoenix')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'phoenix' ? [1, 1.2, 1.1, 1.2, 1] : [1, 1.1, 1.05, 1.1, 1], y: hoveredCharacter === 'phoenix' ? [0, -4, -2, -4, 0] : [0, -2, -1, -2, 0] }} transition={{ duration: hoveredCharacter === 'phoenix' ? 2 : 3.5, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.35, filter: "brightness(1.6) drop-shadow(0 0 30px rgba(255,69,0,1))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'phoenix' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="phoenixBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="40%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#ff4500" />
                    </linearGradient>
                    <radialGradient id="phoenixFlameGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffff00" opacity="0.9" />
                      <stop offset="50%" stopColor="#ff8c00" opacity="0.6" />
                      <stop offset="100%" stopColor="#ff4500" opacity="0.3" />
                    </radialGradient>
                    <filter id="phoenixGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="phoenixFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (phoenixFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Flame aura */}
                  <ellipse cx="64" cy="64" rx="50" ry="55" fill="url(#phoenixFlameGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" opacity="0.5" />
                  {/* Tail feathers with flames */}
                  <path d="M64 95 Q50 105, 40 115 Q45 110, 50 105 Q55 100, 64 95" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <path d="M64 95 Q64 108, 60 120 Q62 112, 64 105 Q64 100, 64 95" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <path d="M64 95 Q78 105, 88 115 Q83 110, 78 105 Q73 100, 64 95" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  {/* Flame tips on tail */}
                  <circle cx="40" cy="115" r="4" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <circle cx="60" cy="120" r="4" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <circle cx="88" cy="115" r="4" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  {/* Body */}
                  <ellipse cx="64" cy="65" rx="22" ry="28" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <ellipse cx="64" cy="65" rx="22" ry="28" fill="none" stroke="#ff8c00" strokeWidth="2.5" />
                  {/* Wings spread */}
                  <path d="M42 60 Q20 50, 15 45 Q25 48, 35 52 Q40 56, 42 60" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <path d="M42 70 Q18 75, 10 80 Q22 77, 32 73 Q40 72, 42 70" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <path d="M86 60 Q108 50, 113 45 Q103 48, 93 52 Q88 56, 86 60" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <path d="M86 70 Q110 75, 118 80 Q106 77, 96 73 Q88 72, 86 70" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  {/* Wing flame tips */}
                  <circle cx="15" cy="45" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <circle cx="10" cy="80" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <circle cx="113" cy="45" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <circle cx="118" cy="80" r="3" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  {/* Head */}
                  <ellipse cx="64" cy="42" rx="14" ry="16" fill="url(#phoenixBodyGrad)" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <ellipse cx="64" cy="42" rx="14" ry="16" fill="none" stroke="#ff8c00" strokeWidth="2" />
                  {/* Crest flames */}
                  <path d="M64 26 Q62 20, 60 15 Q62 20, 64 25" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <path d="M64 26 Q64 18, 64 12 Q64 18, 64 25" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <path d="M64 26 Q66 20, 68 15 Q66 20, 64 25" fill="#ffff00" mask="url(#phoenixFillMask)" filter="url(#phoenixGlow)" />
                  <circle cx="60" cy="15" r="2.5" fill="#ffffff" mask="url(#phoenixFillMask)" />
                  <circle cx="64" cy="12" r="2.5" fill="#ffffff" mask="url(#phoenixFillMask)" />
                  <circle cx="68" cy="15" r="2.5" fill="#ffffff" mask="url(#phoenixFillMask)" />
                  {/* Eyes */}
                  <circle cx="59" cy="40" r="3" fill="#ff4500" mask="url(#phoenixFillMask)" />
                  <circle cx="69" cy="40" r="3" fill="#ff4500" mask="url(#phoenixFillMask)" />
                  <circle cx="59" cy="40" r="1.5" fill="#ffff00" mask="url(#phoenixFillMask)" />
                  <circle cx="69" cy="40" r="1.5" fill="#ffff00" mask="url(#phoenixFillMask)" />
                  {/* Beak */}
                  <path d="M64 45 L67 50 L64 48 L61 50 Z" fill="#ff8c00" mask="url(#phoenixFillMask)" />
                  {/* Body glow center */}
                  <ellipse cx="64" cy="65" rx="10" ry="14" fill="#ffff00" mask="url(#phoenixFillMask)" opacity="0.4" />
                  <circle cx="64" cy="65" r="6" fill="#ffffff" mask="url(#phoenixFillMask)" opacity="0.3" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🔥🦅 Phoenix</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(phoenixFill)}%</div>
            </div>
            )}
            {/* Cosmic Dragon */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="cosmicDragon" onClick={() => handleCharacterClick('cosmicDragon')} onMouseEnter={() => handleCharacterHover('cosmicDragon')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'cosmicDragon' ? [1, 1.15, 1.08, 1.15, 1] : [1, 1.08, 1.04, 1.08, 1], x: hoveredCharacter === 'cosmicDragon' ? [0, 2, -2, 0] : [0, 1, -1, 0] }} transition={{ duration: hoveredCharacter === 'cosmicDragon' ? 2.5 : 4, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.28, filter: "brightness(1.5) drop-shadow(0 0 28px rgba(147,112,219,0.9))" }} whileTap={{ scale: 0.88 }} className={`${hoveredCharacter === 'cosmicDragon' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="cosmicDragonBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9370db" />
                      <stop offset="50%" stopColor="#4169e1" />
                      <stop offset="100%" stopColor="#00ffff" />
                    </linearGradient>
                    <radialGradient id="cosmicDragonGlowGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" opacity="0.8" />
                      <stop offset="50%" stopColor="#9370db" opacity="0.5" />
                      <stop offset="100%" stopColor="#4169e1" opacity="0.2" />
                    </radialGradient>
                    <filter id="cosmicDragonGlow"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="cosmicDragonFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (cosmicDragonFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Cosmic aura */}
                  <circle cx="64" cy="64" r="55" fill="url(#cosmicDragonGlowGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.4" />
                  {/* Tail */}
                  <path d="M30 100 Q20 95, 15 85 Q18 90, 22 92 Q26 95, 30 100" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  <path d="M30 100 Q35 110, 40 118 Q37 112, 34 106 Q32 102, 30 100" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  <line x1="30" y1="100" x2="50" y2="95" stroke="#4169e1" strokeWidth="6" mask="url(#cosmicDragonFillMask)" strokeLinecap="round" />
                  <circle cx="15" cy="85" r="3" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  <circle cx="40" cy="118" r="3" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  {/* Body */}
                  <ellipse cx="60" cy="80" rx="20" ry="25" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  <ellipse cx="60" cy="80" rx="20" ry="25" fill="none" stroke="#9370db" strokeWidth="2.5" />
                  {/* Scales/spots */}
                  <circle cx="55" cy="75" r="3" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.6" />
                  <circle cx="65" cy="82" r="2.5" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.6" />
                  <circle cx="58" cy="88" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.6" />
                  {/* Wings */}
                  <path d="M55 65 Q30 55, 20 50 Q25 52, 35 58 Q45 63, 55 65" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
                  <path d="M55 75 Q28 80, 18 88 Q26 84, 38 78 Q48 74, 55 75" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
                  <path d="M65 65 Q90 55, 100 50 Q95 52, 85 58 Q75 63, 65 65" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
                  <path d="M65 75 Q92 80, 102 88 Q94 84, 82 78 Q72 74, 65 75" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" opacity="0.8" />
                  {/* Wing stars */}
                  <circle cx="25" cy="52" r="2" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="22" cy="85" r="1.5" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="95" cy="52" r="2" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="98" cy="85" r="1.5" fill="#ffffff" mask="url(#cosmicDragonFillMask)" />
                  {/* Neck */}
                  <ellipse cx="68" cy="58" rx="10" ry="18" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" transform="rotate(-25 68 58)" />
                  <ellipse cx="68" cy="58" rx="10" ry="18" fill="none" stroke="#9370db" strokeWidth="2" transform="rotate(-25 68 58)" />
                  {/* Head */}
                  <ellipse cx="78" cy="38" rx="16" ry="18" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  <ellipse cx="78" cy="38" rx="16" ry="18" fill="none" stroke="#9370db" strokeWidth="2.5" />
                  {/* Eyes */}
                  <circle cx="74" cy="35" r="4" fill="#ffff00" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="82" cy="35" r="4" fill="#ffff00" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="74" cy="35" r="2" fill="#ff4500" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="82" cy="35" r="2" fill="#ff4500" mask="url(#cosmicDragonFillMask)" />
                  {/* Horns */}
                  <path d="M70 22 L68 18 Q70 20, 70 22" fill="#9370db" mask="url(#cosmicDragonFillMask)" />
                  <path d="M86 22 L88 18 Q86 20, 86 22" fill="#9370db" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="68" cy="18" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  <circle cx="88" cy="18" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" filter="url(#cosmicDragonGlow)" />
                  {/* Snout */}
                  <ellipse cx="85" cy="43" rx="8" ry="6" fill="url(#cosmicDragonBodyGrad)" mask="url(#cosmicDragonFillMask)" />
                  <ellipse cx="85" cy="43" rx="8" ry="6" fill="none" stroke="#4169e1" strokeWidth="1.5" />
                  {/* Nostrils */}
                  <circle cx="88" cy="42" r="1.5" fill="#4169e1" mask="url(#cosmicDragonFillMask)" />
                  <circle cx="88" cy="45" r="1.5" fill="#4169e1" mask="url(#cosmicDragonFillMask)" />
                  {/* Cosmic breath */}
                  <circle cx="95" cy="43" r="2" fill="#00ffff" mask="url(#cosmicDragonFillMask)" opacity="0.7" filter="url(#cosmicDragonGlow)" />
                  <circle cx="100" cy="40" r="1.5" fill="#9370db" mask="url(#cosmicDragonFillMask)" opacity="0.6" filter="url(#cosmicDragonGlow)" />
                  <circle cx="103" cy="45" r="1" fill="#ffffff" mask="url(#cosmicDragonFillMask)" opacity="0.8" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🐉🌌 Cosmic Dragon</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(cosmicDragonFill)}%</div>
            </div>
            {/* Meteor */}
            {shouldShowCharacter('meteor') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="meteor" onClick={() => handleCharacterClick('meteor')} onMouseEnter={() => handleCharacterHover('meteor')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'meteor' ? [1, 1.12, 1] : [1, 1.06, 1], x: hoveredCharacter === 'meteor' ? [0, 4, 0] : [0, 2, 0], y: hoveredCharacter === 'meteor' ? [0, -4, 0] : [0, -2, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} whileHover={{ scale: 1.3, filter: "brightness(1.6) drop-shadow(0 0 30px rgba(255,69,0,1))" }} whileTap={{ scale: 0.85 }} className={`${hoveredCharacter === 'meteor' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="meteorCoreGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#ffff00" />
                      <stop offset="60%" stopColor="#ff8c00" />
                      <stop offset="100%" stopColor="#8b4513" />
                    </radialGradient>
                    <linearGradient id="meteorTrailGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#ff4500" opacity="0.9" />
                      <stop offset="40%" stopColor="#ff8c00" opacity="0.6" />
                      <stop offset="70%" stopColor="#ffd700" opacity="0.3" />
                      <stop offset="100%" stopColor="#ffff00" opacity="0" />
                    </linearGradient>
                    <filter id="meteorGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="meteorFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (meteorFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Long trail */}
                  <path d="M100 28 Q70 50, 30 80 Q50 65, 65 55 Q80 40, 100 28" fill="url(#meteorTrailGrad)" mask="url(#meteorFillMask)" filter="url(#meteorGlow)" />
                  <path d="M98 32 Q68 54, 28 84 Q48 69, 63 59 Q78 44, 98 32" fill="url(#meteorTrailGrad)" mask="url(#meteorFillMask)" opacity="0.7" />
                  <path d="M95 30 Q75 55, 40 90 Q55 75, 68 65 Q82 48, 95 30" fill="#ff8c00" mask="url(#meteorFillMask)" opacity="0.4" />
                  {/* Trail particles */}
                  <circle cx="88" cy="40" r="3" fill="#ffff00" mask="url(#meteorFillMask)" opacity="0.8" filter="url(#meteorGlow)" />
                  <circle cx="75" cy="52" r="2.5" fill="#ff8c00" mask="url(#meteorFillMask)" opacity="0.7" filter="url(#meteorGlow)" />
                  <circle cx="62" cy="64" r="2" fill="#ffd700" mask="url(#meteorFillMask)" opacity="0.6" />
                  <circle cx="48" cy="76" r="1.5" fill="#ff4500" mask="url(#meteorFillMask)" opacity="0.5" />
                  <circle cx="82" cy="45" r="2" fill="#ffffff" mask="url(#meteorFillMask)" opacity="0.9" />
                  <circle cx="68" cy="58" r="1.5" fill="#ffffff" mask="url(#meteorFillMask)" opacity="0.8" />
                  <circle cx="55" cy="70" r="1" fill="#ffff00" mask="url(#meteorFillMask)" opacity="0.7" />
                  {/* Meteor head - irregular rock shape */}
                  <ellipse cx="108" cy="20" rx="12" ry="10" fill="url(#meteorCoreGrad)" mask="url(#meteorFillMask)" filter="url(#meteorGlow)" transform="rotate(-45 108 20)" />
                  <ellipse cx="108" cy="20" rx="12" ry="10" fill="none" stroke="#ff8c00" strokeWidth="2" transform="rotate(-45 108 20)" />
                  {/* Rocky texture */}
                  <circle cx="105" cy="18" r="3" fill="#8b4513" mask="url(#meteorFillMask)" opacity="0.7" />
                  <circle cx="110" cy="22" r="2.5" fill="#8b4513" mask="url(#meteorFillMask)" opacity="0.6" />
                  <circle cx="108" cy="19" r="2" fill="#a0522d" mask="url(#meteorFillMask)" opacity="0.5" />
                  {/* Fire glow around head */}
                  <ellipse cx="108" cy="20" rx="16" ry="14" fill="#ff4500" mask="url(#meteorFillMask)" opacity="0.4" filter="url(#meteorGlow)" transform="rotate(-45 108 20)" />
                  <ellipse cx="108" cy="20" rx="20" ry="18" fill="#ff8c00" mask="url(#meteorFillMask)" opacity="0.2" filter="url(#meteorGlow)" transform="rotate(-45 108 20)" />
                  {/* Hot core glow */}
                  <circle cx="108" cy="20" r="5" fill="#ffffff" mask="url(#meteorFillMask)" opacity="0.8" />
                  <circle cx="108" cy="20" r="3" fill="#ffff00" mask="url(#meteorFillMask)" />
                  {/* Additional flame wisps */}
                  <path d="M102 16 Q98 18, 95 22" stroke="#ff4500" strokeWidth="2" fill="none" mask="url(#meteorFillMask)" opacity="0.6" />
                  <path d="M114 24 Q118 26, 120 30" stroke="#ff8c00" strokeWidth="2" fill="none" mask="url(#meteorFillMask)" opacity="0.6" />
                  <circle cx="95" cy="22" r="2" fill="#ffd700" mask="url(#meteorFillMask)" opacity="0.7" filter="url(#meteorGlow)" />
                  <circle cx="120" cy="30" r="1.5" fill="#ffd700" mask="url(#meteorFillMask)" opacity="0.7" filter="url(#meteorGlow)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">💫 Meteor</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">{Math.round(meteorFill)}%</div>
            </div>
            )}
            {/* Aurora */}
            {shouldShowCharacter('aurora') && (
            <div className="relative w-32 h-32 cursor-pointer" data-character="aurora" onClick={() => handleCharacterClick('aurora')} onMouseEnter={() => handleCharacterHover('aurora')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'aurora' ? [1, 1.1, 1] : [1, 1.05, 1], opacity: [0.8, 1, 0.9, 1, 0.8] }} transition={{ duration: hoveredCharacter === 'aurora' ? 3 : 5, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.2, opacity: 1, filter: "brightness(1.5) drop-shadow(0 0 30px rgba(0,255,255,0.8))" }} whileTap={{ scale: 0.9 }} className={`${hoveredCharacter === 'aurora' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <linearGradient id="auroraGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00ffff" opacity="0.8" />
                      <stop offset="50%" stopColor="#00ff00" opacity="0.6" />
                      <stop offset="100%" stopColor="#00ffff" opacity="0.4" />
                    </linearGradient>
                    <linearGradient id="auroraGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ff00ff" opacity="0.7" />
                      <stop offset="50%" stopColor="#9370db" opacity="0.5" />
                      <stop offset="100%" stopColor="#ff00ff" opacity="0.3" />
                    </linearGradient>
                    <linearGradient id="auroraGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00ff00" opacity="0.8" />
                      <stop offset="50%" stopColor="#7fff00" opacity="0.6" />
                      <stop offset="100%" stopColor="#00ff00" opacity="0.4" />
                    </linearGradient>
                    <filter id="auroraGlow"><feGaussianBlur stdDeviation="7" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="auroraFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (auroraFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Flowing aurora waves - cyan */}
                  <path d="M20 50 Q35 35, 50 40 T80 35 Q95 32, 108 38" stroke="url(#auroraGrad1)" strokeWidth="8" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.8" strokeLinecap="round" />
                  <path d="M18 55 Q33 38, 48 45 T78 38 Q93 35, 110 42" stroke="url(#auroraGrad1)" strokeWidth="6" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.6" strokeLinecap="round" />
                  {/* Magenta/purple waves */}
                  <path d="M22 65 Q38 50, 54 58 T84 52 Q98 48, 112 55" stroke="url(#auroraGrad2)" strokeWidth="10" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.7" strokeLinecap="round" />
                  <path d="M20 70 Q36 53, 52 63 T82 55 Q96 50, 114 60" stroke="url(#auroraGrad2)" strokeWidth="7" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.5" strokeLinecap="round" />
                  {/* Green waves */}
                  <path d="M18 82 Q34 68, 50 75 T80 70 Q94 66, 110 72" stroke="url(#auroraGrad3)" strokeWidth="9" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.8" strokeLinecap="round" />
                  <path d="M16 88 Q32 72, 48 82 T78 75 Q92 70, 112 78" stroke="url(#auroraGrad3)" strokeWidth="6" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.6" strokeLinecap="round" />
                  {/* Additional flowing curves for depth */}
                  <path d="M25 45 Q40 32, 55 38 T85 33" stroke="#00ffff" strokeWidth="4" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.5" strokeLinecap="round" />
                  <path d="M28 78 Q43 62, 58 70 T88 65" stroke="#ff00ff" strokeWidth="5" fill="none" mask="url(#auroraFillMask)" filter="url(#auroraGlow)" opacity="0.4" strokeLinecap="round" />
                  {/* Vertical rays emanating upward */}
                  <line x1="40" y1="95" x2="38" y2="70" stroke="#00ffff" strokeWidth="2" mask="url(#auroraFillMask)" opacity="0.6" filter="url(#auroraGlow)" strokeLinecap="round" />
                  <line x1="55" y1="100" x2="54" y2="65" stroke="#00ff00" strokeWidth="2.5" mask="url(#auroraFillMask)" opacity="0.7" filter="url(#auroraGlow)" strokeLinecap="round" />
                  <line x1="70" y1="98" x2="69" y2="68" stroke="#ff00ff" strokeWidth="2" mask="url(#auroraFillMask)" opacity="0.6" filter="url(#auroraGlow)" strokeLinecap="round" />
                  <line x1="85" y1="95" x2="84" y2="72" stroke="#7fff00" strokeWidth="2" mask="url(#auroraFillMask)" opacity="0.5" filter="url(#auroraGlow)" strokeLinecap="round" />
                  {/* Shimmer particles */}
                  <circle cx="45" cy="42" r="2" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.9" />
                  <circle cx="60" cy="38" r="1.5" fill="#00ffff" mask="url(#auroraFillMask)" opacity="0.8" filter="url(#auroraGlow)" />
                  <circle cx="75" cy="40" r="2" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.9" />
                  <circle cx="50" cy="62" r="1.5" fill="#ff00ff" mask="url(#auroraFillMask)" opacity="0.7" filter="url(#auroraGlow)" />
                  <circle cx="65" cy="58" r="2" fill="#00ff00" mask="url(#auroraFillMask)" opacity="0.8" filter="url(#auroraGlow)" />
                  <circle cx="80" cy="55" r="1.5" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.9" />
                  <circle cx="55" cy="78" r="2" fill="#7fff00" mask="url(#auroraFillMask)" opacity="0.8" filter="url(#auroraGlow)" />
                  <circle cx="70" cy="75" r="1.5" fill="#00ffff" mask="url(#auroraFillMask)" opacity="0.7" filter="url(#auroraGlow)" />
                  {/* Bright glow spots */}
                  <circle cx="64" cy="55" r="8" fill="#ffffff" mask="url(#auroraFillMask)" opacity="0.3" filter="url(#auroraGlow)" />
                  <circle cx="50" cy="68" r="6" fill="#00ffff" mask="url(#auroraFillMask)" opacity="0.3" filter="url(#auroraGlow)" />
                  <circle cx="78" cy="62" r="7" fill="#ff00ff" mask="url(#auroraFillMask)" opacity="0.3" filter="url(#auroraGlow)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🌈 Aurora</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-cyan-600">{Math.round(auroraFill)}%</div>
            </div>
            )}
            {/* Quantum Star */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="quantumStar" onClick={() => handleCharacterClick('quantumStar')} onMouseEnter={() => handleCharacterHover('quantumStar')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'quantumStar' ? [1, 1.2, 0.9, 1.2, 1] : [1, 1.1, 0.95, 1.1, 1], rotate: [0, 180, 360] }} transition={{ duration: hoveredCharacter === 'quantumStar' ? 2 : 4, repeat: Infinity, ease: "linear" }} whileHover={{ scale: 1.35, filter: "brightness(1.8) drop-shadow(0 0 35px rgba(0,255,255,1))" }} whileTap={{ scale: 0.8 }} className={`${hoveredCharacter === 'quantumStar' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="quantumStarCoreGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#00ffff" />
                      <stop offset="60%" stopColor="#ff00ff" />
                      <stop offset="100%" stopColor="#ffff00" />
                    </radialGradient>
                    <filter id="quantumStarGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="quantumStarFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (quantumStarFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Quantum field effect */}
                  <circle cx="64" cy="64" r="50" fill="none" stroke="#00ffff" strokeWidth="1" mask="url(#quantumStarFillMask)" opacity="0.3" strokeDasharray="4 4" />
                  <circle cx="64" cy="64" r="45" fill="none" stroke="#ff00ff" strokeWidth="1" mask="url(#quantumStarFillMask)" opacity="0.3" strokeDasharray="3 3" />
                  <circle cx="64" cy="64" r="40" fill="none" stroke="#ffff00" strokeWidth="1" mask="url(#quantumStarFillMask)" opacity="0.3" strokeDasharray="5 5" />
                  {/* Quantum particles orbiting */}
                  <circle cx="64" cy="20" r="3" fill="#00ffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <circle cx="108" cy="64" r="3" fill="#ff00ff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <circle cx="64" cy="108" r="3" fill="#ffff00" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <circle cx="20" cy="64" r="3" fill="#00ffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <circle cx="92" cy="36" r="2" fill="#ffffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <circle cx="92" cy="92" r="2" fill="#ff00ff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <circle cx="36" cy="92" r="2" fill="#00ffff" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <circle cx="36" cy="36" r="2" fill="#ffff00" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  {/* Main quantum star shape */}
                  <path d="M64 25 L70 50 L95 50 L74 65 L82 92 L64 75 L46 92 L54 65 L33 50 L58 50 Z" fill="url(#quantumStarCoreGrad)" mask="url(#quantumStarFillMask)" filter="url(#quantumStarGlow)" />
                  <path d="M64 25 L70 50 L95 50 L74 65 L82 92 L64 75 L46 92 L54 65 L33 50 L58 50 Z" fill="none" stroke="#00ffff" strokeWidth="2" />
                  {/* Inner quantum core */}
                  <circle cx="64" cy="64" r="18" fill="#ffffff" mask="url(#quantumStarFillMask)" opacity="0.8" filter="url(#quantumStarGlow)" />
                  <circle cx="64" cy="64" r="14" fill="#00ffff" mask="url(#quantumStarFillMask)" opacity="0.7" />
                  <circle cx="64" cy="64" r="10" fill="#ff00ff" mask="url(#quantumStarFillMask)" opacity="0.8" />
                  <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#quantumStarFillMask)" />
                  {/* Quantum entanglement lines */}
                  <line x1="64" y1="20" x2="64" y2="44" stroke="#00ffff" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
                  <line x1="108" y1="64" x2="84" y2="64" stroke="#ff00ff" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
                  <line x1="64" y1="108" x2="64" y2="84" stroke="#ffff00" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
                  <line x1="20" y1="64" x2="44" y2="64" stroke="#00ffff" strokeWidth="1.5" mask="url(#quantumStarFillMask)" opacity="0.5" strokeDasharray="2 2" />
                  {/* Additional sparkles */}
                  <circle cx="64" cy="35" r="2" fill="#ffffff" mask="url(#quantumStarFillMask)" />
                  <circle cx="85" cy="50" r="1.5" fill="#00ffff" mask="url(#quantumStarFillMask)" />
                  <circle cx="78" cy="78" r="2" fill="#ff00ff" mask="url(#quantumStarFillMask)" />
                  <circle cx="50" cy="78" r="1.5" fill="#ffff00" mask="url(#quantumStarFillMask)" />
                  <circle cx="43" cy="50" r="2" fill="#ffffff" mask="url(#quantumStarFillMask)" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">⚛️✨ Quantum Star</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-cyan-600">{Math.round(quantumStarFill)}%</div>
            </div>
            {/* Celestial Orb */}
            <div className="relative w-32 h-32 cursor-pointer" data-character="celestialOrb" onClick={() => handleCharacterClick('celestialOrb')} onMouseEnter={() => handleCharacterHover('celestialOrb')} onMouseLeave={() => handleCharacterHover(null)}>
              <motion.div animate={{ scale: hoveredCharacter === 'celestialOrb' ? [1, 1.15, 1] : [1, 1.08, 1], y: hoveredCharacter === 'celestialOrb' ? [0, -5, 0, 5, 0] : [0, -3, 0, 3, 0] }} transition={{ duration: hoveredCharacter === 'celestialOrb' ? 4 : 6, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.25, filter: "brightness(1.5) drop-shadow(0 0 28px rgba(147,112,219,0.9))" }} whileTap={{ scale: 0.88 }} className={`${hoveredCharacter === 'celestialOrb' ? 'drop-shadow-2xl' : ''}`}>
                <svg width="128" height="128" viewBox="0 0 128 128" className="w-32 h-32">
                  <defs>
                    <radialGradient id="celestialOrbGrad" cx="40%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#87ceeb" />
                      <stop offset="60%" stopColor="#9370db" />
                      <stop offset="100%" stopColor="#4b0082" />
                    </radialGradient>
                    <radialGradient id="celestialOrbInnerGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ffffff" opacity="0.9" />
                      <stop offset="50%" stopColor="#9370db" opacity="0.6" />
                      <stop offset="100%" stopColor="#4b0082" opacity="0.3" />
                    </radialGradient>
                    <filter id="celestialOrbGlow"><feGaussianBlur stdDeviation="6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <mask id="celestialOrbFillMask"><rect x="0" y="0" width="128" height="128" fill="white" transform={`translate(0, ${128 - (celestialOrbFill * 1.28)})`} /></mask>
                  </defs>
                  {/* Outer ethereal glow rings */}
                  <circle cx="64" cy="64" r="55" fill="none" stroke="#9370db" strokeWidth="1.5" mask="url(#celestialOrbFillMask)" opacity="0.3" />
                  <circle cx="64" cy="64" r="50" fill="none" stroke="#87ceeb" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.4" />
                  <circle cx="64" cy="64" r="45" fill="none" stroke="#9370db" strokeWidth="1.5" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  {/* Main orb body */}
                  <circle cx="64" cy="64" r="38" fill="url(#celestialOrbGrad)" mask="url(#celestialOrbFillMask)" filter="url(#celestialOrbGlow)" />
                  <circle cx="64" cy="64" r="38" fill="none" stroke="#9370db" strokeWidth="2.5" />
                  {/* Inner mystical patterns */}
                  <circle cx="64" cy="64" r="32" fill="url(#celestialOrbInnerGrad)" mask="url(#celestialOrbFillMask)" filter="url(#celestialOrbGlow)" opacity="0.7" />
                  <circle cx="64" cy="64" r="26" fill="none" stroke="#87ceeb" strokeWidth="1.5" mask="url(#celestialOrbFillMask)" opacity="0.6" />
                  <circle cx="64" cy="64" r="20" fill="none" stroke="#ffffff" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.7" />
                  {/* Crystal-like internal structures */}
                  <path d="M64 44 L74 54 L64 64 L54 54 Z" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  <path d="M64 64 L74 74 L64 84 L54 74 Z" fill="#9370db" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  <path d="M44 64 L54 74 L64 64 L54 54 Z" fill="#4b0082" mask="url(#celestialOrbFillMask)" opacity="0.4" />
                  <path d="M64 64 L74 54 L84 64 L74 74 Z" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.4" />
                  <line x1="64" y1="44" x2="64" y2="84" stroke="#ffffff" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  <line x1="44" y1="64" x2="84" y2="64" stroke="#ffffff" strokeWidth="1" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  <line x1="52" y1="52" x2="76" y2="76" stroke="#87ceeb" strokeWidth="0.5" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  <line x1="76" y1="52" x2="52" y2="76" stroke="#87ceeb" strokeWidth="0.5" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  {/* Core bright spot */}
                  <circle cx="64" cy="64" r="10" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
                  <circle cx="64" cy="64" r="6" fill="#ffffff" mask="url(#celestialOrbFillMask)" />
                  {/* Highlight reflection */}
                  <ellipse cx="54" cy="52" rx="12" ry="8" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.5" />
                  <ellipse cx="54" cy="52" rx="8" ry="5" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.7" />
                  {/* Floating energy particles around orb */}
                  <circle cx="40" cy="50" r="2" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
                  <circle cx="88" cy="55" r="1.5" fill="#9370db" mask="url(#celestialOrbFillMask)" opacity="0.7" filter="url(#celestialOrbGlow)" />
                  <circle cx="45" cy="80" r="2" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.9" />
                  <circle cx="85" cy="75" r="1.5" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
                  <circle cx="64" cy="30" r="1.5" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.9" />
                  <circle cx="30" cy="64" r="2" fill="#9370db" mask="url(#celestialOrbFillMask)" opacity="0.7" filter="url(#celestialOrbGlow)" />
                  <circle cx="98" cy="64" r="1.5" fill="#87ceeb" mask="url(#celestialOrbFillMask)" opacity="0.8" filter="url(#celestialOrbGlow)" />
                  <circle cx="64" cy="98" r="2" fill="#ffffff" mask="url(#celestialOrbFillMask)" opacity="0.9" />
                </svg>
              </motion.div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white/80 px-2 py-1 rounded whitespace-nowrap">🔮✨ Celestial Orb</div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">{Math.round(celestialOrbFill)}%</div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCharacters;
