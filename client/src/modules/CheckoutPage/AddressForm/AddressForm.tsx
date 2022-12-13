import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import InputBinding from '../../InputBindings/InputBinding';
import * as C from './constants';

const AddressForm = ({ initialAddress, onConfirmAddress }: C.AddressFormProps) => {
	const [shouldValidateOnChange, setValidateOnChange] = useState(false);

	const onSubmit = (values: C.AddressFormValues) => {
		onConfirmAddress(values);
	};

	return (
		<>
			<h2>Adres dostawy</h2>
			<Formik
				enableReinitialize
				initialValues={initialAddress || C.initialValues}
				onSubmit={onSubmit}
				validationSchema={C.addressFormValidateSchema}
				validateOnChange={shouldValidateOnChange}
				validateOnBlur={shouldValidateOnChange}
			>
				{({ handleSubmit, errors, values }) => (
					<Form
						onSubmit={(e: React.FormEvent) => {
							e.preventDefault();
							setValidateOnChange(true);
							handleSubmit();
						}}
					>
						<Field
							name='streetAndNr'
							label='Ulica i numer'
							placeholder='Ulica i numer...'
							value={values.streetAndNr}
							error={errors.streetAndNr}
							component={InputBinding}
						/>
						<Field
							name='city'
							label='Miasto'
							placeholder='Miasto...'
							value={values.city}
							error={errors.city}
							component={InputBinding}
						/>
						<Field
							name='postalCode'
							label='Kod pocztowy'
							placeholder='Kod pocztowy...'
							value={values.postalCode}
							error={errors.postalCode}
							component={InputBinding}
						/>
						<Field
							name='phoneNr'
							label='Numer telefonu'
							placeholder='Numer telefonu...'
							value={values.phoneNr}
							error={errors.phoneNr}
							component={InputBinding}
						/>

						<Button primary type='submit' disabled={Object.keys(errors).length > 0}>
							Zatwierdź
						</Button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AddressForm;
