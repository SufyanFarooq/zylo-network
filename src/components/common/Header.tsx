'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ConnectWallet from './ConnectWallet';
import { usePathname } from 'next/navigation';
import '../../app/home.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Navigation items object
  const navigationItems = [
    { name: 'Incept Now', href: '/incept-now' },
    { name: 'Power Up', href: '/power-up' },
    { name: 'Vortex Zone', href: '/vortex-zone' },
    { name: 'Milestone ', href: '/milestone' },
    { name: 'Vortex Leaderboard', href: '/vortex-leaderboard' },
    { name: 'ClaimX', href: '/claimx' },
    // { name: 'Quick Outgo', href: '/withdraw' },
    { name: 'Swappy', href: '/swappy' },
    { name: 'Ping Us', href: '/ping-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
      style={{
        background: '#032233',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(0, 255, 163, 0.2)'
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image
            src="/assets/logo.svg"
            // src="/zylo-logo.png"
            alt="Zillow Vortex"
            width={280}
            height={47}
            priority
            className="brand-img"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block'
            }}
            onError={(e) => {
              console.error('Logo failed to load');
              e.currentTarget.style.display = 'none';
            }}
          />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop & Mobile Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navigationItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link
                  className={`nav-link ${pathname === item.href ? 'nav-link-active' : ''}`}
                  href={item.href}
                  style={{ color: '#ffffff' }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center ms-3">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 