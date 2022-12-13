import * as yup from 'yup';

export type PaymentFormField = 'blikCode';
export type PaymentFormValues = Record<PaymentFormField, string>;

export const initialValues: PaymentFormValues = {
	blikCode: '',
};

export const paymentFormValidationSchema = yup.object().shape({
	blikCode: yup
		.string()
		.required('Podaj kod BLIK')
		.min(7, 'Kod za krótki')
		.max(7, 'Kod za długi')
		.matches(/[0-9]{3}\s[0-9]{3}/, 'Niepoprawny kod'),
});
