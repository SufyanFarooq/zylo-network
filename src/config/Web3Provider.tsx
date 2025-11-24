'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { wagmiAdapter, projectId, networks } from './web3'
// import { wagmiAdapter , projectId, networks } from '@/config/Web3'


const queryClient = new QueryClient()


const metadata = {
    name: 'next-reown-appkit',
    description: 'next-reown-appkit',
    url: 'http://localhost:3000/',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    metadata,
    themeMode: 'dark',
    features: {
        analytics: true
    },
    themeVariables: {
        '--w3m-accent': '#000000',
    }
})

// Debug modal initialization
console.log('AppKit modal created:', !!modal);
console.log('Project ID:', projectId);
console.log('Networks:', networks);

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider
