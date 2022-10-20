import ConnectWallet from "@/components/ConnectWallet";
import { WalletContextProvider } from "@/providers/wallet";
import { ReactNode } from "react";

export default function LayoutPrimary({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
        <div className="absolute top-6 right-6">
          <ConnectWallet />
        </div>
        <main>
			    <WalletContextProvider>
            {children}  
			    </WalletContextProvider>
        </main>
      </div>
    </>
  )
}