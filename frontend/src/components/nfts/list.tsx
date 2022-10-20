import { FC, useEffect, useState } from 'react'
import { useWalletContext } from '@/providers/wallet';
import { useAccount } from 'wagmi';
import { getCollectionsMetadata, sortNfts } from '@/lib/alchemy';
import { OwnedNft } from 'alchemy-sdk';

const NftsList: FC = () => {
  const [sortedNfts, setSortedNfts] = useState({})
	const { nfts, fetchNfts } = useWalletContext()
  const { address } = useAccount()

	useEffect(() => {
		fetchNfts(address);
	}, []);

  useEffect(() => {
    const _nfts = sortNfts(nfts)
    const contracts = getCollectionsMetadata(Object.keys(_nfts))
    console.log(contracts)
    setSortedNfts(_nfts)
  }, [nfts])

  const listItem = (nft, address) => {
    return <div className="flex items-center" key={address}>
      <div className="text-lg leading-7 font-semibold">
        <a
          href="https://nextjs.org/docs"
          className="underline text-gray-900 dark:text-white"
        >
          { nft.title }
        </a>
      </div>
    </div>
  }

  const listItems = (nfts: Record<string, OwnedNft[]>) => {
    return Object.keys(sortedNfts).map(contractAddress => {
      return <div className="" key={contractAddress}>
        { nfts[contractAddress].map(listItem) }
      </div>
    })
  }

	return (
    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        { listItems(sortedNfts) }
      </div>
    </div>
	)
}

export default NftsList
