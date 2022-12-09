import React from 'react';
import { Formik, Field } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import InputBinding from './InputBinding';

interface AddressFormProps {}

type AddressFormField = 'street' | 'buildingNr' | 'city' | 'postalCode' | 'phoneNr';
type AddressFormValues = Record<AddressFormField, string>;

const initialValues: AddressFormValues = {
	street: '',
	buildingNr: '',
	city: '',
	postalCode: '',
	phoneNr: '',
};

const AddressForm = (props: AddressFormProps) => {
	const onSubmit = (values: AddressFormValues) => {
		console.log(values);
	};

	// TODO: zamienić na YUP
	const validate = (values: AddressFormValues) => {
		const errors: Partial<Record<AddressFormField, string>> = {};

		Object.entries(values).forEach(([fieldName, fieldValue]) => {
			if (!fieldValue) {
				errors[fieldName as AddressFormField] = 'Pole wymagane';
				return;
			}

			// walidacja po regexach do konkretnych pól
		});

		return errors;
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
			{({ handleSubmit, errors, handleChange }) => (
				<Form onSubmit={handleSubmit}>
					<Field name='street' label='Ulica' error={errors.street} component={InputBinding} />
					<Field name='buildingNr' label='Numer budynku' error={errors.buildingNr} component={InputBinding} />
					<Field name='city' label='Miasto' error={errors.city} component={InputBinding} />
					<Field name='postalCode' label='Kod pocztowy' error={errors.postalCode} component={InputBinding} />
					<Field name='phoneNr' label='Numer telefonu' error={errors.phoneNr} component={InputBinding} />

					<Button type='submit' disabled={Object.keys(errors).length > 0}>
						Zatwierdź
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default AddressForm;
