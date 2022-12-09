import { useEffect, useState } from 'react';

export const getHeaderImage = async (restaurantId: string, extension = 'jpg') => {
	try {
		const imageSrc = await import(`../../assets/restaurant-images/${restaurantId}-big.${extension}`);
		return imageSrc.default as string;
	} catch (e) {
		console.log(e);
		return '';
	}
};

export const useHeaderImage = (restaurantId: string) => {
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		getHeaderImage(restaurantId, 'avif').then((resolvedSrc) => {
			setImageSrc(resolvedSrc);
		});
	}, [restaurantId]);

	return imageSrc;
};
