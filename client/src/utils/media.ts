import { createMedia } from '@artsy/fresnel';

const { Media, MediaContextProvider } = createMedia({
	breakpoints: {
		zero: 0,
		mobile: 320,
		tablet: 768,
		desktop: 1200,
	},
});

export { Media, MediaContextProvider };
