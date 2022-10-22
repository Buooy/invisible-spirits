import { Network, Alchemy, OwnedNft, NftContract } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID, // Replace with your Alchemy API Key.
  network: Network[process.env.NEXT_PUBLIC_ALCHEMY_NETWORK],
};

const alchemy = new Alchemy(settings);

export default alchemy;

export const getNfts = async (address: string, contractAddresses?: string[]): Promise<OwnedNft[]> => {
  const options: {
    omitMetadata: boolean,
    contractAddresses?: string[]
  } = {
    omitMetadata: false
  }

  if (contractAddresses && Array.isArray(contractAddresses)) options.contractAddresses = contractAddresses 

  const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, options);
  return ownedNfts;
}

export const getCollectionsMetadata = async (contractAddresses: string[]): Promise<NftContract[]> => {
  const collections = []
  for (const key in contractAddresses) {
    console.log(contractAddresses[key])
    collections.push(await alchemy.nft.getContractMetadata(contractAddresses[key]))
  }
  return collections
}

export const sortNfts = (nfts: OwnedNft[]) => {
  const groupItemBy = (array, property) => {
    var hash = {},
        props = property.split('.');
    for (var i = 0; i < array.length; i++) {
        var key = props.reduce(function(acc, prop) {
            return acc && acc[prop];
        }, array[i]);
        if (!hash[key]) hash[key] = [];
        hash[key].push(array[i]);
    }
    return hash;
  }

  return groupItemBy(nfts, 'contract.address');
}