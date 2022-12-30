import { useEffect, useState } from 'react';

type ImageVariant = 'sm' | 'xl';

export const getRestaurantImage = async (
	restaurantId: string,
	imageVariant: ImageVariant = 'xl',
	extension = 'jpg'
) => {
	const imageSuffix = imageVariant === 'xl' ? '-big' : '';

	try {
		const imageSrc = await import(
			`../assets/restaurant-images/${restaurantId}${imageSuffix}.${extension}`
		);
		return imageSrc.default as string;
	} catch (e) {
		return '';
	}
};

export const useRestaurantImage = (
	restaurantId: string,
	imageVariant: ImageVariant = 'xl',
	extension = 'jpg'
) => {
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		if (!restaurantId) {
			setImageSrc('');
		}

		getRestaurantImage(restaurantId, imageVariant, extension).then((resolvedSrc) => {
			setImageSrc(resolvedSrc);
		});
	}, [restaurantId, imageVariant, extension]);

	return imageSrc;
};
