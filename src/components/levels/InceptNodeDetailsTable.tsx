'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';
import { getInceptCount, getInceptNodeAddress, getUserUnitCountofTeam } from '@/blockchain/instances/ZyloPowerUp';
import '../common/StakingLevelsTable.css';

interface InceptNodeData {
  address: string;
  unitCounts: {
    sparkUp: number;
  flickerRoar: number;
  aiOverrider: number;
  zyloApex: number;
  zyloUniverse: number;
  zyloInfinity: number;
  };
}

interface InceptNodeDetailsTableProps {
  levelIndex: number; // 0-9 (Vortex Zone 1-10)
  onClose?: () => void;
}

const UNIT_NAMES = ['Spark Up', 'Flicker Roar', 'AI Overrider', 'Zylo Apex', 'Zylo Universe', 'Zylo Infinity'];

const InceptNodeDetailsTable: React.FC<InceptNodeDetailsTableProps> = ({ levelIndex, onClose: _onClose }) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [inceptNodes, setInceptNodes] = useState<InceptNodeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [inceptNodes.length]);

  // Fetch incept node details
  useEffect(() => {
    const fetchInceptNodes = async () => {
      if (!isConnected || !address || !walletClient) {
        setInceptNodes([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const provider = new BrowserProvider(walletClient);

        console.log('Fetching incept nodes for level:', levelIndex, 'address:', address);

        // Step 1: Get incept count
        const countResult = await getInceptCount(provider, address, levelIndex);
        console.log('Incept count result:', countResult);
        
        if (!countResult.success) {
          console.error('Failed to get incept count:', countResult.error);
          setError(countResult.error || 'Failed to get incept count');
          setIsLoading(false);
          return;
        }

        const count = countResult.count || 0;
        console.log('Incept count:', count);
        
        if (count === 0) {
          console.log('No incept nodes found for this level');
          setInceptNodes([]);
          setIsLoading(false);
          return;
        }

        // Step 2: Loop through count and get addresses
        const nodes: InceptNodeData[] = [];
        
        for (let i = 0; i < count; i++) {
          try {
            console.log(`Fetching node address at index ${i}...`);
            // Get node address
            const addressResult = await getInceptNodeAddress(provider, address, levelIndex, i);
            console.log(`Node address result at index ${i}:`, addressResult);
            
            if (!addressResult.success || !addressResult.address) {
              console.warn(`Failed to get address at index ${i}:`, addressResult.error);
              continue;
            }

            const nodeAddress = addressResult.address;
            console.log(`Found node address: ${nodeAddress}`);

            // Step 3: Get unit counts for this address (0-4)
            const             unitCounts = {
              sparkUp: 0,
              flickerRoar: 0,
              aiOverrider: 0,
              zyloApex: 0,
              zyloUniverse: 0,
              zyloInfinity: 0,
            };

            // Fetch unit counts for all 5 units (0-4)
            for (let unitIdx = 0; unitIdx < 5; unitIdx++) {
              try {
                console.log(`Fetching unit count ${unitIdx} for address ${nodeAddress}...`);
                const unitCountResult = await getUserUnitCountofTeam(provider, nodeAddress, unitIdx);
                console.log(`Unit count result for unit ${unitIdx}:`, unitCountResult);
                if (unitCountResult.success) {
                  const count = unitCountResult.count || 0;
                  switch (unitIdx) {
                    case 0:
                      unitCounts.sparkUp = count;
                      break;
                    case 1:
                      unitCounts.flickerRoar = count;
                      break;
                    case 2:
                      unitCounts.aiOverrider = count;
                      break;
                    case 3:
                      unitCounts.zyloApex = count;
                      break;
                    case 4:
                      unitCounts.zyloUniverse = count;
                      break;
                    case 5:
                      unitCounts.zyloInfinity = count;
                      break;
                  }
                }
              } catch (err) {
                console.warn(`Error fetching unit count ${unitIdx} for address ${nodeAddress}:`, err);
              }
            }

            console.log(`Unit counts for ${nodeAddress}:`, unitCounts);

            nodes.push({
              address: nodeAddress,
              unitCounts,
            });
          } catch (err) {
            console.error(`Error processing node at index ${i}:`, err);
          }
        }

        console.log('Total nodes found:', nodes.length);
        console.log('Nodes data:', nodes);
        setInceptNodes(nodes);
      } catch (err) {
        console.error('Error fetching incept nodes:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInceptNodes();
  }, [isConnected, address, walletClient, levelIndex]);

  // Pagination calculations
  const totalPages = Math.ceil(inceptNodes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNodes = inceptNodes.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="staking-levels-table" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <div className="table-container">
          <div className="empty-cell">
            <div className="empty-state">
              Please connect your wallet to view incept node details
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="staking-levels-table" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <div className="table-container">
        <div className="table-header">
          <h3 className="table-title">VORTEX ZONE {levelIndex + 1} - INCEPT NODE DETAILS</h3>
        </div>

        {isLoading && (
          <div className="loading-cell">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <span>Loading incept node details...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="empty-cell">
            <div className="empty-state" style={{ color: '#ff4444' }}>
              Error: {error}
            </div>
          </div>
        )}

        {!isLoading && !error && inceptNodes.length === 0 && (
          <div className="empty-cell">
            <div className="empty-state">
              No incept nodes found for this Vortex Zone.
            </div>
          </div>
        )}

        {!isLoading && !error && inceptNodes.length > 0 && (
          <>
            <div className="table-wrapper">
              <table className="levels-table" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    <th style={{ width: '8%' }}>#</th>
                    <th style={{ width: '20%' }}>Address</th>
                    {UNIT_NAMES.map((unitName, idx) => (
                      <th key={idx} style={{ width: '14.4%' }}>{unitName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentNodes.map((node, idx) => (
                    <tr key={`${node.address}-${idx}`} className="table-row">
                      <td className="level-cell">
                        <div className="level-info">
                          <span className="level-number">{startIndex + idx + 1}</span>
                        </div>
                      </td>
                      <td className="level-cell">
                        <div className="level-info">
                          <span className="level-number" title={node.address} style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                            {formatAddress(node.address)}
                          </span>
                        </div>
                      </td>
                      <td className="stake-cell">
                        <span className="stake-amount">{node.unitCounts.sparkUp}</span>
                      </td>
                      <td className="stake-cell">
                        <span className="stake-amount">{node.unitCounts.flickerRoar}</span>
                      </td>
                      <td className="stake-cell">
                        <span className="stake-amount">{node.unitCounts.aiOverrider}</span>
                      </td>
                      <td className="stake-cell">
                        <span className="stake-amount">{node.unitCounts.zyloApex}</span>
                      </td>
                      <td className="stake-cell">
                        <span className="stake-amount">{node.unitCounts.zyloUniverse}</span>
                      </td>
                      <td className="stake-cell">
                        <span className="stake-amount">{node.unitCounts.zyloInfinity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {inceptNodes.length > 0 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Showing {startIndex + 1}-{Math.min(endIndex, inceptNodes.length)} of {inceptNodes.length} nodes
                </div>
                <div className="pagination-controls">
                  <button
                    className="pagination-btn"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="pagination-btn"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InceptNodeDetailsTable;
