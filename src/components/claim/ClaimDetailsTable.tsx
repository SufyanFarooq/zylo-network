'use client';

import React, { useState } from 'react';
import './ClaimDetailsTable.css';

const ClaimDetailsTable: React.FC = () => {
    // Empty records - no data
    const claimRecords: never[] = [];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pagination logic
    const totalPages = Math.max(1, Math.ceil(claimRecords.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // Note: currentRecords is not used since we're showing empty state
    // const currentRecords = claimRecords.slice(startIndex, endIndex);

    return (
        <section className="claim-details-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="claim-details-card">
                            <div className="card-header">
                                <h3 className="card-title text-center w-100">
                                Outgo History
                                </h3>
                            </div>

                            <div className="card-body">
                                {claimRecords.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                                        <p className="text-white-50">No Withdraw records found</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-container">
                                            <table className="table claim-table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Withdraw AMOUNT</th>
                                                        <th>Withdraw TIME</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* No records to display */}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Records info and Pagination */}
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <small className="text-muted">
                                                Showing {startIndex + 1}-{Math.min(endIndex, claimRecords.length)} of {claimRecords.length} ClaimX
                                            </small>

                                            <div className="pagination-controls">
                                                <button
                                                    className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                    disabled={currentPage === 1}
                                                >
                                                    Previous
                                                </button>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <button
                                                        key={page}
                                                        className={`page-link ${currentPage === page ? 'active' : ''}`}
                                                        onClick={() => setCurrentPage(page)}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}

                                                <button
                                                    className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
                                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClaimDetailsTable;

