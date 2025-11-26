'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { getTokenBalance, approveTokens, getAllowance, deposit, getUserDetails } from '@/blockchain/instances/ZyloPowerUp';
import { ZyloPowerUp_ADDRESS } from '@/blockchain/addresses/addresses';
import { BrowserProvider, ethers } from 'ethers';
import './ZillowStake.css';
import ZillowStakingCards from './ZillowStakingCards';
import AnimatedCharacters from './AnimatedCharacters';
import PowerUpUnitCards from './PowerUpUnitCards';
import RewardSummaryCards from './RewardSummaryCards';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
// import { log } from 'console';

/* Coin icon */
const CoinSVG = () => (
  <svg className="coin-svg" viewBox="0 0 128 128" aria-hidden="true">
    <defs>
      {/* face + rim */}
      <linearGradient id="coinFace" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="55%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FEE600" />
      </linearGradient>
      <linearGradient id="coinRim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFE97A" />
        <stop offset="100%" stopColor="#FDBA12" />
      </linearGradient>

      {/* soft inner bevel on the Z */}
      <filter id="zShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" floodColor="rgba(0,0,0,.25)" />
      </filter>

      {/* soft rim highlight */}
      <radialGradient id="rimGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>

    {/* rim + face */}
    <circle cx="64" cy="64" r="56" fill="url(#coinRim)" />
    <circle cx="64" cy="64" r="48" fill="url(#coinFace)" />

    {/* subtle rim highlight */}
    <circle cx="56" cy="52" r="40" fill="url(#rimGlow)" opacity=".35" />

    {/* ==== "Z" glyph ==== */}
    <g filter="url(#zShadow)" transform="translate(34 40)">
      {/* top bar */}
      <rect x="0" y="0" width="60" height="12" rx="6" fill="#FFF59D" />
      {/* diagonal bar (top-right to bottom-left) */}
      <rect x="10" y="18" width="48" height="12" rx="6"
        transform="rotate(-28 34 24)" fill="#F6C400" />
      {/* bottom bar */}
      <rect x="0" y="40" width="60" height="12" rx="6" fill="#FFF59D" />
      {/* small inner sheen on the diagonal */}
      <rect x="10" y="18" width="48" height="6" rx="3"
        transform="rotate(-28 34 24)" fill="rgba(255,255,255,.35)" />
    </g>
  </svg>
);

interface ZillowStakeProps {
  onShowZoneCardsChange?: (showZoneCards: boolean) => void;
  onPowerUpClick?: (unitIndex: number) => void;
  onUnitsClick?: (unitIndex: number) => void;
  showRewardsSection?: boolean;
  enableStakingForm?: boolean;
  externalShowZoneCards?: boolean;
  initialSelectedUnit?: number | null; // Pass selected unit from parent
}

const ZillowStake: React.FC<ZillowStakeProps> = ({ 
  onShowZoneCardsChange,
  onPowerUpClick,
  onUnitsClick,
  showRewardsSection = false,
  enableStakingForm = true,
  externalShowZoneCards,
  initialSelectedUnit = null,
}) => {
  // const [selectedPeriod, setSelectedPeriod] = useState<'7' | '14' | '30' | '60'>('7');
  const [amountTop, setAmountTop] = useState('0.00');
  // const [amountBottom, setAmountBottom] = useState('0.00');
  const [tokenBalance, setTokenBalance] = useState('0.00');
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedPercentage, setSelectedPercentage] = useState(1);
  const [isLoadingStakedAmount, setIsLoadingStakedAmount] = useState(false);
  const [index2Value, setIndex2Value] = useState('0.00');
  const [index3Value, setIndex3Value] = useState('0.00');
  const [index4Value, setIndex4Value] = useState('0.00');
  const [index6Value, setIndex6Value] = useState('0.00');
  const [index7Value, setIndex7Value] = useState('0.00');

  // Reward states
  const [claimedSelfReward] = useState('0.00');
  const [claimedTeamReward] = useState('0.00');
  const [currentSelfReward] = useState('0.00');
  const [currentTeamReward] = useState('0.00');
  const [isLoadingRewards] = useState(false);

  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  // UI state for showing/hiding staking form when user has character
  const [showStakingForm, setShowStakingForm] = useState(false);
  const [userCategory, setUserCategory] = useState<number>(0);
  const [internalShowZoneCards, setInternalShowZoneCards] = useState(true); // Show zone cards initially
  const [selectedZoneUnit, setSelectedZoneUnit] = useState<number | null>(initialSelectedUnit || null);
  
  // Sync with external prop if provided
  useEffect(() => {
    if (initialSelectedUnit !== undefined && initialSelectedUnit !== null) {
      setSelectedZoneUnit(initialSelectedUnit);
    }
  }, [initialSelectedUnit]);

  // Use external state if provided, otherwise use internal state
  const showZoneCards = externalShowZoneCards !== undefined ? externalShowZoneCards : internalShowZoneCards;

  // Sync internal state with external prop
  useEffect(() => {
    if (externalShowZoneCards !== undefined) {
      setInternalShowZoneCards(externalShowZoneCards);
    }
  }, [externalShowZoneCards]);

  // Notify parent when showZoneCards changes (only if using internal state)
  useEffect(() => {
    if (onShowZoneCardsChange && externalShowZoneCards === undefined) {
      onShowZoneCardsChange(internalShowZoneCards);
    }
  }, [internalShowZoneCards, onShowZoneCardsChange, externalShowZoneCards]);

  // Auto-close success notification after 5 seconds
  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false);
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessNotification]);

  // Handle circle click to set percentage
  const handleCircleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isConnected || !tokenBalance || parseFloat(tokenBalance) <= 0) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clickX = event.clientX - centerX;
    const clickY = event.clientY - centerY;

    // Calculate angle from center (0 degrees is at 3 o'clock, going counter-clockwise)
    let angle = Math.atan2(clickY, clickX) * (180 / Math.PI);

    // Convert to 0-360 range and adjust for our circle starting at -90 degrees
    angle = (angle + 90 + 360) % 360;

    // Convert angle to percentage (0-100%)
    const percentage = Math.max(1, Math.round((angle / 360) * 100));

    // Update the selected percentage
    setSelectedPercentage(percentage);

    // Calculate amount based on percentage
    const balance = parseFloat(tokenBalance);
    const amount = (balance * percentage) / 100;

    // Set the amount in the input field
    setAmountTop(amount.toFixed(2));

    console.log('Circle clicked:', { angle, percentage, amount });
  };

  // Fetch token balance when wallet connects or address changes
  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (isConnected && address && walletClient) {
        setIsLoadingBalance(true);
        try {
          // Convert wallet client to ethers provider
          const provider = new BrowserProvider(walletClient);

          // Get token balance
          const result = await getTokenBalance(provider, address!);
          console.log('Token balance:', result);

          if (result.success && result.balance) {
            const balance = parseFloat(result.balance);
            if (!isNaN(balance)) {
              setTokenBalance(balance.toFixed(2));
              console.log('Token balance:', result.balance);
            } else {
              console.error('Invalid balance format:', result.balance);
              setTokenBalance('0.00');
            }
          } else {
            console.error('Error fetching token balance:', result.error);
            // Handle specific error types
            if (result.error?.includes('missing revert data')) {
              console.warn('Contract call failed - using fallback balance display');
              setTokenBalance('0.00'); // Show 0.00 as fallback
            } else if (result.error?.includes('contract may not be deployed')) {
              console.warn('Token contract not deployed - using fallback balance display');
              setTokenBalance('0.00'); // Show 0.00 as fallback
            } else {
              setTokenBalance('0.00');
            }
          }
        } catch (error) {
          console.error('Error fetching token balance:', error);
          setTokenBalance('0.00');
        } finally {
          setIsLoadingBalance(false);
        }
      } else {
        setTokenBalance('0.00');
      }
    };

    fetchTokenBalance();
  }, [isConnected, address, walletClient]);

  // Function to refresh all page data after staking
  const refreshAllPageData = async () => {
    if (isConnected && address && walletClient) {
      console.log('🔄 Refreshing all page data after staking...');

      // Set loading states
      setIsLoadingStakedAmount(true);
      setIsLoadingBalance(true);

      try {
        // Convert wallet client to ethers provider
        const provider = new BrowserProvider(walletClient);

        // 1. Refresh token balance
        console.log('📊 Refreshing token balance...');
        const balanceResult = await getTokenBalance(provider, address!);
        if (balanceResult.success && balanceResult.balance) {
          setTokenBalance(parseFloat(balanceResult.balance).toFixed(2));
          console.log('✅ Token balance updated:', balanceResult.balance);
        }

        // 2. Refresh staking details (user details)
        console.log('📈 Refreshing staking details...');
        const userDetailsResult = await getUserDetails(provider, address!);
        if (userDetailsResult.success && userDetailsResult.data) {
          // Safe BigInt to Number conversion helper
          const safeBigIntToNumber = (bigIntValue: bigint | number | string | null | undefined): number => {
            try {
              if (!bigIntValue && bigIntValue !== 0 && bigIntValue !== BigInt(0)) return 0;

              // Handle BigInt type
              if (typeof bigIntValue === 'bigint') {
                // Check if it's within safe integer range
                if (bigIntValue > Number.MAX_SAFE_INTEGER || bigIntValue < Number.MIN_SAFE_INTEGER) {
                  // For very large BigInt, use string conversion with parseFloat
                  const str = bigIntValue.toString();
                  const num = parseFloat(str);
                  if (isNaN(num) || !isFinite(num)) {
                    return 0;
                  }
                  return num;
                }
                // Safe to convert directly
                return Number(bigIntValue);
              }

              // Handle string or number
              const str = String(bigIntValue);
              if (!str || str === '0' || str === '') return 0;

              // Use parseFloat for safer conversion
              const num = parseFloat(str);
              if (isNaN(num) || !isFinite(num)) {
                return 0;
              }

              // Check if number is within safe range
              if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
                console.warn('Number out of safe range, using 0');
                return 0;
              }

              return num;
            } catch (e) {
              console.error('Error converting BigInt to Number:', e, 'Value:', bigIntValue);
              return 0;
            }
          };

          // Safe value extraction helper
          const safeGetValue = (data: unknown, prop: string | undefined, arr: unknown[], index: number, fallback: bigint | number = BigInt(0)) => {
            try {
              // Validate index
              if (index < 0 || index > 100 || !Number.isInteger(index)) {
                return fallback;
              }

              // Try named property first (if prop is provided)
              if (prop && data && typeof data === 'object' && data !== null) {
                try {
                  const dataObj = data as Record<string, unknown>;
                  if (prop in dataObj && dataObj[prop] !== undefined && dataObj[prop] !== null) {
                    return dataObj[prop];
                  }
                } catch {
                  // Ignore property access errors
                }
              }

              // Try array index if array is long enough
              if (Array.isArray(arr) && arr.length > index && index >= 0) {
                try {
                  if (arr[index] !== undefined && arr[index] !== null) {
                    return arr[index];
                  }
                } catch {
                  // Ignore array access errors
                }
              }

              // Try numeric property access only if we know the object has a length property
              if (data && typeof data === 'object' && !Array.isArray(data) && data !== null) {
                try {
                  // Check if it's an ethers.js tuple with length property
                  const dataWithLength = data as { length?: number;[key: number]: unknown };
                  if (typeof dataWithLength.length === 'number' && index >= 0 && index < dataWithLength.length) {
                    // Use Object.getOwnPropertyDescriptor to safely check if property exists
                    const descriptor = Object.getOwnPropertyDescriptor(data, index);
                    if (descriptor && descriptor.value !== undefined && descriptor.value !== null) {
                      return descriptor.value;
                    }
                  }
                } catch {
                  // Ignore property access errors - RangeError can occur here
                }
              }

              return fallback;
            } catch (e) {
              // Catch any RangeError or other errors
              if (e instanceof RangeError) {
                console.warn(`RangeError accessing ${prop || 'index'} at index ${index}, using fallback`);
              } else {
                console.error(`Error accessing ${prop || 'index'} at index ${index}:`, e);
              }
              return fallback;
            }
          };

          const rawData = userDetailsResult.data;
          const dataArray = Array.isArray(rawData) ? rawData : [];

          // Extract values safely - based on Community ABI structure
          // [name, inceptAddress, registeredTime, powerUPTotalToken, powerUPActiveTotalToken, countDirectIncept, TotalTeamUnderIncept]
          const registeredTime = safeGetValue(rawData, 'registeredTime', dataArray, 2, BigInt(0));
          const index3Wei = safeGetValue(rawData, 'countDirectIncept', dataArray, 5, BigInt(0));
          const index4Wei = safeGetValue(rawData, 'TotalTeamUnderIncept', dataArray, 6, BigInt(0));
          const index6Wei = safeGetValue(rawData, 'powerUPTotalToken', dataArray, 3, BigInt(0));
          const index7Wei = safeGetValue(rawData, 'powerUPActiveTotalToken', dataArray, 4, BigInt(0));

          // Convert registeredTime to date format
          let index2Value = 'N/A';
          try {
            const registerTimestamp = safeBigIntToNumber(registeredTime);
            if (registerTimestamp > 0 && !isNaN(registerTimestamp) && isFinite(registerTimestamp)) {
              let timestamp = registerTimestamp;
              if (timestamp < 1e12) {
                timestamp = timestamp * 1000; // Convert seconds to milliseconds
              }
              const maxTimestamp = 8640000000000000;
              const minTimestamp = -8640000000000000;
              timestamp = Math.max(minTimestamp, Math.min(maxTimestamp, timestamp));
              const date = new Date(timestamp);
              if (!isNaN(date.getTime())) {
                index2Value = date.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
              }
            }
          } catch (e) {
            console.error('Error converting register time:', e);
          }

          // Convert countDirectIncept (it's a count, not in wei)
          const index3Value = safeBigIntToNumber(index3Wei);

          // Convert TotalTeamUnderIncept (it's a count, not in wei)
          const index4Value = safeBigIntToNumber(index4Wei);

          // Convert powerUPTotalToken and powerUPActiveTotalToken (in wei)
          let index6Value = 0;
          let index7Value = 0;
          try {
            if (index6Wei && index6Wei.toString() !== '0') {
              try {
                index6Value = parseFloat(ethers.formatEther(index6Wei));
                if (!isFinite(index6Value)) {
                  index6Value = 0;
                }
              } catch (formatError) {
                console.error('Error using formatEther for index6Wei:', formatError);
                index6Value = safeBigIntToNumber(index6Wei) / 1e18;
              }
            }
            if (index7Wei && index7Wei.toString() !== '0') {
              try {
                index7Value = parseFloat(ethers.formatEther(index7Wei));
                if (!isFinite(index7Value)) {
                  index7Value = 0;
                }
              } catch (formatError) {
                console.error('Error using formatEther for index7Wei:', formatError);
                index7Value = safeBigIntToNumber(index7Wei) / 1e18;
              }
            }
          } catch (e) {
            console.error('Error converting index6Wei or index7Wei:', e);
          }

          // Set all values
          setIndex2Value(index2Value);
          setIndex3Value(index3Value.toFixed(0));
          setIndex4Value(index4Value.toFixed(0));
          setIndex6Value(index6Value.toFixed(2));
          setIndex7Value(index7Value.toFixed(2));

          console.log('✅ Staking details updated:', {
            index2Value: index2Value,
            index3Value: index3Value.toFixed(0),
            index4Value: index4Value.toFixed(0),
            index6Value: index6Value.toFixed(2),
            index7Value: index7Value.toFixed(2)
          });
        }

        // 3. Trigger page refresh for other components
        console.log('🔄 Triggering page refresh for other components...');

        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('stakingCompleted', {
          detail: {
            timestamp: Date.now(),
            userAddress: address
          }
        }));

        console.log('✅ All page data refreshed successfully!');

      } catch (error) {
        console.error('❌ Error refreshing page data:', error);
      } finally {
        setIsLoadingStakedAmount(false);
        setIsLoadingBalance(false);
      }
    }
  };

  // Function to refresh staking data (legacy - keeping for compatibility)
  // const refreshStakingData = async () => {
  //   await refreshAllPageData();
  // };

  // Fetch all user data when wallet connects or address changes
  useEffect(() => {
    const fetchAllUserData = async () => {
      if (isConnected && address && walletClient) {
        setIsLoadingStakedAmount(true);
        try {
          // Convert wallet client to ethers provider
          const provider = new BrowserProvider(walletClient);

          // Get user details and extract all required values
          const result = await getUserDetails(provider, address!);
          console.log('=== getUserDetails Response ===');
          console.log('Success:', result.success);
          console.log('Full result:', result);

          if (result.success && result.data) {
            const rawData = result.data;

            console.log('=== Blockchain Raw Data ===');
            console.log('Data type:', typeof rawData);
            console.log('Is Array:', Array.isArray(rawData));
            console.log('Full data:', rawData);
            console.log('Data keys:', Object.keys(rawData || {}));

            // Handle both array and object formats (ethers.js can return tuples as objects)
            let dataArray = [];
            const _dataObject = {};

            if (Array.isArray(rawData)) {
              dataArray = rawData;
              console.log('Data is an array with length:', dataArray.length);
            } else if (rawData && typeof rawData === 'object') {
              // Check if it's an ethers.js tuple (has array-like properties and named properties)
              // dataObject = rawData; // Unused variable
              // Try to convert to array if it has numeric indices
              if (rawData.length !== undefined) {
                dataArray = Array.from({ length: rawData.length }, (_, i) => rawData[i]);
                console.log('Data is an object with length property:', rawData.length);
              } else {
                // It's a pure object, extract by property names
                console.log('Data is a pure object');
              }
            }

            // Log all available data
            console.log('=== Data Structure Analysis ===');
            if (Array.isArray(rawData) || (rawData && rawData.length !== undefined)) {
              const length = Array.isArray(rawData) ? rawData.length : rawData.length;
              console.log('Array length:', length);
              for (let i = 0; i < length; i++) {
                const value = rawData[i];
                console.log(`Index ${i}:`, value?.toString() || value, 'Type:', typeof value);
              }
            }

            // Also check for named properties
            if (rawData && typeof rawData === 'object') {
              console.log('Named properties:');
              ['name', 'inceptAddress', 'registeredTime', 'powerUPTotalToken', 'powerUPActiveTotalToken', 'countDirectIncept', 'TotalTeamUnderIncept'].forEach(prop => {
                if (rawData[prop] !== undefined) {
                  console.log(`${prop}:`, rawData[prop]?.toString() || rawData[prop]);
                }
              });
            }

            // Extract values - try both array indices and named properties
            // Priority: named properties first (ethers.js tuple), then array indices
            // Use safe access to prevent RangeError
            let registeredTime = BigInt(0);
            let index3Wei = BigInt(0);
            let index4Wei = BigInt(0);
            let index6Wei = BigInt(0);
            let index7Wei = BigInt(0);
            let categoryRaw = BigInt(0);

            // Safe value extraction helper
            const safeGetValue = (obj: unknown, prop: string | undefined, arr: unknown[], index: number, fallback: bigint | number = BigInt(0)) => {
              try {
                // Validate index
                if (index < 0 || index > 100 || !Number.isInteger(index)) {
                  return fallback;
                }

                // Try named property first (if prop is provided)
                if (prop && obj && typeof obj === 'object' && obj !== null) {
                  try {
                    const objRecord = obj as Record<string, unknown>;
                    if (prop in objRecord && objRecord[prop] !== undefined && objRecord[prop] !== null) {
                      return objRecord[prop];
                    }
                  } catch {
                    // Ignore property access errors
                  }
                }

                // Try array index if array is long enough
                if (Array.isArray(arr) && arr.length > index && index >= 0) {
                  try {
                    if (arr[index] !== undefined && arr[index] !== null) {
                      return arr[index];
                    }
                  } catch {
                    // Ignore array access errors
                  }
                }

                // Try numeric property access only if we know the object has a length property
                if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
                  try {
                    // Check if it's an ethers.js tuple with length property
                    const objWithLength = obj as { length?: number;[key: number]: unknown };
                    if (typeof objWithLength.length === 'number' && index >= 0 && index < objWithLength.length) {
                      // Use Object.getOwnPropertyDescriptor to safely check if property exists
                      const descriptor = Object.getOwnPropertyDescriptor(obj, index);
                      if (descriptor && descriptor.value !== undefined && descriptor.value !== null) {
                        return descriptor.value;
                      }
                    }
                  } catch {
                    // Ignore property access errors - RangeError can occur here
                  }
                }

                return fallback;
              } catch (e) {
                // Catch any RangeError or other errors
                if (e instanceof RangeError) {
                  console.warn(`RangeError accessing ${prop || 'index'} at index ${index}, using fallback`);
                } else {
                  console.error(`Error accessing ${prop || 'index'} at index ${index}:`, e);
                }
                return fallback;
              }
            };

            try {
              registeredTime = safeGetValue(rawData, 'registeredTime', dataArray, 2);
              index3Wei = safeGetValue(rawData, 'countDirectIncept', dataArray, 5);
              index4Wei = safeGetValue(rawData, 'TotalTeamUnderIncept', dataArray, 6);
              index6Wei = safeGetValue(rawData, 'powerUPTotalToken', dataArray, 3);
              index7Wei = safeGetValue(rawData, 'powerUPActiveTotalToken', dataArray, 4);
              categoryRaw = safeGetValue(rawData, undefined, dataArray, 8);
            } catch (e) {
              console.error('Error during value extraction:', e);
              // Values already set to BigInt(0) by default
            }

            console.log('=== Extracted Raw Values ===');
            console.log('registeredTime:', registeredTime?.toString() || registeredTime);
            console.log('countDirectIncept (index3Wei):', index3Wei?.toString() || index3Wei);
            console.log('TotalTeamUnderIncept (index4Wei):', index4Wei?.toString() || index4Wei);
            console.log('powerUPTotalToken (index6Wei):', index6Wei?.toString() || index6Wei);
            console.log('powerUPActiveTotalToken (index7Wei):', index7Wei?.toString() || index7Wei);
            console.log('category:', categoryRaw?.toString() || categoryRaw);

            // Convert from wei to readable format (assuming 18 decimals) with error handling
            try {
              // Safe BigInt to Number conversion helper
              const safeBigIntToNumber = (bigIntValue: bigint | number | string | null | undefined): number => {
                try {
                  if (!bigIntValue && bigIntValue !== 0 && bigIntValue !== BigInt(0)) return 0;

                  // Handle BigInt type
                  if (typeof bigIntValue === 'bigint') {
                    // Check if it's within safe integer range
                    if (bigIntValue > Number.MAX_SAFE_INTEGER || bigIntValue < Number.MIN_SAFE_INTEGER) {
                      // For very large BigInt, use string conversion with parseFloat
                      const str = bigIntValue.toString();
                      const num = parseFloat(str);
                      if (isNaN(num) || !isFinite(num)) {
                        return 0;
                      }
                      return num;
                    }
                    // Safe to convert directly
                    return Number(bigIntValue);
                  }

                  // Handle string or number
                  const str = String(bigIntValue);
                  if (!str || str === '0' || str === '') return 0;

                  // Use parseFloat for safer conversion
                  const num = parseFloat(str);
                  if (isNaN(num) || !isFinite(num)) {
                    return 0;
                  }

                  // Check if number is within safe range
                  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
                    console.warn('Number out of safe range, using 0');
                    return 0;
                  }

                  return num;
                } catch (e) {
                  console.error('Error converting BigInt to Number:', e, 'Value:', bigIntValue);
                  return 0;
                }
              };

              // Convert registeredTime (timestamp) to readable date format
              let index2Value = 'N/A';

              try {
                // Handle BigInt or number safely
                const registeredTimeStr = registeredTime?.toString() || '0';
                let registerTimestamp = 0;

                try {
                  registerTimestamp = safeBigIntToNumber(registeredTime);
                } catch (e) {
                  console.error('Error converting registeredTime:', e);
                  registerTimestamp = 0;
                }

                console.log('=== Processing Register Time ===');
                console.log('registeredTime value:', registeredTime);
                console.log('registeredTime string:', registeredTimeStr);
                console.log('Raw timestamp number:', registerTimestamp);

                if (registerTimestamp > 0 && !isNaN(registerTimestamp) && isFinite(registerTimestamp)) {
                  // Check if timestamp is in seconds or milliseconds
                  // JavaScript Date can handle up to about 8.64e15 milliseconds
                  // Timestamps less than 1e12 are typically in seconds, multiply by 1000
                  let timestamp = registerTimestamp;
                  console.log('Timestamp before conversion check:', timestamp);
                  if (timestamp < 1e12) {
                    timestamp = timestamp * 1000; // Convert seconds to milliseconds
                    console.log('Converted from seconds to milliseconds:', timestamp);
                  } else {
                    console.log('Timestamp already in milliseconds:', timestamp);
                  }

                  // Clamp timestamp to valid Date range
                  const maxTimestamp = 8640000000000000; // Max safe Date value
                  const minTimestamp = -8640000000000000; // Min safe Date value
                  timestamp = Math.max(minTimestamp, Math.min(maxTimestamp, timestamp));

                  console.log('Converted timestamp:', timestamp);
                  const date = new Date(timestamp);
                  console.log('Date object:', date);
                  console.log('Date isValid:', !isNaN(date.getTime()));

                  if (!isNaN(date.getTime())) {
                    index2Value = date.toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    console.log('✅ Formatted date:', index2Value);
                  } else {
                    console.warn('❌ Invalid date from timestamp:', timestamp);
                  }
                } else {
                  console.warn('❌ Timestamp is 0 or invalid:', registerTimestamp);
                }
              } catch (e) {
                console.error('Error processing register time:', e);
                index2Value = 'N/A';
              }

              // Convert countDirectIncept (it's a count, not in wei)
              let index3Value = 0;
              try {
                // const index3WeiStr = index3Wei?.toString() || '0'; // Unused variable
                index3Value = safeBigIntToNumber(index3Wei) || 0;
              } catch (e) {
                console.error('Error converting index3Wei:', e);
                index3Value = 0;
              }

              // Convert TotalTeamUnderIncept (it's a count, not in wei)
              let index4Value = 0;
              try {
                index4Value = safeBigIntToNumber(index4Wei) || 0;
                console.log('TotalTeamUnderIncept converted:', index4Value);
              } catch (e) {
                console.error('Error converting index4Wei:', e);
                index4Value = 0;
              }

              // Convert other values
              let index6Value = 0;
              let index7Value = 0;
              try {
                if (index6Wei && index6Wei.toString() !== '0') {
                  try {
                    index6Value = parseFloat(ethers.formatEther(index6Wei));
                    if (!isFinite(index6Value)) {
                      index6Value = 0;
                    }
                  } catch (formatError) {
                    console.error('Error using formatEther for index6Wei:', formatError);
                    index6Value = safeBigIntToNumber(index6Wei) / 1e18;
                  }
                }
                if (index7Wei && index7Wei.toString() !== '0') {
                  try {
                    index7Value = parseFloat(ethers.formatEther(index7Wei));
                    if (!isFinite(index7Value)) {
                      index7Value = 0;
                    }
                  } catch (formatError) {
                    console.error('Error using formatEther for index7Wei:', formatError);
                    index7Value = safeBigIntToNumber(index7Wei) / 1e18;
                  }
                }
              } catch (e) {
                console.error('Error converting index6Wei or index7Wei:', e);
              }

              console.log('=== Processed Values ===');
              console.log('Register Time (index2Value):', index2Value);
              console.log('Total Direct Incept (index3Value):', index3Value);
              console.log('Total Team of Incept (index4Value):', index4Value);
              console.log('powerUPTotalToken (index6Value):', index6Value);
              console.log('powerUPActiveTotalToken (index7Value):', index7Value);

              // Extract category
              let category = 0;
              try {
                category = safeBigIntToNumber(categoryRaw);
                if (category > 1000) {
                  category = Math.floor(category / 1e18);
                }
              } catch (e) {
                console.error('Error extracting category:', e);
                category = 0;
              }

              // Set all values
              setIndex2Value(index2Value);
              setIndex3Value(index3Value.toFixed(0)); // Count - no decimals
              setIndex4Value(index4Value.toFixed(0)); // Count - no decimals (changed from .toFixed(2))
              setIndex6Value(index6Value.toFixed(2));
              setIndex7Value(index7Value.toFixed(2));
              setUserCategory(category);

              console.log('=== Values Set in State ===');
              console.log('index2Value (Register Time):', index2Value);
              console.log('index3Value (Total Direct Incept):', index3Value.toFixed(0));
              console.log('index4Value (Total Team of Incept):', index4Value.toFixed(0));

              // If user has a category (1-4), hide the form by default
              if (category > 0 && category <= 4) {
                setShowStakingForm(false);
              } else {
                setShowStakingForm(true); // Show form if no category
              }
            } catch (parseError) {
              console.error('Error parsing user data values:', parseError);
              // Set default values on parse error
              setIndex2Value('N/A');
              setIndex3Value('0');
              setIndex4Value('0.00');
              setIndex6Value('0.00');
              setIndex7Value('0.00');
              setUserCategory(0);
              setShowStakingForm(true);
            }
          } else {
            console.error('Error fetching user details:', result.error);
            // Reset all values on error
            setIndex2Value('N/A');
            setIndex3Value('0');
            setIndex4Value('0.00');
            setIndex6Value('0.00');
            setIndex7Value('0.00');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Reset all values on error
          setIndex2Value('N/A');
          setIndex3Value('0');
          setIndex4Value('0.00');
          setIndex6Value('0.00');
          setIndex7Value('0.00');
        } finally {
          setIsLoadingStakedAmount(false);
        }
      } else {
        // Reset all values when not connected
        setIndex2Value('N/A');
        setIndex3Value('0');
        setIndex4Value('0.00');
        setIndex6Value('0.00');
        setIndex7Value('0.00');
      }
    };

    fetchAllUserData();
  }, [isConnected, address, walletClient]);

  // const periods = [
  //   { days: '7', label: '7 DAYS' },
  //   { days: '14', label: '14 DAYS' },
  //   { days: '30', label: '30 DAYS' },
  //   { days: '60', label: '60 DAYS' },
  // ] as const;

  // Handle stake function
  const handleStake = async () => {
    if (!isConnected || !walletClient) {
      setSuccessMessage('Please connect your wallet first');
      setShowSuccessNotification(true);
      return;
    }

    if (!amountTop || parseFloat(amountTop) <= 0) {
      setSuccessMessage('Please enter a valid amount to stake');
      setShowSuccessNotification(true);
      return;
    }

    // Check if user is registered before allowing staking
    try {
      const provider = new BrowserProvider(walletClient);
      const userDetailsResult = await getUserDetails(provider, address!);

      if (userDetailsResult.success && userDetailsResult.data) {
        const inviterAddress = userDetailsResult.data[0]; // First index is inviter address

        // Check if user is NOT registered (inviter is zero address)
        if (!inviterAddress || inviterAddress === '0x0000000000000000000000000000000000000000') {
          setSuccessMessage('⚠️ You must register first! Go to the Register page to join the community before Power Up.');
          setShowSuccessNotification(true);

          // Show a link to register page
          setTimeout(() => {
            if (confirm('You need to register first. Would you like to go to the registration page now?')) {
              window.location.href = '/incept-now';
            }
          }, 1000);
          return;
        }
      } else {
        // If getUserDetails fails, user is likely not registered
        setSuccessMessage('⚠️ You must register first! Go to the Register page to join the community before Power Up.');
        setShowSuccessNotification(true);

        setTimeout(() => {
          if (confirm('You need to Quick Incept Now first. Would you like to go to the registration page now?')) {
            window.location.href = '/incept-now';
          }
        }, 1000);
        return;
      }
    } catch (regCheckError) {
      console.log('Registration check:', regCheckError);
      // If check fails, user is likely not registered
      setSuccessMessage('⚠️ Unable to verify registration. Please Quick Incept Now first on the Quick Incept Now page.');
      setShowSuccessNotification(true);
      return;
    }

    // Token balance will be checked using getTokenBalance function in the main flow

    setIsStaking(true);

    try {
      // Convert wallet client to ethers signer
      const provider = new BrowserProvider(walletClient);
      const signer = await provider.getSigner();

      // Only check user's token balance and gas - no contract checks needed

      // Step 0.1: Check user's ZYLO token balance using getTokenBalance
      const tokenBalanceResult = await getTokenBalance(provider, address!);
      if (!tokenBalanceResult.success) {
        // Handle specific error types with user-friendly messages
        let errorMessage = tokenBalanceResult.error || 'Unknown error occurred';
        if (tokenBalanceResult.error?.includes('missing revert data')) {
          errorMessage = "Unable to check token balance. Please check your network connection and try again.";
        } else if (tokenBalanceResult.error?.includes('contract may not be deployed')) {
          errorMessage = "Token contract not found. Please check your network settings.";
        } else if (tokenBalanceResult.error?.includes('Token contract not found on current network')) {
          errorMessage = "Token contract not available on current network. Please switch to the correct network (BSC Mainnet) and try again.";
        } else if (tokenBalanceResult.error?.includes('RPC issue')) {
          errorMessage = "Network connection issue. Please try again in a moment.";
        } else if (tokenBalanceResult.error?.includes('network')) {
          errorMessage = "Network connectivity issue. Please check your network connection and try again.";
        }

        // Show warning but allow user to continue
        setSuccessMessage(`Warning: ${errorMessage}. Proceeding with staking attempt...`);
        setShowSuccessNotification(true);

        // Set a default balance for continuation
        console.warn('Balance check failed, proceeding with assumed balance of 0');
      }

      const currentTokenBalance = tokenBalanceResult.success
        ? (tokenBalanceResult.balance ? parseFloat(tokenBalanceResult.balance) : 0)
        : 0; // Use 0 if balance check failed
      const requiredAmount = parseFloat(amountTop);

      if (currentTokenBalance <= 0) {
        setSuccessMessage('You have no ZYLO tokens to Power Up. Please acquire some ZYLO tokens first.');
        setShowSuccessNotification(true);
        return;
      }

      if (requiredAmount > currentTokenBalance) {
        setSuccessMessage(`Insufficient ZYLO token balance. You have ${currentTokenBalance.toFixed(2)} ZYLO, trying to stake ${requiredAmount} ZYLO`);
        setShowSuccessNotification(true);
        return;
      }

      // Unit-wise validation based on selected zone unit OR current total staked amount
      // If user clicked on a zone card, validate based on that unit's range
      // Otherwise, determine unit based on total staked amount
      const totalStakedAmount = parseFloat(index6Value || '0'); // Current total staked in ZYLO
      const totalStakedInWei = ethers.parseEther(totalStakedAmount.toString()); // Convert to wei

      // Convert amount to wei for comparison
      const amountInWei = ethers.parseEther(amountTop);
      const stakeAmount = parseFloat(amountTop); // Stake amount in ZYLO

      let unitName = '';
      let minStakeAmount = 0;
      let maxStakeAmount: number | typeof Infinity = 0;
      let isValidStake = false;
      let errorMessage = '';

      // Check if a zone unit is selected (user clicked on a zone card)
      // If yes, use that unit's range for validation
      if (selectedZoneUnit !== null) {
        // User clicked on a specific unit card - validate based on that unit
        if (selectedZoneUnit === 0) {
          // Spark Up - can stake 0 to 10,000 ZYLO per stake
          unitName = 'Spark Up';
          minStakeAmount = 0;
          maxStakeAmount = 10000;
        } else if (selectedZoneUnit === 1) {
          // Flicker Roar - can stake 10,001 to 50,000 ZYLO per stake
          unitName = 'Flicker Roar';
          minStakeAmount = 10001;
          maxStakeAmount = 50000;
        } else if (selectedZoneUnit === 2) {
          // AI Overrider - can stake 50,001 to 100,000 ZYLO per stake
          unitName = 'AI Overrider';
          minStakeAmount = 50001;
          maxStakeAmount = 100000;
        } else if (selectedZoneUnit === 3) {
          // Zylo Apex - can stake 100,001+ ZYLO per stake (no max)
          unitName = 'Zylo Apex';
          minStakeAmount = 100001;
          maxStakeAmount = Infinity;
        }
      } else {
        // No zone card selected - determine unit based on total staked amount
        if (totalStakedInWei >= BigInt(0) && totalStakedInWei <= ethers.parseEther('10000')) {
          // Unit 0: Spark Up - can stake 0 to 10,000 ZYLO per stake (infinite times)
          unitName = 'Spark Up';
          minStakeAmount = 0;
          maxStakeAmount = 10000;
        } else if (totalStakedInWei >= ethers.parseEther('10001') && totalStakedInWei <= ethers.parseEther('50000')) {
          // Unit 1: Flicker Roar - can stake 10,001 to 50,000 ZYLO per stake (infinite times)
          unitName = 'Flicker Roar';
          minStakeAmount = 10001;
          maxStakeAmount = 50000;
        } else if (totalStakedInWei >= ethers.parseEther('50001') && totalStakedInWei <= ethers.parseEther('100000')) {
          // Unit 2: AI Overrider - can stake 50,001 to 100,000 ZYLO per stake (infinite times)
          unitName = 'AI Overrider';
          minStakeAmount = 50001;
          maxStakeAmount = 100000;
        } else if (totalStakedInWei >= ethers.parseEther('100001')) {
          // Unit 3: Zylo Apex - can stake 100,001+ ZYLO per stake (infinite times, no max)
          unitName = 'Zylo Apex';
          minStakeAmount = 100001;
          maxStakeAmount = Infinity;
        } else {
          // Default: If total is 0 or invalid, use Spark Up limits
          unitName = 'Spark Up';
          minStakeAmount = 0;
          maxStakeAmount = 10000;
        }
      }

      // Validate that stake amount falls within the unit's range
      if (stakeAmount < minStakeAmount) {
        errorMessage = `Minimum staking amount for ${unitName} is ${minStakeAmount.toLocaleString()}`;
        isValidStake = false;
      } else if (maxStakeAmount !== Infinity && stakeAmount > maxStakeAmount) {
        errorMessage = `Maximum staking amount for ${unitName} is ${maxStakeAmount.toLocaleString()}`;
        isValidStake = false;
      } else {
        isValidStake = true;
        // Show info notification about the unit
        console.log(`Valid stake for ${unitName}: ${stakeAmount} ZYLO (Range: ${minStakeAmount.toLocaleString()} - ${maxStakeAmount === Infinity ? 'Infinity' : maxStakeAmount.toLocaleString()} ZYLO)`);
      }

      // Validate the stake
      if (!isValidStake) {
        setSuccessMessage(errorMessage);
        setShowSuccessNotification(true);
        return;
      }

      // Show unit info notification before proceeding
      const unitInfoMessage = `${unitName} Unit: Staking ${stakeAmount.toLocaleString()} ZYLO (Range: ${minStakeAmount.toLocaleString()} - ${maxStakeAmount === Infinity ? 'Infinity' : maxStakeAmount.toLocaleString()} ZYLO)`;
      console.log(unitInfoMessage);

      // Additional validation: Check if stake amount is positive
      if (stakeAmount <= 0) {
        setSuccessMessage('Please enter a valid amount to stake');
        setShowSuccessNotification(true);
        return;
      }

      // Amount already converted to wei above for validation
      console.log('Amount in wei:', amountInWei.toString());
      console.log('Unit validation passed:', { unitName, stakeAmount, requiredAmount, totalStakedAmount });

      console.log('Token balance check passed:', currentTokenBalance, 'ZYLO');

      // Check if contract addresses are correct
      console.log('Contract addresses:', {
        ZillowToken_ADDRESS: "0x5334f96cb5d91dFE29FBAA9E6832efd8C01cDA91",
        ZyloPowerUp_ADDRESS: ZyloPowerUp_ADDRESS
      });

      // Step 0.5: Check user's BNB balance for gas (optional, can fail due to RPC issues)
      try {
        const userBalance = await provider.getBalance(address!);
        const userBalanceInBNB = parseFloat(ethers.formatEther(userBalance));
        const minGasBalance = 0.005; // Minimum 0.005 BNB for gas

        if (userBalanceInBNB < minGasBalance) {
          console.warn(`Low BNB balance for gas: ${userBalanceInBNB.toFixed(4)} BNB`);
          // Don't block the transaction - MetaMask will warn if insufficient
        } else {
          console.log('User BNB balance check passed:', userBalanceInBNB, 'BNB');
        }
      } catch (bnbCheckError) {
        console.warn('Could not check BNB balance (RPC issue), proceeding anyway:', bnbCheckError);
        // Continue with staking - MetaMask will handle gas issues
      }

      // Step 1: Check if tokens are already approved
      // Validate addresses before checking allowance
      if (!address) {
        setSuccessMessage('Wallet address is required');
        setShowSuccessNotification(true);
        return;
      }

      if (!ZyloPowerUp_ADDRESS) {
        setSuccessMessage('Contract address is not configured');
        setShowSuccessNotification(true);
        return;
      }

      const allowanceResult = await getAllowance(provider, address, ZyloPowerUp_ADDRESS);

      if (!allowanceResult.success) {
        setSuccessMessage(`Failed to check allowance: ${allowanceResult.error}`);
        setShowSuccessNotification(true);
        return;
      }

      const currentAllowance = parseFloat(allowanceResult.allowance || '0');

      console.log('Allowance check:', {
        currentAllowance,
        requiredAmount,
        isApproved: currentAllowance >= requiredAmount
      });

      if (currentAllowance >= requiredAmount) {
        // Tokens already approved, skip approval step
        setSuccessMessage('Tokens already approved! Proceeding to Power Up...');
        setShowSuccessNotification(true);
      } else {
        // Need to approve tokens
        setSuccessMessage('Please approve the token transaction in your wallet...');
        setShowSuccessNotification(true);

        console.log('Approving tokens:', {
          amount: amountTop,
          spender: ZyloPowerUp_ADDRESS,
          user: address
        });

        const approveResult = await approveTokens(signer, ZyloPowerUp_ADDRESS, amountTop);

        console.log('Approval result:', approveResult);

        if (!approveResult.success) {
          // Check if user rejected the transaction
          if ('userRejected' in approveResult && approveResult.userRejected) {
            // User cancelled - don't show error, just return silently
            return;
          }
          // Don't show error message, just return silently
          return;
        }

        setShowSuccessNotification(true);
      }

      // Wait a moment for approval to be processed
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 3: Call the deposit function
      console.log('Calling deposit function with details:', {
        amount: amountTop,
        amountInWei: amountInWei.toString(),
        contractAddress: ZyloPowerUp_ADDRESS,
        userAddress: address
      });

      const depositResult = await deposit(signer, amountTop);

      console.log('Deposit result:', depositResult);

      if (depositResult.success) {
        // Show success notification
        setSuccessMessage(`Successfully Power Up ${amountTop} ZYLO! You are now part of the network.`);
        setShowSuccessNotification(true);

        // Clear amount
        setAmountTop('0.00');

        // Refresh balance after successful stake
        const balanceResult = await getTokenBalance(provider, address!);
        if (balanceResult.success && balanceResult.balance) {
          setTokenBalance(parseFloat(balanceResult.balance).toFixed(2));
        }

        // Refresh all page data automatically
        console.log('🔄 Refreshing all page data after successful Power Up...');
        await refreshAllPageData();

        // Dispatch event to refresh all components
        window.dispatchEvent(new CustomEvent('powerUpCompleted', {
          detail: {
            timestamp: Date.now(),
            userAddress: address,
            amount: amountTop
          }
        }));
        console.log('🔄 Power Up completed event dispatched - refreshing all components...');

        // After successful stake, show the character view instead of the form
        // Delay slightly to let the data refresh
        setTimeout(() => {
          setShowStakingForm(false);
        }, 1500);
      } else {
        // Check if user rejected the transaction
        if ('userRejected' in depositResult && depositResult.userRejected) {
          // User cancelled - don't show error, just return silently
        } else {
          // Only show error if it's not a user rejection
          if (depositResult.error) {
            setSuccessMessage(`Staking failed: ${depositResult.error}`);
            setShowSuccessNotification(true);
          }
        }
      }
    } catch (error) {
      console.error('Error staking:', error);
      setSuccessMessage(`Staking failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShowSuccessNotification(true);
    } finally {
      setIsStaking(false);
    }
  };

  // Ensure the UI switches to the character tab immediately after a successful stake
  useEffect(() => {
    const onStakingCompleted = () => {
      setShowStakingForm(false);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('stakingCompleted', onStakingCompleted as unknown as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('stakingCompleted', onStakingCompleted as unknown as EventListener);
      }
    };
  }, []);

  /* APY ring math */
  const apy = 10;
  const SIZE = 168;
  const STROKE = 18;
  const R = (SIZE / 2) - (STROKE / 2) - 6;
  const C = 2 * Math.PI * R;
  const dashOffset = C * (1 - selectedPercentage / 100);

  // Dynamic color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage <= 25) return '#ff4444'; // Red for low percentage
    if (percentage <= 50) return '#ffaa00'; // Orange for medium-low
    if (percentage <= 75) return '#ffdd00'; // Yellow for medium-high
    return '#00ff88'; // Green for high percentage
  };

  const progressColor = getProgressColor(selectedPercentage);

  // STRICT CHECK: Only show reward summary cards when explicitly set to true (Units tab only)
  // Power UP tab should NEVER show reward cards - this is the ONLY place reward cards should render
  // Early return for Units tab (showRewardsSection === true)
  // DEBUG: Uncomment to verify condition
  // console.log('ZillowStake render - showRewardsSection:', showRewardsSection);
  
  if (showRewardsSection === true) {
    return (
      <section className="ido-section position-relative pb-5" style={{ paddingTop: '60px' }}>
        {/* Ambient glows + dotted texture */}
        <div className="bg-ambient" aria-hidden="true" />

        <div className="container-fluid mb-5 pb-5">
          {/* Reward Cards Section - Using separate component */}
          <RewardSummaryCards
            claimedSelfReward={claimedSelfReward}
            claimedTeamReward={claimedTeamReward}
            currentSelfReward={currentSelfReward}
            currentTeamReward={currentTeamReward}
            isLoadingRewards={isLoadingRewards}
          />

          {/* Power Up Unit Cards Section - Show all units' power ups */}
          <div className="row mt-5">
            <div className="col-12">
              <PowerUpUnitCards
                onZoneCardClick={(unitIndex: number) => {
                  // Don't change showZoneCards in Units tab, just update selected unit
                  setSelectedZoneUnit(unitIndex);
                }}
                showZoneCards={false}
                selectedZoneUnit={selectedZoneUnit}
              />
            </div>
          </div>

        </div>
      </section>
    );
  }

  // Show zone cards (initial state - when showZoneCards is true and showRewardsSection is false)
  if (showZoneCards && !showRewardsSection) {
    return (
      <section className="ido-section position-relative pb-5" style={{ paddingTop: '30px' }}>
        {/* Ambient glows + dotted texture */}
        <div className="bg-ambient" aria-hidden="true" />

        <div className="container-fluid mb-5 pb-5">
          <PowerUpUnitCards
            onZoneCardClick={(unitIndex: number) => {
              if (externalShowZoneCards !== undefined) {
                // If external state is controlled, notify parent
                if (onShowZoneCardsChange) {
                  onShowZoneCardsChange(false);
                }
              } else {
                // Otherwise use internal state
                setInternalShowZoneCards(false);
              }
              setSelectedZoneUnit(unitIndex);
              setShowStakingForm(true);
            }}
            onPowerUpClick={onPowerUpClick}
            onUnitsClick={onUnitsClick}
            showZoneCards={true}
            selectedZoneUnit={null}
          />
        </div>
      </section>
    );
  }

  // Power UP Tab - NEVER show reward cards here
  // This return statement is ONLY for Power UP tab (showRewardsSection === false)
  // Reward cards are ONLY shown in the if block above (showRewardsSection === true)
  // At this point, showRewardsSection MUST be false, so reward cards will NEVER render
  
  return (
    <section className="ido-section position-relative pb-5" style={{ paddingTop: '60px' }}>
      {/* Ambient glows + dotted texture */}
      <div className="bg-ambient" aria-hidden="true" />

      {/* Back to Units Button and Unit Name Display */}
      <div className="container-fluid mb-5" style={{ position: 'relative' }}>
        <div className="d-flex align-items-center">
          <button
            onClick={() => {
              if (externalShowZoneCards !== undefined) {
                // If external state is controlled, notify parent
                if (onShowZoneCardsChange) {
                  onShowZoneCardsChange(true);
                }
              } else {
                // Otherwise use internal state
                setInternalShowZoneCards(true);
              }
              setSelectedZoneUnit(null);
            }}
            style={{
              background: 'rgba(0, 214, 163, 0.1)',
              border: '2px solid rgba(0, 214, 163, 0.3)',
              color: '#00d6a3',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
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
            ← Back to Units
          </button>

          {/* Unit Name Display - Centered on page */}
          {selectedZoneUnit !== null && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                marginLeft: '-20px',
              }}
            >
              {(() => {
                const unitNames = ['Spark Up', 'Flicker Roar', 'AI Overrider', 'Zylo Apex'];
                const unitColors = ['#FEE739', '#00d6a3', '#FEE739', '#00d6a3'];
                const unitName = unitNames[selectedZoneUnit] || 'Unknown Unit';
                const unitColor = unitColors[selectedZoneUnit] || '#FEE739';

                return (
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${unitColor}15 0%, ${unitColor}05 100%)`,
                      border: `2px solid ${unitColor}40`,
                      borderRadius: '20px',
                      padding: '1.5rem 3rem',
                      boxShadow: `0 8px 32px ${unitColor}20`,
                      backdropFilter: 'blur(10px)',
                      textAlign: 'center',
                      marginTop: '1rem',
                      marginBottom: '3rem',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: unitColor,
                        textShadow: `0 2px 10px ${unitColor}40`,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                        lineHeight: '1.2',
                      }}
                    >
                      {unitName}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      <div className="container-fluid mb-5 pb-5">
        <div className="row g-4 align-items-start">
          {/* ================= TOTAL STAKED CARDS ROW ================= */}
          <div className="col-lg-6 mb-4">
            <div className="glass h-auto position-relative">
              <div className="card-inner">
                {/* Frosted "Total Staked" chip - smaller size */}
                <div className="total-chip total-chip-right mb-3 coin-anchor">
                  <span className="total-label text-nowrap" style={{ color: '#FEE739' }}>TOTAL SELF POWER UP</span>
                  <span className="total-value">
                    {isLoadingStakedAmount ? 'Loading...' : `${index6Value} `}
                    <span style={{ color: '#FEE739' }}>ZYLO</span>
                  </span>

                  {/* Coin (anchored to the chip, angled, with halo & shadow) */}
                  <span className="coin-wrap" aria-hidden="true">
                    <i className="coin-halo" />
                    <i className="coin-shadow" />
                    <CoinSVG />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="glass h-auto position-relative">
              <div className="card-inner">
                {/* Frosted "Total Staked" chip - smaller size */}
                <div className="total-chip total-chip-right mb-3 coin-anchor">
                  <span className="total-label text-nowrap" style={{ color: '#FEE739' }}>TOTAL SELF ACTIVE POWER UP</span>
                  <span className="total-value">
                    {isLoadingStakedAmount ? 'Loading...' : `${index7Value} `}
                    <span style={{ color: '#FEE739' }}>ZYLO</span>
                  </span>

                  {/* Coin (anchored to the chip, angled, with halo & shadow) */}
                  <span className="coin-wrap-right" aria-hidden="true">
                    <i className="coin-halo" />
                    <i className="coin-shadow" />
                    <CoinSVG />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= LEFT ================= */}
          <div className="col-lg-6">
            <div className="glass h-auto position-relative">
              <div className="card-inner">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="card-title mb-0 text-nowrap" style={{ color: '#FEE739' }}>POWER UP ZYLO</h3>

                  {/* Toggle Arrow Button - Only show if user has a character */}
                  {userCategory > 0 && userCategory <= 4 && (
                    <button
                      onClick={() => setShowStakingForm(!showStakingForm)}
                      className="btn btn-link p-0"
                      style={{
                        color: '#FEE739',
                        fontSize: '1.8rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title={showStakingForm ? 'View Character' : 'View Staking Form'}
                    >
                      {showStakingForm ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  )}
                </div>

                {/* Show collapsed view if user has character (category > 0) and form is hidden */}
                {userCategory > 0 && userCategory <= 4 && !showStakingForm ? (
                  <div className="staking-tier-card">
                    {/* Decorative elements */}
                    <div className="tier-decoration tier-decoration-1"></div>
                    <div className="tier-decoration tier-decoration-2"></div>

                    <div className="staking-tier-card-inner">
                      {/* Left Side: Tier Info + Button */}
                      <div className="staking-tier-info">
                        <div className="tier-badge-wrapper">
                          <div className="tier-badge">Zylo Unit</div>
                        </div>

                        <h2 className="tier-name">
                          {userCategory === 1 && '✨ Spark Up'}
                          {userCategory === 2 && '🐯 Flicker Roar'}
                          {userCategory === 3 && '🤖 AI Override'}
                          {userCategory === 4 && '🌌 Zylo Apex'}
                        </h2>

                        <button
                          type="button"
                          className="stake-action-btn"
                          onClick={() => setShowStakingForm(true)}
                        >
                          Power Up
                        </button>
                      </div>

                      {/* Right Side: Character Preview with Glow Effect */}
                      <div className="staking-character-preview">
                        <div className="character-glow-effect"></div>
                        <div style={{
                          position: 'relative',
                          zIndex: 2,
                          transform: 'scale(1.5)'
                        }}>
                          <AnimatedCharacters compactMode={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* metrics + ring */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 stake-head">
                      <div className="flex-grow-1">
                        <div className="m-label text-nowrap" style={{ color: '#FEE739' }}>Balance</div>
                        <div className="m-value large text-nowrap">
                          {isLoadingBalance ? (
                            <span className="text-warning">Loading...</span>
                          ) : (
                            <>
                              {tokenBalance} <span style={{ color: '#FEE739' }}>ZYLO</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="ring-col">
                        <div
                          className="apy-svg"
                          role="img"
                          aria-label={`APY ${apy}%`}
                          style={{ cursor: 'pointer', position: 'relative' }}
                        >

                          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                            <defs>
                              <filter id="ringShadow" x="-40%" y="-40%" width="180%" height="180%">
                                <feDropShadow dx="0" dy="16" stdDeviation="10" floodColor="rgba(0,255,163,0.24)" />
                              </filter>
                            </defs>

                            <circle cx={SIZE / 2} cy={SIZE / 2} r={(SIZE / 2) - 20}
                              fill="none" stroke="rgba(0,255,163,0.20)" strokeWidth="2" />
                            <circle cx={SIZE / 2} cy={SIZE / 2} r={(SIZE / 2) - 30}
                              fill="var(--darker-bg)" stroke="rgba(0,255,163,0.22)" strokeWidth="1" />

                            <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`} filter="url(#ringShadow)">
                              <circle cx={SIZE / 2} cy={SIZE / 2} r={R}
                                fill="none" stroke="rgba(0,255,163,0.16)" strokeWidth={STROKE} />
                              <circle cx={SIZE / 2} cy={SIZE / 2} r={R}
                                fill="none" stroke={progressColor} strokeWidth={STROKE}
                                strokeLinecap="round" strokeDasharray={C} strokeDashoffset={dashOffset} />
                            </g>

                          </svg>
                          <div className="apy-center">{selectedPercentage}%</div>

                          {/* Clickable overlay */}
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              cursor: 'pointer',
                              zIndex: 10
                            }}
                            onClick={handleCircleClick}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 position-relative">
                      <input
                        className="z-input w-100"
                        type="text"
                        inputMode="decimal"
                        value={amountTop}
                        onChange={(e) => setAmountTop(e.target.value)}
                        placeholder="0.00"
                      />
                      <button
                        type="button"
                        className="max-chip"
                        onClick={() => setAmountTop(tokenBalance)}
                        disabled={!isConnected || isLoadingBalance}
                      >
                        MAX
                      </button>
                    </div>

                    {/* input 2 + CTA */}
                    <div className="d-flex gap-3 align-items-center stake-row">
                      <button
                        type="button"
                        className="zbtn cta w-100"
                        onClick={handleStake}
                        disabled={isStaking || !isConnected}
                      >
                        {isStaking ? 'Power Up...' : 'Power Up Now'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="col-lg-6">
            <ZillowStakingCards
              index2Value={index2Value}
              index3Value={index3Value}
              index4Value={index4Value}
              isLoading={isLoadingStakedAmount}
            />
          </div>
          {/* /RIGHT */}
        </div>

        {/* Power Up Unit Cards Section - Show selected unit's power ups */}
        {/* <div className="row mt-5">
          <div className="col-12">
            <PowerUpUnitCards
              onZoneCardClick={(unitIndex: number) => {
                setSelectedZoneUnit(unitIndex);
              }}
              showZoneCards={false}
              selectedZoneUnit={selectedZoneUnit}
            />
          </div>
        </div> */}
      </div>

      {/* Success Notification */}
      {
        showSuccessNotification && (
          <div className="success-notification">
            <div className="success-notification-content">
              <div className="success-icon">✅</div>
              <div className="success-text">{successMessage}</div>
              <button
                className="success-close-btn"
                onClick={() => {
                  setShowSuccessNotification(false);
                  setSuccessMessage('');
                }}
              >
                ×
              </button>
            </div>
          </div>
        )
      }
    </section>
  );
};

export default ZillowStake;
