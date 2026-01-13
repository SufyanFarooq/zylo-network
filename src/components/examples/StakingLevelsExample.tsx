'use client';

import React, { useState } from 'react';
import StakingLevelsTable from '../common/StakingLevelsTable';

const StakingLevelsExample: React.FC = () => {
    // Allow selecting which unit to display
    const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);

    const unitOptions = [
        { value: 0, label: 'Spark Up' },
        { value: 1, label: 'Flicker Roar' },
        { value: 2, label: 'AI Overrider' },
        { value: 3, label: 'Zylo Apex' },
        { value: 4, label: 'Zylo Universe' },
        { value: 5, label: 'Zylo Infinity' }
    ];

    return (
        <div className="staking-levels-example">
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="unit-selector" style={{
                            background: 'linear-gradient(145deg, #0a0a1a 0%, #0f0f23 50%, #1a1a2e 100%)',
                            borderRadius: '15px',
                            padding: '2rem',
                            border: '2px solid rgba(254, 231, 57, 0.3)',
                            boxShadow: '0 8px 32px rgba(254, 231, 57, 0.2)',
                        }}>
                            <h4 style={{ color: '#FEE739', marginBottom: '1.5rem', textAlign: 'center' }}>
                                Select Unit to View Power Up History
                            </h4>
                            <div className="d-flex justify-content-center gap-2 flex-wrap">
                                {unitOptions.map((unit) => (
                                    <button
                                        key={unit.value}
                                        onClick={() => setSelectedUnitIndex(unit.value)}
                                        style={{
                                            background: selectedUnitIndex === unit.value
                                                ? 'rgba(254, 231, 57, 0.2)'
                                                : 'rgba(254, 231, 57, 0.1)',
                                            border: '2px solid #FEE739',
                                            color: '#FEE739',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            fontSize: '0.9rem',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(254, 231, 57, 0.2)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = selectedUnitIndex === unit.value
                                                ? 'rgba(254, 231, 57, 0.2)'
                                                : 'rgba(254, 231, 57, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        {unit.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <StakingLevelsTable
                            selectedUnit={selectedUnitIndex}
                            className="mb-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakingLevelsExample;

