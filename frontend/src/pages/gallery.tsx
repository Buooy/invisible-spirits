import { FC, useEffect, useState } from 'react'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LayoutPrimary from '@/layouts/primary'
import { useAccount } from 'wagmi'
import Gallery from '@/components/nfts/gallery'
import { Container } from '@chakra-ui/react'

const Frame: FC = () => {
	const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
	const [userAddress, setUserAddress] = useState<string | undefined>()
	const { address } = useAccount()

	useEffect(() => {
		setUserAddress(address)
	}, [address])

	return (
		<LayoutPrimary>
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			{userAddress ? (
				<Gallery address={userAddress} contractAddresses={[contractAddress]} />
			) : (
				<div>Please connect your wallet</div>
			)}
		</LayoutPrimary>
	)
}

export default Frame
