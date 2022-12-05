import { FC, useEffect, useState } from 'react'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LayoutPrimary from '@/layouts/primary'
import { useAccount } from 'wagmi'
import NFTsGallery from '@/components/nfts/gallery'
import { GalleryBackground } from '@/components/gallery/background'
import { Box } from '@chakra-ui/react'

const Gallery: FC = () => {
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
				<Box height="100vh">
					<GalleryBackground />
					<Box position="absolute" top={0}>
						<NFTsGallery address={userAddress} contractAddresses={[contractAddress]} />
					</Box>
				</Box>
			) : (
				<div>Please connect your wallet</div>
			)}
		</LayoutPrimary>
	)
}

export default Gallery
