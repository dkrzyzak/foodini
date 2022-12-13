import React, { useEffect, useState } from 'react';
import { Form, Input, Label } from 'semantic-ui-react';
import { FieldProps } from 'formik';
import styled from 'styled-components';

type InputBindingProps = FieldProps & {
	label: string;
	value: string;
	error: string;
	placeholder?: string;
};

const StyledInput = styled(Input)`
	width: 140px;
`;

const StyledLabel = styled(Label)`
	margin-left: 160px !important;
`;

const InputWithLabelBinding = ({
	field,
	form,
	label,
	value,
	error,
	placeholder,
}: InputBindingProps) => {
	const { name } = field;
	const { setFieldValue } = form;
	const [prevValue, setPrevValue] = useState(value);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const currentValue = event.target.value;

		if (currentValue.length > 7) {
			return;
		}

		if (prevValue.length < 3 && currentValue.length === 3) {
			setFieldValue(name, currentValue + ' ');
			setPrevValue(currentValue + ' ');
			return;
		}

		if (prevValue.length > 4 && currentValue.length === 4) {
			setFieldValue(name, currentValue.slice(0, -1));
			setPrevValue(currentValue.slice(0, -1));
			return;
		}

		setFieldValue(name, currentValue);
		setPrevValue(currentValue);
	};

	useEffect(() => {
		setFieldValue(name, value);
		// eslint-disable-next-line
	}, [value]);

	return (
		<Form.Field>
			<StyledInput
				type='text'
				size='massive'
				label={label}
				value={value}
				error={!!error}
				placeholder={placeholder}
				onChange={onChange}
			/>

			{error && (
				<StyledLabel basic color='red' pointing='left' size='huge'>
					{error}
				</StyledLabel>
			)}
		</Form.Field>
	);
};

export default InputWithLabelBinding;
