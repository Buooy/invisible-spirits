import contractAbi from '@/assets/abis/BaseContract.json'
import { Button, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import { useContract, useSigner } from 'wagmi'

type StakingButtonProps = {
	tokenId: string
	isStaked: boolean
	getStakedNfts: Function
}

const StakingButton = ({ tokenId, isStaked, getStakedNfts }: StakingButtonProps) => {
	const { data: signer } = useSigner()
	const [isLoading, setIsLoading] = useState(false)

	const contract = useContract({
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		contractInterface: JSON.stringify(contractAbi.abi),
		signerOrProvider: signer,
	})

	const stake = async () => {
		try {
			setIsLoading(true)
			let nftTxn = await contract.stake(tokenId)
			await nftTxn.wait()
			console.log(nftTxn)
			console.log(`NFT Staked! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
			getStakedNfts()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const unstake = async () => {
		try {
			setIsLoading(true)
			let nftTxn = await contract.unstake(tokenId)
			await nftTxn.wait()
			console.log(nftTxn)
			console.log(`NFT Unstaked! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
			getStakedNfts()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button borderRadius="full" px={10} onClick={isStaked ? unstake : stake} disabled={isLoading}>
			{isStaked ? 'Unstake' : 'Stake'}
			{isLoading && <Spinner size="sm" ml={3} />}
		</Button>
	)
}

export default StakingButton
