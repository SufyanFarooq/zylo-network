import { cookieStorage, createStorage } from 'wagmi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - AppKit networks may have different exports
import { bscTestnet } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "361ae45c3ba2a0c5a70ef79b0de825eb"

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const networks = [ bscTestnet ] as [AppKitNetwork, ...AppKitNetwork[]]


export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig