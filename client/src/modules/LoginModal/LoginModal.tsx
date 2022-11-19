import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Checkbox, TransitionablePortal } from 'semantic-ui-react';
import { AuthContext } from '../../contexts/AuthContext';

interface LoginModalProps {}

type ModalMode = 'login' | 'register';

const LoginModal = (props: LoginModalProps) => {
	const { isLoginModalOpen, setIsLoginModalOpen } = useContext(AuthContext);
	const [modalMode, setModalMode] = useState<ModalMode>('login');

	const onChangeModalMode = (newModalMode: ModalMode) => () => {
		setModalMode(newModalMode);
	};

	return (
		<TransitionablePortal
			open={isLoginModalOpen}
			transition={{
				animation: 'scale',
				duration: 200,
			}}
		>
			<Modal onClose={() => setIsLoginModalOpen(false)} open dimmer='blurring'>
				{modalMode === 'login' ? (
					<>
						<Modal.Header>Zaloguj się</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field autoFocus label='E-mail' control={Input} placeholder='E-mail...' />
								<Form.Field label='Hasło' control={Input} placeholder='Hasło...' />
								<Button.Group>
									<Button color='red' type='submit'>
										Zaloguj się!
									</Button>
									<Button.Or text='lub' />
									<Button onClick={onChangeModalMode('register')}>Załóż konto!</Button>
								</Button.Group>
							</Form>
						</Modal.Content>
					</>
				) : (
					<>
						<Modal.Header>Załóż konto</Modal.Header>
						<Modal.Content>
							<Form>
								<Form.Field autoFocus label='E-mail' control={Input} placeholder='E-mail...' />
								<Form.Field label='Hasło' control={Input} placeholder='Hasło...' />
								<Form.Field>
									<Checkbox label='Zgadzam się z postanowieniami regulaminu' />
								</Form.Field>
								<Button.Group>
									<Button color='red' type='submit'>
										Załóż konto!
									</Button>
									<Button.Or text='lub' />
									<Button onClick={onChangeModalMode('login')}>Zaloguj się!</Button>
								</Button.Group>
							</Form>
						</Modal.Content>
					</>
				)}
			</Modal>
		</TransitionablePortal>
	);
};

export default LoginModal;
