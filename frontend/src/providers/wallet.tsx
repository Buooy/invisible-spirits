import { getNfts } from '@/lib/alchemy';
import React, { createContext, FC, useContext, useState } from 'react'

type WalletProps = {
  children: React.ReactNode; // 👈️ type children
};

type TypeContext = {
  nfts?: any[],
  fetchNfts?: (_address: string, _contractAddresses?: string[]) => Promise<void>,
}

const WalletContext = createContext<TypeContext>({
  nfts: []
})

export const WalletContextProvider = ({ children }: WalletProps) => {
  const [nfts, setNfts] = useState([]);
  const fetchNfts = async (address: string,  contractAddresses = []) => {
    setNfts(await getNfts(address, contractAddresses));
  }
  
  return (
    <WalletContext.Provider
      value={{
        fetchNfts,
        nfts,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (context === undefined || context === null) {
    throw new Error(`useContextContext must be called within ContextProvider`)
  }
  return context
}