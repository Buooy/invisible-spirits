/* eslint-disable @next/next/no-img-element */
import { FC, useEffect } from 'react'
import { useWalletContext } from '@/providers/wallet'
import frameSingle from '@/assets/images/frame-single.jpeg'
import { Box, Flex } from '@chakra-ui/react'

const Gallery = ({ address, contractAddresses }: { address: string; contractAddresses: string[] }) => {
	const { nfts, fetchNfts } = useWalletContext()

	const getNfts = async () => {
		await fetchNfts(address, contractAddresses)
	}

	useEffect(() => {
		getNfts()
	}, [])

	useEffect(() => {
		console.log(nfts)
	}, [nfts])

	return (
		<Flex w="100vw">
			{nfts &&
				nfts.map((nft, index) => (
					<Flex
						key={index}
						className="flex w-1/3"
						style={{
							backgroundImage: `url("${frameSingle.src}")`,
							backgroundSize: 'contain',
							backgroundPosition: 'center',
							backgroundColor: '#f9f8f4',
							backgroundRepeat: 'no-repeat',
							height: '100vh',
						}}
					>
						<Box
							className="relative text-center"
							style={{
								width: '40%',
								maxHeight: '300px',
								marginLeft: '29%',
								marginTop: '50%',
							}}
						>
							<img className="pb-2 flex" src={nft.media[0].gateway} alt="image" />
						</Box>
					</Flex>
				))}
		</Flex>
	)
}

export default Gallery
