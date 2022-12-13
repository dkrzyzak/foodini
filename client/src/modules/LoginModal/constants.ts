export type ModalMode = 'login' | 'register';

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData extends LoginData {
	acceptTerms: boolean;
}

export interface FormErrors {
	email?: string;
	password?: string;
	acceptTerms?: boolean;
}

export const initialLoginData: LoginData = {
	email: '',
	password: '',
};

export const initialRegisterData: RegisterData = {
	email: '',
	password: '',
	acceptTerms: false,
};

// const testUser = { email: 'sraken@pierdaken.pl', password: 'apitest' };
