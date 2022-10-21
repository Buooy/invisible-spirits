/* eslint-disable @next/next/no-img-element */
import { FC, useEffect } from 'react'
import Image from 'next/image'
import { useWalletContext } from '@/providers/wallet'
import frameSingle from '@/assets/images/frame-single.jpeg'

const Gallery = ({ address, contractAddresses }: { address: string; contractAddresses: string[] }) => {
	const { nfts, fetchNfts } = useWalletContext()

	const getNfts = async () => {
		await fetchNfts(address, contractAddresses)
	}

	useEffect(() => {
		getNfts()
	}, [])

	return (
		<div className="flex justify-center">
			{nfts &&
				nfts.map(nft => (
					<div
						key={nft.title}
						className="flex w-1/3"
						style={{
							backgroundImage: `url("${frameSingle.src}")`,
							backgroundSize: 'contain',
							backgroundColor: '#f9f8f4',
							backgroundRepeat: 'no-repeat',
							height: '100vh',
						}}
					>
						<div
							className="relative text-center"
							style={{
								width: '40%',
								marginLeft: '29%',
								marginTop: '35%',
							}}
						>
							<img className="pb-2 flex" src={nft.media[0].gateway} alt="image" />
						</div>
					</div>
				))}
		</div>
	)
}

export default Gallery
