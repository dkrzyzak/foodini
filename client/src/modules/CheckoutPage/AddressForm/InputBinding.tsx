import React from 'react';
import { Form } from 'semantic-ui-react';
import { FieldProps } from 'formik';

type InputBindingProps = FieldProps & { label: string; error: string };

const InputBinding = ({ field, form, label, error }: InputBindingProps) => {
	const { name } = field;
	const { setFieldValue } = form;

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFieldValue(name, event.target.value);
	};
	return (
		<Form.Field>
			<Form.Input type='text' label={label} onChange={onChange} error={error} />
		</Form.Field>
	);
};

export default InputBinding;
