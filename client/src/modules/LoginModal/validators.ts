const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email: string) => {
	if (!email) {
		return false;
	}

	return emailRegex.test(email);
};

interface PasswordReturnValue {
	isValid: boolean;
	invalidationReason?: string;
}

export const validatePassword = (password: string): PasswordReturnValue => {
	if (password.length < 6) {
		return {
			isValid: false,
			invalidationReason: 'Hasło jest za krótkie',
		};
	}

	if (password.length > 20) {
		return {
			isValid: false,
			invalidationReason: 'Hasło jest za długie',
		};
	}

	if (/\W/.test(password)) {
		return {
			isValid: false,
			invalidationReason: 'Hasło zawiera niedozwolone znaki',
		};
	}

	return {
		isValid: true,
	};
};
