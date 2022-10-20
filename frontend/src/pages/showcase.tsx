import { FC, useEffect } from 'react'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LayoutPrimary from '@/layouts/primary'
import NftsList from '@/components/nfts/list';

const Showcase: FC = () => {
	return (
		<LayoutPrimary>
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
				<div className="flex justify-start pt-8 sm:pt-0">
					<h1 className="text-6xl font-bold dark:text-white">My NFTs</h1>
				</div>

				<NftsList />
			</div>
		</LayoutPrimary>
	)
}

export default Showcase
