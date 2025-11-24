'use client';

import React from 'react';
import './WithdrawHero.css';

interface WithdrawalRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const WithdrawalRequestModal: React.FC<WithdrawalRequestModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Quick Outgo Request</h3>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <p>Are you sure you want to Quick Outgo your rewards?</p>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={onConfirm}>
                        Confirm Quick Outgo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalRequestModal;
