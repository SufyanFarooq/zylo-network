"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaExchangeAlt, FaChevronDown } from "react-icons/fa";
import { useAccount } from "wagmi";
import { Contract, ethers, formatEther, parseEther } from "ethers";
import swapContractAbi from "./swapContractAbi.json";
import TokenSelectionModal from "./TokenSelectionModal";
import TradingChart from "./TradingChart";
import "./SwapComponent.css";

// Token ABIs
const TOKEN_A_ABI = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

const _TOKEN_B_ABI = [
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
    { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" },
    { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

// Contract addresses
const TOKEN_A_ADDRESS = "0x5334f96cb5d91dfe29fbaa9e6832efd8c01cda91"; // USDT
const TOKEN_B_ADDRESS = "0x1Df50a21e595411229d95DA81a83bb299BC4000B"; // ZYLO
const SWAP_CONTRACT_ADDRESS = "0xA5175be2cf43382a3E29827894480088Ffde2d06";

interface Token {
    symbol: string;
    name: string;
    balance?: string;
    address: string;
    decimals: number;
}

const SwapComponent: React.FC = () => {
    const { address, isConnected } = useAccount();
    const [tokenA, setTokenA] = useState<Token | null>(null);
    const [tokenB, setTokenB] = useState<Token | null>(null);
    const [amountA, setAmountA] = useState<string>("");
    const [amountB, setAmountB] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tokenInfo, setTokenInfo] = useState<{
        tokenA: { name: string; symbol: string; decimals: number } | null;
        tokenB: { name: string; symbol: string; decimals: number } | null;
    }>({
        tokenA: null,
        tokenB: null
    });
    const [_isOwner] = useState(false);
    const [_activeTab] = useState<'swap' | 'setup'>('swap');
    const [_rateAmountA] = useState("1");
    const [_rateAmountB] = useState("100");
    const [customTokenA, setCustomTokenA] = useState<string | null>(null);
    const [customTokenB, setCustomTokenB] = useState<string | null>(null);
    const [isUpdatingFromA, setIsUpdatingFromA] = useState(false);
    const [isUpdatingFromB, setIsUpdatingFromB] = useState(false);
    const [isCalculatingQuote, setIsCalculatingQuote] = useState(false);
    const [isCalculatingQuoteA, setIsCalculatingQuoteA] = useState(false);
    const [hasInsufficientBalance, setHasInsufficientBalance] = useState(false);
    const [pairExists, setPairExists] = useState<boolean | null>(null);
    const [_isCheckingPair, setIsCheckingPair] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
    const [selectedTokenType, setSelectedTokenType] = useState<'A' | 'B' | null>(null);

    // Pair statistics
    const [pairStats] = useState<{
        lastPrice: string;
        high24h: string;
        low24h: string;
        volume24h: string;
    }>({
        lastPrice: "0.03338129",
        high24h: "0.03369844",
        low24h: "0.03311765",
        volume24h: "1855.24"
    });

    // User balances
    const [userBalances, setUserBalances] = useState<{
        zylo: string;
        usdt: string;
    }>({
        zylo: "0.0000",
        usdt: "0.0000"
    });

    // Trading interface states
    const [activeOrderTab, setActiveOrderTab] = useState<'pending' | 'completed'>('pending');

    // Mock order book data
    const [buyOrders] = useState([
        { price: "0.03250079", amount: "297.131990", total: "9.65702440" },
        { price: "0.03246907", amount: "150.500000", total: "4.88623450" },
        { price: "0.03245000", amount: "200.000000", total: "6.49000000" },
        { price: "0.03240000", amount: "180.750000", total: "5.85870000" },
        { price: "0.03235000", amount: "250.000000", total: "8.08750000" },
        { price: "0.03230000", amount: "175.250000", total: "5.65575000" },
        { price: "0.03225000", amount: "220.500000", total: "7.11112500" },
        { price: "0.03220000", amount: "195.750000", total: "6.30315000" },
        { price: "0.03215000", amount: "160.000000", total: "5.14400000" },
        { price: "0.03210000", amount: "210.250000", total: "6.74902500" },
        { price: "0.03205000", amount: "185.500000", total: "5.94527500" },
        { price: "0.03200000", amount: "240.000000", total: "7.68000000" },
        { price: "0.03195000", amount: "170.750000", total: "5.44811250" },
        { price: "0.03190000", amount: "225.500000", total: "7.19345000" },
        { price: "0.03185000", amount: "190.250000", total: "6.06246250" },
    ]);

    const [sellOrders] = useState([
        { price: "0.03260000", amount: "120.500000", total: "3.92853000" },
        { price: "0.03265000", amount: "180.000000", total: "5.87700000" },
        { price: "0.03270000", amount: "200.250000", total: "6.54817500" },
        { price: "0.03275000", amount: "150.000000", total: "4.91250000" },
        { price: "0.03280000", amount: "220.500000", total: "7.23240000" },
        { price: "0.03285000", amount: "165.750000", total: "5.44008750" },
        { price: "0.03290000", amount: "235.000000", total: "7.73150000" },
        { price: "0.03295000", amount: "145.250000", total: "4.78048750" },
        { price: "0.03300000", amount: "250.500000", total: "8.26650000" },
        { price: "0.03305000", amount: "175.750000", total: "5.80853750" },
        { price: "0.03310000", amount: "210.000000", total: "6.95100000" },
        { price: "0.03315000", amount: "195.250000", total: "6.47253750" },
        { price: "0.03320000", amount: "225.500000", total: "7.48660000" },
        { price: "0.03325000", amount: "160.750000", total: "5.34493750" },
        { price: "0.03330000", amount: "240.000000", total: "7.99200000" },
    ]);

    // Mock trade history
    const [tradeHistory] = useState([
        { time: "02:37:38", date: "2024-01-15", type: "BUY", price: "0.03246907", amount: "99.226", total: "3.219", txHash: "0xabcd...ef01" },
        { time: "02:11:12", date: "2024-01-15", type: "SELL", price: "0.03241176", amount: "0.002", total: "0.000", txHash: "0xbcde...f012" },
        { time: "01:53:55", date: "2024-01-15", type: "BUY", price: "0.03246907", amount: "99.226", total: "3.219", txHash: "0xcdef...0123" },
        { time: "01:48:13", date: "2024-01-15", type: "BUY", price: "0.03246907", amount: "387.145", total: "12.562", txHash: "0xdef0...1234" },
        { time: "01:43:12", date: "2024-01-15", type: "BUY", price: "0.03246907", amount: "221.148", total: "7.182", txHash: "0xef01...2345" },
        { time: "01:30:45", date: "2024-01-15", type: "SELL", price: "0.03250000", amount: "150.500", total: "4.891", txHash: "0xf012...3456" },
        { time: "01:20:30", date: "2024-01-15", type: "BUY", price: "0.03245000", amount: "200.000", total: "6.490", txHash: "0x0123...4567" },
        { time: "01:10:15", date: "2024-01-15", type: "SELL", price: "0.03255000", amount: "180.750", total: "5.876", txHash: "0x1234...5678" },
        { time: "01:00:00", date: "2024-01-15", type: "BUY", price: "0.03240000", amount: "250.000", total: "8.100", txHash: "0x2345...6789" },
        { time: "00:50:30", date: "2024-01-15", type: "SELL", price: "0.03260000", amount: "120.500", total: "3.928", txHash: "0x3456...7890" },
    ]);

    // User order history
    const [userOrders] = useState({
        pending: [
            { id: 1, type: "BUY", pair: "USDT/ZYLO", amount: "100", price: "0.0325", total: "3.25", time: "10:30:15", date: "2024-01-15", status: "Pending", txHash: "0x1234...5678" },
            { id: 2, type: "SELL", pair: "USDT/ZYLO", amount: "50", price: "0.0327", total: "1.635", time: "11:15:22", date: "2024-01-15", status: "Pending", txHash: "0x2345...6789" },
            { id: 5, type: "BUY", pair: "USDT/ZYLO", amount: "75", price: "0.0323", total: "2.4225", time: "12:20:10", date: "2024-01-15", status: "Pending", txHash: "0x3456...7890" },
            { id: 6, type: "SELL", pair: "USDT/ZYLO", amount: "120", price: "0.0328", total: "3.936", time: "13:45:33", date: "2024-01-15", status: "Pending", txHash: "0x4567...8901" },
            { id: 10, type: "BUY", pair: "USDT/ZYLO", amount: "150", price: "0.0324", total: "4.86", time: "14:20:10", date: "2024-01-15", status: "Pending", txHash: "0xa123...b456" },
            { id: 11, type: "SELL", pair: "USDT/ZYLO", amount: "90", price: "0.0329", total: "2.961", time: "15:10:25", date: "2024-01-15", status: "Pending", txHash: "0xb234...c567" },
            { id: 12, type: "BUY", pair: "USDT/ZYLO", amount: "200", price: "0.0322", total: "6.44", time: "16:05:40", date: "2024-01-15", status: "Pending", txHash: "0xc345...d678" },
            { id: 13, type: "SELL", pair: "USDT/ZYLO", amount: "110", price: "0.0330", total: "3.63", time: "17:30:15", date: "2024-01-15", status: "Pending", txHash: "0xd456...e789" },
            { id: 14, type: "BUY", pair: "USDT/ZYLO", amount: "175", price: "0.0321", total: "5.6175", time: "18:15:20", date: "2024-01-15", status: "Pending", txHash: "0xe567...f890" },
            { id: 15, type: "SELL", pair: "USDT/ZYLO", amount: "85", price: "0.0326", total: "2.771", time: "19:00:30", date: "2024-01-15", status: "Pending", txHash: "0xf678...a901" },
            { id: 16, type: "BUY", pair: "USDT/ZYLO", amount: "220", price: "0.0320", total: "7.04", time: "20:25:45", date: "2024-01-15", status: "Pending", txHash: "0xa789...b012" },
            { id: 17, type: "SELL", pair: "USDT/ZYLO", amount: "95", price: "0.0327", total: "3.1065", time: "21:10:10", date: "2024-01-15", status: "Pending", txHash: "0xb890...c123" },
        ],
        completed: [
            { id: 3, type: "BUY", pair: "USDT/ZYLO", amount: "200", price: "0.0324", total: "6.48", time: "09:20:10", date: "2024-01-15", status: "Completed", txHash: "0x5678...9012" },
            { id: 4, type: "SELL", pair: "USDT/ZYLO", amount: "150", price: "0.0326", total: "4.89", time: "08:45:33", date: "2024-01-15", status: "Completed", txHash: "0x6789...0123" },
            { id: 7, type: "BUY", pair: "USDT/ZYLO", amount: "300", price: "0.0322", total: "9.66", time: "07:30:15", date: "2024-01-15", status: "Completed", txHash: "0x7890...1234" },
            { id: 8, type: "SELL", pair: "USDT/ZYLO", amount: "180", price: "0.0329", total: "5.922", time: "06:15:22", date: "2024-01-15", status: "Completed", txHash: "0x8901...2345" },
            { id: 9, type: "BUY", pair: "USDT/ZYLO", amount: "250", price: "0.0321", total: "8.025", time: "05:10:45", date: "2024-01-14", status: "Completed", txHash: "0x9012...3456" },
            { id: 18, type: "SELL", pair: "USDT/ZYLO", amount: "160", price: "0.0325", total: "5.2", time: "04:30:20", date: "2024-01-14", status: "Completed", txHash: "0xc901...d234" },
            { id: 19, type: "BUY", pair: "USDT/ZYLO", amount: "280", price: "0.0323", total: "9.044", time: "03:45:15", date: "2024-01-14", status: "Completed", txHash: "0xd012...e345" },
            { id: 20, type: "SELL", pair: "USDT/ZYLO", amount: "140", price: "0.0328", total: "4.592", time: "02:20:30", date: "2024-01-14", status: "Completed", txHash: "0xe123...f456" },
            { id: 21, type: "BUY", pair: "USDT/ZYLO", amount: "320", price: "0.0320", total: "10.24", time: "01:15:45", date: "2024-01-14", status: "Completed", txHash: "0xf234...a567" },
            { id: 22, type: "SELL", pair: "USDT/ZYLO", amount: "190", price: "0.0327", total: "6.213", time: "00:50:10", date: "2024-01-14", status: "Completed", txHash: "0xa345...b678" },
            { id: 23, type: "BUY", pair: "USDT/ZYLO", amount: "270", price: "0.0324", total: "8.748", time: "23:30:25", date: "2024-01-13", status: "Completed", txHash: "0xb456...c789" },
            { id: 24, type: "SELL", pair: "USDT/ZYLO", amount: "130", price: "0.0326", total: "4.238", time: "22:15:40", date: "2024-01-13", status: "Completed", txHash: "0xc567...d890" },
            { id: 25, type: "BUY", pair: "USDT/ZYLO", amount: "350", price: "0.0321", total: "11.235", time: "21:00:55", date: "2024-01-13", status: "Completed", txHash: "0xd678...e901" },
            { id: 26, type: "SELL", pair: "USDT/ZYLO", amount: "170", price: "0.0329", total: "5.593", time: "20:45:20", date: "2024-01-13", status: "Completed", txHash: "0xe789...f012" },
            { id: 27, type: "BUY", pair: "USDT/ZYLO", amount: "240", price: "0.0322", total: "7.728", time: "19:30:35", date: "2024-01-13", status: "Completed", txHash: "0xf890...a123" },
        ]
    });

    // Helper functions
    const formatBalance = (balance: string | undefined): string => {
        if (!balance || balance === "0.0") return "0.0000";
        const num = parseFloat(balance);
        if (isNaN(num)) return "0.0000";
        return num.toFixed(4);
    };

    const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const checkPairExists = async (tokenA: string, tokenB: string): Promise<boolean> => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
            const swapContract = new Contract(SWAP_CONTRACT_ADDRESS, swapContractAbi, provider);
            const ratesResult = await swapContract.rates(tokenA, tokenB);
            const [_numerator, _denominator, active] = ratesResult;
            return active;
        } catch (err: unknown) {
            if ((err as Error).message?.includes('missing revert data') ||
                (err as Error).message?.includes('Internal JSON-RPC error')) {
                return true;
            }
            return false;
        }
    };

    const calculateQuote = async (inputAmount: string, fromToken: string, toToken: string, direction: 'AtoB' | 'BtoA', setLoadingState?: (_loading: boolean) => void) => {
        if (!inputAmount || !isConnected || isNaN(Number(inputAmount)) || Number(inputAmount) <= 0) {
            return null;
        }

        try {
            if (setLoadingState) {
                setLoadingState(true);
            } else {
                setIsCalculatingQuote(true);
            }
            const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
            const swapContract = new Contract(SWAP_CONTRACT_ADDRESS, swapContractAbi, provider);
            const amountInWei = parseEther(inputAmount);
            let amountOut;
            try {
                amountOut = await swapContract.quoteOut(fromToken, toToken, amountInWei);
            } catch (callError: unknown) {
                if ((callError as { code?: string; data?: unknown }).code === "CALL_EXCEPTION" && (callError as { code?: string; data?: unknown }).data === null) {
                    try {
                        amountOut = await swapContract.quoteOut.staticCall(fromToken, toToken, amountInWei);
                    } catch {
                        throw callError;
                    }
                } else {
                    throw callError;
                }
            }

            const formattedAmount = formatEther(amountOut);
            return formattedAmount;
        } catch (error: unknown) {
            const errorObj = error as { code?: string; data?: unknown; message?: string };
            if (errorObj.code === "CALL_EXCEPTION" && errorObj.data === null) {
                const isUSDTToBTOKEN = fromToken.toLowerCase() === TOKEN_A_ADDRESS.toLowerCase();
                let fallbackAmount;
                if (isUSDTToBTOKEN) {
                    fallbackAmount = (Number(inputAmount) * 2.5).toFixed(6);
                } else {
                    fallbackAmount = (Number(inputAmount) / 2.5).toFixed(6);
                }
                return fallbackAmount;
            } else if (errorObj.message && errorObj.message.includes("pair inactive")) {
                return "Pair not set up";
            } else if (errorObj.message && errorObj.message.includes("insufficient")) {
                return "Insufficient liquidity";
            } else {
                return "Error calculating";
            }
        } finally {
            if (setLoadingState) {
                setLoadingState(false);
            } else {
                setIsCalculatingQuote(false);
            }
        }
    };

    const fetchTokenBalance = async (tokenAddress: string, userAddress: string) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
            const erc20Abi = [
                {
                    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
                    "name": "balanceOf",
                    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            const contract = new Contract(tokenAddress, erc20Abi, provider);
            const balance = await contract.balanceOf(userAddress);
            return formatEther(balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
            if (tokenAddress.toLowerCase() === TOKEN_A_ADDRESS.toLowerCase()) {
                return "9895675322.63109742";
            } else if (tokenAddress.toLowerCase() === TOKEN_B_ADDRESS.toLowerCase()) {
                return "9999999000.0";
            }
            return "0.0";
        }
    };

    const _fetchTokenInfo = async (tokenAddress: string) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
            const erc20Abi = [
                { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
                { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
                { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }
            ];
            const contract = new Contract(tokenAddress, erc20Abi, provider);
            const [name, symbol, decimals] = await Promise.all([
                contract.name(),
                contract.symbol(),
                contract.decimals()
            ]);
            return { name, symbol, decimals: Number(decimals) };
        } catch (error) {
            console.error("Error fetching token info:", error);
            if (tokenAddress.toLowerCase() === TOKEN_A_ADDRESS.toLowerCase()) {
                return { name: "Tether USD", symbol: "USDT", decimals: 18 };
            } else if (tokenAddress.toLowerCase() === TOKEN_B_ADDRESS.toLowerCase()) {
                return { name: "Zylo Token", symbol: "ZYLO", decimals: 18 };
            }
            return { name: "Unknown Token", symbol: "UNK", decimals: 18 };
        }
    };

    const fetchUserBalances = useCallback(async () => {
        if (!isConnected || !address) {
            setUserBalances({ zylo: "0.0000", usdt: "0.0000" });
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
            const ZYLO_TOKEN_ADDRESS = TOKEN_B_ADDRESS;
            const USDT_TOKEN_ADDRESS = TOKEN_A_ADDRESS;
            const erc20Abi = [
                { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
                { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }
            ];

            const [zyloContract, usdtContract] = await Promise.all([
                new Contract(ZYLO_TOKEN_ADDRESS, erc20Abi, provider),
                new Contract(USDT_TOKEN_ADDRESS, erc20Abi, provider)
            ]);

            const [zyloBalance, usdtBalance, zyloDecimals, usdtDecimals] = await Promise.all([
                zyloContract.balanceOf(address),
                usdtContract.balanceOf(address),
                zyloContract.decimals(),
                usdtContract.decimals()
            ]);

            const zyloFormatted = ethers.formatUnits(zyloBalance, Number(zyloDecimals));
            const usdtFormatted = ethers.formatUnits(usdtBalance, Number(usdtDecimals));

            setUserBalances({
                zylo: parseFloat(zyloFormatted).toFixed(4),
                usdt: parseFloat(usdtFormatted).toFixed(4)
            });
        } catch (error) {
            console.error('Error fetching user balances:', error);
            setUserBalances({ zylo: "0.0000", usdt: "0.0000" });
        }
    }, [isConnected, address]);

    const handleAmountAChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmountA(value);
        if (!value || value.trim() === "") {
            setAmountB("");
            setIsCalculatingQuote(false);
            setHasInsufficientBalance(false);
            return;
        }
        if (isUpdatingFromB) return;
        if (value && !isNaN(Number(value)) && isConnected) {
            setIsUpdatingFromA(true);
            if (!customTokenA || !customTokenB) return;
            const quoteResult = await calculateQuote(value, customTokenA, customTokenB, 'AtoB');
            if (quoteResult) {
                setAmountB(quoteResult);
            }
            setTimeout(() => setIsUpdatingFromA(false), 100);
        }
    };

    const handleAmountBChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmountB(value);
        if (isUpdatingFromA) return;
        if (!value || value.trim() === "") {
            setAmountA("");
            setIsCalculatingQuote(false);
            setHasInsufficientBalance(false);
            return;
        }
        if (value && !isNaN(Number(value)) && isConnected) {
            setIsUpdatingFromB(true);
            setAmountA("");
            if (!customTokenA || !customTokenB) return;
            const quoteResult = await calculateQuote(value, customTokenB, customTokenA, 'BtoA', setIsCalculatingQuoteA);
            if (quoteResult) {
                setAmountA(quoteResult);
            }
            setTimeout(() => setIsUpdatingFromB(false), 100);
        }
    };

    const handleSwapTokens = () => {
        if (!tokenA || !tokenB) return;
        const tempToken = tokenA;
        setTokenA(tokenB);
        setTokenB(tempToken);
        const tempAmount = amountA;
        setAmountA(amountB);
        setAmountB(tempAmount);
        const tempCustomTokenA = customTokenA;
        setCustomTokenA(customTokenB);
        setCustomTokenB(tempCustomTokenA);
        const tempTokenInfo = tokenInfo;
        setTokenInfo({
            tokenA: tempTokenInfo.tokenB,
            tokenB: tempTokenInfo.tokenA
        });
    };

    const handleTokenSelectorClick = (tokenType: 'A' | 'B') => {
        setSelectedTokenType(tokenType);
        setIsTokenModalOpen(true);
    };

    const handleTokenSelect = (selectedToken: Token) => {
        if (selectedTokenType === 'A') {
            setTokenA({
                symbol: selectedToken.symbol,
                name: selectedToken.name,
                balance: "0.0",
                address: selectedToken.address,
                decimals: selectedToken.decimals
            });
            setCustomTokenA(selectedToken.address);
            setTokenInfo(prev => ({
                ...prev,
                tokenA: {
                    name: selectedToken.name,
                    symbol: selectedToken.symbol,
                    decimals: selectedToken.decimals
                }
            }));
        } else if (selectedTokenType === 'B') {
            setTokenB({
                symbol: selectedToken.symbol,
                name: selectedToken.name,
                balance: "0.0",
                address: selectedToken.address,
                decimals: selectedToken.decimals
            });
            setCustomTokenB(selectedToken.address);
            setTokenInfo(prev => ({
                ...prev,
                tokenB: {
                    name: selectedToken.name,
                    symbol: selectedToken.symbol,
                    decimals: selectedToken.decimals
                }
            }));
        }
        setAmountA("");
        setAmountB("");
        setIsTokenModalOpen(false);
        setSelectedTokenType(null);
    };

    const handleSwap = async () => {
        if (!isConnected) {
            alert("Please connect your wallet first");
            return;
        }
        if (!tokenA || !tokenB || !customTokenA || !customTokenB) {
            alert("Please select both tokens first");
            return;
        }
        if (!amountA || !amountB || amountB === "Pair not set up") {
            alert("Please enter valid amounts for both tokens.");
            return;
        }

        setIsLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
            const signer = await provider.getSigner();
            const swapContract = new Contract(SWAP_CONTRACT_ADDRESS, swapContractAbi, signer);
            const amountInWei = parseEther(amountA);

            const tokenAContract = new Contract(customTokenA, TOKEN_A_ABI, signer);
            const currentAllowance = await tokenAContract.allowance(address, SWAP_CONTRACT_ADDRESS);

            if (currentAllowance < amountInWei) {
                const approveTx = await tokenAContract.approve(SWAP_CONTRACT_ADDRESS, amountInWei);
                await approveTx.wait();
            }

            const swapTx = await swapContract.swapExactIn(
                customTokenA,
                customTokenB,
                amountInWei
            );

            await swapTx.wait();
            showNotification("Swap completed successfully!", 'success');
            setAmountA("");
            setAmountB("");

            if (address && customTokenA && customTokenB) {
                const [balanceA, balanceB] = await Promise.all([
                    fetchTokenBalance(customTokenA, address),
                    fetchTokenBalance(customTokenB, address)
                ]);
                setTokenA(prev => prev ? { ...prev, balance: balanceA } : null);
                setTokenB(prev => prev ? { ...prev, balance: balanceB } : null);
                await fetchUserBalances();
            }
        } catch (error: unknown) {
            console.error("❌ Swap failed:", error);
            const errorObj = error as { code?: string; message?: string };
            if (errorObj.message && errorObj.message.includes("pair inactive")) {
                showNotification("Swap failed: The trading pair is not active.", 'error');
            } else if (errorObj.code === "4001") {
                showNotification("Transaction rejected by user.", 'error');
            } else {
                showNotification("Swap failed. Please try again.", 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (isConnected && address) {
            fetchUserBalances();
            const interval = setInterval(() => {
                fetchUserBalances();
            }, 10000);
            return () => clearInterval(interval);
        } else {
            setUserBalances({ zylo: "0.0000", usdt: "0.0000" });
        }
    }, [isConnected, address, fetchUserBalances]);

    useEffect(() => {
        if (isConnected && address && tokenA && tokenB && customTokenA && customTokenB) {
            const updateBalances = async () => {
                try {
                    const [balanceA, balanceB] = await Promise.all([
                        fetchTokenBalance(customTokenA, address),
                        fetchTokenBalance(customTokenB, address)
                    ]);
                    setTokenA(prev => prev ? { ...prev, balance: balanceA } : null);
                    setTokenB(prev => prev ? { ...prev, balance: balanceB } : null);
                } catch (error) {
                    console.error('Failed to update balances:', error);
                }
            };
            updateBalances();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, address, customTokenA, customTokenB]);

    useEffect(() => {
        if (tokenA && tokenB && customTokenA && customTokenB) {
            const checkPair = async () => {
                setIsCheckingPair(true);
                try {
                    const exists = await checkPairExists(customTokenA, customTokenB);
                    setPairExists(exists);
                } catch (error) {
                    console.error('Failed to check pair existence:', error);
                    setPairExists(false);
                } finally {
                    setIsCheckingPair(false);
                }
            };
            checkPair();
        } else {
            setPairExists(null);
        }
    }, [tokenA, tokenB, customTokenA, customTokenB]);

    const currentPair = tokenA && tokenB ? `${tokenInfo.tokenA?.symbol || 'USDT'} / ${tokenInfo.tokenB?.symbol || 'ZYLO'}` : "USDT / ZYLO";

    return (
        <div className="trading-container">
            {/* Trading Pair Header ha yes  */}
            <div className="trading-header">
                <div className="pair-header-section">
                    <h2 className="pair-title">{currentPair}</h2>
                    <div className="pair-stats-row">
                        <div className="stat-item">
                            <span className="stat-label">Last</span>
                            <span className="stat-value last">{pairStats.lastPrice}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">24High</span>
                            <span className="stat-value high">{pairStats.high24h}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">24Low</span>
                            <span className="stat-value low">{pairStats.low24h}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">24V</span>
                            <span className="stat-value volume">{pairStats.volume24h} ZYLO</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Your ZYLO</span>
                            <span className="stat-value balance">{userBalances.zylo}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Your USDT</span>
                            <span className="stat-value balance">{userBalances.usdt}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Trading Interface */}
            <div className="trading-main-layout">
                {/* Left Column: Chart */}
                <div className="trading-left-column">
                    <TradingChart pair={currentPair} />

                    {/* Order Books */}
                    <div className="order-books-section">
                        <div className="order-book-container">
                            <div className="order-book-header">
                                <h4>BUY ORDER</h4>
                            </div>
                            <div className="order-book-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Price</th>
                                            <th>Amount</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buyOrders.map((order, idx) => (
                                            <tr key={idx} className="buy-row">
                                                <td className="price-buy">{order.price}</td>
                                                <td>{order.amount}</td>
                                                <td>{order.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="order-book-container">
                            <div className="order-book-header">
                                <h4>SELL ORDER</h4>
                            </div>
                            <div className="order-book-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Price</th>
                                            <th>Amount</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellOrders.map((order, idx) => (
                                            <tr key={idx} className="sell-row">
                                                <td className="price-sell">{order.price}</td>
                                                <td>{order.amount}</td>
                                                <td>{order.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* My Orders Section */}
                    <div className="orders-history-section">
                        <div className="orders-container">
                            <div className="orders-header">
                                <h4>MY ORDERS</h4>
                                {/* Order Tab Buttons */}
                                <div className="order-tab-buttons">
                                    <button
                                        className={`order-tab-btn ${activeOrderTab === 'pending' ? 'active' : ''}`}
                                        onClick={() => setActiveOrderTab('pending')}
                                    >
                                        Pending
                                    </button>
                                    <button
                                        className={`order-tab-btn ${activeOrderTab === 'completed' ? 'active' : ''}`}
                                        onClick={() => setActiveOrderTab('completed')}
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>

                            {/* Pending Orders */}
                            {activeOrderTab === 'pending' && (
                                <div className="orders-subsection">
                                    <div className="orders-table-container">
                                        <table className="detailed-orders-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Type</th>
                                                    <th>Pair</th>
                                                    <th>Amount</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Status</th>
                                                    <th>Tx Hash</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userOrders.pending.map((order) => (
                                                    <tr key={order.id}>
                                                        <td>{order.id}</td>
                                                        <td className={order.type === "BUY" ? "type-buy" : "type-sell"}>{order.type}</td>
                                                        <td>{order.pair}</td>
                                                        <td>{order.amount}</td>
                                                        <td>{order.price}</td>
                                                        <td>{order.total}</td>
                                                        <td>{order.date}</td>
                                                        <td>{order.time}</td>
                                                        <td className="status-pending">{order.status}</td>
                                                        <td className="tx-hash">{order.txHash}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Completed Orders */}
                            {activeOrderTab === 'completed' && (
                                <div className="orders-subsection">
                                    <div className="orders-table-container">
                                        <table className="detailed-orders-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Type</th>
                                                    <th>Pair</th>
                                                    <th>Amount</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Status</th>
                                                    <th>Tx Hash</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userOrders.completed.map((order) => (
                                                    <tr key={order.id}>
                                                        <td>{order.id}</td>
                                                        <td className={order.type === "BUY" ? "type-buy" : "type-sell"}>{order.type}</td>
                                                        <td>{order.pair}</td>
                                                        <td>{order.amount}</td>
                                                        <td>{order.price}</td>
                                                        <td>{order.total}</td>
                                                        <td>{order.date}</td>
                                                        <td>{order.time}</td>
                                                        <td className="status-completed">{order.status}</td>
                                                        <td className="tx-hash">{order.txHash}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Swap Form */}
                <div className="trading-right-column">
                    {/* Swap Section */}
                    <div className="swap-section">
                        <h3 className="form-title">SWAP</h3>
                        <div className="token-input-section">
                            <div className="token-header">
                                <label className="token-label">From</label>
                                <div className="token-balance">
                                    <span className="balance-amount">{formatBalance(tokenA?.balance)}</span>
                                    <span className="balance-symbol">{tokenInfo.tokenA?.symbol || ""}</span>
                                </div>
                            </div>
                            <div className="token-input-container">
                                <input
                                    type="text"
                                    className="token-input"
                                    placeholder="0.0"
                                    value={isCalculatingQuoteA ? "Calculating..." : amountA}
                                    onChange={handleAmountAChange}
                                    disabled={!isConnected || isCalculatingQuoteA || !tokenA}
                                />
                                <div className="token-selector" onClick={() => handleTokenSelectorClick('A')}>
                                    <span className="token-symbol">{tokenInfo.tokenA?.symbol || "Select Token"}</span>
                                    <FaChevronDown className="chevron" />
                                </div>
                            </div>
                        </div>

                        <div className="swap-button-container">
                            <button
                                className="swap-button"
                                onClick={handleSwapTokens}
                                disabled={!isConnected || !tokenA || !tokenB || pairExists === false}
                            >
                                <FaExchangeAlt />
                            </button>
                        </div>

                        <div className="token-input-section">
                            <div className="token-header">
                                <label className="token-label">To</label>
                                <div className="token-balance">
                                    <span className="balance-amount">{formatBalance(tokenB?.balance)}</span>
                                    <span className="balance-symbol">{tokenInfo.tokenB?.symbol || ""}</span>
                                </div>
                            </div>
                            <div className="token-input-container">
                                <input
                                    type="text"
                                    className="token-input"
                                    placeholder={isCalculatingQuote ? "Calculating..." : "0.0"}
                                    value={isCalculatingQuote ? "" : amountB}
                                    onChange={handleAmountBChange}
                                    disabled={!isConnected || isCalculatingQuote || !tokenB}
                                />
                                <div className="token-selector2" onClick={() => !isCalculatingQuote && handleTokenSelectorClick('B')}>
                                    {isCalculatingQuote ? (
                                        <div className="quote-loader">
                                            <span className="spinner"></span>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="token-symbol">{tokenInfo.tokenB?.symbol || "Select Token"}</span>
                                            <FaChevronDown className="chevron" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            className={`swap-action-btn ${!isConnected || !amountA || !amountB || hasInsufficientBalance || !tokenA || !tokenB || pairExists === false ? 'disabled' : ''}`}
                            onClick={handleSwap}
                            disabled={isLoading || !amountA || !amountB || !isConnected || hasInsufficientBalance || !tokenA || !tokenB || pairExists === false}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Swapping...
                                </>
                            ) : !isConnected ? (
                                "Connect Wallet to Swap"
                            ) : !tokenA || !tokenB ? (
                                "Select Tokens to Swap"
                            ) : pairExists === false ? (
                                "Pair Does Not Exist"
                            ) : hasInsufficientBalance ? (
                                "Insufficient Balance"
                            ) : (
                                "Swap Tokens"
                            )}
                        </button>
                    </div>

                    {/* Trade History Section - Below Swap */}
                    <div className="history-container">
                        <div className="history-header">
                            <h4>TRADE HISTORY</h4>
                        </div>
                        <div className="history-table-container">
                            <table className="simple-history-table">
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tradeHistory.map((trade, idx) => (
                                        <tr key={idx}>
                                            <td>{trade.time}</td>
                                            <td className={trade.type === "BUY" ? "type-buy" : "type-sell"}>{trade.type}</td>
                                            <td>{trade.price}</td>
                                            <td>{trade.amount}</td>
                                            <td>{trade.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.type === 'success' ? '✅' : '❌'} {notification.message}
                </div>
            )}

            {/* Token Selection Modal */}
            <TokenSelectionModal
                isOpen={isTokenModalOpen}
                onClose={() => {
                    setIsTokenModalOpen(false);
                    setSelectedTokenType(null);
                }}
                onSelectToken={handleTokenSelect}
                currentToken={selectedTokenType === 'A' ? (tokenB || undefined) : (tokenA || undefined)}
                title={`Select ${selectedTokenType === 'A' ? 'FROM' : 'TO'} Token`}
            />
        </div>
    );
};

export default SwapComponent;

