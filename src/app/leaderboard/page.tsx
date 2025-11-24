'use client';

import React from 'react';
import Header from '@/components/common/Header';
import LeaderBoardHero from '@/components/leaderboard/LeaderBoardHero';
import LeaderBoardTable from '@/components/leaderboard/LeaderBoardTable';
import Footer from '@/components/common/Footer';

const LeaderBoardPage: React.FC = () => {
    return (
        <div className="leaderboard-page" style={{ background: '#032233', minHeight: '100vh' }}>
            <Header />
            <LeaderBoardHero />
            <LeaderBoardTable />
            <Footer />
        </div>
    );
};

export default LeaderBoardPage;
