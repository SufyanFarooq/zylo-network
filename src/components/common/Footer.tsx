'use client';

import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaWhatsapp, FaFacebook, FaInstagram, FaTelegram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import '../../app/home.css';


const Footer: React.FC = () => {
  return (
    <footer className="py-3" style={{ background: '#032233' }}>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-4">
              <div className="me-3" style={{
                width: '250px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
                <Image
                  src="/assets/logo.svg"
                  alt="Zillow Vortex Logo"
                  width={250}
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <p style={{
              lineHeight: '1.6',
              fontSize: '0.95rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '500'
            }}>
              Zillow Vortex is a decenteralized blockchain based POS (Proof of Shake) platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-white mb-4 fw-bold" style={{ fontSize: '1.1rem' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Home</Link></li>
              <li className="mb-2"><Link href="/incept-now" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Incept Now</Link></li>
              <li className="mb-2"><Link href="/power-up" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Power Up</Link></li>
              {/* <li className="mb-2"><a href="/withdraw" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Quick Outgo</a></li> */}
            </ul>
          </div>

          {/* Help */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-white mb-4 fw-bold" style={{ fontSize: '1.1rem' }}>Help</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="/vortex-zone" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Vortex Zone</Link></li>
              <li className="mb-2"><Link href="/promotions" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Promotions</Link></li>
              <li className="mb-2"><Link href="/ping-us" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Ping Us</Link></li>
              <li className="mb-2"><Link href="/presentation" className="text-decoration-none" style={{
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Presentation</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-white mb-4 fw-bold" style={{ fontSize: '1.1rem' }}>Follow Us</h5>
            <div className="d-flex flex-wrap gap-3">
              {/* Twitter/X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4"
                style={{
                  color: '#FCE400',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3)';
                  e.currentTarget.style.color = '#00d4a3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#FCE400';
                }}
              >
                <FaTwitter />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4"
                style={{
                  color: '#00d4a3',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3)';
                  e.currentTarget.style.color = '#FCE400';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#00d4a3';
                }}
              >
                <FaTelegram />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4"
                style={{
                  color: '#FCE400',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3)';
                  e.currentTarget.style.color = '#00d4a3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#FCE400';
                }}
              >
                <FaFacebook />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4"
                style={{
                  color: '#00d4a3',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3)';
                  e.currentTarget.style.color = '#FCE400';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#00d4a3';
                }}
              >
                <FaInstagram />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4"
                style={{
                  color: '#FCE400',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3)';
                  e.currentTarget.style.color = '#00d4a3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#FCE400';
                }}
              >
                <FaLinkedin />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="fs-4"
                style={{
                  color: '#00d4a3',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3)';
                  e.currentTarget.style.color = '#FCE400';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#00d4a3';
                }}
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-top" style={{ borderColor: '#00FFA3', borderWidth: '2px' }}>
          <div className="text-center pt-2 mt-2">
            <p className="mb-0" style={{
              fontSize: '0.9rem',
              opacity: '0.8',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '500'
            }}>
              © 2025 All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 