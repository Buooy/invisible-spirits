import { FC, useEffect, useState } from 'react'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LayoutPrimary from '@/layouts/primary'
import { useAccount } from 'wagmi';
import Gallery from '@/components/nfts/gallery';

const Frame: FC = () => {
	const contractAddress = "0x809d8f2b12454fc07408d2479cf6dc701ecd5a9f"
	const [ userAddress, setUserAddress ] = useState<string | undefined>()
  const { address } = useAccount()

	useEffect(() => {
		setUserAddress(address)
	}, [address])

	return (
		<LayoutPrimary>
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="flex" style={{ backgroundColor: "#f9f8f4" }}>
				{
					userAddress
					?
					<Gallery
						address={userAddress}
						contractAddresses={[contractAddress]}
						/>
					:
					<div>Please connect your wallet</div>
				}
			</div>
		</LayoutPrimary>
	)
}

export default Frame
