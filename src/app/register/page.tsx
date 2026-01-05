'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { FaCircle } from 'react-icons/fa';
import Image from 'next/image';
import { connectWallet, registerUser, checkUserRegistration, refreshUserRegistrationStatus, addPartnerAccount, getAllPartnerAccounts } from '@/blockchain/instances/ZyloPowerUp';
import { useAccount, useWalletClient } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { useSearchParams } from 'next/navigation';
import LevelTeamDetailsTable from './LevelTeamDetailsTable';
import '../home.css';
import './register.css';

const RegisterPage: React.FC = () => {
    const [referralAddress, setReferralAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success', 'error', 'warning'
    const [referralLink, setReferralLink] = useState('');
    const [userContractAddress] = useState('');
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [messageFadeOut, setMessageFadeOut] = useState(false);
    const [showWalletMessage, setShowWalletMessage] = useState(true);
    const [walletMessageFadeOut, setWalletMessageFadeOut] = useState(false);
    const [isReferralFromURL, setIsReferralFromURL] = useState(false);
    const [isCheckingReferral, setIsCheckingReferral] = useState(true);
    const [showAddPartnerSection, setShowAddPartnerSection] = useState(false);
    const [partnerAddresses, setPartnerAddresses] = useState<string[]>(['']);
    const [partnerPercentages, setPartnerPercentages] = useState<string[]>(['0']);
    const [isAddingPartners, setIsAddingPartners] = useState(false);
    const [showPartnerAccountsModal, setShowPartnerAccountsModal] = useState(false);
    const [partnerAccountsList, setPartnerAccountsList] = useState<Array<{ address: string, percentage: number }>>([]);
    const [isLoadingPartners, setIsLoadingPartners] = useState(false);

    // Wagmi hooks
    const { address, isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();
    const { open } = useAppKit();
    const searchParams = useSearchParams();

    // Auto-refresh contract address function

    // Immediate check for referral address on component mount
    useEffect(() => {
        const checkForReferralAddress = () => {
            // Check URL search params first
            const urlParams = new URLSearchParams(window.location.search);
            const refFromQuery = urlParams.get('ref');

            // Check pathname as fallback
            const currentPath = window.location.pathname;
            const pathMatch = currentPath.match(/^\/register\/(0x[a-fA-F0-9]{40})$/);

            let referralAddress = null;

            if (refFromQuery && refFromQuery.length === 42 && refFromQuery.startsWith('0x')) {
                referralAddress = refFromQuery;
                console.log('Found referral address in query params:', referralAddress);
            } else if (pathMatch) {
                referralAddress = pathMatch[1];
                console.log('Found referral address in path:', referralAddress);
            }

            if (referralAddress) {
                console.log('Setting referral address immediately:', referralAddress);
                setReferralAddress(referralAddress);
                setIsReferralFromURL(true);
            }

            // Mark checking as complete
            setIsCheckingReferral(false);
        };

        // Run immediately
        checkForReferralAddress();

        // Run multiple times to catch any timing issues
        const timeoutId1 = setTimeout(checkForReferralAddress, 100);
        const timeoutId2 = setTimeout(checkForReferralAddress, 300);
        const timeoutId3 = setTimeout(checkForReferralAddress, 500);

        return () => {
            clearTimeout(timeoutId1);
            clearTimeout(timeoutId2);
            clearTimeout(timeoutId3);
        };
    }, []); // Run only once on mount

    // Handle referral address from URL parameters
    useEffect(() => {
        const refAddress = searchParams.get('ref');
        console.log('URL search params:', searchParams.toString());
        console.log('Ref address from URL:', refAddress);
        console.log('Current URL:', window.location.href);

        if (refAddress && refAddress.length === 42 && refAddress.startsWith('0x')) {
            console.log('Setting referral address from query param:', refAddress);
            setReferralAddress(refAddress);
            setIsReferralFromURL(true);
        } else {
            // Check if we're on a direct referral URL (fallback)
            const currentPath = window.location.pathname;
            console.log('Current path:', currentPath);

            // Check if path matches /register/[address] pattern
            const pathMatch = currentPath.match(/^\/register\/(0x[a-fA-F0-9]{40})$/);
            if (pathMatch) {
                const addressFromPath = pathMatch[1];
                console.log('Found address in path:', addressFromPath);
                setReferralAddress(addressFromPath);
                setIsReferralFromURL(true);
            }
        }
    }, [searchParams]);

    // Additional useEffect to handle URL changes
    useEffect(() => {
        const handleUrlChange = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const refAddress = urlParams.get('ref');
            console.log('URL change detected, ref address:', refAddress);

            if (refAddress && refAddress.length === 42 && refAddress.startsWith('0x')) {
                console.log('Setting referral address on URL change:', refAddress);
                setReferralAddress(refAddress);
                setIsReferralFromURL(true);
            }
        };

        // Check immediately
        handleUrlChange();

        // Listen for URL changes
        window.addEventListener('popstate', handleUrlChange);

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
        };
    }, []);

    // Reset UI when wallet disconnects
    useEffect(() => {
        if (!isConnected) {
            console.log('Wallet disconnected - resetting UI');
            // Reset all states when wallet disconnects
            setMessage('');
            setMessageType('');
            setReferralLink('');
            setIsAlreadyRegistered(false);
            setMessageFadeOut(false);
            setShowWalletMessage(true);
            setWalletMessageFadeOut(false);
            setCopySuccess(false);
            setReferralAddress(''); // Clear the referral address input
            setIsReferralFromURL(false);
            setIsCheckingReferral(false);
            setShowAddPartnerSection(false);
            setPartnerAddresses(['']);
            setPartnerPercentages(['0']);
        }
    }, [isConnected]);

    // Reset UI when address changes (even if wallet is still connected)
    useEffect(() => {
        if (isConnected && address) {
            console.log('Address changed to:', address, '- resetting UI');
            // Reset all states when address changes
            setMessage('');
            setMessageType('');
            setReferralLink('');
            setIsAlreadyRegistered(false);
            setMessageFadeOut(false);
            setWalletMessageFadeOut(false);
            setCopySuccess(false);
            setReferralAddress('');
            setIsReferralFromURL(false);
            setShowAddPartnerSection(false);
            setPartnerAddresses(['']);
            setPartnerPercentages(['0']);
        }
    }, [address, isConnected]);

    // Auto-check user registration status when wallet connects
    useEffect(() => {
        const checkUserRegistrationStatus = async () => {
            if (isConnected && address && walletClient) {
                console.log('Checking registration for new address:', address);
                // Reset all relevant states to ensure a clean UI before checking registration
                setMessage('');
                setMessageType('');
                setReferralLink('');
                setIsAlreadyRegistered(false);
                setMessageFadeOut(false);
                setWalletMessageFadeOut(false);
                setCopySuccess(false);
                setReferralAddress(''); // Clear the referral address input
                setShowWalletMessage(false);
                try {
                    // Convert wallet client to ethers provider
                    const { BrowserProvider } = await import('ethers');
                    const provider = new BrowserProvider(walletClient);

                    // Check if user is already registered using ZyloPowerUp function
                    const registrationCheck = await checkUserRegistration(provider, address);

                    if (registrationCheck.success && registrationCheck.isRegistered) {
                        setMessage('You are already registered in the community!');
                        setMessageType('warning');
                        setIsAlreadyRegistered(true);

                        // Set referral link
                        if (registrationCheck.referralLink) {
                            setReferralLink(registrationCheck.referralLink);
                        } else {
                            const currentReferralLink = `${window.location.origin}/register/${address}`;
                            setReferralLink(currentReferralLink);
                        }

                        // Auto-hide message after 10 seconds with fade-out animation
                        setTimeout(() => {
                            setMessageFadeOut(true);
                            setTimeout(() => {
                                setMessage('');
                                setMessageType('');
                                setMessageFadeOut(false);
                            }, 500); // Wait for fade animation to complete
                        }, 10000);
                    }
                } catch (error) {
                    console.error("Error checking user registration:", error);
                }
            }
        };

        checkUserRegistrationStatus();
    }, [isConnected, address, walletClient]);

    // Auto-hide wallet required message after 10 seconds with fade-out animation
    useEffect(() => {
        if (!isConnected && showWalletMessage) {
            const timer = setTimeout(() => {
                setWalletMessageFadeOut(true);
                setTimeout(() => {
                    setShowWalletMessage(false);
                    setWalletMessageFadeOut(false);
                }, 500); // Wait for fade animation to complete
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [isConnected, showWalletMessage]);

    // Auto-refresh contract address every 30 seconds for registered users
    useEffect(() => {
        if (isAlreadyRegistered && isConnected && address && walletClient) {
            const interval = setInterval(() => {
                // autoRefreshContractAddress();
            }, 30000); // 30 seconds

            return () => clearInterval(interval);
        }
    }, [isAlreadyRegistered, isConnected, address, walletClient]);

    // Debug: Monitor userContractAddress state changes
    useEffect(() => {
        console.log('userContractAddress state changed to:', userContractAddress);
    }, [userContractAddress]);

    // Connect wallet function
    const handleConnectWallet = async () => {
        const result = await connectWallet(open);

        if (!result.success) {
            setMessage(result.error || 'Failed to connect wallet');
            setMessageType('error');

            // Auto-hide error message after 5 seconds
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 5000);
        }
    };

    // Copy referral link to clipboard
    const handleCopyLink = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); // Hide success message after 2 seconds
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };

    // Add new partner address input field
    const handleAddPartnerInput = () => {
        setPartnerAddresses([...partnerAddresses, '']);
        setPartnerPercentages([...partnerPercentages, '0']);
    };

    // Update partner address at specific index
    const handlePartnerAddressChange = (index: number, value: string) => {
        const updated = [...partnerAddresses];
        updated[index] = value;
        setPartnerAddresses(updated);
    };

    // Update partner percentage at specific index
    const handlePartnerPercentageChange = (index: number, value: string) => {
        // Only allow numbers and decimal point
        let numericValue = value.replace(/[^0-9.]/g, '');

        // Validate max percentage (100)
        const numValue = parseFloat(numericValue);
        if (!isNaN(numValue) && numValue > 100) {
            numericValue = '100';
        }

        const updated = [...partnerPercentages];
        updated[index] = numericValue;
        setPartnerPercentages(updated);
    };

    // Remove partner address at specific index
    const handleRemovePartnerAddress = (index: number) => {
        if (partnerAddresses.length > 1) {
            const updatedAddresses = partnerAddresses.filter((_, i) => i !== index);
            const updatedPercentages = partnerPercentages.filter((_, i) => i !== index);
            setPartnerAddresses(updatedAddresses);
            setPartnerPercentages(updatedPercentages);
        }
    };

    // Submit partner accounts
    const handleAddPartnerAccounts = async () => {
        setIsAddingPartners(true);
        setMessage('');
        setMessageType('');

        try {
            if (!isConnected || !address) {
                setMessage('Please connect your wallet first');
                setMessageType('error');
                setIsAddingPartners(false);
                return;
            }

            if (!walletClient) {
                setMessage('Unable to get wallet client');
                setMessageType('error');
                setIsAddingPartners(false);
                return;
            }

            // Filter out empty addresses and get corresponding percentages
            const addressesToAdd: string[] = [];
            const percentagesToAdd: number[] = [];

            for (let i = 0; i < partnerAddresses.length; i++) {
                const addr = partnerAddresses[i].trim();
                const percentage = partnerPercentages[i] ? parseFloat(partnerPercentages[i]) : 0;

                if (addr !== '') {
                    addressesToAdd.push(addr);
                    percentagesToAdd.push(percentage);
                }
            }

            if (addressesToAdd.length === 0) {
                setMessage('Please add at least one partner address');
                setMessageType('error');
                setIsAddingPartners(false);
                return;
            }

            // Check for duplicate addresses
            const addressSet = new Set<string>();
            for (let i = 0; i < addressesToAdd.length; i++) {
                const addr = addressesToAdd[i].toLowerCase();
                if (addressSet.has(addr)) {
                    setMessage(`Duplicate address found: ${addressesToAdd[i]}. Each address can only be added once.`);
                    setMessageType('error');
                    setIsAddingPartners(false);
                    return;
                }
                addressSet.add(addr);
            }

            // Validate all percentages are valid (should be <= 100, can be less)
            for (let i = 0; i < percentagesToAdd.length; i++) {
                const pct = percentagesToAdd[i];
                if (isNaN(pct) || pct < 0 || pct > 100) {
                    setMessage(`Invalid percentage for address ${addressesToAdd[i]}. Percentage must be between 0 and 100.`);
                    setMessageType('error');
                    setIsAddingPartners(false);
                    return;
                }
            }

            // Call addPartnerAccount function
            const result = await addPartnerAccount(walletClient, address, addressesToAdd, percentagesToAdd);

            if (result.success) {
                setMessage('Successfully added partner accounts!');
                setMessageType('success');
                // Clear the partner addresses after success
                setPartnerAddresses(['']);
                setPartnerPercentages(['0']);
                setShowAddPartnerSection(false);
            } else {
                setMessage(result.error || 'Failed to add partner accounts');
                setMessageType('error');
            }
        } catch (error: unknown) {
            const err = error as { message?: string };
            setMessage(`Error: ${err?.message || 'Unknown error occurred'}`);
            setMessageType('error');
        } finally {
            setIsAddingPartners(false);
        }
    };

    // Load and show partner accounts
    const handleViewPartnerAccounts = async () => {
        if (!isConnected || !address || !walletClient) {
            setMessage('Please connect your wallet first');
            setMessageType('error');
            return;
        }

        setIsLoadingPartners(true);
        setShowPartnerAccountsModal(true);
        setPartnerAccountsList([]);

        try {
            // Convert wallet client to ethers provider
            const { BrowserProvider } = await import('ethers');
            const provider = new BrowserProvider(walletClient);

            // Get all partner accounts
            const result = await getAllPartnerAccounts(provider, address);

            if (result.success && result.partners) {
                setPartnerAccountsList(result.partners);
            } else {
                setMessage(result.error || 'Failed to load partner accounts');
                setMessageType('error');
            }
        } catch (error: unknown) {
            const err = error as { message?: string };
            setMessage(`Error: ${err?.message || 'Unknown error occurred'}`);
            setMessageType('error');
        } finally {
            setIsLoadingPartners(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setMessageType('');
        setReferralLink('');
        setIsAlreadyRegistered(false);
        setMessageFadeOut(false);
        setShowWalletMessage(false);
        setWalletMessageFadeOut(false);

        try {
            if (!isConnected || !address) {
                setMessage('Please connect your wallet first');
                setMessageType('error');
                setIsLoading(false);
                return;
            }

            // Call registerUser function from ZyloPowerUp.js
            if (!walletClient) {
                setMessage('Unable to get wallet client');
                setMessageType('error');
                setIsLoading(false);
                return;
            }

            const result = await registerUser(walletClient, address, referralAddress, userName);

            if (result.success) {
                setMessage('Successfully joined community! Your referral link is ready.');
                setMessageType('success');
                setReferralAddress(''); // Clear form
                setUserName(''); // Clear name field

                // Set referral link
                if (result.referralLink) {
                    setReferralLink(result.referralLink);
                }

                // Set as already registered to show the referral link and table
                setIsAlreadyRegistered(true);

                // Refresh user registration status to update UI without reloading page
                setTimeout(async () => {
                    try {
                        await refreshUserRegistrationStatus(walletClient, address);
                        console.log('User registration confirmed, UI updated');
                    } catch (error) {
                        console.error('Error refreshing user details:', error);
                    }
                }, 1000);
            } else {
                // Check for specific error that should show as alert
                if (result.error && result.error.includes('You cannot use your own address as referral address')) {
                    // Show message without "Error:" prefix
                    setMessage(result.error);
                    setMessageType('error');
                } else if (result.isAlreadyRegistered) {
                    // Check if user is already registered
                    setMessage('You are already registered in the community!');
                    setMessageType('warning');
                    setIsAlreadyRegistered(true);

                    if (result.referralLink) {
                        setReferralLink(result.referralLink);
                    }

                    // Auto-hide message after 10 seconds with fade-out animation
                    setTimeout(() => {
                        setMessageFadeOut(true);
                        setTimeout(() => {
                            setMessage('');
                            setMessageType('');
                            setMessageFadeOut(false);
                        }, 500); // Wait for fade animation to complete
                    }, 10000);
                } else {
                    setMessage(`Error: ${result.error || 'Unknown error'}`);
                    setMessageType('error');
                }
            }
        } catch (error: unknown) {
            const err = error as { message?: string };
            setMessage(`Error: ${err?.message || 'Unknown error'}`);
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />

            {/* Background Pattern */}
            <div className="register-background">
                {/* Animated dots pattern */}
                <div className="animated-dot-1"></div>
                <div className="animated-dot-2"></div>
                <div className="animated-dot-3"></div>

                {/* Left Blue Lines */}
                <div className="position-absolute" style={{
                    left: "-10%",
                    top: "10%",
                    zIndex: '0',
                    opacity: '0.8'
                }}>
                    <Image
                        src="/assets/secure/blue lines bg design.svg"
                        alt="Left Blue Lines"
                        width={800}
                        height={600}
                        style={{
                            width: 'auto',
                            height: 'auto',
                        }}
                    />
                </div>

                {/* Right Blue Lines */}
                <div className="position-absolute" style={{
                    right: "-5%",
                    top: "5%",
                    zIndex: '0',
                    opacity: '0.8'
                }}>
                    <Image
                        src="/assets/hero-bg.svg"
                        alt="Right Blue Lines"
                        width={800}
                        height={800}
                        style={{
                            width: 'auto',
                            height: 'auto',
                        }}
                    />
                </div>
            </div>

            <main className="register-main" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            {/* Modern Left-Right Layout for Image and Heading */}
                            <div className="row align-items-center mb-2" style={{ minHeight: '300px' }}>
                                {/* Left Side - Heading */}
                                <div className="col-lg-7 col-md-6 mb-4 mb-lg-0">
                                    <h1 className="text-white fw-bold mb-4" style={{
                                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                        lineHeight: '1.2',
                                        textAlign: 'left',
                                    }}>
                                        Quick incept now for a free account
                                    </h1>
                                </div>

                                {/* Right Side - Image */}
                                <div className="col-lg-5 col-md-6">
                                    <div className="d-flex justify-content-center justify-content-lg-end">
                                        <div style={{
                                            position: 'relative',
                                            zIndex: 1,
                                        }}>
                                            <Image
                                                src="/assets/secure/incept-now.png"
                                                alt="Zylo Vortex"
                                                width={350}
                                                height={320}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    maxWidth: '350px',
                                                }}
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="mt-1">
                                <div className="card border-0 register-card">
                                    <div className="card-body p-5">
                                        {!isConnected && showWalletMessage && (
                                            <div className={`alert alert-warning mb-4 ${walletMessageFadeOut ? 'fade-out' : ''}`}>
                                                <strong>Wallet Required:</strong> Please connect your wallet using the button in the header to continue.
                                            </div>
                                        )}

                                        {/* Message above the form */}
                                        {message && (
                                            <div className={`alert ${messageType === 'success' ? 'alert-success' : messageType === 'warning' ? 'alert-warning' : 'alert-danger'} mb-4 ${messageFadeOut ? 'fade-out' : ''}`}>
                                                {message}
                                            </div>
                                        )}

                                        {!isAlreadyRegistered ? (
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                    <label className="form-label text-yellow fw-bold mb-3">Your Name *</label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control register-input"
                                                            placeholder="Enter your full name (required)"
                                                            value={userName}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                            required
                                                        />
                                                        <FaCircle className="position-absolute top-50 end-0 translate-middle-y me-3 referral-dot" />
                                                    </div>
                                                    <small className="text-white mt-2 d-block">
                                                        Enter your full name to join the Zillow Vortex community
                                                    </small>
                                                </div>

                                                <div className="mb-4">
                                                    <label className="form-label text-yellow fw-bold mb-3">Referral Address *</label>
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            className={`form-control register-input ${isReferralFromURL ? 'border-success' : ''}`}
                                                            placeholder={isReferralFromURL ? "Referral address from link" : "Enter referral address (required)"}
                                                            value={referralAddress}
                                                            onChange={(e) => setReferralAddress(e.target.value)}
                                                            required
                                                        />
                                                        <FaCircle className="position-absolute top-50 end-0 translate-middle-y me-3 referral-dot" />
                                                    </div>
                                                    <small className="text-white mt-2 d-block">
                                                        Referral address is required to join the Zillow Vortex community
                                                    </small>
                                                    {isReferralFromURL && (
                                                        <small className="text-success mt-2 d-block">
                                                            {/* ✅ Referral address pre-filled from link: {referralAddress} */}
                                                        </small>
                                                    )}
                                                    {/* Debug info */}
                                                    {process.env.NODE_ENV === 'development' && (
                                                        <small className="text-info mt-1 d-block">
                                                            {/* Debug: {referralAddress || 'No address'} | From URL: {isReferralFromURL ? 'Yes' : 'No'} | Checking: {isCheckingReferral ? 'Yes' : 'No'} */}
                                                        </small>
                                                    )}
                                                    {isCheckingReferral && (
                                                        <small className="text-warning mt-1 d-block">
                                                            🔍 Checking for referral address...
                                                        </small>
                                                    )}
                                                </div>

                                                {!isConnected ? (
                                                    <button
                                                        type="button"
                                                        className="btn w-100 py-3 fw-bold fs-5 register-button"
                                                        onClick={handleConnectWallet}
                                                    >
                                                        Connect Wallet
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="submit"
                                                        className="btn w-100 py-3 fw-bold fs-5 register-button"
                                                        disabled={isLoading || !referralAddress.trim() || !userName.trim()}
                                                    >
                                                        {isLoading ? 'Joining Community...' : 'Join with Referral'}
                                                    </button>
                                                )}

                                                {isConnected && (!referralAddress.trim() || !userName.trim()) && (
                                                    <small className="text-warning mt-2 d-block">
                                                        Please enter both your name and referral address to join
                                                    </small>
                                                )}

                                                {!isConnected && (
                                                    <small className="text-info mt-2 d-block">
                                                        Connect your wallet to join the community
                                                    </small>
                                                )}
                                            </form>
                                        ) : (
                                            /* Show only referral link for registered users */
                                            <div>
                                                <div className="referral-link-container">
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h6 className="text-yellow fw-bold mb-0">Your Referral Link:</h6>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm referral-link-input"
                                                            value={referralLink}
                                                            readOnly
                                                        />
                                                        <button
                                                            type="button"
                                                            className={`btn copy-button btn-sm ${copySuccess ? 'copied' : ''}`}
                                                            onClick={handleCopyLink}
                                                        >
                                                            {copySuccess ? 'Copied!' : 'Copy'}
                                                        </button>
                                                    </div>
                                                    <small className="text-success mt-2 d-block">
                                                        {copySuccess ? 'Link copied to clipboard!' : 'Share this link to invite others to join the community'}
                                                    </small>

                                                    <div className="contract-address-container mt-4">
                                                        {/* <h6 className="text-yellow fw-bold mb-3">Your Contract Address:</h6> */}
                                                        {/* Debug info */}

                                                        {/* {userContractAddress ? (
                                                    <>
                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm contract-address-input"
                                                                value={userContractAddress}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <a
                                                                href={`https://testnet.bscscan.com/address/${userContractAddress}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-outline-info btn-sm"
                                                                title="View your contract on BSC Testnet Explorer"
                                                            >
                                                                <i className="fas fa-external-link-alt me-1"></i>
                                                                View on BSCScan
                                                            </a>
                                                        </div>
                                                        <small className="text-info mt-2 d-block">
                                                            Click to view your contract details on BSC Testnet Explorer
                                                        </small>
                                                    </>
                                                ) : (
                                                    <div className="text-center py-2">
                                                        <small className="text-muted">
                                                            <i className="fas fa-spinner fa-spin me-1"></i>
                                                            Loading contract address...
                                                        </small>
                                                    </div>
                                                )} */}
                                                    </div>
                                                </div>

                                                {/* Add Partner Account Button */}
                                                <div className="mt-4">
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            type="button"
                                                            className="btn flex-grow-1 py-3 fw-bold fs-5 register-button"
                                                            onClick={() => setShowAddPartnerSection(!showAddPartnerSection)}
                                                        >
                                                            {showAddPartnerSection ? 'Hide Add Partner Account' : 'Add Partner Account'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn py-3 fw-bold fs-5"
                                                            onClick={handleViewPartnerAccounts}
                                                            style={{
                                                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                                                border: 'none',
                                                                color: '#000',
                                                                boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
                                                                minWidth: '200px'
                                                            }}
                                                        >
                                                            View Partner Accounts
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Add Partner Account Section */}
                                                {showAddPartnerSection && (
                                                    <div className="mt-4">
                                                        <div className="card border-0 register-card">
                                                            <div className="card-body p-5">
                                                                <h6 className="text-yellow fw-bold mb-4">Add Partner Accounts</h6>

                                                                {partnerAddresses.map((address, index) => (
                                                                    <div key={index} className="mb-3">
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <div className="position-relative flex-grow-1">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control register-input"
                                                                                    placeholder={`Enter partner address ${index + 1} (0x...)`}
                                                                                    value={address}
                                                                                    onChange={(e) => handlePartnerAddressChange(index, e.target.value)}
                                                                                />
                                                                                <FaCircle className="position-absolute top-50 end-0 translate-middle-y me-3 referral-dot" />
                                                                            </div>
                                                                            <div className="position-relative" style={{ minWidth: '120px' }}>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control register-input"
                                                                                    placeholder="Percentage (0-100)"
                                                                                    value={partnerPercentages[index] || '0'}
                                                                                    onChange={(e) => handlePartnerPercentageChange(index, e.target.value)}
                                                                                />
                                                                            </div>
                                                                            {partnerAddresses.length > 1 && (
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-danger btn-sm"
                                                                                    onClick={() => handleRemovePartnerAddress(index)}
                                                                                    style={{ minWidth: '80px' }}
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                <div className="d-flex gap-2 mb-4">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-warning btn-sm fw-bold"
                                                                        onClick={handleAddPartnerInput}
                                                                        style={{
                                                                            borderColor: '#FFD700',
                                                                            color: '#FFD700',
                                                                            minWidth: '160px'
                                                                        }}
                                                                    >
                                                                        + Add Next Address
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    className="btn w-100 py-3 fw-bold fs-5 register-button"
                                                                    onClick={handleAddPartnerAccounts}
                                                                    disabled={isAddingPartners || partnerAddresses.every(addr => addr.trim() === '')}
                                                                >
                                                                    {isAddingPartners ? 'Adding Partner Accounts...' : 'Add Partner Account'}
                                                                </button>

                                                                {partnerAddresses.every(addr => addr.trim() === '') && (
                                                                    <small className="text-warning mt-2 d-block">
                                                                        Please add at least one partner address
                                                                    </small>
                                                                )}

                                                                <small className="text-info mt-2 d-block">
                                                                    Note: Enter percentage (0-100, maximum 100) for each partner address. Each address must be unique. Percentages represent the share for each partner.
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Level Team Details Table Section - Only show for registered users - Outside the card */}
                            {isAlreadyRegistered && (
                                <div className="mt-5">
                                    <div className="card border-0 register-card">
                                        <div className="card-body" style={{ padding: '2.5rem 3rem' }}>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div className="d-flex align-items-center">
                                                    <h5 className="text-white fw-bold mb-0 me-2">Your Team Details</h5>
                                                </div>
                                            </div>
                                            <LevelTeamDetailsTable />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main >



            <Footer />

            {/* Partner Accounts Modal */}
            {showPartnerAccountsModal && (
                <div
                    className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setShowPartnerAccountsModal(false)}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content" style={{
                            background: 'rgba(3, 34, 51, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px'
                        }}>
                            <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                <h5 className="modal-title text-yellow fw-bold">Partner Accounts</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowPartnerAccountsModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                                {isLoadingPartners ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="text-white mt-3">Loading partner accounts...</p>
                                    </div>
                                ) : partnerAccountsList.length === 0 ? (
                                    <div className="text-center py-5">
                                        <p className="text-white">No partner accounts found.</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-dark table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="text-yellow">#</th>
                                                    <th className="text-yellow">Address</th>
                                                    <th className="text-yellow">Percentage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {partnerAccountsList.map((partner, index) => (
                                                    <tr key={index}>
                                                        <td className="text-white">{index + 1}</td>
                                                        <td className="text-white" style={{
                                                            fontFamily: 'monospace',
                                                            fontSize: '0.9rem',
                                                            wordBreak: 'break-all'
                                                        }}>
                                                            {partner.address}
                                                        </td>
                                                        <td className="text-white">{partner.percentage.toFixed(2)}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowPartnerAccountsModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default RegisterPage; 
