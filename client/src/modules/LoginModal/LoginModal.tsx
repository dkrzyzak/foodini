import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, TransitionablePortal, Message } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/AuthContext';
import { loginUser, registerNewUser } from '../../utils/requests';
import * as C from './constants';
import * as V from './validators';

const LoginModal = () => {
	const { isLoginModalOpen, setIsLoginModalOpen, setIsLoggedIn, setToken } = useContext(AuthContext);
	const [modalMode, setModalMode] = useState<C.ModalMode>('login');
	const [loginData, setLoginData] = useState<C.LoginData>(C.initialLoginData);
	const [registerData, setRegisterData] = useState<C.RegisterData>(C.initialRegisterData);
	const [formErrors, setFromErrors] = useState<C.FormErrors>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	useEffect(() => {
		// cleanup on close
		if (!isLoginModalOpen) {
			setSuccessMsg('');
			setErrorMsg('');
			setLoginData(C.initialLoginData);
			setRegisterData(C.initialRegisterData);
			setFromErrors(undefined);
			setIsSubmitting(false);
		}
	}, [isLoginModalOpen]);

	const onChangeModalMode = (newModalMode: C.ModalMode) => () => {
		setModalMode(newModalMode);
		setFromErrors(undefined);
		setSuccessMsg('');
		setErrorMsg('');

		if (newModalMode === 'login') {
			setRegisterData(C.initialRegisterData);
		} else {
			setLoginData(C.initialLoginData);
		}
	};

	const onEmailChange = (modalMode: C.ModalMode) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		setFromErrors((prevErrors) => ({
			...prevErrors,
			email: undefined,
		}));

		if (modalMode === 'login') {
			setLoginData((prevData) => ({
				...prevData,
				email: newValue,
			}));
		} else {
			setRegisterData((prevData) => ({
				...prevData,
				email: newValue,
			}));
		}
	};

	const onPasswordChange = (modalMode: C.ModalMode) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		setFromErrors((prevErrors) => ({
			...prevErrors,
			password: undefined,
		}));

		if (modalMode === 'login') {
			setLoginData((prevData) => ({
				...prevData,
				password: newValue,
			}));
		} else {
			setRegisterData((prevData) => ({
				...prevData,
				password: newValue,
			}));
		}
	};

	const onAcceptTermsChange = () => {
		setFromErrors((prevErrors) => ({
			...prevErrors,
			acceptTerms: false,
		}));

		setRegisterData((prevData) => ({
			...prevData,
			acceptTerms: !prevData.acceptTerms,
		}));
	};

	const validateFormInputs = (modalMode: C.ModalMode): boolean => {
		const email = modalMode === 'login' ? loginData.email : registerData.email;

		const isEmailValid = V.validateEmail(email);
		if (!isEmailValid) {
			setFromErrors((prevErrors) => ({
				...prevErrors,
				email: 'Podany e-mail jest niepoprawny',
			}));
		}

		const password = modalMode === 'login' ? loginData.password : registerData.password;
		const { isValid: isPasswordValid, invalidationReason = '' } = V.validatePassword(password);
		if (!isPasswordValid) {
			setFromErrors((prevErrors) => ({
				...prevErrors,
				password: invalidationReason,
			}));
		}

		if (modalMode === 'register') {
			if (!registerData.acceptTerms) {
				setFromErrors((prevErrors) => ({
					...prevErrors,
					acceptTerms: true,
				}));

				return false;
			}
		}

		return isEmailValid && isPasswordValid;
	};

	const onLoginSubmit = async () => {
		const isValid = validateFormInputs('login');

		if (!isValid) {
			return;
		}

		setIsSubmitting(true);
		setErrorMsg('');
		setSuccessMsg('');

		const { success, failureReason = '', token = '' } = await loginUser(loginData.email, loginData.password);

		if (success) {
			setSuccessMsg('Zalogowano pomyślnie!');
			setToken(token);
			setIsLoggedIn(true);
			setLoginData(C.initialLoginData);
		} else {
			setErrorMsg(failureReason);
		}

		setIsSubmitting(false);
	};

	const onRegistrationSubmit = async () => {
		const isValid = validateFormInputs('register');

		if (!isValid) {
			return;
		}

		setIsSubmitting(true);
		setErrorMsg('');
		setSuccessMsg('');

		const { success, failureReason = '', token = '' } = await registerNewUser(registerData.email, registerData.password);

		if (success) {
			setSuccessMsg('Zarejestrowano pomyślnie!');
			setToken(token);
			setIsLoggedIn(true);
			setRegisterData(C.initialRegisterData);
		} else {
			setErrorMsg(failureReason);
		}

		setIsSubmitting(false);
	};

	const onDismissSuccessMsg = () => {
		setSuccessMsg('');
	};

	const onDismissErrorMsg = () => {
		setErrorMsg('');
	};

	return (
		<TransitionablePortal
			open={isLoginModalOpen}
			transition={{
				animation: 'scale',
				duration: 200,
			}}
		>
			<Modal onClose={() => setIsLoginModalOpen(false)} open dimmer='blurring' size='mini'>
				{modalMode === 'login' ? (
					<>
						<Modal.Header>Zaloguj się</Modal.Header>
						<Modal.Content>
							<Form success={!!successMsg} error={!!errorMsg}>
								<Form.Field
									autoFocus
									label='E-mail'
									control={Input}
									placeholder='E-mail...'
									value={loginData.email}
									onChange={onEmailChange('login')}
									{...(formErrors?.email
										? {
												error: {
													content: formErrors.email,
													pointing: 'below',
												},
										  }
										: {})}
								/>
								<Form.Field
									label='Hasło'
									control={Input}
									placeholder='Hasło...'
									type='password'
									value={loginData.password}
									onChange={onPasswordChange('login')}
									{...(formErrors?.password
										? {
												error: {
													content: formErrors.password,
													pointing: 'below',
												},
										  }
										: {})}
								/>
								<Button.Group>
									<Button color='red' type='submit' onClick={onLoginSubmit} loading={isSubmitting}>
										Zaloguj się!
									</Button>
									<Button.Or text='lub' />
									<Button onClick={onChangeModalMode('register')} loading={isSubmitting}>
										Załóż konto!
									</Button>
								</Button.Group>

								{successMsg && <Message success header={successMsg} onDismiss={onDismissSuccessMsg} />}
								{errorMsg && <Message error header='Wystąpił błąd' content={errorMsg} onDismiss={onDismissErrorMsg} />}
							</Form>
						</Modal.Content>
					</>
				) : (
					<>
						<Modal.Header>Załóż konto</Modal.Header>
						<Modal.Content>
							<Form success={!!successMsg} error={!!errorMsg}>
								<Form.Field
									autoFocus
									label='E-mail'
									control={Input}
									placeholder='E-mail...'
									value={registerData.email}
									onChange={onEmailChange('register')}
									{...(formErrors?.email
										? {
												error: {
													content: formErrors.email,
													pointing: 'below',
												},
										  }
										: {})}
								/>
								<Form.Field
									label='Hasło'
									control={Input}
									placeholder='Hasło...'
									type='password'
									value={registerData.password}
									onChange={onPasswordChange('register')}
									{...(formErrors?.password
										? {
												error: {
													content: formErrors.password,
													pointing: 'below',
												},
										  }
										: {})}
								/>
								<Form.Checkbox
									label='Zgadzam się z postanowieniami regulaminu'
									checked={registerData.acceptTerms}
									onChange={onAcceptTermsChange}
									error={formErrors?.acceptTerms}
								/>
								<Button.Group>
									<Button color='red' type='submit' onClick={onRegistrationSubmit} loading={isSubmitting}>
										Załóż konto!
									</Button>
									<Button.Or text='lub' />
									<Button onClick={onChangeModalMode('login')} loading={isSubmitting}>
										Zaloguj się!
									</Button>
								</Button.Group>

								{successMsg && <Message success header={successMsg} onDismiss={onDismissSuccessMsg} />}
								{errorMsg && <Message error header='Wystąpił błąd' content={errorMsg} onDismiss={onDismissErrorMsg} />}
							</Form>
						</Modal.Content>
					</>
				)}
			</Modal>
		</TransitionablePortal>
	);
};

export default LoginModal;
