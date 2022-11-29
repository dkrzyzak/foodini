export const priceFormat = (price: number) => {
	return price.toFixed(2).replace('.', ',') + ' zł';
};
