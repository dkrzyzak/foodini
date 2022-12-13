import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Icon, Message } from 'semantic-ui-react';
import * as C from './constants';
import BlikCodeInput from '../../InputBindings/BlikCodeInput';
import blikIcon from '../../../assets/blik-logo.png';

interface PaymentFormProps {
	onPlaceOrder: () => void;
}

const PaymentForm = ({ onPlaceOrder }: PaymentFormProps) => {
	const [shouldValidateOnChange, setValidateOnChange] = useState(false);

	const onSubmit = (values: C.PaymentFormValues) => {
		console.log(values);
		onPlaceOrder();
	};

	return (
		<div>
			<h2>Płatność</h2>
			<Message info>
				<Message.Header>Nasza strona jest obsługiwana przez BLIK</Message.Header>
				<img style={{ width: 100, marginTop: 10 }} src={blikIcon} alt='Logo BLIK' />
			</Message>
			<Formik
				initialValues={C.initialValues}
				onSubmit={onSubmit}
				validationSchema={C.paymentFormValidationSchema}
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
							name='blikCode'
							label='Kod BLIK:'
							placeholder='123 456'
							value={values.blikCode}
							error={errors.blikCode}
							component={BlikCodeInput}
						/>

						<Message warning>
							<Message.Header>Uwaga!</Message.Header>
							<p>
								Klikając "Złóż zamówienie" zobowiązujesz się do opłacenia i
								odbioru bieżącego zamówienia pod podanym adresem.
							</p>
						</Message>

						<Button
							icon
							labelPosition='left'
							type='submit'
							size='large'
							color='blue'
						>
							<Icon name='payment' />
							Złóż zamówienie
						</Button>
					</Form>
				)}
			</Formik>

			{/* <Progress percent={20} indicating /> */}
		</div>
	);
};

export default PaymentForm;
