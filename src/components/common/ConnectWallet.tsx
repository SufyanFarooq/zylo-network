'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - AppKit networks may have different exports
import { bscTestnet, bsc } from '@reown/appkit/networks';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 600);

    // Check on mount
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

export default function ConnectWalletButton() {
  const [mounted, setMounted] = useState(false);
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isMobile = useIsMobile();

  // Ensure component only renders dynamic content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = async () => {
    console.log('Connect wallet button clicked');
    console.log('isConnected:', isConnected);
    console.log('open function available:', !!open);

    try {
      if (isConnected) {
        console.log('Opening account view...');
        await open({ view: "Account" });
      } else {
        console.log('Opening connect view...');
        await open({ view: "Connect" });
      }
    } catch (error) {
      console.error('Error opening wallet modal:', error);
    }
  };

  // Render static content during SSR and initial client render to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="d-flex gap-2 align-items-center">
        <button onClick={handleClick} className="btn btn-connect-wallet">
          <MdKeyboardDoubleArrowDown size={20} />
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex gap-2 align-items-center">
      <button onClick={handleClick} className="btn btn-connect-wallet">
        <MdKeyboardDoubleArrowDown size={20} />
        {isConnected
          ? (chainId !== bscTestnet.id && chainId !== bsc.id)
            ? isMobile
              ? 'Wrong'
              : 'Wrong Network'
            : isMobile
              ? `${address?.slice(0, 3)}...${address?.slice(-2)}`
              : `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : isMobile
            ? 'Connect'
            : 'Connect Wallet'
        }
      </button>

      {/* {isConnected && (
        <button onClick={handleDisconnect} className="btn btn-disconnect-wallet">
          <MdLogout size={20} />
          {isMobile ? 'Disconnect' : 'Disconnect'}
        </button>
      )} */}
    </div>
  );
}
