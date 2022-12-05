import ConnectWallet from '@/components/ConnectWallet'
import { WalletContextProvider } from '@/providers/wallet'
import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function LayoutPrimary({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>
			<Container centerContent w="100vw">
				<WalletContextProvider>{children}</WalletContextProvider>
			</Container>
		</div>
	)
}
