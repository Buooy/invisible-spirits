import { FC, useEffect, useState } from 'react'
import { useAccount, useContract, useSigner } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { APP_NAME } from '@/lib/consts'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LayoutPrimary from '@/layouts/primary'
import contractAbi from '@/assets/abis/BaseContract.json'
import { ethers } from 'ethers'
import { Button, Text, Spinner } from '@chakra-ui/react'

const Mint: FC = () => {
	const [isMinting, setIsMinting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const { data: signer, isError, isLoading } = useSigner()
	const { isConnected } = useAccount()

	const contract = useContract({
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		contractInterface: JSON.stringify(contractAbi.abi),
		signerOrProvider: signer,
	})

	const mint = async () => {
		setIsMinting(true)
		let nftTxn = await contract.safeMint(1, { value: ethers.utils.parseEther('0.1') })
		await nftTxn.wait()
		console.log(nftTxn)
		console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
		setIsMinting(false)
	}

	return (
		<LayoutPrimary>
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
				<div className="flex justify-center pb-8 sm:justify-start sm:pt-0">
					<h1 className="text-6xl font-bold dark:text-white">{APP_NAME}</h1>
				</div>
				<div className="flex justify-center pt-8 sm:pt-0">
					{isLoading ? (
						<Spinner size="2xl" />
					) : isConnected ? (
						<Button w="100px" borderRadius="full" onClick={mint} disabled={isMinting}>
							{isMinting ? <Spinner /> : <Text>Mint</Text>}
						</Button>
					) : (
						<ConnectKitButton />
					)}
				</div>
			</div>
		</LayoutPrimary>
	)
}

export default Mint
