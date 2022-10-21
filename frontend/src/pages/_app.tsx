import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Web3Provider from '@/components/Web3Provider'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? (page => page)

	return (
		<ChakraProvider>
			<ThemeProvider attribute="class">
				<Web3Provider>{getLayout(<Component {...pageProps} />)}</Web3Provider>
			</ThemeProvider>
		</ChakraProvider>
	)
}

export default App
