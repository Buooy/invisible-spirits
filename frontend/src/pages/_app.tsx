import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Web3Provider from '@/components/Web3Provider'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	// Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

	return  (
		<ThemeProvider attribute="class">
			<Web3Provider>
				{
					getLayout(
						<Component {...pageProps} />
					)
				}
			</Web3Provider>
		</ThemeProvider>
	)
}

export default App
