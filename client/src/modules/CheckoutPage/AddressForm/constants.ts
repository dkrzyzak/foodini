import * as yup from 'yup';

// prettier-ignore
export type AddressFormField = 'streetAndNr' | 'city' | 'postalCode' | 'phoneNr';

export type AddressFormValues = Record<AddressFormField, string>;

export interface AddressFormProps {
	onConfirmAddress: (address: AddressFormValues) => void;
	initialAddress?: AddressFormValues;
}

export const initialValues: AddressFormValues = {
	streetAndNr: '',
	city: '',
	postalCode: '',
	phoneNr: '',
};

export const addressFormValidateSchema = yup.object().shape({
	streetAndNr: yup
		.string()
		.required('To pole jest wymagane')
		.matches(/\S+\s{1}\S+/, 'Podaj prawidłowy adres')
		.min(5, 'Adres jest za krótki')
		.max(30, 'Adres jest za długi'),
	city: yup
		.string()
		.required('To pole jest wymagane')
		.min(2, 'Nazwa miasta jest za krótka')
		.max(25, 'Nazwa miasta jest za długa'),
	postalCode: yup
		.string()
		.required('To pole jest wymagane')
		.matches(/[0-9]{2}-[0-9]{3}/, 'Podaj prawidłowy kod pocztowy')
		.max(6, 'Za długi kod pocztowy'),
	phoneNr: yup
		.string()
		.required('To pole jest wymagane')
		.min(9, 'Nr telefonu jest za krótki')
		.max(9, 'Nr telefonu jest za długi'),
});
