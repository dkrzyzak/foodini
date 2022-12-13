import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { FieldProps } from 'formik';

type InputBindingProps = FieldProps & {
	label: string;
	value: string;
	error: string;
	placeholder?: string;
};

const InputBinding = ({
	field,
	form,
	label,
	value,
	error,
	placeholder,
}: InputBindingProps) => {
	const { name } = field;
	const { setFieldValue } = form;

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue(name, event.target.value);
	};

	useEffect(() => {
		setFieldValue(name, value);
		// eslint-disable-next-line
	}, [value]);

	return (
		<Form.Field>
			<Form.Input
				type='text'
				label={label}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				error={error}
			/>
		</Form.Field>
	);
};

export default InputBinding;
