'use client';

import { useEffect } from 'react';
import { modal } from '@/config/Web3Provider';

export default function AppKitModal() {
    useEffect(() => {
        console.log('AppKitModal component mounted');
        console.log('Modal available:', !!modal);

        // The modal should be automatically injected into the DOM
        // when the AppKit is properly initialized
    }, []);

    return null; // This component doesn't render anything
}

