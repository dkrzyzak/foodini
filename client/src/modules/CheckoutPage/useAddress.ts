import Cookies from 'js-cookie';
import { getAddress, postAddress } from '../../api/addressRequests';
import { AddressFormValues } from './AddressForm/constants';

const useAddress = (
	isLoggedIn: boolean,
	token: string,
	setAddress: React.Dispatch<React.SetStateAction<AddressFormValues | undefined>>
) => {
	const handleInitialFormValues = async () => {
		if (isLoggedIn) {
			const addressFromApi = await getAddress(token);
			if (addressFromApi) {
				setAddress(addressFromApi);
			}
		} else {
			const addressFromCookie = Cookies.get('address');
			if (addressFromCookie) {
				setAddress(JSON.parse(addressFromCookie));
			}
		}
	};

	const saveSubmittedFormValues = async (address: AddressFormValues) => {
		if (isLoggedIn) {
			postAddress(address, token);
		} else {
			Cookies.set('address', JSON.stringify(address));
		}
	};

	return {
		handleInitialFormValues,
		saveSubmittedFormValues,
	};
};

export default useAddress;
