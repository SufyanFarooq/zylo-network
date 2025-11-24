'use client';

import React from 'react';
import Image from 'next/image';

const WithdrawHero: React.FC = () => {
  return (
    <section className="py-5">
      <div className="row align-items-center">
        <div className="position-absolute mobile_view" style={{
          top: 0,
          left: "0%",
          // right: 0,
          // bottom: "-30%",
          zIndex: '0',
          // opacity: '0.6'
        }}>
          <Image
            src="/assets/secure/blue lines bg design.svg"
            alt="Blue Lines Background"
            width={700}
            height={500}
            style={{
              // objectFit: 'cover'
            }}
          />
        </div>
        {/* Left Side - Text Content */}
        <div className="col-lg-6 mb-4">
          <div className="text-start">
            <h1 className="text-yellow fw-bold display-3 mb-4" style={{
              textShadow: '2px 2px 4px rgba(254, 230, 0, 0.3)',
              letterSpacing: '2px'
            }}>
              Quick Outgo
            </h1>
            <p className="text-white fs-5" style={{
              lineHeight: '1.8',
              maxWidth: '500px'
            }}>
              You can Quick Outgo your ZYLO any time, any where,
              without any restriction. The minimum Quick Outgo
              amount is 1 ZYLO. You just need to pay 1.5% fee in the
              shape of ZYLO.
            </p>
          </div>
        </div>

        {/* Right Side - 3D Character and Coins */}
        <div className="col-lg-6 mb-4">

          <Image
            src="/assets/staking/babygorila.png"
            alt="Blue Lines Background"
            className='img-fluid'
            width={500}
            height={500}
            style={{
              // objectFit: 'cover'
            }}
          />
          {/* <div className="position-relative text-center">
          
            <div className="position-absolute" style={{
              top: '-50px',
              left: '-100px',
              right: '-50px',
              bottom: '-50px',
              zIndex: 0,
              opacity: 0.1,
              background: 'radial-gradient(circle at 30% 20%, var(--primary-yellow) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}></div>

    
            <div className="position-relative" style={{ zIndex: 1 }}>
           
              <div className="position-relative mb-4">
                <div style={{
                  width: '300px',
                  height: '300px',
                  margin: '0 auto',
                  position: 'relative'
                }}>
              
                  <div style={{
                    width: '200px',
                    height: '250px',
                    background: 'var(--primary-yellow)',
                    borderRadius: '50% 50% 40% 40%',
                    position: 'absolute',
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 10px 30px rgba(254, 230, 0, 0.3)'
                  }}></div>
                  
            
                  <div style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    border: '3px solid var(--primary-yellow)'
                  }}></div>

          
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#000',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '60px',
                    left: '50%',
                    transform: 'translateX(-30px)'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#000',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '60px',
                    left: '50%',
                    transform: 'translateX(22px)'
                  }}></div>

              
                  <div style={{
                    width: '80px',
                    height: '50px',
                    background: 'var(--primary-yellow)',
                    borderRadius: '8px',
                    position: 'absolute',
                    bottom: '80px',
                    left: '50%',
                    transform: 'translateX(-60px)',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                  }}>
                    <span style={{ 
                      color: '#000', 
                      fontWeight: 'bold', 
                      fontSize: '1.5rem' 
                    }}>V</span>
                  </div>

               
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--primary-yellow)',
                    borderRadius: '50%',
                    position: 'absolute',
                    bottom: '90px',
                    left: '50%',
                    transform: 'translateX(20px)',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)'
                  }}>
                    <span style={{ 
                      color: '#000', 
                      fontWeight: 'bold', 
                      fontSize: '1rem' 
                    }}>V</span>
                  </div>
                </div>
              </div>

           
              <div className="position-relative">
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '5px',
                  flexWrap: 'wrap',
                  maxWidth: '200px',
                  margin: '0 auto'
                }}>
                  {[1, 2, 3, 4, 5].map((coin, index) => (
                    <div
                      key={index}
                      style={{
                        width: '35px',
                        height: '35px',
                        background: 'var(--primary-yellow)',
                        borderRadius: '50%',
                        border: '2px solid #000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                        transform: `rotate(${index * 15}deg) translateY(${index * 2}px)`,
                        zIndex: index
                      }}
                    >
                      <span style={{ 
                        color: '#000', 
                        fontWeight: 'bold', 
                        fontSize: '0.9rem' 
                      }}>V</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore styled-jsx */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .character-container {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WithdrawHero; 