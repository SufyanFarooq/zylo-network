'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

interface ToastProps {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id: _id, message, type, duration = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose(_id), 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose, _id]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle className="text-success" />;
            case 'error':
                return <FaExclamationTriangle className="text-danger" />;
            case 'warning':
                return <FaExclamationTriangle className="text-warning" />;
            case 'info':
                return <FaInfoCircle className="text-info" />;
            default:
                return <FaInfoCircle className="text-info" />;
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            case 'error':
                return 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
            case 'warning':
                return 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
            case 'info':
                return 'linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)';
            default:
                return 'linear-gradient(135deg, #6c757d 0%, #495057 100%)';
        }
    };

    return (
        <div
            className={`toast-notification ${isVisible ? 'show' : 'hide'}`}
            style={{
                background: getBackgroundColor(),
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                minWidth: '350px',
                maxWidth: '500px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'white',
                fontWeight: '500',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
                opacity: isVisible ? 1 : 0,
            }}
        >
            {/* Icon */}
            <div style={{ fontSize: '20px', flexShrink: 0 }}>
                {getIcon()}
            </div>

            {/* Message */}
            <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.4' }}>
                {message}
            </div>

            {/* Close Button */}
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onClose(_id), 300);
                }}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '4px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease',
                    flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
                <FaTimes />
            </button>

            {/* Progress Bar */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '3px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    animation: `progress ${duration}ms linear forwards`,
                }}
            />

            <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .toast-notification.hide {
          transform: translateX(100%);
          opacity: 0;
        }

        .toast-notification.show {
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default Toast;
