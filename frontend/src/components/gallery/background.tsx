import React, { FC } from 'react'

export const GalleryBackground: FC = () => {
	return (
		<div className="video-background">
			<iframe
				src="https://customer-316ghd8c1smenhic.cloudflarestream.com/2c54e9d33d279bbde4176fccb12c045f/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-316ghd8c1smenhic.cloudflarestream.com%2F2c54e9d33d279bbde4176fccb12c045f%2Fthumbnails%2Fthumbnail.jpg&controls=false"
				allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
				allowFullScreen={true}
			></iframe>
		</div>
	)
}
