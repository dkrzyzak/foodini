export const getJWT = () => {
	return localStorage.getItem('jwt');
};

export const setJWT = (jwt: string) => {
	localStorage.setItem('jwt', jwt);
};

export const removeJWT = () => {
	localStorage.removeItem('jwt');
};
