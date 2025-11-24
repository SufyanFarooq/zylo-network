// 'use client';

// import React from 'react';
// import { FaPlay, FaCloudDownloadAlt } from 'react-icons/fa';
// import '../../app/home.css';

// const Hero: React.FC = () => {
//   return (
//     <section id="home" className="hero-section bg-image">
//       <div className="container">
//         <div className="row align-items-center">
//           {/* Left Content */}
//           <div className="col-lg-6 mb-5 mb-lg-0">
//             <h1 className="hero-title">
//               <span className="text-yellow">EARN FREE</span><br />
//               <span className="text-green">REWARD </span><span className="text-white">WITH</span><br />
//               <span className="text-yellow">ZILLOW VORTEX</span>
//             </h1>
//             <p className="hero-description">
//               Stake Zillow Vortex and Build Wealth Forever. Zillow Vortex is a decentralized 
//               blockchain based POS (Proof of Stake) platform. It utilizes state of the art 
//               blockchain technology to power its decentralized ecosystem.
//             </p>
//             <div className="d-flex gap-3 flex-wrap">
//               <button className="btn btn-download-app d-flex align-items-center">
//                 <FaCloudDownloadAlt className="me-2" />
//                 Download the App
//               </button>
//               <button className="btn btn-connect-chain">
//                 Connect With Zillow Chain
//               </button>
//             </div>
//           </div>

//           {/* Right Content - Abstract Graphic */}
//           <div className="col-lg-6">
//             <div className="hero-graphics">
//               {/* Green Card - Behind */}
//               <div 
//                 className="position-absolute"
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   backgroundColor: 'var(--primary-green)',
//                   borderRadius: '15px',
//                   transform: 'rotate(-8deg) translate(20px, 30px)',
//                   boxShadow: '0 0 25px rgba(0, 255, 163, 0.3)',
//                   zIndex: '1'
//                 }}
//               ></div>

//               {/* Yellow Card - Front */}
//               <div 
//                 className="position-absolute"
//                 style={{
//                   width: '200px',
//                   height: '250px',
//                   backgroundColor: 'var(--primary-yellow)',
//                   borderRadius: '15px',
//                   transform: 'rotate(5deg) translate(60px, 50px)',
//                   boxShadow: '0 0 25px rgba(254, 230, 0, 0.3)',
//                   zIndex: '2'
//                 }}
//               ></div>

//               {/* Play Button */}
//               <div 
//                 className="position-absolute d-flex align-items-center justify-content-center"
//                 style={{
//                   width: '45px',
//                   height: '45px',
//                   backgroundColor: 'var(--primary-yellow)',
//                   borderRadius: '50%',
//                   top: '25px',
//                   right: '140px',
//                   cursor: 'pointer',
//                   boxShadow: '0 0 15px rgba(254, 230, 0, 0.4)',
//                   transition: 'all 0.3s ease',
//                   zIndex: '3',
//                   border: '2px solid #000'
//                 }}
//               >
//                 <FaPlay className="text-dark" style={{ fontSize: '12px' }} />
//               </div>

//               {/* Zillow is Live Text */}
//               <div className="position-absolute" style={{ 
//                 top: '25px', 
//                 right: '190px',
//                 fontSize: '0.7rem',
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 zIndex: '3'
//               }}>
//                 Zillow is Live
//               </div>

//               {/* Sparkle Effects */}
//               <div className="position-absolute" style={{ top: '40px', left: '30px', zIndex: '3' }}>
//                 <span className="text-white" style={{ fontSize: '1rem' }}>✨</span>
//               </div>
//               <div className="position-absolute" style={{ top: '70px', right: '50px', zIndex: '3' }}>
//                 <span className="text-white" style={{ fontSize: '1rem' }}>✨</span>
//               </div>
//               <div className="position-absolute" style={{ bottom: '50px', left: '80px', zIndex: '3' }}>
//                 <span className="text-white" style={{ fontSize: '1rem' }}>✨</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero; 


'use client';

import React from 'react';
import Image from 'next/image';
import { FaPlay, FaCloudDownloadAlt } from 'react-icons/fa';
import './home.css';

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section bg-image">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="hero-title">
              <span className="text-yellow">EARN FREE</span><br />
              <span className="text-green">REWARD </span>
              <span className="text-white">WITH</span><br />
              <span className="text-yellow">ZILLOW VORTEX</span>
            </h1>

            <p className="hero-description">
            Power Up Zillow Vortex and Build Wealth Forever. Zillow Vortex is a decentralized
              blockchain based POS (Proof of Stake) platform. It utilizes state of the art
              blockchain technology to power its decentralized ecosystem.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <button
                className="btn btn-download-app d-flex align-items-center"
                style={{ color: '#000000' }}
                onClick={() => {
                  const downloadSection = document.querySelector('.download-app');
                  if (downloadSection) {
                    downloadSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  } else {
                    console.log('Download section not found');
                  }
                }}
              >
                <FaCloudDownloadAlt className="me-2" style={{ color: '#000000' }} />
                Download the App
              </button>

              <button
                className="btn btn-connect-chain"
                style={{ color: '#000000' }}
                onClick={() => {
                  window.location.href = '/incept-now';
                }}
              >
                Connect With Zillow Community
              </button>
            </div>
          </div>

          {/* Right Content - Card stack + Gorilla */}
          <div className="col-lg-6">
            <div className="hero-graphics position-relative">
              {/* Green Card - behind */}
              <div className="card-green" />

              {/* Yellow Card - front (gorilla is inside so it rotates with the card) */}
              <div className="card-yellow">
                <div className="gorilla-wrap">
                  <Image
                    src="/assets/heroimg.png"
                    alt="Baby gorilla holding Z coin"
                    width={540}
                    height={540}
                    priority
                    className="gorilla-img"
                  />
                </div>
              </div>

              {/* Play Button */}
              <div className="play-wrap">
                <FaPlay className="text-dark" style={{ fontSize: '12px' }} />
              </div>

              {/* Zillow is Live */}
              <div className="live-text">Zillow is Live</div>

              {/* Sparkles */}
              <span className="sparkle sparkle-a">✨</span>
              <span className="sparkle sparkle-b">✨</span>
              <span className="sparkle sparkle-c">✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
