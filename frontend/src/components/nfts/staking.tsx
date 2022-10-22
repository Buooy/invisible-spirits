/* eslint-disable @next/next/no-img-element */
import contractAbi from '@/assets/abis/BaseContract.json'
import { useEffect, useState } from 'react'
import { useWalletContext } from '@/providers/wallet'
import frameSingle from '@/assets/images/frame-single.jpeg'
import { Box, Flex } from '@chakra-ui/react'
import StakingButton from './StakingButton'
import { useSigner, useContract } from 'wagmi'

const Staking = ({ address, contractAddresses }: { address: string; contractAddresses: string[] }) => {
	const { nfts, fetchNfts } = useWalletContext()
	const { data: signer, isError, isLoading } = useSigner()
	const [stakedNfts, setStakedNfts] = useState([])

	const contract = useContract({
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		contractInterface: JSON.stringify(contractAbi.abi),
		signerOrProvider: signer,
	})

	const getNfts = async () => {
		await fetchNfts(address, contractAddresses)
	}

	const getStakedNfts = async () => {
		try {
			const _stakedNfts = await contract.getStakedNfts()
			setStakedNfts(_stakedNfts)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getNfts()
		getStakedNfts()
	}, [])

	return (
		<Flex w="100vw" bg="#f9f8f4" justifyContent="center">
			{nfts &&
				nfts.map((nft, index) => (
					<Flex
						key={index}
						className="flex w-1/3"
						style={{
							backgroundImage: `url("${frameSingle.src}")`,
							backgroundSize: 'contain',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							height: '100vh',
						}}
					>
						<Box
							className="relative text-center"
							style={{
								width: '40%',
								maxHeight: '300px',
								marginLeft: '30%',
								marginTop: '50%',
							}}
						>
							<img className="pb-2 flex" src={nft.media[0].gateway} alt="image" />
							{stakedNfts && (
								<StakingButton
									tokenId={nft.tokenId}
									isStaked={stakedNfts[nft.tokenId] && stakedNfts[nft.tokenId].toNumber() !== 0}
									getStakedNfts={getStakedNfts}
								/>
							)}
						</Box>
					</Flex>
				))}
		</Flex>
	)
}

export default Staking
