/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { useWalletContext } from '@/providers/wallet'
import frameSingle from '@/assets/images/frame-square.png'
import { Box, Flex, Grid } from '@chakra-ui/react'

const Gallery = ({ address, contractAddresses }: { address: string; contractAddresses: string[] }) => {
	const { nfts, fetchNfts } = useWalletContext()

	const getNfts = async () => {
		await fetchNfts(address, contractAddresses)
	}

	useEffect(() => {
		getNfts()
	}, [])

	return (
		<Flex width="100vw">
			<Grid templateColumns="repeat(5, 1fr)" gap={0} overflow="auto	">
				{nfts &&
					nfts.map((nft, index) => (
						<Flex key={index} height="100vh" width="100vw" alignItems="center" justifyContent="center">
							<Flex
								height="340px"
								width="340px"
								style={{
									backgroundImage: `url("${frameSingle.src}")`,
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
								}}
							>
								<Box
									className="relative text-center"
									height="220px"
									marginTop="calc((340px - 220px + 12px) /2)"
									marginLeft="calc((340px - 220px + 12px) /2)"
								>
									<img className="pb-2 flex h-full" src={nft.media[0].gateway} alt="image" />
								</Box>
							</Flex>
						</Flex>
					))}
			</Grid>
		</Flex>
	)
}

export default Gallery
